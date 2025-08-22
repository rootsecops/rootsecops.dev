
import matter from 'gray-matter';
import { remark } from 'remark';
import strip from 'strip-markdown';


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
}

const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${GITHUB_PROJECTS_PATH}?ref=${GITHUB_BRANCH}`;

async function fetchFromGitHub(url: string) {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3.raw', // Request raw content
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
  return response.text(); // Return text directly
}

async function fetchGitHubDirectory(url: string) {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }
    const response = await fetch(url, { headers, cache: 'no-store' });
    if (!response.ok) {
        if (response.status === 404) return null;
        console.error(`GitHub API error: ${response.status} ${response.statusText}`);
        throw new Error(`Failed to fetch data from GitHub. Status: ${response.status}`);
    }
    return response.json();
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
        
        const readmeUrl = `https://api.github.com/repos/${user}/${repo}/readme`;
        const readmeContent = await fetchFromGitHub(readmeUrl);
        return readmeContent;
    } catch(error) {
        console.error(`Failed to fetch README for ${githubLink}:`, error);
        return null;
    }
}


export async function getAllProjects(): Promise<Project[]> {
  try {
    const files = await fetchGitHubDirectory(GITHUB_API_URL);

    if (!files || !Array.isArray(files)) {
      console.warn("No projects found in the specified GitHub directory or the directory does not exist.");
      return [];
    }

    const projectsPromises = files
      .filter(file => file.name.endsWith('.md'))
      .map(async (file): Promise<Project | null> => {
        const rawContent = await fetchFromGitHub(file.download_url);
        if (!rawContent) return null;

        const { data, content: markdownIntro } = matter(rawContent);

        // For the list view, we just need the intro, not the full README
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
        };
      });

    const projects = (await Promise.all(projectsPromises)).filter((p): p is Project => p !== null);
    projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projectMdUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/${GITHUB_PROJECTS_PATH}/${slug}.md`;
    const rawContent = await fetchFromGitHub(projectMdUrl);

    if (!rawContent) {
        return null;
    }

    const { data, content: markdownIntro } = matter(rawContent);

    // Now, fetch the README from the actual project repo
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
        // Use README if available, otherwise fallback to the intro from the markdown file
        content: readmeContent || markdownIntro,
    };
  } catch (error) {
    console.error(`Error fetching project by slug "${slug}":`, error);
    return null;
  }
}
