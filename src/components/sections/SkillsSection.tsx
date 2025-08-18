"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import LogoLoop from '../ui/LogoLoop';
import { 
  SiLinux, SiKalilinux, SiGnubash, SiPython, SiCplusplus, 
  SiWireshark, SiBurpsuite, SiMetasploit,
  SiReact, SiNextdotjs, SiTailwindcss, SiVercel, SiGithub, SiGit
} from 'react-icons/si';

const expertLogos = [
  { node: <SiLinux />, title: "Linux", href: "https://www.linux.org/" },
  { node: <SiKalilinux />, title: "Kali Linux", href: "https://www.kali.org/" },
  { node: <SiGnubash />, title: "Bash", href: "https://www.gnu.org/software/bash/" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com/" },
];

const intermediateLogos = [
  { node: <SiPython />, title: "Python", href: "https://www.python.org/" },
  { node: <SiCplusplus />, title: "C++", href: "https://isocpp.org/" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiWireshark />, title: "Wireshark", href: "https://www.wireshark.org/" },
];

const beginnerLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiBurpsuite />, title: "Burp Suite", href: "https://portswigger.net/burp" },
  { node: <SiMetasploit />, title: "Metasploit", href: "https://www.metasploit.com/" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const SkillCategory = ({ title, logos }: { title: string, logos: any[] }) => (
  <div className="py-6">
    <h3 className="text-xl font-bold text-center text-primary mb-4 font-pixel">{title}</h3>
    <div className="relative overflow-hidden" style={{ height: 'auto' }}>
      <LogoLoop
        logos={logos}
        speed={60}
        direction="left"
        logoHeight={40}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="hsl(var(--background))"
        ariaLabel={`${title} Skills`}
      />
    </div>
  </div>
);

export default function SkillsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      id="skills"
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="py-4 md:py-8"
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          tagText="Skills"
          title="Tools Arsenal"
          description="A selection of the tools I use for security assessments and operations."
        />
        
        <div className="space-y-4">
          <SkillCategory title="Expert" logos={expertLogos} />
          <SkillCategory title="Intermediate" logos={intermediateLogos} />
          <SkillCategory title="Beginner" logos={beginnerLogos} />
        </div>
      </div>
    </motion.section>
  );
}
