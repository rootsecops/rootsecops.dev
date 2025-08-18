
"use client";

import { useState } from 'react';
import { Button } from './button';

interface ReadMoreProps {
  text: string;
  maxLength: number;
}

export function ReadMore({ text, maxLength }: ReadMoreProps) {
  const [isTruncated, setIsTruncated] = useState(true);

  if (text.length <= maxLength) {
    return <p>{text}</p>;
  }

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div>
      <p>
        {isTruncated ? `${text.slice(0, maxLength)}...` : text}
      </p>
      <Button
        variant="link"
        className="text-primary hover:text-primary/80 px-0 h-auto py-1 mt-1 text-sm"
        onClick={toggleTruncate}
      >
        {isTruncated ? 'Read More' : 'Read Less'}
      </Button>
    </div>
  );
}
