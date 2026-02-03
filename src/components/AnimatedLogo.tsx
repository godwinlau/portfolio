'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLoading } from './LoadingContext';

export function AnimatedLogo() {
  const { isLoading } = useLoading();

  return (
    <motion.div
      className="fixed z-[101] pointer-events-none"
      initial={{
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
        scale: 2,
        opacity: 0,
      }}
      animate={
        isLoading
          ? {
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              scale: 2,
              opacity: 1,
            }
          : {
              top: '16px',
              left: '50%',
              x: '-50%',
              y: '0%',
              scale: 1,
              opacity: 1,
            }
      }
      transition={{
        duration: isLoading ? 0.4 : 0.6,
        delay: isLoading ? 0.2 : 0,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Image
        src="/logo-godwin-2.png"
        alt="Godwin Laureto"
        width={84}
        height={48}
        className="h-auto w-[100px]"
        priority
      />
    </motion.div>
  );
}
