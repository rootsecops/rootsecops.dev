"use client";
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

// Lazy load sections
const HeroSection = React.lazy(() => import('@/components/sections/HeroSection'));
const AboutSection = React.lazy(() => import('@/components/sections/AboutSection'));
const SkillsSection = React.lazy(() => import('@/components/sections/SkillsSection'));
const ProjectsSection = React.lazy(() => import('@/components/sections/ProjectsSection'));
const BlogSection = React.lazy(() => import('@/components/sections/BlogSection'));
const AcademicBackgroundSection = React.lazy(() => import('@/components/sections/AcademicBackgroundSection'));
const ContactSection = React.lazy(() => import('@/components/sections/ContactSection'));

const SectionSkeleton = () => (
  <div className="container mx-auto px-4 py-12">
    <Skeleton className="h-12 w-1/2 mx-auto mb-6" />
    <Skeleton className="h-8 w-3/4 mx-auto mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Skeleton className="h-64 rounded-lg" />
      <Skeleton className="h-64 rounded-lg" />
    </div>
  </div>
);

const Section = ({ children, isLast = false }: { children: React.ReactNode, isLast?: boolean }) => (
  <>
    {children}
    {!isLast && <Separator className="my-6 md:my-8" />}
  </>
);


export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Section>
        <Suspense fallback={<SectionSkeleton />}>
          <HeroSection />
        </Suspense>
      </Section>
      <Section>
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>
      </Section>
      <Section>
        <Suspense fallback={<SectionSkeleton />}>
          <SkillsSection />
        </Suspense>
      </Section>
      <Section>
        <Suspense fallback={<SectionSkeleton />}>
          <ProjectsSection isHomePage />
        </Suspense>
      </Section>
      <Section>
        <Suspense fallback={<SectionSkeleton />}>
          <AcademicBackgroundSection />
        </Suspense>
      </Section>
       <Section>
        <Suspense fallback={<SectionSkeleton />}>
          <BlogSection isHomePage />
        </Suspense>
      </Section>
      <Section isLast>
        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection />
        </Suspense>
      </Section>
    </div>
  );
}
