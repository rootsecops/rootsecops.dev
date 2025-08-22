
import { Octokit } from '@octokit/rest';

// --- CONFIGURATION ---
const GITHUB_USERNAME = 'rootsecops';
const GITHUB_REPO = 'academic_coursework';
const GITHUB_BRANCH = 'main';
// --- END CONFIGURATION ---

export interface ProgramItem {
  name: string;
  path: string;
  type: 'file' | 'dir';
  html_url: string;
}

// Use a persistent Octokit instance
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    // Ensure we are not hitting a rate-limited endpoint aggressively
    throttle: {
        onRateLimit: (retryAfter, options) => {
            console.warn(`Request quota exhausted for request ${options.method} ${options.url}`);
            console.warn(`Retrying after ${retryAfter} seconds!`);
            return true;
        },
        onSecondaryRateLimit: (retryAfter, options) => {
            console.warn(`Secondary rate limit for request ${options.method} ${options.url}`);
            console.warn(`Retrying after ${retryAfter} seconds!`);
            return true;
        },
    },
});

export async function getAllPrograms(path: string = ''): Promise<ProgramItem[]> {
  try {
    const { data } = await octokit.repos.getContent({
      owner: GITHUB_USERNAME,
      repo: GITHUB_REPO,
      path: path,
      ref: GITHUB_BRANCH,
      // Add a cache-busting parameter to ensure fresh data
      random: new Date().getTime(),
    });

    if (Array.isArray(data)) {
        const items = data.map(item => ({
            name: item.name,
            path: item.path,
            type: item.type as 'file' | 'dir',
            html_url: item.html_url,
        }));

        // Sort with directories first, then by name
        items.sort((a, b) => {
            if (a.type === 'dir' && b.type === 'file') return -1;
            if (a.type === 'file' && b.type === 'dir') return 1;
            return a.name.localeCompare(b.name);
        });
        
        return items;
    }
    
    // If 'data' is not an array, it might be a single file response, which is not expected for this function.
    // For simplicity, we return an empty array if the path doesn't point to a directory.
    return [];

  } catch (error: any) {
    // If the error is a 404, it means the directory/repo is not found, which we can treat as empty.
    if (error.status === 404) {
        console.warn(`GitHub directory not found for repo ${GITHUB_REPO} at path "${path}".`);
        return [];
    }
    console.error(`Error fetching programs from GitHub (path: "${path}"):`, error);
    // On other errors, return an empty array to prevent the page from crashing.
    return [];
  }
}
