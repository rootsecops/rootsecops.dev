
"use client"
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SectionTitle from '../ui/SectionTitle';
import { ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState, useMemo } from 'react';
import type { BlogPost } from '@/lib/blogs';
import { ReadMore } from '../ui/ReadMore';
import { useIsMobile } from '@/hooks/use-mobile';

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

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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

export default function BlogSection({ isHomePage = false }: { isHomePage?: boolean }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    getPosts().then(posts => {
        setAllPosts(posts);
    });
  }, []);

  const posts = useMemo(() => {
    if (!isHomePage) return allPosts;
    const limit = isMobile ? 3 : 4;
    return allPosts.slice(0, limit);
  }, [allPosts, isHomePage, isMobile]);
  
  if (posts.length === 0 && isHomePage) return null;

  return (
    <motion.section
      id="blogs"
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : {}}
      className="py-4 md:py-8"
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          tagText="From the blog"
          title="Recent Posts"
          description="Latest insights from Cybersecurity, Writeups"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : {}}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl font-semibold text-primary">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="flex items-center text-xs text-muted-foreground pt-1">
                     <Calendar className="mr-2 h-4 w-4" />
                     {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
          ))}
        </div>
        {isHomePage && allPosts.length > (isMobile ? 3 : 4) && (
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/blogs">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
