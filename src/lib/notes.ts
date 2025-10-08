
import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';

// --- CONFIGURATION ---
const GITHUB_USERNAME = 'rootsecops';
const GITHUB_REPO = 'academic_notes';
const GITHUB_BRANCH = 'main';
// --- END CONFIGURATION ---

export interface NoteItem {
  name: string;
  path: string;
  type: 'file' | 'dir';
  html_url: string;
  download_url: string | null;
}

export interface NoteContent {
    content: string;
    frontmatter: { [key: string]: any };
    html_url: string;
    name: string;
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

export async function getNotes(path: string = ''): Promise<NoteItem[]> {
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
            path: `academics/classnotes/${item.path}`,
            type: item.type as 'file' | 'dir',
            html_url: item.html_url,
            download_url: item.download_url
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
    console.error(`Error fetching notes from GitHub (path: "${path}"):`, error);
    return [];
  }
}

export async function getNoteContent(path: string): Promise<NoteContent | null> {
    try {
        const { data: fileData } = await octokit.repos.getContent({
            owner: GITHUB_USERNAME,
            repo: GITHUB_REPO,
            path: path,
            ref: GITHUB_BRANCH,
        });

        // Ensure we're dealing with a file and have content
        if (typeof fileData === 'object' && fileData && 'content' in fileData && 'encoding' in fileData) {
            const rawContent = Buffer.from((fileData as any).content, (fileData as any).encoding).toString('utf-8');
            
            const { data: frontmatter, content } = matter(rawContent);
            
            return {
                content,
                frontmatter,
                html_url: (fileData as any).html_url,
                name: (fileData as any).name,
            };
        }

        return null;

    } catch (error: any) {
        if (error.status === 404) {
            console.warn(`Note not found at path: ${path}`);
            return null;
        }
        console.error(`Error fetching note content from GitHub (path: "${path}"):`, error);
        return null;
    }
}


export async function searchNotes(query: string): Promise<NoteItem[]> {
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
                    path: `academics/classnotes/${item.path!}`,
                    type: item.type === 'tree' ? 'dir' : 'file',
                    html_url: `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}/blob/${GITHUB_BRANCH}/${item.path!}`,
                    download_url: `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/${item.path!}`,
                } as NoteItem;
            });
        
        return allItems;

    } catch (error) {
        console.error(`Error searching notes on GitHub for query "${query}":`, error);
        return [];
    }
}
