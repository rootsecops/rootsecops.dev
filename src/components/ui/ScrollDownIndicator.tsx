
"use client";

import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollDownIndicator() {
  const [isVisible, setIsVisible] = useState(false);

  // Use a simple state to check if component is mounted to prevent hydration errors
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      // Hide the indicator if scrolled more than a small amount (e.g., 50px)
      setIsVisible(window.scrollY < 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run on mount to check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  const handleClick = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer"
          role="button"
          aria-label="Scroll to next section"
          onClick={handleClick}
        >
          <div className="animate-bounce text-primary w-10 h-10 flex items-center justify-center">
            <ChevronDown className="w-8 h-8" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
