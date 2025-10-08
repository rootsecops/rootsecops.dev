
"use client";
import { Linkedin } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      id="about"
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="py-4 md:py-8"
    >
      <div className="container mx-auto px-4">
        <div className="mb-4 md:mb-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-3">
            About Me
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 font-pixel">
            $ whoami
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            A little bit about my journey and passions.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto text-left">
          <motion.div variants={sectionVariants}>
            <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed text-balance">
              Hello! I'm Sonajit, a Bachelor student in Computer Science with a deep passion for cybersecurity. I am eager to explore this dynamic field, focusing on developing expertise in digital forensics and ethical hacking.
            </p>
            <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed text-balance">
              As an aspiring cybersecurity professional, I have hands-on experience with Linux environments (Kali, Ubuntu), networking basics, and programming languages like C/C++ and Python. I'm driven to apply and improve my skills through real-world challenges and am actively working towards industry certifications.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block mt-2">
              <Link href="https://www.linkedin.com/in/sonajitrabha/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
                <Linkedin className="mr-2 h-5 w-5" /> Connect on LinkedIn
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
