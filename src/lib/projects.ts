
import matter from 'gray-matter';

// --- CONFIGURATION ---
const GITHUB_USERNAME = 'rootsecops';
const GITHUB_REPO = 'rootsecops.io';
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
  date: string; // Add date for sorting
  content: string;
}

const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${GITHUB_PROJECTS_PATH}?ref=${GITHUB_BRANCH}`;

async function fetchFromGitHub(url: string) {
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

export async function getAllProjects(): Promise<Project[]> {
  try {
    const files = await fetchFromGitHub(GITHUB_API_URL);

    if (!files || !Array.isArray(files)) {
      console.warn("No projects found in the specified GitHub directory or the directory does not exist.");
      return [];
    }

    const projectsPromises = files
      .filter(file => file.name.endsWith('.md'))
      .map(async (file): Promise<Project> => {
        const fileContentResponse = await fetch(file.download_url, {
          headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}` },
          cache: 'no-store'
        });
        const rawContent = await fileContentResponse.text();
        const { data, content } = matter(rawContent);

        return {
          slug: file.name.replace(/\.md$/, ''),
          title: data.title || 'Untitled Project',
          description: data.description || '',
          image: data.image || '',
          imageHint: data.imageHint || 'project image',
          tags: data.tags || [],
          githubLink: data.githubLink,
          demoLink: data.demoLink,
          date: data.date || new Date().toISOString(),
          content: content,
        };
      });

    const projects = await Promise.all(projectsPromises);
    projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const allProjects = await getAllProjects();
  return allProjects.find(p => p.slug === slug) || null;
}
