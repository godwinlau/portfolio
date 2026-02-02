'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { email } from '@/data/socials';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 py-4 backdrop-blur-md bg-bg/80 border-b border-border/50"
    >
      <div className="mx-auto flex max-w-[650px] items-center justify-center gap-[44px] px-6">
        <Link
          href="/work"
          className="text-base font-medium text-muted transition-colors hover:text-accent"
        >
          Work
        </Link>
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-godwin-2.png"
            alt="Godwin Laureto"
            width={84}
            height={48}
            className="h-auto w-[100px]"
          />
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
