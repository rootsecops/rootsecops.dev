
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import BlogSection from '@/components/sections/BlogSection';
import AcademicBackgroundSection from '@/components/sections/AcademicBackgroundSection';
import AcademicProgressSection from '@/components/sections/AcademicProgressSection';
import ContactSection from '@/components/sections/ContactSection';
import { Separator } from '@/components/ui/separator';

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
        <HeroSection />
      </Section>
      <Section>
        <AboutSection />
      </Section>
      <Section>
        <SkillsSection />
      </Section>
      <Section>
        <ProjectsSection isHomePage />
      </Section>
      <Section>
        <AcademicBackgroundSection />
      </Section>
       <Section>
        <BlogSection isHomePage />
      </Section>
      <Section>
        <AcademicProgressSection />
      </Section>
      <Section isLast>
        <ContactSection />
      </Section>
    </div>
  );
}
