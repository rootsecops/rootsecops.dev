
"use client";
import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background border-t-2 border-foreground py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-foreground text-sm text-center sm:text-left">
          &copy; {new Date().getFullYear()} Sonajit Rabha. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <Link href="https://github.com/rootsecops" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-foreground hover:text-primary transition-colors">
            <Github size={20} />
          </Link>
          <Link href="https://www.linkedin.com/in/sonajit-rabha" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground hover:text-primary transition-colors">
            <Linkedin size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
