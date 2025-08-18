"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import LogoLoop from '../ui/LogoLoop';
import SkillCard from '../ui/SkillCard';
import type { SkillCardProps } from '../ui/SkillCard';
import { 
  SiLinux, SiPython, SiCplusplus, 
  SiWireshark, SiGnubash, SiBurpsuite, SiMetasploit
} from 'react-icons/si';
import { FaBrain } from 'react-icons/fa';

const allSkills: SkillCardProps[] = [
  // Intermediate
  { icon: SiLinux, name: "Linux", category: "Operating System", proficiency: "Intermediate" },
  { icon: SiPython, name: "Python", category: "Programming", proficiency: "Intermediate" },
  { icon: SiCplusplus, name: "C++", category: "Programming", proficiency: "Intermediate" },
  { icon: SiWireshark, name: "Wireshark", category: "Network Analysis", proficiency: "Intermediate" },
  { icon: FaBrain, name: "Networking Concepts", category: "Knowledge", proficiency: "Intermediate" },
  // Beginner
  { icon: SiGnubash, name: "Bash", category: "Scripting", proficiency: "Beginner" },
  { icon: SiBurpsuite, name: "Burp Suite", category: "Web Security", proficiency: "Beginner" },
  { icon: SiMetasploit, name: "Metasploit", category: "Exploitation", proficiency: "Beginner" },
];


const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SkillsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const skillNodes = allSkills.map((skill, index) => ({
      node: <SkillCard key={`${skill.name}-${index}`} {...skill} />
  }));

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
          title="Technical Toolkit & Knowledge Base"
          description="An overview of the tools, technologies, and concepts that form my cybersecurity skillset."
        />
        
        <div className="py-6">
           <LogoLoop
                logos={skillNodes}
                speed={40}
                direction="left"
                gap={40}
                pauseOnHover
            />
        </div>
      </div>
    </motion.section>
  );
}
