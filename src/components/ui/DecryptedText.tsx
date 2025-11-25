"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  ...props
}: {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view';
  [key: string]: any;
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set<number>());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const currentIterationRef = useRef(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    const getNextIndex = (revealedSet: Set<number>) => {
      const textLength = text.length;
      switch (revealDirection) {
        case 'start':
          return revealedSet.size;
        case 'end':
          return textLength - 1 - revealedSet.size;
        case 'center': {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex =
            revealedSet.size % 2 === 0
              ? middle + offset
              : middle - offset - 1;

          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex;
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return -1; // Should not happen if revealedSet.size < textLength
        }
        default:
          return revealedSet.size;
      }
    };

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
      : characters.split('');

    const shuffleText = (originalText: string, currentRevealed: Set<number>) => {
      if (useOriginalCharsOnly) {
        const positions = originalText.split('').map((char, i) => ({
          char,
          isSpace: char === ' ',
          index: i,
          isRevealed: currentRevealed.has(i),
        }));

        const nonSpaceChars = positions
          .filter((p) => !p.isSpace && !p.isRevealed)
          .map((p) => p.char);

        for (let i = nonSpaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
        }

        let charIndex = 0;
        return positions
          .map((p) => {
            if (p.isSpace) return ' ';
            if (p.isRevealed) return originalText[p.index];
            if (charIndex < nonSpaceChars.length) return nonSpaceChars[charIndex++];
            return ''; // Should not happen if logic is correct
          })
          .join('');
      } else {
        return originalText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (currentRevealed.has(i)) return originalText[i];
            return availableChars[Math.floor(Math.random() * availableChars.length)];
          })
          .join('');
      }
    };
    
    const shouldStartMainAnimation = (animateOn === 'hover' && isHovering && isScrambling) || 
                                     (animateOn === 'view' && hasAnimated && isScrambling);

    if (shouldStartMainAnimation) { 
      interval = setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          const newRevealed = new Set(prevRevealed);
          if (sequential) {
            if (newRevealed.size < text.length) {
              const nextIndex = getNextIndex(newRevealed);
              if (nextIndex !== -1 && nextIndex < text.length && nextIndex >=0 && !newRevealed.has(nextIndex)) { 
                 newRevealed.add(nextIndex);
              } else { 
                  // Fallback if getNextIndex logic is stuck or done
                  let found = false;
                  for(let i=0; i < text.length; i++) {
                      if(!newRevealed.has(i)) {
                          newRevealed.add(i);
                          found = true;
                          break;
                      }
                  }
                  if (!found && newRevealed.size < text.length) { // Should not happen
                     clearInterval(interval);
                     setIsScrambling(false);
                     setDisplayText(text);
                     return newRevealed; // or prevRevealed
                  }
              }
              setDisplayText(shuffleText(text, newRevealed));
              if (newRevealed.size >= text.length) {
                  clearInterval(interval);
                  setIsScrambling(false);
                  setDisplayText(text); 
              }
            } else { // Already fully revealed
              clearInterval(interval);
              setIsScrambling(false);
              setDisplayText(text);
            }
          } else { // Non-sequential
            setDisplayText(shuffleText(text, newRevealed)); 
            currentIterationRef.current++;
            if (currentIterationRef.current >= maxIterations) {
              clearInterval(interval);
              setIsScrambling(false);
              setDisplayText(text);
            }
          }
          return newRevealed; 
        });
      }, speed);
    } else if (animateOn === 'hover' && !isHovering && isScrambling) { 
      // Reset for hover-out if it was scrambling
      clearInterval(interval);
      setIsScrambling(false);
      setDisplayText(text);
      setRevealedIndices(new Set());
      currentIterationRef.current = 0;
    }


    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isHovering,
    isScrambling, 
    hasAnimated,  
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    useOriginalCharsOnly,
    animateOn
  ]);

  // Effect for IntersectionObserver (animateOn="view")
  useEffect(() => {
    if (animateOn !== 'view') return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) { // Only trigger if not animated yet
          setIsHovering(true); // Retain for consistency with original snippet's logic flow
          setHasAnimated(true); 
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, 
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [animateOn, hasAnimated]);


  // Effect for starting/resetting animations based on triggers
  useEffect(() => {
    if (animateOn === 'view' && isHovering && hasAnimated && !isScrambling) {
      // For "view" mode, only start scrambling if the text hasn't been fully revealed yet.
      // revealedIndices.size check prevents re-triggering after completion.
      if (revealedIndices.size < text.length) {
        setIsScrambling(true);
        setRevealedIndices(new Set()); // Reset for the new scramble session
        currentIterationRef.current = 0;
      }
    } else if (animateOn === 'hover' && isHovering && !isScrambling) {
      setIsScrambling(true);
      setRevealedIndices(new Set()); 
      currentIterationRef.current = 0;
    }
  }, [isHovering, hasAnimated, animateOn, isScrambling, text, revealedIndices]);


  const hoverProps =
    animateOn === 'hover'
      ? {
          onMouseEnter: () => {
            if (!isScrambling) { 
              setIsHovering(true);
            }
          },
          onMouseLeave: () => setIsHovering(false),
        }
      : {};

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...hoverProps}
      {...props}
    >
      <span className="sr-only">{text}</span> {/* Changed from displayText to text */}

      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          // For view mode, after scrambling is done, !isScrambling is true.
          // For hover mode, if not hovering, !isHovering is true.
          const showEncrypted = isScrambling && 
                                (sequential ? !revealedIndices.has(index) : true) &&
                                (animateOn === 'hover' ? isHovering : true);
          
          return (
            <span
              key={index}
              className={showEncrypted ? encryptedClassName : className}
            >
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
