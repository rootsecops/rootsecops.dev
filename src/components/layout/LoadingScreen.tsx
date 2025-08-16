
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const [showBrand, setShowBrand] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Disable scrolling when the loading screen is active
    document.documentElement.style.overflow = 'hidden';
    
    // 1. Show brand name after a short delay
    const showTimeout = setTimeout(() => setShowBrand(true), 100);
    
    // 2. Start curtain reveal after brand animation (2s) completes
    const revealTimeout = setTimeout(() => setIsRevealing(true), 2500); 
    
    // 3. Unmount component after curtain animation (1s) and re-enable scrolling
    const unmountTimeout = setTimeout(() => {
      setIsHidden(true);
      document.documentElement.style.overflow = '';
    }, 3500);

    return () => {
      // Ensure scrolling is re-enabled if the component unmounts for any reason
      document.documentElement.style.overflow = '';
      clearTimeout(showTimeout);
      clearTimeout(revealTimeout);
      clearTimeout(unmountTimeout);
    };
  }, []);
  
  if (isHidden) {
      return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-black"
      initial={{ y: '0%' }}
      animate={isRevealing ? { y: '-100%' } : { y: '0%' }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {showBrand && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary animate-noise-reveal opacity-0">
              RootSecOps
          </h1>
        </div>
      )}
    </motion.div>
  );
};

export default LoadingScreen;
