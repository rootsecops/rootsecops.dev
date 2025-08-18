"use client";
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal, ShieldCheck, ShieldHalf, Network } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';

const skillCategories = [
  {
    name: 'Foundational',
    icon: Terminal,
    color: 'text-primary',
    skills: [
      { name: 'Linux', level: 60 },
      { name: 'Python (Basic)', level: 40 },
      { name: 'Networking Fundamentals', level: 50 },
    ],
  },
  {
    name: 'Defensive & Analytical',
    icon: ShieldCheck,
    color: 'text-primary',
    skills: [
      { name: 'Phishing Threat Analysis', level: 40 },
      { name: 'OSINT Techniques', level: 40 },
    ],
  },
    {
    name: 'Offensive Tools',
    icon: ShieldHalf,
    color: 'text-primary',
    skills: [
      { name: 'Wifite', level: 70 },
      { name: 'Fluxion', level: 70 },
    ],
  },
  {
    name: 'Network & Web Tools',
    icon: Network,
    color: 'text-primary',
    skills: [
      { name: 'Burp Suite', level: 30 },
      { name: 'Wireshark', level: 30 },
    ],
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
            title="Technical Proficiency"
            description="A showcase of my technical abilities and tool proficiencies in cybersecurity."
        />
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          variants={sectionVariants}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className={`flex items-center text-lg md:text-xl font-semibold ${category.color}`}>
                    <category.icon className="mr-3 h-5 w-5" />
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className={`text-sm font-medium ${category.color}`}>{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2 [&>div]:bg-primary" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
