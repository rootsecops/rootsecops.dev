
import { getPostBySlug, getAllPosts } from '@/lib/blogs';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar, Tag } from 'lucide-react';
import rehypeRaw from 'rehype-raw';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug:string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">{post.title}</h1>
        <div className="flex items-center justify-center space-x-4 text-muted-foreground text-sm">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              <span>{post.tags.join(', ')}</span>
            </div>
          )}
        </div>
      </header>

      <div className="prose prose-invert max-w-none prose-h2:text-primary prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
