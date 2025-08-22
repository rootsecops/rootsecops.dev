
"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import SectionTitle from '@/components/ui/SectionTitle';
import type { ProgramItem } from '@/lib/programs';
import { Home, Loader2, Folder, FileText, ChevronRight } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import DecryptedText from '@/components/ui/DecryptedText';
import { SearchDialog } from '@/components/ui/SearchDialog';
import { useParams } from 'next/navigation';

// This is a client component, so we fetch the data on the client side.
async function getPrograms(path: string = ''): Promise<ProgramItem[]> {
    try {
        const res = await fetch(`/api/programs?path=${encodeURIComponent(path)}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.programs;
    } catch (error) {
        console.error("Failed to fetch program items:", error);
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
        <div className="flex items-center text-sm text-muted-foreground flex-wrap flex-shrink-0">
             <Link href="/" className="hover:text-primary transition-colors flex items-center">
                <Home className="h-4 w-4 mr-1.5"/> Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/programs" className="hover:text-primary">Programs</Link>
            {pathSegments.map((segment, index) => {
                const href = `/programs/${pathSegments.slice(0, index + 1).join('/')}`;
                return (
                    <React.Fragment key={segment}>
                        <ChevronRight className="h-4 w-4 mx-1" />
                        <Link href={href} className="hover:text-primary">
                            {decodeURIComponent(segment)}
                        </Link>
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default function ProgramsPage() {
  const params = useParams();
  const path = Array.isArray(params.path) ? params.path : (params.path ? [params.path] : []);

  const currentPath = useMemo(() => path.join('/'), [path]);
  const pathSegments = useMemo(() => path, [path]);

  const [allItems, setAllItems] = useState<ProgramItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getPrograms(currentPath).then(items => {
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

  const NoResults = () => (
    <div className="text-center min-h-[200px] flex flex-col justify-center items-center">
      <CardTitle className="text-xl font-semibold text-muted-foreground">No Results Found</CardTitle>
      <p className="text-muted-foreground mt-2">Your search for "{searchTerm}" did not match any files or folders.</p>
    </div>
  );

  const ResultsGrid = ({ items }: { items: ProgramItem[] }) => (
    <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
            visible: { transition: { staggerChildren: 0.05 } }
        }}
    >
        {items.map((item, index) => {
            const linkHref = item.type === 'dir' 
                ? `/programs/${item.path}` 
                : item.html_url;
            
            const linkTarget = item.type === 'dir' ? '_self' : '_blank';

            return (
                <motion.div
                    key={item.path}
                    custom={index}
                    variants={cardVariants}
                    whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.2 } }}
                >
                    <Link href={linkHref} target={linkTarget} rel={linkTarget === '_blank' ? 'noopener noreferrer' : ''}>
                        <Card className="flex flex-col h-full items-center justify-center text-center p-4">
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
                </motion.div>
            );
        })}
    </motion.div>
  );

  return (
    <div className="-mt-28">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-between items-center gap-4">
            <Breadcrumbs pathSegments={pathSegments} />
            <SearchDialog
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search programs..."
                hasResults={filteredItems.length > 0}
                noResultsContent={<NoResults />}
                resultsClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <ResultsGrid items={filteredItems} />
            </SearchDialog>
          </div>

        <SectionTitle
          title={currentPath ? decodeURIComponent(currentPath.split('/').pop()!) : "My Programs"}
          description="A live look into my academic coursework and coding projects on GitHub."
        />
        
        {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
                <motion.div variants={cardVariants} initial="hidden" animate="visible">
                    <Card className="glass-card text-center p-8 w-full max-w-md flex flex-col justify-center items-center">
                        <Loader2 className="mx-auto h-12 w-12 text-primary mb-4 animate-spin" />
                        <CardTitle className="text-xl font-semibold text-primary mb-2">
                            <DecryptedText 
                                text="Accessing GitHub..." 
                                speed={50} 
                                sequential 
                                animateOn="view"
                                parentClassName="font-pixel"
                                encryptedClassName="text-primary/50"
                            />
                        </CardTitle>
                        <CardContent>
                            <p className="text-muted-foreground text-balance text-sm">
                            Please wait while we fetch the repository contents.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        ) : (
           <ResultsGrid items={filteredItems} />
        )}
        {!isLoading && filteredItems.length === 0 && <NoResults />}
      </div>
    </div>
  );
}
