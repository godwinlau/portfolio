'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrambleOptions {
  duration?: number;
  delay?: number;
  chars?: string;
  speed?: number;
}

export function useScrambleText(
  text: string,
  options: ScrambleOptions = {}
) {
  const {
    duration = 1.5,
    delay = 0,
    chars = '!<>-_\\/[]{}—=+*^?#_abcdefghijklmnopqrstuvwxyz',
    speed = 0.03,
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    const finalText = text;
    const totalLength = finalText.length;

    const scramble = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp + delay * 1000;
      }

      const elapsed = timestamp - startTimeRef.current;

      if (elapsed < 0) {
        frameRef.current = requestAnimationFrame(scramble);
        return;
      }

      const progress = Math.min(elapsed / (duration * 1000), 1);
      const revealedLength = Math.floor(progress * totalLength);

      let result = '';
      for (let i = 0; i < totalLength; i++) {
        if (finalText[i] === ' ' || finalText[i] === '\n') {
          result += finalText[i];
        } else if (i < revealedLength) {
          result += finalText[i];
        } else if (i < revealedLength + 3) {
          // Scramble zone - characters being decoded
          result += chars[Math.floor(Math.random() * chars.length)];
        } else {
          result += '';
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(scramble);
      } else {
        setDisplayText(finalText);
        setIsComplete(true);
      }
    };

    frameRef.current = requestAnimationFrame(scramble);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, duration, delay, chars, speed]);

  return { displayText, isComplete };
}
