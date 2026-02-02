'use client';

import { motion } from 'framer-motion';
import { ChatBubble, ArrowLink, LetterStagger } from '@/components/ui';
import { email } from '@/data/socials';
import { StarFour } from '@phosphor-icons/react';

export function Hero() {
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

      {/* Headline with letter stagger effect */}
      <LetterStagger
        segments={[
          { text: 'Design it. ' },
          { text: 'build it.', highlight: true },
        ]}
        as="h1"
        delay={0.2}
        staggerDelay={0.025}
        duration={0.5}
      />

      {/* CTA Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="mt-6"
      >
        <ArrowLink href={`mailto:${email}`} variant="pill-light" external>
          {email}
        </ArrowLink>
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
