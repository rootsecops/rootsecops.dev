
"use client";

import { useEffect, useState, Fragment } from 'react';
import { notFound, useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Button } from '@/components/ui/button';
import { ExternalLink, Loader2, Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { NoteContent } from '@/lib/notes';

async function getNote(path: string): Promise<NoteContent | null> {
    try {
        const res = await fetch(`/api/academics?action=getContent&path=${encodeURIComponent(path)}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Failed to fetch note content:", error);
        return null;
    }
}

export default function NoteViewPage() {
    const params = useParams();
    const pathArray = Array.isArray(params.path) ? params.path : (params.path ? [params.path] : []);
    const path = pathArray.join('/');

    const [note, setNote] = useState<NoteContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (path) {
            setIsLoading(true);
            getNote(path).then(noteData => {
                setNote(noteData);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, [path]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl flex justify-center items-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
            </div>
        );
    }
    
    if (!note) {
        return notFound();
    }
    
    const isPdf = note.name.toLowerCase().endsWith('.pdf');
    const isImage = /\.(jpg|jpeg|png|gif|svg)$/i.test(note.name);
    // Construct the direct download URL for embedding content
    const downloadUrl = note.html_url?.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');


    const Breadcrumbs = () => {
        const pathSegments = path.split('/');
        return (
             <div className="flex items-center text-sm text-muted-foreground mb-4 flex-wrap">
                <Link href="/" className="hover:text-primary transition-colors flex items-center">
                    <Home className="h-4 w-4 mr-1.5"/> Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link href="/academics" className="hover:text-primary">Academics</Link>
                {pathSegments.slice(0, -1).map((segment, index) => {
                     const href = `/academics/classnotes/${pathSegments.slice(0, index + 1).join('/')}`;
                     return (
                        <Fragment key={segment}>
                            <ChevronRight className="h-4 w-4 mx-1" />
                            <Link href={href} className="hover:text-primary">
                                {decodeURIComponent(segment)}
                            </Link>
                        </Fragment>
                     )
                })}
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="font-medium text-foreground truncate max-w-[200px] md:max-w-none">{note.name}</span>
            </div>
        );
    };

    return (
        <div className="-mt-28">
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
               <Breadcrumbs />
                <Button asChild variant="secondary" size="sm">
                    <Link href={note.html_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Open on GitHub
                    </Link>
                </Button>
            </div>

            <header className="mb-6 text-center">
                <h1 className="text-2xl md:text-4xl font-bold text-primary">{note.name}</h1>
            </header>

            <div className="p-4 md:p-6">
                {isPdf ? (
                    <div className="aspect-w-4 aspect-h-5">
                         <iframe src={downloadUrl} className="w-full h-[80vh]" title={note.name} />
                    </div>
                ) : isImage ? (
                    <div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={downloadUrl} alt={note.name} className="max-w-full h-auto rounded-md" />
                    </div>
                ) : (
                    <div className="prose prose-invert max-w-none prose-h2:text-primary prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{note.content}</ReactMarkdown>
                    </div>
                )}
            </div>
        </article>
        </div>
    );
}
