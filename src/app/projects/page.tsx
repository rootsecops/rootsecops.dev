
"use client";

import ProjectsSection from '@/components/sections/ProjectsSection';
import SectionTitle from '@/components/ui/SectionTitle';

export default function ProjectsPage() {
  return (
      <div className="container mx-auto px-4 py-8">
        <SectionTitle
            tagText="Showcase"
            title="All Projects"
            description="Here is a comprehensive list of my work."
        />
        <ProjectsSection isHomePage={false} />
      </div>
  )
}
