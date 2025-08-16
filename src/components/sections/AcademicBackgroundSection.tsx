"use client";
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import SectionTitle from '../ui/SectionTitle';

const experienceData = [
  {
    company: 'ENCODERSPRO PRIVATE LIMITED',
    logoUrl: 'https://raw.githubusercontent.com/rootsecops/rootsecops/refs/heads/main/assets/en.png',
    logoHint: 'Encoderspro logo',
    role: 'Cyber Security Intern',
    type: 'Internship',
    duration: 'Jun 2025 - July 2025 · 1 mo',
    location: 'India · Remote',
    description: 'Gaining hands-on experience in cybersecurity concepts and practices as part of the ECSIP 2025 program.',
    skills: ['Cybersecurity', 'Cyberlaw', 'Network Security', 'Vulnerability Assessment'],
  },
];

const educationAndCertsData = [
    {
      institution: 'Pandit Deendayal Upadhyaya Adarsha Mahavidyalaya',
      logoUrl: 'https://raw.githubusercontent.com/rootsecops/rootsecops/refs/heads/main/assets/PDUAM_logo.png',
      logoHint: 'university logo',
      degree: "Bachelor's in Computer Science",
      duration: '2024 - 2028',
      status: 'Pursuing',
      description: 'Focusing on core computer science principles with a growing interest in cybersecurity applications.',
      skills: ['Data Structures', 'Algorithms', 'Cybersecurity Foundations']
    },
    {
      institution: 'Private Institution',
      logoUrl: 'https://raw.githubusercontent.com/rootsecops/rootsecops/refs/heads/main/assets/dca.png',
      logoHint: 'diploma logo',
      degree: 'Diploma in Computer Science application',
      duration: '2024 - 2025',
      status: 'Completed',
      description: 'Supplementary diploma program to enhance practical computer science skills.',
      skills: ['Practical Programming', 'System Administration']
    },
];

const tabContentVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: 10, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function AcademicBackgroundSection() {
  const [activeTab, setActiveTab] = React.useState('experience');

  return (
    <section id="academic-background" className="py-4 md:py-8">
      <div className="container mx-auto px-4">
        <SectionTitle
          tagText="Background"
          title="Experience & Education"
          description="My professional journey and academic background."
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto mb-6">
            <TabsTrigger value="experience">
                <Briefcase className="mr-2 h-4 w-4" /> Experience
            </TabsTrigger>
            <TabsTrigger value="education">
                <GraduationCap className="mr-2 h-4 w-4" /> Education
            </TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {activeTab === 'experience' && (
                <TabsContent value="experience" forceMount className="mt-0">
                  <div className="space-y-4">
                    {experienceData.map((item, index) => (
                      <Card key={index} className="glass-card p-3 md:p-4">
                        <div className="flex gap-3 md:gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center border border-border p-1">
                              <Image
                                src={item.logoUrl}
                                alt={`${item.company} logo`}
                                data-ai-hint={item.logoHint}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-bold text-base md:text-lg text-foreground">{item.role}</h3>
                            <p className="text-sm text-muted-foreground">{item.company} · {item.type}</p>
                            <p className="text-xs text-muted-foreground/80 mt-1">{item.duration} · {item.location}</p>
                            <p className="mt-2 text-sm text-foreground/90 leading-relaxed">{item.description}</p>
                            {item.skills && item.skills.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {item.skills.map(skill => (
                                      <span key={skill} className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                                      {skill}
                                      </span>
                                  ))}
                                </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              )}

              {activeTab === 'education' && (
                <TabsContent value="education" forceMount className="mt-0">
                   <div className="space-y-4">
                    {educationAndCertsData.map((item, index) => (
                      <Card key={index} className="glass-card p-3 md:p-4">
                         <div className="flex gap-3 md:gap-4">
                           <div className="flex-shrink-0 mt-1">
                              <div className="w-12 h-12 rounded-md bg-background flex items-center justify-center border border-border p-1">
                                  <Image
                                      src={item.logoUrl}
                                      alt={`${item.institution} logo`}
                                      data-ai-hint={item.logoHint}
                                      width={40}
                                      height={40}
                                      className="object-contain rounded-sm"
                                  />
                              </div>
                           </div>
                           <div className="flex-grow">
                                <h3 className="font-bold text-base md:text-lg text-foreground">{item.degree}</h3>
                                <p className="text-sm text-muted-foreground">{item.institution}</p>
                                <p className="text-xs text-muted-foreground/80 mt-1">{item.duration} · <span className="font-medium text-foreground/90">{item.status}</span></p>
                                <p className="mt-2 text-sm text-foreground/90 leading-relaxed">{item.description}</p>
                                {item.skills && item.skills.length > 0 && (
                                  <div className="mt-3 flex flex-wrap gap-2">
                                  {item.skills.map(skill => (
                                      <span key={skill} className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                                      {skill}
                                      </span>
                                  ))}
                                  </div>
                                )}
                           </div>
                         </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              )}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  );
}
