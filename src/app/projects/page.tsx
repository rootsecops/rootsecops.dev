
"use client";

import ProjectsSection from '@/components/sections/ProjectsSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
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
            tagText="Showcase"
            title="All Projects"
            description="Here is a comprehensive list of my work."
        />
        <ProjectsSection isHomePage={false} />
      </div>
  )
}
