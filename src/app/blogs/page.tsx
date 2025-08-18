import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/ui/SectionTitle';
import { getAllPosts, BlogPost } from '@/lib/blogs';
import { ArrowRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default async function BlogsPage() {
  const allPosts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle
        tagText="Blog"
        title="Thoughts and Write-ups"
        description="Here's a collection of my articles on cybersecurity, tech, and other interests."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPosts.map((post: BlogPost) => (
          <Card key={post.slug} className="flex flex-col">
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
        ))}
      </div>
    </div>
  );
}
