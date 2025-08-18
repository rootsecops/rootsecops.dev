
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#about', label: 'About Me', id: 'about' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '/projects', label: 'Projects', id: 'projects' },
  { href: '#academic-background', label: 'Experience', id: 'academic-background' },
  { href: '/blogs', label: 'Blog', id: 'blogs' },
];

const homepageSectionIds = ['home', 'about', 'skills', 'projects', 'academic-background', 'blogs', 'contact'];

// --- Variants for animations ---
const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const mobileLinkVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const hamburgerLineProps = {
  stroke: "currentColor",
  vectorEffect: "non-scaling-stroke",
  transition: { duration: 0.3, ease: "easeInOut" },
  strokeWidth: 2,
  strokeLinecap: "round" as const,
};


export default function Navbar({ isScrolled }: { isScrolled: boolean }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  // Effect to handle active section highlighting and URL hash updating on scroll
  useEffect(() => {
    if (pathname !== '/') {
        setActiveSection(pathname); // Set active section for non-homepage paths
        // Clean up hash on other pages
        if (window.location.hash) {
            history.replaceState(null, '', pathname);
        }
        return;
    }

    let lastExecution = 0;
    const throttleDelay = 50; // Execute at most every 50ms for a smoother feel

    const handleScroll = () => {
        const now = Date.now();
        if (now - lastExecution < throttleDelay) {
            return;
        }
        lastExecution = now;

        const scrollPosition = window.scrollY;
        let currentId = 'home'; // Default to home

        for (const id of homepageSectionIds) {
            const element = document.getElementById(id);
            // Offset to trigger highlight slightly before section top hits viewport top
            if (element && element.offsetTop <= scrollPosition + 150) {
                currentId = id;
            }
        }
        
        // Override for contact section when at the very bottom
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
          currentId = 'contact';
        }
        
        // Update active section state for nav link styling
        setActiveSection(currentId);

        // Update URL hash if it has changed, without adding to history
        if (`#${currentId}` !== window.location.hash && currentId) {
            history.replaceState(null, '', `#${currentId}`);
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on load

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const isHomepage = pathname === '/';

  const getLinkHref = (linkHref: string) => {
    // If not on homepage, prepend a '/' to hash links to navigate back
    if (!isHomepage && linkHref.startsWith('#')) {
      return `/${linkHref}`;
    }
    return linkHref;
  };
  
  const getContactClass = (isMobile: boolean) => {
      const isActive = activeSection === 'contact';
      const activeClasses = "text-primary";
      const inactiveClasses = "text-foreground hover:text-primary";
      
      if (isMobile) {
        return cn("text-2xl font-semibold transition-colors duration-200", isActive ? activeClasses : inactiveClasses);
      }
      return "rounded-full";
  };
  
  const filteredNavLinks = navLinks;


  return (
    <>
      <header className="fixed top-2 left-0 right-0 z-50 px-4">
        <div className="max-w-5xl mx-auto">
          <nav className={cn(
              "relative flex items-center justify-between w-full rounded-full p-2 transition-all duration-300",
              isScrolled 
                ? "bg-background/80 border border-border/20 shadow-sm backdrop-blur-lg" 
                : "bg-transparent border-transparent"
            )}>
            <Link href="/" className="flex items-center pl-3">
               <Image
                    src="https://see.fontimg.com/api/rf5/4n7xD/NGI4NzA2ODhlNGZlNDJhMThkN2U0ZGNmZDhmZGFhZDYub3Rm/Um9vdFNlY09wcw/radeil-3d-demo-ruderight.png?r=fs&h=81&w=1250&fg=00FFAA&bg=000000&tb=1&s=65"
                    alt="RootSecOps Logo"
                    width={120}
                    height={24}
                    priority
                    style={{ width: 'auto', height: 'auto' }}
                />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 text-sm">
              {filteredNavLinks.map((link) => {
                  const isActive = activeSection === (link.id || link.href);
                  return (
                      <motion.div key={link.href} className="relative" whileHover={{ y: -2 }}>
                          <Link
                              href={getLinkHref(link.href)}
                              className={cn(
                                  "font-medium transition-colors duration-200 px-3 py-1 rounded-md block",
                                  isActive
                                      ? "text-primary"
                                      : "text-foreground hover:text-primary"
                              )}
                          >
                              {link.label}
                          </Link>
                          {isActive && (
                              <motion.div
                                  className="absolute bottom-0 left-2 right-2 h-px bg-primary dark:shadow-[0_0_8px_hsl(var(--primary))]"
                                  layoutId="active-nav-link"
                                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                              />
                          )}
                      </motion.div>
                  );
              })}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <motion.div whileHover={{ y: -2 }}>
                <Button 
                  size="sm"
                  variant={activeSection === 'contact' ? 'default' : 'outline'} 
                  className={getContactClass(false)} 
                  asChild
                >
                  <Link href={getLinkHref('#contact')}>Contact</Link>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Navigation Trigger */}
            <div className="md:hidden flex items-center">
              <motion.button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-50 h-10 w-10 text-foreground transition-colors hover:text-primary flex items-center justify-center"
                aria-label="Toggle Menu"
                initial="closed"
                animate={isMobileMenuOpen ? 'open' : 'closed'}
              >
                  <motion.svg width="24" height="24" viewBox="0 0 24 24" overflow="visible" preserveAspectRatio="none">
                      <motion.path {...hamburgerLineProps} variants={{ closed: { d: "M 2 4 L 22 4" }, open: { d: "M 4 20 L 20 4" } }} />
                      <motion.path d="M 2 12 L 22 12" {...hamburgerLineProps} variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} transition={{ duration: 0.1 }} />
                      <motion.path {...hamburgerLineProps} variants={{ closed: { d: "M 2 20 L 22 20" }, open: { d: "M 4 4 L 20 20" } }} />
                  </motion.svg>
              </motion.button>
            </div>
          </nav>
        </div>
      </header>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur-lg"
          >
            <motion.div className="flex h-full flex-col items-center justify-center gap-8 text-center">
              {filteredNavLinks.map((link) => {
                const isActive = activeSection === (link.id || link.href);
                return (
                  <motion.div key={link.href} variants={mobileLinkVariants}>
                    <Link
                      href={getLinkHref(link.href)}
                      className={cn(
                          "text-2xl font-semibold transition-colors duration-200",
                          isActive
                              ? "text-primary"
                              : "text-foreground hover:text-primary"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div variants={mobileLinkVariants}>
                  <Link
                      href={getLinkHref('#contact')}
                      className={getContactClass(true)}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                  </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
