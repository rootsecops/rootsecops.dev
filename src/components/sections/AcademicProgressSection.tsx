
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Code, ExternalLink, NotebookPen } from 'lucide-react';

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

const academicLinks = [
    {
      icon: Code,
      title: "My Programs",
      description: "A repository of my coding assignments and programs, including Data Structures, OOPs, and more.",
      link: "/programs",
      linkLabel: "Browse Programs",
      isExternal: false,
    },
    {
      icon: NotebookPen,
      title: "Class Notes",
      description: "A collection of my semester notes and study materials from my university coursework.",
      link: "/notes",
      linkLabel: "Browse Notes",
      isExternal: false,
    },
  ];

export default function AcademicProgressSection() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      id="academic-progress"
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : {}}
      className="py-4 md:py-8"
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          tagText="Learning Journey"
          title="Academic Progress"
          description="A gateway to my college coursework, assignments, and notes."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {academicLinks.map((item, index) => (
             <motion.div
                key={item.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : {}}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
             >
                <Card className="flex flex-col h-full text-center">
                    <CardHeader className="items-center">
                         <div className="flex-shrink-0 bg-primary/10 p-4 rounded-full mb-2">
                             <item.icon className="h-8 w-8 text-primary" />
                         </div>
                        <CardTitle className="text-xl font-semibold text-primary">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription className="text-balance">{item.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button asChild>
                            <Link href={item.link} target={item.isExternal ? "_blank" : "_self"} rel={item.isExternal ? "noopener noreferrer" : ""}>
                                {item.linkLabel}
                                {item.isExternal && <ExternalLink className="ml-2 h-4 w-4" />}
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
             </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
