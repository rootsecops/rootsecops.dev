
"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/ui/SectionTitle';
import type { BlogPost } from '@/lib/blogs';
import { ArrowRight, Calendar, Home, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DecryptedText from '@/components/ui/DecryptedText';

// This is a client component, so we fetch the data on the client side.
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


export default function BlogsPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPosts().then(posts => {
        setAllPosts(posts);
        setIsLoading(false);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
          <Button asChild variant="outline" size="sm">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      <SectionTitle
        tagText="Blog"
        title="Thoughts and Write-ups"
        description="Here's a collection of my articles on cybersecurity, tech, and other interests."
      />
      
      {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
                 <motion.div key={index} custom={index} variants={cardVariants} initial="hidden" animate="visible">
                    <Card className="glass-card text-center p-8 min-h-[300px] flex flex-col justify-center items-center">
                        <Loader2 className="mx-auto h-12 w-12 text-primary mb-4 animate-spin" />
                        <CardTitle className="text-xl font-semibold text-primary mb-2">
                            <DecryptedText 
                                text="Decrypting Logs..." 
                                speed={30} 
                                sequential 
                                animateOn="view"
                                parentClassName="font-pixel"
                                encryptedClassName="text-primary/50"
                            />
                        </CardTitle>
                        <CardContent>
                            <p className="text-muted-foreground text-balance text-sm">
                            Accessing secure server... Please stand by.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
          </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post: BlogPost, index) => (
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
                    <p className="text-sm text-muted-foreground text-balance">
                        {post.excerpt}
                    </p>
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
            ))}
        </div>
      )}
    </div>
  );
}
