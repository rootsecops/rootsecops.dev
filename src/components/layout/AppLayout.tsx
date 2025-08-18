
"use client";
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from '../ui/ScrollToTopButton';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className={cn("header-blur", { "header-blur-active": isScrolled })} />
      <Navbar isScrolled={isScrolled} />
      <main className="flex-grow container mx-auto px-4 pt-20 pb-8 z-10">
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
