"use client";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';


const tools = [
  {
    name: 'OpenVAS',
    category: 'Vulnerability Scanner',
    level: 'Intermediate',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 12c0-5.25-4.25-9.5-9.5-9.5S2.5 6.75 2.5 12s4.25 9.5 9.5 9.5"/>
        <path d="M6 12h13"/><path d="M12 5.5v13"/>
        <path d="M12 12c-5 0-9 2-9 4.5s4 4.5 9 4.5 9-2 9-4.5-4-4.5-9-4.5z"/>
      </svg>
    ),
  },
  {
    name: 'Cobalt Strike',
    category: 'Red Team',
    level: 'Learning',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
        <path d="m14.5 9.5-5 5"/><path d="M14.5 14.5h-5v-5"/>
      </svg>
    ),
  },
  {
    name: 'BloodHound',
    category: 'AD Enumeration',
    level: 'Intermediate',
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
        <path d="M14.5 7.5a2.5 2.5 0 0 1 5 0V11a2 2 0 0 1-2 2h-1.5a2.5 2.5 0 0 1 0-5V7.5Z"/><path d="M5 11a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z"/>
        <path d="M9 11.5v-2a2.5 2.5 0 0 1 5 0v2"/>
        <path d="M18.5 13a2.5 2.5 0 0 1-5 0V9"/>
        <path d="M4 17.5v-2.5a2.5 2.5 0 0 1 5 0V17"/>
        <path d="M10.5 14.5a2.5 2.5 0 0 1-5 0V12"/>
      </svg>
    ),
  },
  {
    name: 'Mimikatz',
    category: 'Post-Exploitation',
    level: 'Intermediate',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/>
            <path d="m21.3 21.3-1.4-1.4"/><path d="m15 12-2-2"/><path d="m4 20 2-2"/>
            <path d="m16 7 3-3 1 1-3 3-1-1Z"/><path d="M8.5 10.5a1 1 0 0 0-1.4 0l-4.4 4.4a1 1 0 0 0 0 1.4l2.1 2.1a1 1 0 0 0 1.4 0l4.4-4.4a1 1 0 0 0 0-1.4Z"/>
        </svg>
    ),
  },
  {
    name: 'Responder',
    category: 'Network Poisoning',
    level: 'Advanced',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h5l6 4V3L9 7z"/><path d="M15 8a5 5 0 0 1 0 8"/>
      </svg>
    ),
  },
];

const levelColorClasses = {
  Advanced: 'tool-badge-advanced',
  Intermediate: 'tool-badge-intermediate',
  Learning: 'tool-badge-learning',
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
                <motion.div key={tool.name} custom={index} variants={cardVariants}>
                     <Card className="tool-card h-full">
                         <CardContent className="flex flex-col justify-between h-full p-4">
                            <div>
                                <div className="tool-icon mb-3 h-8 w-8">
                                    {tool.icon}
                                </div>
                                <h3 className="font-bold text-foreground truncate">{tool.name}</h3>
                                <p className="text-xs text-muted-foreground uppercase font-pixel tracking-wider">{tool.category}</p>
                            </div>
                            <div className={cn("tool-badge", levelColorClasses[tool.level as keyof typeof levelColorClasses])}>
                                {tool.level}
                            </div>
                        </CardContent>
                     </Card>
                </motion.div>
            ))}
        </div>
      </div>
    </motion.section>
  );
}
