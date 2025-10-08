
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

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
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

export async function getAllCodes(path: string = ''): Promise<ProgramItem[]> {
  try {
    const { data } = await octokit.repos.getContent({
      owner: GITHUB_USERNAME,
      repo: GITHUB_REPO,
      path: path,
      ref: GITHUB_BRANCH,
      random: new Date().getTime(),
    });

    if (Array.isArray(data)) {
        const items = data.map(item => ({
            name: item.name,
            path: `academics/codes/${item.path}`,
            type: item.type as 'file' | 'dir',
            html_url: item.html_url,
        }));

        items.sort((a, b) => {
            if (a.type === 'dir' && b.type === 'file') return -1;
            if (a.type === 'file' && b.type === 'dir') return 1;
            return a.name.localeCompare(b.name);
        });
        
        return items;
    }
    
    return [];

  } catch (error: any) {
    if (error.status === 404) {
        console.warn(`GitHub directory not found for repo ${GITHUB_REPO} at path "${path}".`);
        return [];
    }
    console.error(`Error fetching codes from GitHub (path: "${path}"):`, error);
    return [];
  }
}


export async function searchCodes(query: string): Promise<ProgramItem[]> {
    if (!query) return [];
    try {
        const { data } = await octokit.repos.getBranch({
            owner: GITHUB_USERNAME,
            repo: GITHUB_REPO,
            branch: GITHUB_BRANCH,
        });
        
        const treeSha = data.commit.sha;

        const { data: treeData } = await octokit.git.getTree({
            owner: GITHUB_USERNAME,
            repo: GITHUB_REPO,
            tree_sha: treeSha,
            recursive: '1',
        });

        if (treeData.truncated) {
            console.warn("GitHub search results were truncated. Not all files were searched.");
        }

        const lowerCaseQuery = query.toLowerCase();

        const allItems = treeData.tree
            .filter(item => item.path && item.path.toLowerCase().includes(lowerCaseQuery))
            .map(item => {
                const name = item.path!.split('/').pop()!;
                return {
                    name: name,
                    path: `academics/codes/${item.path!}`,
                    type: item.type === 'tree' ? 'dir' : 'file',
                    html_url: `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}/blob/${GITHUB_BRANCH}/${item.path!}`,
                } as ProgramItem;
            });
        
        return allItems;

    } catch (error) {
        console.error(`Error searching codes on GitHub for query "${query}":`, error);
        return [];
    }
}
