'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { ChatCircle } from '@phosphor-icons/react';
import { ArrowLink } from '@/components/ui';

// Types for the conversation flow
type QuickReply = {
  id: string;
  label: string;
  nextNode: string;
};

type ConversationNode = {
  id: string;
  sender: 'godwin' | 'viewer';
  text: string;
  quickReplies?: QuickReply[];
  showCTA?: boolean;
};

// Conversation flow data - easy to extend with more FAQs later
const conversationFlow: Record<string, ConversationNode[]> = {
  start: [
    {
      id: 'intro',
      sender: 'godwin',
      text: "Hey! How was viewing some of my work? Have a project in mind you'd like to succeed as well?",
      quickReplies: [
        { id: 'project-yes', label: "Yes, let's talk!", nextNode: 'project' },
        { id: 'process', label: 'What\'s your process?', nextNode: 'faq-process' },
        { id: 'availability', label: 'Are you available?', nextNode: 'faq-availability' },
      ],
    },
  ],
  project: [
    {
      id: 'project-response',
      sender: 'viewer',
      text: "Yes, I have a project in mind and I'd love to work with you!",
    },
    {
      id: 'project-reply',
      sender: 'godwin',
      text: "Awesome! I'd love to hear about it. Drop me a message and let's make something great together.",
      showCTA: true,
    },
  ],
  'faq-process': [
    {
      id: 'process-response',
      sender: 'viewer',
      text: "I'd like to know more about how you work.",
    },
    {
      id: 'process-reply',
      sender: 'godwin',
      text: "Great question! I start with understanding your goals, then move to design exploration, prototyping, and finally development. I keep you in the loop at every step.",
      quickReplies: [
        { id: 'process-to-project', label: "Cool, let's work together!", nextNode: 'project-from-faq' },
        { id: 'more-questions', label: 'More questions', nextNode: 'more-faqs' },
      ],
    },
  ],
  'faq-availability': [
    {
      id: 'availability-response',
      sender: 'viewer',
      text: 'Are you currently taking on new projects?',
    },
    {
      id: 'availability-reply',
      sender: 'godwin',
      text: "Yes! I'm currently available for new projects. I typically take on 1-2 projects at a time to ensure quality and focus.",
      quickReplies: [
        { id: 'avail-to-project', label: "Great, let's talk!", nextNode: 'project-from-faq' },
        { id: 'avail-more', label: 'More questions', nextNode: 'more-faqs' },
      ],
    },
  ],
  'more-faqs': [
    {
      id: 'more-response',
      sender: 'viewer',
      text: 'I have a few more questions...',
    },
    {
      id: 'more-reply',
      sender: 'godwin',
      text: "Of course! What else would you like to know?",
      quickReplies: [
        { id: 'faq-process-2', label: 'What\'s your process?', nextNode: 'faq-process' },
        { id: 'faq-availability-2', label: 'Are you available?', nextNode: 'faq-availability' },
        { id: 'faq-to-project', label: 'Actually, let\'s talk!', nextNode: 'project-from-faq' },
      ],
    },
  ],
  'project-from-faq': [
    {
      id: 'project-faq-response',
      sender: 'viewer',
      text: "I think I've heard enough - I'd like to start a conversation!",
    },
    {
      id: 'project-faq-reply',
      sender: 'godwin',
      text: "Love that energy! Send me a message and let's bring your idea to life.",
      showCTA: true,
    },
  ],
};

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
      Y
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
          isGodwin ? 'rounded-tl-sm bg-bubble-chat' : 'rounded-tr-sm bg-accent'
        }`}
      >
        <div className="flex items-center gap-1">
          <motion.span
            className={`h-2 w-2 rounded-full ${isGodwin ? 'bg-muted' : 'bg-white/60'}`}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className={`h-2 w-2 rounded-full ${isGodwin ? 'bg-muted' : 'bg-white/60'}`}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className={`h-2 w-2 rounded-full ${isGodwin ? 'bg-muted' : 'bg-white/60'}`}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function ChatBubble({ message }: { message: ConversationNode }) {
  const isGodwin = message.sender === 'godwin';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
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
              ? 'rounded-tl-sm bg-bubble-chat text-text'
              : 'rounded-tr-sm bg-accent text-white'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
    </motion.div>
  );
}

function QuickReplies({
  replies,
  onSelect,
  disabled,
}: {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
  disabled: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-row flex-wrap gap-2 pl-[52px]"
    >
      {replies.map((reply) => (
        <motion.button
          key={reply.id}
          onClick={() => !disabled && onSelect(reply)}
          disabled={disabled}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          className={`rounded-full border border-accent/30 px-4 py-2 text-sm text-text transition-all ${
            disabled
              ? 'cursor-not-allowed opacity-50'
              : 'hover:border-accent hover:bg-accent/10'
          }`}
        >
          {reply.label}
        </motion.button>
      ))}
    </motion.div>
  );
}

export function ChatCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<ConversationNode[]>([]);
  const [currentReplies, setCurrentReplies] = useState<QuickReply[] | null>(null);
  const [isTyping, setIsTyping] = useState<'godwin' | 'viewer' | null>(null);
  const [showCTA, setShowCTA] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Scroll to bottom within container when new messages appear
  useEffect(() => {
    if (hasStarted && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [visibleMessages, isTyping, currentReplies, showCTA, hasStarted]);

  const showMessagesSequentially = useCallback(
    async (nodes: ConversationNode[], startIndex = 0) => {
      for (let i = startIndex; i < nodes.length; i++) {
        const node = nodes[i];

        // Show typing indicator
        setIsTyping(node.sender);
        await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));

        // Show message
        setIsTyping(null);
        setVisibleMessages((prev) => [...prev, node]);

        // If this message has quick replies, show them after a delay
        if (node.quickReplies) {
          await new Promise((r) => setTimeout(r, 400));
          setCurrentReplies(node.quickReplies);
          setIsProcessing(false);
          return; // Wait for user interaction
        }

        // If this message should show CTA
        if (node.showCTA) {
          await new Promise((r) => setTimeout(r, 400));
          setShowCTA(true);
          setIsProcessing(false);
          return;
        }

        // Small delay between messages
        if (i < nodes.length - 1) {
          await new Promise((r) => setTimeout(r, 300));
        }
      }
      setIsProcessing(false);
    },
    []
  );

  // Start conversation when section comes into view
  useEffect(() => {
    if (hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          setTimeout(() => {
            showMessagesSequentially(conversationFlow.start);
          }, 500);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, showMessagesSequentially]);

  const handleQuickReply = (reply: QuickReply) => {
    if (isProcessing) return;

    setIsProcessing(true);
    setCurrentReplies(null);

    // Get the next conversation node
    const nextMessages = conversationFlow[reply.nextNode];
    if (nextMessages) {
      showMessagesSequentially(nextMessages);
    }
  };

  return (
    <section className="py-16 md:py-24" ref={containerRef}>
      <div className="mx-auto max-w-[650px] px-6">
        <div className="flex flex-col items-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={hasStarted ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-border p-3"
          >
            <ChatCircle size={24} weight="bold" className="text-accent" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={hasStarted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-10 text-center text-2xl md:text-3xl"
          >
            Let's continue the{' '}
            <span className="inline-block -rotate-2 rounded bg-accent px-2 py-0.5 text-white">
              convo!
            </span>
          </motion.h2>

          {/* Chat messages - fixed height container */}
          <div className="mb-6 w-full max-w-[420px] overflow-hidden rounded-2xl border border-border bg-bubble shadow-sm">
            <div ref={scrollContainerRef} className="h-[400px] overflow-y-auto px-4 py-6">
              <div className="flex flex-col gap-4">
                <AnimatePresence mode="sync">
                  {visibleMessages.map((message) => (
                    <ChatBubble key={message.id} message={message} />
                  ))}

                  {isTyping && (
                    <TypingIndicator key="typing" isGodwin={isTyping === 'godwin'} />
                  )}
                </AnimatePresence>

                {/* Quick replies */}
                <AnimatePresence>
                  {currentReplies && !isTyping && (
                    <QuickReplies
                      key="replies"
                      replies={currentReplies}
                      onSelect={handleQuickReply}
                      disabled={isProcessing}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <AnimatePresence>
            {showCTA && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <ArrowLink
                  href="mailto:hello@godwinlaureto.com"
                  variant="pill-light"
                  external
                >
                  hello@godwinlaureto.com
                </ArrowLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
