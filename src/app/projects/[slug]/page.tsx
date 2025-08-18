
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import rehypeRaw from 'rehype-raw';

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Button asChild variant="outline" size="sm">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Projects
          </Link>
        </Button>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">{project.title}</h1>
        <p className="text-muted-foreground text-lg">{project.description}</p>
        <div className="flex flex-wrap gap-2 my-4">
            {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                    {tag}
                </span>
            ))}
        </div>
        <div className="flex space-x-4 mt-4">
            {project.githubLink && (
                <Button variant="outline" asChild>
                    <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub Repository
                    </Link>
                </Button>
            )}
            {project.demoLink && (
                <Button asChild>
                    <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Link>
                </Button>
            )}
        </div>
      </header>
      
      <hr className="my-8 border-border" />

      <div className="prose prose-invert max-w-none prose-p:has-[>img]:flex prose-p:has-[>img]:flex-col prose-p:has-[>img]:gap-2 prose-h2:text-primary prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {project.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
