'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  chars?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  scrambleSpeed?: number;
}

export function ScrambleText({
  text,
  className = '',
  duration = 2,
  delay = 0.3,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  as: Component = 'span',
  scrambleSpeed = 3,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const totalChars = text.length;
    const msPerChar = (duration * 1000) / totalChars;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp + delay * 1000;
      }

      const elapsed = timestamp - startTimeRef.current;

      if (elapsed < 0) {
        // Still in delay, show nothing
        setDisplayText('');
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      // How many characters should be revealed by now
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const targetLength = Math.floor(progress * totalChars);

      let result = '';

      for (let i = 0; i < targetLength; i++) {
        const char = text[i];
        if (char === ' ' || char === '\n') {
          result += char;
          continue;
        }

        // Calculate how "settled" this character is
        const charProgress = (elapsed - (i * msPerChar)) / (msPerChar * scrambleSpeed);

        if (charProgress >= 1) {
          // Fully revealed
          result += char;
        } else {
          // Still scrambling - match the case of the original character
          const randomChar = chars[Math.floor(Math.random() * chars.length)];
          const isUpperCase = char === char.toUpperCase();
          result += isUpperCase ? randomChar.toUpperCase() : randomChar.toLowerCase();
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure final text is correct
        setDisplayText(text);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isMounted, text, duration, delay, chars, scrambleSpeed]);

  // Split text by newlines and render with <br />
  const renderText = () => {
    const lines = displayText.split('\n');
    return lines.map((line, index) => (
      <span key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </span>
    ));
  };

  // For SSR, render empty to match initial client state
  if (!isMounted) {
    return (
      <Component
        ref={elementRef as React.RefObject<HTMLHeadingElement>}
        className={className}
      >
        <span>&nbsp;</span>
      </Component>
    );
  }

  return (
    <Component
      ref={elementRef as React.RefObject<HTMLHeadingElement>}
      className={className}
    >
      {renderText() || <span>&nbsp;</span>}
    </Component>
  );
}
