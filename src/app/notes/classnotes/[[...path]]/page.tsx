
"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import SectionTitle from '@/components/ui/SectionTitle';
import type { NoteItem } from '@/lib/notes';
import { Home, Loader2, Folder, FileText, ChevronRight } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SearchInput } from '@/components/ui/SearchInput';
import { useParams } from 'next/navigation';

async function getNotes(path: string = ''): Promise<NoteItem[]> {
    try {
        const res = await fetch(`/api/notes?path=${encodeURIComponent(path)}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.notes;
    } catch (error) {
        console.error("Failed to fetch note items:", error);
        return [];
    }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

function Breadcrumbs({ pathSegments }: { pathSegments: string[] }) {
    return (
        <div className="flex items-center text-sm text-muted-foreground flex-wrap flex-shrink-0 min-w-0">
            <Link href="/" className="hover:text-primary transition-colors flex items-center">
                <Home className="h-4 w-4 mr-1.5"/> 
                <span className="hidden sm:inline">Home</span>
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/notes" className="hover:text-primary">Academics</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/notes/classnotes" className="hover:text-primary truncate">Class Notes</Link>
            {pathSegments.map((segment, index) => {
                const href = `/notes/classnotes/${pathSegments.slice(0, index + 1).join('/')}`;
                const isLast = index === pathSegments.length - 1;
                return (
                    <React.Fragment key={segment}>
                        <ChevronRight className="h-4 w-4 mx-1" />
                        <Link href={href} className="hover:text-primary truncate" title={decodeURIComponent(segment)}>
                            <span className={isLast ? "font-medium text-foreground" : ""}>
                               {decodeURIComponent(segment)}
                            </span>
                        </Link>
                    </React.Fragment>
                );
            })}
        </div>
    );
}

const NoteItemCard = ({ item }: { item: NoteItem }) => {
    const linkHref = item.type === 'dir' 
        ? `/notes/${item.path}` 
        : item.html_url;
    
    const linkTarget = item.type === 'dir' ? '_self' : '_blank';

    return (
        <Link 
          href={linkHref} 
          target={linkTarget} 
          rel={linkTarget === '_blank' ? 'noopener noreferrer' : ''}
          className="w-full"
        >
            <Card className="flex flex-col w-full h-full text-center items-center justify-center p-4">
                <CardHeader className="p-2">
                    {item.type === 'dir' 
                        ? <Folder className="h-10 w-10 text-primary" /> 
                        : <FileText className="h-10 w-10 text-primary" />
                    }
                </CardHeader>
                <CardContent className="p-2 flex-grow w-full">
                    <CardTitle className="text-sm font-medium text-foreground break-words">
                        {item.name}
                    </CardTitle>
                </CardContent>
            </Card>
        </Link>
    );
};


export default function NotesPage() {
  const params = useParams();
  const path = Array.isArray(params.path) ? params.path : (params.path ? [params.path] : []);

  const currentPath = useMemo(() => path.join('/'), [path]);
  const pathSegments = useMemo(() => path, [path]);

  const [allItems, setAllItems] = useState<NoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getNotes(currentPath).then(items => {
        setAllItems(items);
        setIsLoading(false);
    });
  }, [currentPath]);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return allItems;
    return allItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allItems, searchTerm]);

  const NoResults = ({term}: {term: string}) => (
    <div className="text-center min-h-[200px] flex flex-col justify-center items-center col-span-full">
      <CardTitle className="text-xl font-semibold text-muted-foreground">Oops! No results found.</CardTitle>
      <p className="text-muted-foreground mt-2">Your search for "{term}" did not match any files or folders.</p>
    </div>
  );

  const ResultsGrid = ({ items }: { items: NoteItem[] }) => (
    <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
    >
        {items.map((item, index) => (
            <motion.div
                key={item.path}
                custom={index}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.2 } }}
                className="flex"
            >
                <NoteItemCard item={item} />
            </motion.div>
        ))}
    </motion.div>
  );

  return (
    <div className="-mt-28">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-between items-center gap-4">
            <Breadcrumbs pathSegments={pathSegments} />
            <SearchInput
              onSearchChange={setSearchTerm}
              placeholder="Search notes..."
              className="flex-grow"
            />
          </div>

        <SectionTitle
          title={currentPath ? decodeURIComponent(currentPath.split('/').pop()!) : "Class Notes"}
          description="A repository of my academic notes and study materials."
        />
        
        {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
            </div>
        ) : (
           <>
            {filteredItems.length > 0 ? (
                <ResultsGrid items={filteredItems} />
            ) : (
                searchTerm && <NoResults term={searchTerm} />
            )}
           </>
        )}
      </div>
    </div>
  );
}
