
"use client";
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from '../ui/ScrollToTopButton';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    // For any page that is NOT the homepage, scroll to the top on navigation.
    // The homepage's scroll position will be preserved by the browser's default behavior.
    if (!isHomePage) {
      window.scrollTo(0, 0);
    }
  }, [pathname, isHomePage]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar isVisible={isHomePage} />
      <main className={`flex-grow container mx-auto px-4 pb-8 z-10 ${isHomePage ? 'pt-16' : 'pt-28'}`}>
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
