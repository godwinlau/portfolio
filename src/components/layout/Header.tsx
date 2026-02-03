'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { email } from '@/data/socials';
import { useLoading } from '@/components/LoadingContext';

export function Header() {
  const { isLoading } = useLoading();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: isLoading ? 0 : 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 py-4 backdrop-blur-md bg-bg/80 border-b border-border/50"
    >
      <div className="mx-auto flex max-w-[650px] items-center justify-center gap-[44px] px-6">
        <Link
          href="/work"
          className="text-base font-medium text-muted transition-colors hover:text-accent"
        >
          Work
        </Link>
        {/* Placeholder for logo - actual logo is in AnimatedLogo component */}
        <Link href="/" className="flex items-center w-[100px] h-[48px]">
          <span className="sr-only">Godwin Laureto</span>
        </Link>
        <a
          href={`mailto:${email}`}
          className="text-base font-medium text-muted transition-colors hover:text-accent"
        >
          Contact
        </a>
      </div>
    </motion.header>
  );
}
