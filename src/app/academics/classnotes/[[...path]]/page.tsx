
"use client";

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import SectionTitle from '@/components/ui/SectionTitle';
import type { NoteItem } from '@/lib/notes';
import { Home, Loader2, Folder, FileText, ChevronRight, Search } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SearchInput } from '@/components/ui/SearchInput';
import { useParams } from 'next/navigation';
import { SiPython, SiC, SiCplusplus, SiJavascript, SiHtml5, SiCss3 } from 'react-icons/si';
import { VscJson } from 'react-icons/vsc';
import { FaFilePdf, FaImage } from 'react-icons/fa6';
import { useDebounce } from '@/hooks/use-debounce';

async function getItems(path: string = '', query: string = ''): Promise<NoteItem[]> {
    try {
        const endpoint = query 
            ? `/api/academics?query=${encodeURIComponent(query)}`
            : `/api/academics?path=${encodeURIComponent(path)}`;
        const res = await fetch(endpoint);
        if (!res.ok) return [];
        const data = await res.json();
        return data.notes;
    } catch (error) {
        console.error("Failed to fetch note items:", error);
        return [];
    }
}

const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
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
            <Link href="/academics" className="hover:text-primary">Academics</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/academics/classnotes" className="hover:text-primary truncate">Class Notes</Link>
            {pathSegments.map((segment, index) => {
                const href = `/academics/classnotes/${pathSegments.slice(0, index + 1).join('/')}`;
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

const fileIcons: { [key: string]: React.ElementType } = {
    py: SiPython,
    c: SiC,
    cpp: SiCplusplus,
    js: SiJavascript,
    json: VscJson,
    html: SiHtml5,
    css: SiCss3,
    pdf: FaFilePdf,
    png: FaImage,
    jpg: FaImage,
    jpeg: FaImage,
    gif: FaImage,
    svg: FaImage,
};

const NoteListItem = ({ item, index }: { item: NoteItem, index: number }) => {
    const isSearchMode = 'download_url' in item; // A way to check if we're in search results
    const linkHref = item.type === 'dir' 
        ? `/academics/classnotes/${item.path.replace(/^academics\/classnotes\//, '')}`
        : item.html_url;
    
    const linkTarget = item.type === 'dir' ? '_self' : '_blank';

    const getFileIcon = (filename: string) => {
        const extension = filename.split('.').pop()?.toLowerCase();
        if (extension && fileIcons[extension]) {
            return React.createElement(fileIcons[extension], { className: "h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" });
        }
        return <FileText className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />;
    };

    return (
        <motion.div custom={index} variants={listItemVariants}>
            <Link 
              href={linkHref} 
              target={linkTarget} 
              rel={linkTarget === '_blank' ? 'noopener noreferrer' : ''}
              className="w-full"
            >
                <div className="flex items-center p-3 -mx-3 rounded-md hover:bg-muted transition-colors">
                    {item.type === 'dir' 
                        ? <Folder className="h-5 w-5 text-primary mr-3 flex-shrink-0" /> 
                        : getFileIcon(item.name)
                    }
                    <div className="flex flex-col truncate">
                        <span className="text-sm font-medium text-foreground truncate">
                            {item.name}
                        </span>
                        {isSearchMode && (
                             <span className="text-xs text-muted-foreground truncate">
                                {item.path.replace(/^academics\/classnotes\//, '').replace(item.name, '')}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};


export default function NotesPage() {
  const params = useParams();
  const path = Array.isArray(params.path) ? params.path.map(p => decodeURIComponent(p)) : (params.path ? [decodeURIComponent(params.path)] : []);

  const currentPath = useMemo(() => path.join('/'), [path]);
  const pathSegments = useMemo(() => path, [path]);

  const [items, setItems] = useState<NoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const isSearching = useMemo(() => debouncedSearchTerm.length > 0, [debouncedSearchTerm]);

  useEffect(() => {
    setIsLoading(true);
    getItems(currentPath, debouncedSearchTerm).then(fetchedItems => {
        setItems(fetchedItems);
        setIsLoading(false);
    });
  }, [currentPath, debouncedSearchTerm]);

  const NoResults = ({term}: {term: string}) => (
    <div className="text-center min-h-[200px] flex flex-col justify-center items-center col-span-full">
      <h2 className="text-xl font-semibold text-muted-foreground">Oops! No results found.</h2>
      <p className="text-muted-foreground mt-2">Your search for "{term}" did not match any files or folders.</p>
    </div>
  );

  const ResultsList = ({ items }: { items: NoteItem[] }) => (
    <motion.div 
        className="border-t border-border"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
    >
        {items.map((item, index) => (
           <div key={item.path} className="border-b border-border">
             <NoteListItem item={item} index={index} />
           </div>
        ))}
    </motion.div>
  );

  const sectionTitle = isSearching 
    ? `Search Results for "${debouncedSearchTerm}"`
    : (currentPath ? decodeURIComponent(currentPath.split('/').pop()!) : "Class Notes");
  
  const sectionDescription = isSearching
    ? `${items.length} results found.`
    : undefined;

  return (
    <div className="-mt-28">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-between items-center gap-4">
            <Breadcrumbs pathSegments={isSearching ? [] : pathSegments} />
            <SearchInput
              onSearchChange={setSearchTerm}
              placeholder="Search all notes..."
              className="flex-grow max-w-sm"
            />
          </div>

        {isSearching && (
            <SectionTitle
            title={sectionTitle}
            description={sectionDescription}
            />
        )}
        
        <div className="max-w-4xl mx-auto">
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                </div>
            ) : (
               <>
                {items.length > 0 ? (
                    <Card className="overflow-hidden">
                        <CardContent className="p-2">
                            <ResultsList items={items} />
                        </CardContent>
                    </Card>
                ) : (
                    searchTerm && <NoResults term={searchTerm} />
                )}
               </>
            )}
        </div>
      </div>
    </div>
  );
}
