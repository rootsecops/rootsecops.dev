
"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { Home, ChevronRight, Book, Code } from 'lucide-react';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, usePathname } from 'next/navigation';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const academicLinks = [
    {
      icon: Book,
      title: "Class Notes",
      description: "A collection of my semester notes and study materials from my university coursework.",
      link: "/notes/classnotes",
    },
    {
      icon: Code,
      title: "Programs",
      description: "A repository of my coding assignments and programs, including Data Structures, OOPs, and more.",
      link: "/notes/programs",
    },
];

export default function AcademicsLandingPage() {
    const pathname = usePathname();
    const isRootNotes = pathname === '/notes';

    if (!isRootNotes) {
        return null; 
    }

  return (
    <div className="-mt-28">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center text-sm text-muted-foreground flex-shrink-0 min-w-0">
            <Link href="/" className="hover:text-primary transition-colors flex items-center">
                <Home className="h-4 w-4 mr-1.5"/> 
                <span className="hidden sm:inline">Home</span>
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-medium text-foreground truncate">Academics</span>
        </div>

        <SectionTitle
          title="Academics"
          description="A gateway to my college coursework, assignments, and notes."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {academicLinks.map((item, index) => (
             <motion.div
                key={item.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
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
                            <Link href={item.link}>
                                Browse {item.title}
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
             </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
