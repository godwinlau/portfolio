'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from './LoadingContext';

// Hand-drawn cloud outline - no fill, just sketchy strokes
const CloudOutline = () => (
  <svg viewBox="0 0 200 100" fill="none">
    <path
      d="M25 70 C15 70 8 62 10 52 C5 48 5 38 15 34 C12 24 22 16 35 18 C40 8 55 5 70 12 C85 5 105 8 115 20 C130 15 150 20 155 35 C170 35 180 48 175 60 C185 65 185 78 170 82 C165 90 150 92 135 88 C120 95 95 95 80 88 C60 95 35 92 25 82 C15 85 10 78 15 72 C12 72 20 70 25 70 Z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Squiggly line
const Squiggle = () => (
  <svg viewBox="0 0 120 30" fill="none">
    <path
      d="M5 15 Q15 5 25 15 T45 15 T65 15 T85 15 T105 15 T115 15"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// Hand-drawn star
const Star = () => (
  <svg viewBox="0 0 50 50" fill="none">
    <path
      d="M25 5 L28 20 L45 22 L32 32 L36 48 L25 38 L14 48 L18 32 L5 22 L22 20 Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Spiral doodle
const Spiral = () => (
  <svg viewBox="0 0 60 60" fill="none">
    <path
      d="M30 30 C30 25 35 25 35 30 C35 38 22 38 22 28 C22 18 42 18 42 32 C42 46 15 46 15 28 C15 12 48 12 48 32"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// Scribble circle
const ScribbleCircle = () => (
  <svg viewBox="0 0 60 60" fill="none">
    <path
      d="M30 8 C45 8 52 20 52 30 C52 42 42 52 30 52 C18 52 8 42 8 30 C8 18 18 8 30 8 C35 8 48 12 50 25"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// Zigzag line
const Zigzag = () => (
  <svg viewBox="0 0 100 40" fill="none">
    <path
      d="M5 30 L20 10 L35 30 L50 10 L65 30 L80 10 L95 30"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Arrow doodle
const Arrow = () => (
  <svg viewBox="0 0 80 40" fill="none">
    <path
      d="M5 20 C20 20 50 20 70 20 M55 8 L72 20 L55 32"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// X mark
const XMark = () => (
  <svg viewBox="0 0 40 40" fill="none">
    <path
      d="M8 8 L32 32 M32 8 L8 32"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// Heart outline
const Heart = () => (
  <svg viewBox="0 0 50 50" fill="none">
    <path
      d="M25 45 C15 35 5 28 5 18 C5 10 12 5 20 5 C24 5 25 8 25 10 C25 8 26 5 30 5 C38 5 45 10 45 18 C45 28 35 35 25 45 Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Lightning bolt
const Lightning = () => (
  <svg viewBox="0 0 40 60" fill="none">
    <path
      d="M25 5 L10 28 L20 28 L15 55 L35 25 L22 25 L30 5 Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const doodles = [
  { Component: CloudOutline, width: 140 },
  { Component: Squiggle, width: 100 },
  { Component: Star, width: 45 },
  { Component: Spiral, width: 55 },
  { Component: ScribbleCircle, width: 50 },
  { Component: Zigzag, width: 90 },
  { Component: Arrow, width: 70 },
  { Component: XMark, width: 35 },
  { Component: Heart, width: 40 },
  { Component: Lightning, width: 35 },
  { Component: CloudOutline, width: 100 },
  { Component: Star, width: 35 },
];

const positions = [
  { top: '8%', left: '15%', rotate: -15 },
  { top: '12%', right: '20%', rotate: 10 },
  { top: '25%', left: '8%', rotate: 25 },
  { top: '20%', right: '10%', rotate: -20 },
  { top: '35%', left: '25%', rotate: 5 },
  { top: '40%', right: '25%', rotate: -10 },
  { top: '50%', left: '12%', rotate: 30 },
  { top: '55%', right: '15%', rotate: -25 },
  { top: '65%', left: '30%', rotate: 15 },
  { top: '60%', right: '8%', rotate: -5 },
  { top: '75%', left: '18%', rotate: -30 },
  { top: '70%', right: '22%', rotate: 20 },
];

export function LoadingScreen() {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ backgroundColor: 'var(--bg)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          {/* Doodles */}
          {doodles.map((doodle, i) => {
            const pos = positions[i];
            const { Component, width } = doodle;

            return (
              <motion.div
                key={i}
                className="absolute text-[var(--primary)]"
                style={{
                  width: `${width}px`,
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                }}
                initial={{ y: '-150vh', rotate: pos.rotate - 20, opacity: 0 }}
                animate={{
                  y: '0%',
                  rotate: pos.rotate,
                  opacity: 0.85,
                  transition: {
                    duration: 0.5 + i * 0.03,
                    ease: [0.25, 0.46, 0.45, 0.94] as const,
                    delay: i * 0.03,
                  }
                }}
                exit={{
                  y: '150vh',
                  rotate: pos.rotate + 30,
                  opacity: 0.85,
                  transition: {
                    duration: 0.4 + (doodles.length - i) * 0.02,
                    ease: [0.55, 0.06, 0.68, 0.19] as const,
                    delay: i * 0.02,
                  }
                }}
              >
                <Component />
              </motion.div>
            );
          })}

        </motion.div>
      )}
    </AnimatePresence>
  );
}
