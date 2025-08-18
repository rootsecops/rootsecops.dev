
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
];

const intermediateLogos = [
  { node: <SiPython />, title: "Python", href: "https://www.python.org/" },
  { node: <SiCplusplus />, title: "C++", href: "https://isocpp.org/" },
  { node: <SiWireshark />, title: "Wireshark", href: "https://www.wireshark.org/" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com/" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
];

const beginnerLogos = [
  { node: <SiBurpsuite />, title: "Burp Suite", href: "https://portswigger.net/burp" },
  { node: <SiMetasploit />, title: "Metasploit", href: "https://www.metasploit.com/" },
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
];


const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } },
};

const SkillCategory = ({ title, logos, speed, direction }: { title: string, logos: any[], speed: number, direction: 'left' | 'right' }) => (
    <div className="mb-8">
        <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4 text-center">{title}</h3>
        <div className="relative overflow-hidden py-4">
             <LogoLoop
                logos={logos}
                speed={speed}
                direction={direction}
                logoHeight={40}
                gap={48}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor="hsl(var(--background))"
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
            title="Technical Proficiency"
            description="A showcase of my technical abilities and tool proficiencies in cybersecurity."
        />
        
        <div className="max-w-4xl mx-auto">
            <SkillCategory title="Expert" logos={expertLogos} speed={60} direction="left" />
            <SkillCategory title="Intermediate" logos={intermediateLogos} speed={90} direction="right" />
            <SkillCategory title="Beginner" logos={beginnerLogos} speed={120} direction="left" />
        </div>
      </div>
    </motion.section>
  );
}
