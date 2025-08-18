import matter from 'gray-matter';
import { format } from 'date-fns';

// --- CONFIGURATION ---
// IMPORTANT: Replace these with your GitHub repository details.
const GITHUB_USERNAME = 'rootsecops';
const GITHUB_REPO = 'rootsecops.io'; // The repository where your blog posts are stored.
const GITHUB_BLOGS_PATH = 'blogs'; // The folder within the repo where your .md files are.
// Make sure your markdown files are in the main branch or change 'main' to your branch name.
const GITHUB_BRANCH = 'main'; 
// --- END CONFIGURATION ---

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
}

const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${GITHUB_BLOGS_PATH}?ref=${GITHUB_BRANCH}`;

// Memoization cache
let cachedPosts: BlogPost[] | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchFromGitHub(url: string) {
    const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
    };

    // This allows using a GitHub token for a higher rate limit during development or build time.
    // The token is NOT exposed to the client.
    if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(url, {
        headers,
        // Revalidate cache based on a time interval (e.g., every hour)
        next: { revalidate: 3600 } 
    });

    if (!response.ok) {
        // If directory not found, it's not a critical error, just means no posts yet.
        if (response.status === 404) {
            return null; // Return null to indicate not found
        }
        console.error(`GitHub API error: ${response.status} ${response.statusText}`);
        console.error(`URL: ${url}`);
        const errorBody = await response.text();
        console.error(`Error Body: ${errorBody}`);
        throw new Error(`Failed to fetch data from GitHub. Status: ${response.status}`);
    }
    return response.json();
}


export async function getAllPosts(): Promise<BlogPost[]> {
    const now = Date.now();
    // Use cache if it's recent to avoid hitting rate limits
    if (cachedPosts && lastFetchTime && (now - lastFetchTime < CACHE_DURATION)) {
        return cachedPosts;
    }

    try {
        const files = await fetchFromGitHub(GITHUB_API_URL);

        if (!files || !Array.isArray(files)) {
            console.warn("No blog posts found in the specified GitHub directory or the directory does not exist.");
            cachedPosts = [];
            lastFetchTime = now;
            return [];
        }

        const postsPromises = files
            .filter(file => file.name.endsWith('.md'))
            .map(async (file) => {
                const fileContentResponse = await fetch(file.download_url, {
                   headers: {
                       'Authorization': `token ${process.env.GITHUB_TOKEN}`
                   }
                });
                const rawContent = await fileContentResponse.text();
                
                const { data, content } = matter(rawContent);

                const excerpt = content.substring(0, 150).trim() + '...';

                return {
                    slug: file.name.replace(/\.md$/, ''),
                    title: data.title || 'Untitled Post',
                    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
                    excerpt: data.excerpt || excerpt,
                    tags: data.tags || [],
                    content: content,
                } as BlogPost;
            });

        const posts = await Promise.all(postsPromises);
        
        // Sort posts by date in descending order
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Update cache
        cachedPosts = posts;
        lastFetchTime = now;

        return posts;
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return []; // Return empty array on error to prevent site crash
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const posts = await getAllPosts();
        return posts.find(post => post.slug === slug) || null;
    } catch (error) {
        console.error(`Error fetching post by slug "${slug}":`, error);
        return null;
    }
}
