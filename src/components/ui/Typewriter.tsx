
"use client";

import { cn } from '@/lib/utils';
import React from 'react';

interface TypewriterProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, className, ...props }) => {
  return (
    <div className={cn("relative", className)} {...props}>
      <style jsx>{`
        .typewriter-text {
          --steps: ${text.length};
          --step-duration: 0.15s;
          position: relative;
          width: max-content;
          white-space: nowrap;
          overflow: hidden;
          border-right: 2px solid hsl(var(--primary)); /* Cursor */
          animation:
            typing var(--steps) * var(--step-duration) steps(var(--steps)) forwards,
            blink 0.75s infinite;
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes blink {
          0%, 100% { border-color: transparent }
          50% { border-color: hsl(var(--primary)) }
        }
        
        .container:hover .typewriter-text {
          animation:
            typing var(--steps) * var(--step-duration) steps(var(--steps)) forwards,
            blink 0.75s infinite;
        }
        
        .container .typewriter-text {
            animation: none;
            border-right: 2px solid hsl(var(--primary));
        }

      `}</style>
      <div className="container">
        <div className="typewriter-text">
          {text}
        </div>
      </div>
    </div>
  );
};

export default Typewriter;
