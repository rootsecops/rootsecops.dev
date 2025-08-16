
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';
import ScrollDownIndicator from '../ui/ScrollDownIndicator';

export default function HeroSection() {

  return (
    <section
      id="home"
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
                        src="https://raw.githubusercontent.com/rootsecops/rootsecops/refs/heads/main/assets/Nongstoin_crop-pfp.jpg"
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
                <h1 className="font-pixel text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                    Hi. I'm Sonajit.
                </h1>
                
                <div className="relative w-full max-w-sm h-8 mb-6 mx-auto md:mx-0">
                    <Image
                        src="https://see.fontimg.com/api/rf5/4n7xD/NGI4NzA2ODhlNGZlNDJhMThkN2U0ZGNmZDhmZGFhZDYub3Rm/Q1MgdW5kZXJncmFkIHwgQ3liZXJzZWN1cml0eSBTdHVkZW50/ryga-regular.png?r=fs&h=60&w=1250&fg=00FFAA&bg=000000&tb=1&s=20"
                        alt="CS undergrad | Cybersecurity Student"
                        data-ai-hint="description text"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{objectFit: "contain"}}
                        className="object-center md:object-left"
                        priority
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-6">
                    <Link href="/cv_placeholder.pdf" target="_blank" download className="retro-button w-full sm:w-auto">
                    Resume
                    </Link>
                    <Link href="#projects" className="retro-button w-full sm:w-auto">
                      View My Projects &gt;&gt;
                    </Link>
                </div>

                <div className="flex justify-center md:justify-start space-x-5">
                    <Link href="https://github.com/rootsecops" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-foreground hover:text-primary transition-colors">
                        <Github size={24} />
                    </Link>
                    <Link href="https://www.linkedin.com/in/sonajit-rabha" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground hover:text-primary transition-colors">
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
