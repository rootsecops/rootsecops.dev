
"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/ui/SectionTitle';
import type { BlogPost } from '@/lib/blogs';
import { ArrowRight, Calendar, ChevronRight, Home, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import DecryptedText from '@/components/ui/DecryptedText';
import { SearchInput } from '@/components/ui/SearchInput';
import { ReadMore } from '@/components/ui/ReadMore';

async function getPosts(): Promise<BlogPost[]> {
    try {
        const res = await fetch('/api/blogs');
        if (!res.ok) return [];
        const data = await res.json();
        return data.posts;
    } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        return [];
    }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const NoResults = ({ term }: { term: string }) => (
    <div className="text-center min-h-[200px] flex flex-col justify-center items-center col-span-full">
      <CardTitle className="text-xl font-semibold text-muted-foreground">Oops! No results found.</CardTitle>
      <p className="text-muted-foreground mt-2">Your search for "{term}" did not match any blog posts.</p>
    </div>
);

const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => (
    <motion.div
        key={post.slug}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
        <Card className="flex flex-col h-full">
            <CardHeader>
            <CardTitle className="text-lg md:text-xl font-semibold text-primary">
                {post.title}
            </CardTitle>
            <CardDescription className="flex items-center text-xs text-muted-foreground pt-1">
                <Calendar className="mr-2 h-4 w-4" />
                {format(new Date(post.date), 'MMMM d, yyyy')}
            </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <ReadMore text={post.excerpt} className="text-sm text-muted-foreground text-balance" />
            </CardContent>
            <CardFooter>
            <Button asChild variant="outline" size="sm">
                <Link href={`/blogs/${post.slug}`}>
                Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
            </CardFooter>
        </Card>
    </motion.div>
);


export default function BlogsPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getPosts().then(posts => {
        setAllPosts(posts);
        setIsLoading(false);
    });
  }, []);

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return allPosts;
    return allPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allPosts, searchTerm]);

  return (
    <div className="-mt-28">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-between items-center gap-4">
            <div className="flex items-center text-sm text-muted-foreground flex-shrink-0 min-w-0">
                <Link href="/" className="hover:text-primary transition-colors flex items-center">
                    <Home className="h-4 w-4 mr-1.5"/> 
                    <span className="hidden sm:inline">Home</span>
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="font-medium text-foreground truncate">Blogs</span>
            </div>
            
            <SearchInput
              onSearchChange={setSearchTerm}
              placeholder="Search blogs..."
              className="flex-grow"
            />
        </div>

        <SectionTitle
          title="RootSecOps's blog"
          description="Cybersecurity insights, Cybersecurity Labs writeups and much more"
        />
        
        {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
                <motion.div variants={cardVariants} initial="hidden" animate="visible">
                    <Card className="glass-card text-center p-8 w-full max-w-md flex flex-col justify-center items-center">
                        <Loader2 className="mx-auto h-12 w-12 text-primary mb-4 animate-spin" />
                        <CardTitle className="text-xl font-semibold text-primary mb-2">
                            <DecryptedText 
                                text="blogs are loading up" 
                                speed={50} 
                                sequential 
                                animateOn="view"
                                parentClassName="font-pixel"
                                encryptedClassName="text-primary/50"
                            />
                        </CardTitle>
                        <CardContent>
                            <p className="text-muted-foreground text-balance text-sm">
                            Please wait while we fetch the latest posts.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredPosts.map((post, index) => <BlogCard key={post.slug} post={post} index={index} />)}
            </div>
            {filteredPosts.length === 0 && searchTerm && <NoResults term={searchTerm} />}
          </>
        )}
      </div>
    </div>
  );
}
