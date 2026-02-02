'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { ChatCircle, EnvelopeSimple } from '@phosphor-icons/react';

const messages = [
  {
    id: 1,
    sender: 'godwin',
    text: "Hey! How was viewing some of my work? Have a project in mind you'd like to succeed as well?",
    time: '10 mins ago',
  },
  {
    id: 2,
    sender: 'viewer',
    text: "Hi Godwin, thanks for checking in. I may have a project in mind. What's the next step?",
    time: '9 mins ago',
  },
  {
    id: 3,
    sender: 'godwin',
    text: 'Cool! Just click the button below to send me an email. Looking forward to hearing about your awesome idea.',
    time: '8 mins ago',
  },
];

function GodwinAvatar() {
  return (
    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-bubble">
      <Image
        src="/godwin/Linkedin New Profile.jpeg"
        alt="Godwin"
        width={40}
        height={40}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function ViewerAvatar() {
  return (
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium text-white">
      M
    </div>
  );
}

function TypingIndicator({ isGodwin }: { isGodwin: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`flex items-start gap-3 ${isGodwin ? '' : 'flex-row-reverse'}`}
    >
      {isGodwin ? <GodwinAvatar /> : <ViewerAvatar />}
      <div
        className={`rounded-2xl px-4 py-3 ${
          isGodwin ? 'rounded-tl-sm bg-bubble' : 'rounded-tr-sm bg-accent/10'
        }`}
      >
        <div className="flex items-center gap-1">
          <motion.span
            className="h-2 w-2 rounded-full bg-muted"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="h-2 w-2 rounded-full bg-muted"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="h-2 w-2 rounded-full bg-muted"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function ChatBubble({
  message,
  isVisible,
}: {
  message: (typeof messages)[0];
  isVisible: boolean;
}) {
  const isGodwin = message.sender === 'godwin';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`flex items-start gap-3 ${isGodwin ? '' : 'flex-row-reverse'}`}
    >
      {isGodwin ? <GodwinAvatar /> : <ViewerAvatar />}
      <div
        className={`flex max-w-[280px] flex-col gap-1 ${isGodwin ? '' : 'items-end'}`}
      >
        <div
          className={`rounded-2xl px-4 py-3 ${
            isGodwin
              ? 'rounded-tl-sm bg-bubble text-text'
              : 'rounded-tr-sm bg-accent/10 text-text'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="text-xs text-muted"
        >
          {message.time}
        </motion.span>
      </div>
    </motion.div>
  );
}

export function ChatCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [typingFor, setTypingFor] = useState<number | null>(null);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const showMessage = (index: number) => {
      // Show typing indicator
      setTypingFor(index);

      // After typing delay, show the message
      const typingDuration = 800 + Math.random() * 400; // 800-1200ms typing
      setTimeout(() => {
        setTypingFor(null);
        setVisibleMessages((prev) => [...prev, index]);

        // Schedule next message
        if (index < messages.length - 1) {
          const nextDelay = 600 + Math.random() * 400; // 600-1000ms between messages
          setTimeout(() => showMessage(index + 1), nextDelay);
        } else {
          // Show CTA after last message
          setTimeout(() => setShowCTA(true), 500);
        }
      }, typingDuration);
    };

    // Start the conversation after a brief delay
    const timer = setTimeout(() => showMessage(0), 500);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section className="py-16 md:py-24" ref={containerRef}>
      <div className="mx-auto max-w-[650px] px-6">
        <div className="flex flex-col items-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-bubble"
          >
            <ChatCircle size={24} weight="bold" className="text-muted" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-10 text-2xl md:text-3xl"
          >
            Let's continue the <span className="text-accent">convo!</span>
          </motion.h2>

          {/* Chat messages */}
          <div className="mb-10 flex w-full max-w-[420px] flex-col gap-4">
            {messages.map((message, index) => (
              <div key={message.id}>
                {typingFor === index && (
                  <TypingIndicator isGodwin={message.sender === 'godwin'} />
                )}
                {visibleMessages.includes(index) && (
                  <ChatBubble
                    message={message}
                    isVisible={visibleMessages.includes(index)}
                  />
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="mailto:hello@godwinlaureto.com"
            initial={{ opacity: 0, y: 20 }}
            animate={showCTA ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent/90 hover:scale-105"
          >
            <EnvelopeSimple size={18} weight="bold" />
            hello@godwinlaureto.com
          </motion.a>
        </div>
      </div>
    </section>
  );
}
