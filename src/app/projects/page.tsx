
"use client";

import { useState } from 'react';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { SearchDialog } from '@/components/ui/SearchDialog';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="-mt-28">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-between items-center gap-4">
            <div className="flex items-center text-sm text-muted-foreground flex-shrink-0">
                <Link href="/" className="hover:text-primary transition-colors flex items-center">
                    <Home className="h-4 w-4 mr-1.5"/> Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="font-medium text-foreground">Projects</span>
            </div>
             <SearchDialog 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm}
                placeholder="Search projects..."
                hasResults={true} // Let the section handle this
             >
                <ProjectsSection isHomePage={false} searchTerm={searchTerm} />
             </SearchDialog>
        </div>
        <SectionTitle
            title="All Projects"
            description="Here is a comprehensive list of my work."
        />
        <ProjectsSection isHomePage={false} searchTerm={searchTerm} />
      </div>
    </div>
  )
}
