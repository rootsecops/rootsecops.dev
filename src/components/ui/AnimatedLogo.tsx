
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  texts?: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  texts = ["sOn4jit", "RootSecOps"],
  typingSpeed = 150,
  deleteSpeed = 100,
  delay = 2000,
  className,
  ...props
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const isMounted = useRef(true);
  const [maxTextWidth, setMaxTextWidth] = useState<number | undefined>(undefined);
  const measurementRef = useRef<HTMLSpanElement>(null);

  // Effect to calculate the max width of all texts
  useEffect(() => {
    if (measurementRef.current) {
        let maxWidth = 0;
        texts.forEach(txt => {
            measurementRef.current!.textContent = txt;
            const width = measurementRef.current!.offsetWidth;
            if (width > maxWidth) {
                maxWidth = width;
            }
        });
        measurementRef.current.textContent = ''; // Clear it
        setMaxTextWidth(maxWidth);
    }
  }, [texts]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      if (!isMounted.current) return;

      const i = loopNum % texts.length;
      const fullText = texts[i];

      const newText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(newText);

      if (!isDeleting && newText === fullText) {
        // Pause at end of typing
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && newText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const ticker = setTimeout(handleTyping, isDeleting ? deleteSpeed : typingSpeed);

    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum, texts, delay, typingSpeed, deleteSpeed]);

  return (
    <div className={cn("relative font-pixel text-primary text-2xl", className)} {...props} style={{ width: maxTextWidth, minHeight: '2rem' }}>
      {/* Hidden span for measurement */}
      <span ref={measurementRef} className="absolute invisible whitespace-pre"></span>
      
      {/* Visible animated text */}
      <div className="absolute inset-0">
          <span className="relative inline-block">
            <span
              data-text={text}
              className="glitch-animation"
            >
              {text}
            </span>
            <span className="animate-ping-slow absolute top-0 right-[-2px] h-full w-[2px] bg-primary"></span>
          </span>
      </div>
    </div>
  );
};

export default AnimatedLogo;

// Add custom animation for cursor
const styles = `
@keyframes ping-slow {
  75%, 100% {
    transform: scale(1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
.animate-ping-slow {
  animation: ping-slow 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
`;

// Inject styles into the document head
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
