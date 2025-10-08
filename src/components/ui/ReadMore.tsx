"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ReadMoreProps {
  text: string;
  className?: string;
}

export function ReadMore({ text, className }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const checkOverflow = useCallback(() => {
    const element = textRef.current;
    if (element) {
      // Compare the scroll height (full content height) to the offset height (visible height)
      const hasOverflow = element.scrollHeight > element.offsetHeight;
      setIsOverflowing(hasOverflow);
    }
  }, []);

  useEffect(() => {
    // A slight delay ensures the DOM is fully painted before we check the height.
    const timeoutId = setTimeout(() => {
        checkOverflow();
    }, 10);
    
    window.addEventListener('resize', checkOverflow);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [checkOverflow, text]); // Re-run when text changes

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={className}>
      <p
        ref={textRef}
        className={cn(
          "transition-all duration-300",
          !isExpanded && "line-clamp-2"
        )}
      >
        {text}
      </p>
      {isOverflowing && (
         <Button
            variant="link"
            className="text-primary hover:text-primary/80 px-0 h-auto py-1 mt-1 text-sm"
            onClick={toggleExpansion}
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </Button>
      )}
    </div>
  );
}
