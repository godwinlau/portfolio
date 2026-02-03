'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChatBubble, ContactButton } from '@/components/ui';
import { email } from '@/data/socials';
import { StarFour } from '@phosphor-icons/react';

const techLabels = [
  { text: 'React', x: -100, y: -50, rotate: -12 },
  { text: 'Shopify', x: 120, y: -45, rotate: 8 },
  { text: 'Next.js', x: -90, y: 45, rotate: -6 },
  { text: 'Figma', x: 130, y: 40, rotate: 10 },
  { text: 'TypeScript', x: 10, y: -60, rotate: -3 },
];

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="mx-auto max-w-[650px] px-6 pb-16 pt-32 md:pb-20 md:pt-40">
      {/* Available for work badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-[14px]"
      >
        <StarFour size={16} weight="bold" className="text-accent" />
        <span className="font-medium" style={{ fontFamily: 'var(--font-polysans-mono)' }}>Available for work</span>
      </motion.div>

      {/* Headline with custom animation */}
      <h1 className="leading-[0.85] md:whitespace-nowrap md:leading-normal">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="inline-block"
        >
          Design it.
        </motion.span>{' '}
        <motion.span
          initial={{ opacity: 0, y: -50, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{
            duration: 0.25,
            delay: 0.5,
            rotate: { delay: 1.25, duration: 0.15 },
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative mt-2 block w-fit cursor-pointer rounded bg-accent px-2 py-0.5 text-white transition-transform hover:scale-105 md:mt-0 md:inline-block"
        >
          build it.
          <AnimatePresence>
            {isHovered && techLabels.map((label, i) => (
              <motion.span
                key={label.text}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: label.x,
                  y: label.y,
                  rotate: label.rotate,
                }}
                exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.05,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="pointer-events-none absolute left-1/2 top-1/2 whitespace-nowrap rounded bg-bubble px-2 py-1 text-xs font-medium text-muted"
              >
                {label.text}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.span>
      </h1>

      {/* CTA Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="mt-6 flex items-center gap-4"
      >
        <ContactButton variant="pill-light">
          {email}
        </ContactButton>

        {/* Scribble annotation - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.6 }}
          className="flex items-center gap-2 md:hidden"
        >
          {/* Hand-drawn arrow pointing left towards button */}
          <svg
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
            className="text-muted"
          >
            {/* Curved line */}
            <path
              d="M22 14C14 14 10 6 4 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Arrowhead - two lines forming a V */}
            <path
              d="M7 4L3 8L7 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="-rotate-2 text-lg text-muted"
            style={{ fontFamily: 'var(--font-caveat)', lineHeight: 1 }}
          >
            click to send a message!
          </span>
        </motion.div>

        {/* Scribble annotation - Desktop */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 1.6 }}
          className="hidden items-center gap-1 md:flex"
        >
          {/* Hand-drawn arrow pointing left towards button */}
          <svg
            width="40"
            height="20"
            viewBox="0 0 40 20"
            fill="none"
            className="text-muted"
          >
            {/* Curved line */}
            <path
              d="M38 16C28 16 24 4 14 4C10 4 6 6 4 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Arrowhead */}
            <path
              d="M8 4L4 10L10 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="-rotate-2 text-lg text-muted"
            style={{ fontFamily: 'var(--font-caveat)' }}
          >
            click to send a message!
          </span>
        </motion.div>
      </motion.div>

      {/* Chat Bubble Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="mt-12 max-w-xl md:mt-16"
      >
        <ChatBubble avatarSrc="/godwin/Linkedin New Profile.jpeg" greeting="Hey, Godwin here 👋">
          <p>
            Product engineer — design and frontend in one workflow. Currently at{' '}
            <a
              href="https://appetiser.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-accent"
            >
              Appetiser
            </a>
            . Previously shipping Shopify themes at{' '}
            <a
              href="https://fluorescent.co"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-accent"
            >
              Fluorescent
            </a>
            .
          </p>
        </ChatBubble>
      </motion.div>
    </section>
  );
}
