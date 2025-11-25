
"use client";
import { useState, useEffect, useCallback } from 'react';
// Button component will use retro styling
import { Button } from '@/components/ui/button'; 
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.pageYOffset > 300);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [toggleVisibility]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Keep smooth scroll for this utility
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          // Use retro-button style or default variant which should pick up retro styles
          className="retro-button fixed right-4 bottom-4 md:bottom-6 md:right-6 z-50 !p-2 !rounded-sm" // Use !rounded-sm to ensure it overrides Shadcn default
          aria-label="Scroll to top"
          size="icon" // Keep size for square shape
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  );
}
