
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Book, Code, ExternalLink, GraduationCap } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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
        <div className="text-center">
            <Button asChild>
                <Link href="/academics">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Explore Academics
                </Link>
            </Button>
        </div>
      </div>
    </motion.section>
  );
}
