
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';
import ScrollDownIndicator from '../ui/ScrollDownIndicator';
import DecryptedText from '../ui/DecryptedText';
import { motion, useInView } from 'framer-motion';
import RotatingText from '../ui/RotatingText';
import '../ui/RotatingText.css';
import { useEffect, useRef, useState } from 'react';


const rotatingWords = ["a H4cKer", "Sonajit", "aka RootSecOps"];

export default function HeroSection() {
  const [startRotation, setStartRotation] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      // Start the rotation after a short delay to ensure all animations are settled
      const timer = setTimeout(() => {
        setStartRotation(true);
      }, 500); // Delay can be adjusted
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4"
    >
      <div className="retro-window w-full max-w-4xl">
        <div className="retro-window-header">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className="flex-1 text-center font-pixel text-sm">~/sonajit/portfolio</p>
          <div className="w-12"></div>
        </div>
        <div className="retro-window-body flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
                <div className="relative w-36 h-36 md:w-48 md:h-48 border-2 border-foreground bg-foreground p-1">
                    <Image
                        src="https://raw.githubusercontent.com/rootsecops/rootsecops/main/assets/img/heroimg/pfp.jpg"
                        alt="Sonajit Rabha profile picture"
                        data-ai-hint="profile picture"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                        priority
                    />
                </div>
            </div>
            <div className="text-center md:text-left">
                <h1 className="font-pixel text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
                    Hi I'm{' '}
                    <RotatingText
                        texts={rotatingWords}
                        mainClassName="text-primary font-jakarta text-2xl sm:text-3xl"
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        auto={startRotation}
                    />
                </h1>
                
                <div className="text-primary font-special text-lg md:text-xl mb-6">
                    <DecryptedText 
                        text="Cybersecurity Researcher | Ex-Cybersecurity Intern @EncodersPro"
                        speed={25}
                        animateOn="view"
                        sequential
                    />
                    <br />
                    <DecryptedText 
                        text="VAPT | Bug Bounty Hunter"
                        speed={25}
                        animateOn="view"
                        sequential
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-6">
                    <Link href="/resume" className="retro-button w-full sm:w-auto">
                    Resume
                    </Link>
                    <Link href="#projects" className="retro-button w-full sm:w-auto">
                      View My Projects >>
                    </Link>
                </div>

                <div className="flex justify-center md:justify-start space-x-5">
                    <Link href="https://github.com/rootsecops" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-foreground hover:text-primary transition-colors">
                        <Github size={24} />
                    </Link>
                    <Link href="https://www.linkedin.com/in/sonajitrabha/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground hover:text-primary transition-colors">
                        <Linkedin size={24} />
                    </Link>
                </div>
            </div>
        </div>
      </div>
      <ScrollDownIndicator />
    </section>
  );
}
