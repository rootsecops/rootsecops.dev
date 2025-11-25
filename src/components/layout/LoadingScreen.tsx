
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Show animation on initial load
    setShowAnimation(true);
    document.documentElement.style.overflow = 'hidden';

    const showTimeout = setTimeout(() => setShowBrand(true), 100);
    const revealTimeout = setTimeout(() => setIsRevealing(true), 2500);
    const unmountTimeout = setTimeout(() => {
      setIsHidden(true);
      document.documentElement.style.overflow = '';
    }, 3500);

    return () => {
      // Cleanup on component unmount
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
          <h1 className="text-2xl md:text-3xl font-jakarta tracking-[0.5em] font-normal text-primary animate-noise-reveal opacity-0">
            sOn4jit
          </h1>
        </div>
      )}
    </motion.div>
  );
};

export default LoadingScreen;

