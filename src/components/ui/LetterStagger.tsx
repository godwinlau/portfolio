'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TextSegment {
  text: string;
  highlight?: boolean;
}

interface LetterStaggerProps {
  segments: TextSegment[];
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function LetterStagger({
  segments,
  className = '',
  delay = 0.2,
  staggerDelay = 0.03,
  duration = 0.4,
  as: Component = 'span',
}: LetterStaggerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const letterVariant = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  // For SSR, render static text
  if (!isMounted) {
    return (
      <Component className={className}>
        {segments.map((segment, segIndex) => (
          <span
            key={segIndex}
            className={segment.highlight ? 'inline-block -rotate-2 rounded bg-accent px-2 py-0.5 text-white' : ''}
          >
            {segment.text}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: 'inline' }}
      >
        {segments.map((segment, segIndex) => (
          <span
            key={segIndex}
            className={segment.highlight ? 'inline-block -rotate-2 rounded bg-accent px-2 py-0.5 text-white' : ''}
          >
            {segment.text.split('').map((char, charIndex) => (
              <motion.span
                key={`${segIndex}-${charIndex}`}
                variants={letterVariant}
                style={{
                  display: 'inline-block',
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
