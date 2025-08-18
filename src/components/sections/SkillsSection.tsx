
"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import LogoLoop from '../ui/LogoLoop';
import SkillCard from '../ui/SkillCard';
import type { SkillCardProps } from '../ui/SkillCard';
import { 
  SiLinux, SiKalilinux, SiGnubash, SiPython, SiCplusplus, 
  SiWireshark, SiBurpsuite, SiMetasploit,
  SiReact, SiNextdotjs, SiTailwindcss, SiVercel, SiGithub, SiGit
} from 'react-icons/si';

const expertSkills: SkillCardProps[] = [
  { icon: SiLinux, name: "Linux", category: "Operating System", proficiency: "Expert" },
  { icon: SiKalilinux, name: "Kali Linux", category: "Security OS", proficiency: "Expert" },
  { icon: SiGnubash, name: "Bash", category: "Scripting", proficiency: "Expert" },
  { icon: SiGithub, name: "GitHub", category: "Version Control", proficiency: "Expert" },
  { icon: SiGit, name: "Git", category: "Version Control", proficiency: "Expert" },
];

const intermediateSkills: SkillCardProps[] = [
  { icon: SiPython, name: "Python", category: "Programming", proficiency: "Intermediate" },
  { icon: SiCplusplus, name: "C++", category: "Programming", proficiency: "Intermediate" },
  { icon: SiNextdotjs, name: "Next.js", category: "Web Framework", proficiency: "Intermediate" },
  { icon: SiVercel, name: "Vercel", category: "Deployment", proficiency: "Intermediate" },
  { icon: SiWireshark, name: "Wireshark", category: "Packet Analysis", proficiency: "Intermediate" },
];

const beginnerSkills: SkillCardProps[] = [
  { icon: SiReact, name: "React", category: "UI Library", proficiency: "Beginner" },
  { icon: SiTailwindcss, name: "Tailwind CSS", category: "CSS Framework", proficiency: "Beginner" },
  { icon: SiBurpsuite, name: "Burp Suite", category: "Web Security", proficiency: "Beginner" },
  { icon: SiMetasploit, name: "Metasploit", category: "Exploitation", proficiency: "Beginner" },
];


const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const SkillCategory = ({ title, skills, speed = 40, direction = "left" }: { title: string, skills: SkillCardProps[], speed?: number, direction?: "left" | "right" }) => {
    const skillNodes = skills.map((skill, index) => ({
        node: <SkillCard key={`${skill.name}-${index}`} {...skill} />
    }));
  
    return (
        <div className="py-6">
            <h3 className="text-xl font-bold text-center text-primary mb-4 font-pixel">{title}</h3>
            <LogoLoop
                logos={skillNodes}
                speed={speed}
                direction={direction}
                gap={40}
                pauseOnHover
            />
        </div>
    );
};


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
          <SkillCategory title="Expert" skills={expertSkills} speed={30} direction="left" />
          <SkillCategory title="Intermediate" skills={intermediateSkills} speed={40} direction="right" />
          <SkillCategory title="Beginner" skills={beginnerSkills} speed={30} direction="left" />
        </div>
      </div>
    </motion.section>
  );
}
