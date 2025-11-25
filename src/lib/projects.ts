
import matter from 'gray-matter';
import { remark } from 'remark';
import strip from 'strip-markdown';
import { getFromCache, setInCache } from './cache';


// --- CONFIGURATION ---
const GITHUB_USERNAME = 'rootsecops';
const GITHUB_REPO = 'rootsecops.dev';
const GITHUB_PROJECTS_PATH = 'projects';
const GITHUB_BRANCH = 'main';
// --- END CONFIGURATION ---

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageHint: string;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
  date: string;
  content: string; // This will now hold the README content
  stars?: number;
  forks?: number;
  lastUpdated?: string;
}

const GITHUB_API_BASE_URL = 'https://api.github.com';
const PROJECTS_CACHE_KEY = 'all_projects';

async function fetchFromGitHub(url: string, raw: boolean = true) {
  const headers: HeadersInit = {
    'Accept': raw ? 'application/vnd.github.v3.raw' : 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }
  const response = await fetch(url, { headers, cache: 'no-store' });
  if (!response.ok) {
    if (response.status === 404) return null;
    console.error(`GitHub API error: ${response.status} ${response.statusText} for URL: ${url}`);
    throw new Error(`Failed to fetch data from GitHub. Status: ${response.status}`);
  }
  return raw ? response.text() : response.json();
}

// Function to get README from the project's own repository
export async function getProjectReadme(githubLink: string): Promise<string | null> {
    if (!githubLink) return null;

    try {
        const url = new URL(githubLink);
        const pathParts = url.pathname.split('/').filter(Boolean);
        if (pathParts.length < 2) return null;
        
        const user = pathParts[0];
        const repo = pathParts[1];
        
        const readmeUrl = `${GITHUB_API_BASE_URL}/repos/${user}/${repo}/readme`;
        const readmeContent = await fetchFromGitHub(readmeUrl, true);
        return readmeContent as string | null;
    } catch(error) {
        console.error(`Failed to fetch README for ${githubLink}:`, error);
        return null;
    }
}

async function getRepoDetails(githubLink: string): Promise<{ stars: number, forks: number, lastUpdated: string } | null> {
    if (!githubLink) return null;
    try {
        const url = new URL(githubLink);
        const pathParts = url.pathname.split('/').filter(Boolean);
        if (pathParts.length < 2) return null;

        const user = pathParts[0];
        const repo = pathParts[1];

        const repoApiUrl = `${GITHUB_API_BASE_URL}/repos/${user}/${repo}`;
        const repoData = await fetchFromGitHub(repoApiUrl, false);

        if (repoData) {
            return {
                stars: repoData.stargazers_count,
                forks: repoData.forks_count,
                lastUpdated: repoData.pushed_at,
            };
        }
        return null;
    } catch (error) {
        console.error(`Failed to fetch repo details for ${githubLink}:`, error);
        return null;
    }
}


export async function getAllProjects(): Promise<Project[]> {
  const cachedProjects = getFromCache<Project[]>(PROJECTS_CACHE_KEY);
  if (cachedProjects) {
    return cachedProjects;
  }

  try {
    const files = await fetchFromGitHub(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${GITHUB_PROJECTS_PATH}?ref=${GITHUB_BRANCH}`, false) as any[];

    if (!files || !Array.isArray(files)) {
      console.warn("No projects found in the specified GitHub directory or the directory does not exist.");
      return [];
    }

    const projectsPromises = files
      .filter(file => file.name.endsWith('.md'))
      .map(async (file): Promise<Project | null> => {
        const rawContent = await fetchFromGitHub(file.download_url, true) as string;
        if (!rawContent) return null;

        const { data, content: markdownIntro } = matter(rawContent);
        const repoDetails = await getRepoDetails(data.githubLink);
        const plainIntro = String(await remark().use(strip).process(markdownIntro));

        return {
          slug: file.name.replace(/\.md$/, ''),
          title: data.title || 'Untitled Project',
          description: data.description || plainIntro.substring(0, 150),
          image: data.image || '',
          imageHint: data.imageHint || 'project image',
          tags: data.tags || [],
          githubLink: data.githubLink,
          demoLink: data.demoLink,
          date: data.date || new Date().toISOString(),
          content: markdownIntro, // Store the intro from the .md file
          stars: repoDetails?.stars,
          forks: repoDetails?.forks,
          lastUpdated: repoDetails?.lastUpdated,
        };
      });

    const projects = (await Promise.all(projectsPromises)).filter((p): p is Project => p !== null);
    projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setInCache(PROJECTS_CACHE_KEY, projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projectMdUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/${GITHUB_PROJECTS_PATH}/${slug}.md`;
    const rawContent = await fetchFromGitHub(projectMdUrl, true) as string;

    if (!rawContent) {
        return null;
    }

    const { data, content: markdownIntro } = matter(rawContent);
    const repoDetails = await getRepoDetails(data.githubLink);
    const readmeContent = data.githubLink ? await getProjectReadme(data.githubLink) : null;
    
    return {
        slug,
        title: data.title || 'Untitled Project',
        description: data.description || '',
        image: data.image || '',
        imageHint: data.imageHint || 'project image',
        tags: data.tags || [],
        githubLink: data.githubLink,
        demoLink: data.demoLink,
        date: data.date || new Date().toISOString(),
        content: readmeContent || markdownIntro,
        stars: repoDetails?.stars,
        forks: repoDetails?.forks,
        lastUpdated: repoDetails?.lastUpdated,
    };
  } catch (error) {
    console.error(`Error fetching project by slug "${slug}":`, error);
    return null;
  }
}
