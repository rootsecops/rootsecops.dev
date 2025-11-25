"use client";

import { useState } from 'react';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from '@/components/ui/SearchInput';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="-mt-28">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-between items-center gap-4">
            <div className="flex items-center text-sm text-muted-foreground flex-shrink-0 min-w-0">
                <Link href="/" className="hover:text-primary transition-colors flex items-center">
                    <Home className="h-4 w-4 mr-1.5"/>
                    <span className="hidden sm:inline">Home</span>
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="font-medium text-foreground truncate">Projects</span>
            </div>
             <SearchInput 
                onSearchChange={setSearchTerm}
                placeholder="Search projects..."
                className="flex-grow"
             />
        </div>
        <SectionTitle
            title="All Projects"
            description="Hands-on projects in Security tools & automation, Red team operations, threat simulations"
        />
        <ProjectsSection isHomePage={false} searchTerm={searchTerm} />
      </div>
    </div>
  )
}
