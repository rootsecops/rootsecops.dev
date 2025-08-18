"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Construction, Star, ArrowRight, BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import type { Project } from '@/lib/projects';
import SectionTitle from '@/components/ui/SectionTitle';

// This is a client component, so we fetch the data on the client side.
async function getProjects(): Promise<Project[]> {
    try {
        const res = await fetch('/api/projects');
        if (!res.ok) return [];
        const data = await res.json();
        return data.projects;
    } catch (error) {
        console.error("Failed to fetch projects:", error);
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

export default function ProjectsSection({ isHomePage = false }: { isHomePage?: boolean }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  
  useEffect(() => {
      getProjects().then(data => setAllProjects(data));
  }, []);

  const projectsToDisplay = isHomePage ? allProjects.slice(0, 2) : allProjects;

  return (
    <motion.section
      id="projects"
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : {}}
      className="py-4 md:py-8"
    >
      <div className="container mx-auto px-4">
        {isHomePage && (
          <SectionTitle
            tagText="Projects"
            title="What I've Done"
            description="A selection of projects I've worked on or am currently developing."
          />
        )}
        
        {projectsToDisplay.length === 0 && !isHomePage ? (
          <motion.div variants={cardVariants} custom={0} initial="hidden" animate={inView ? "visible" : {}}>
            <Card className="glass-card text-center p-8">
              <Construction className="mx-auto h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl font-semibold text-primary mb-2">Projects In Progress</CardTitle>
              <CardContent>
                <p className="text-muted-foreground text-balance">
                  I am currently working on several exciting cybersecurity projects. 
                  Detailed information will be available here soon. Stay tuned!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {projectsToDisplay.map((project, index) => (
              <motion.div
                key={project.slug}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : {}}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="glass-card flex flex-col overflow-hidden group h-full">
                  {project.image && (
                    <div className="relative w-full h-48 md:h-56 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        data-ai-hint={project.imageHint}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{objectFit: "cover"}}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl font-semibold text-primary group-hover:text-primary/90">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-3 text-balance line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 my-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto pt-4 flex w-full flex-wrap items-center justify-start gap-3">
                      {project.githubLink && (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" /> GitHub
                            </Link>
                          </Button>
                      )}
                      {project.demoLink && (
                        <Button variant="default" size="sm" asChild>
                          <Link href={project.demoLink} target={project.demoLink.startsWith('/') ? '_self' : '_blank'} rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Demo
                          </Link>
                        </Button>
                      )}
                       <Button variant="outline" size="sm" asChild>
                          <Link href={`/projects/${project.slug}`}>
                            Read More <BookOpen className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {isHomePage && allProjects.length > 2 && (
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
