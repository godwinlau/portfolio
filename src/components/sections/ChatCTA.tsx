'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect, useCallback, FormEvent } from 'react';
import { ChatCircle, PaperPlaneTilt, CircleNotch, CheckCircle, DownloadSimple } from '@phosphor-icons/react';

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
  showCV?: boolean;
};

// Conversation flow data - easy to extend with more FAQs later
const conversationFlow: Record<string, ConversationNode[]> = {
  start: [
    {
      id: 'intro',
      sender: 'godwin',
      text: "Hey! Got a project in mind or just exploring?",
      quickReplies: [
        { id: 'project-yes', label: "Yes, let's talk!", nextNode: 'project' },
        { id: 'process', label: 'What\'s your process?', nextNode: 'faq-process' },
        { id: 'availability', label: 'Are you available?', nextNode: 'faq-availability' },
        { id: 'hiring', label: "I'm hiring", nextNode: 'hiring-manager' },
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
  'hiring-manager': [
    {
      id: 'hiring-response',
      sender: 'viewer',
      text: "I'm looking to hire a developer for our team.",
    },
    {
      id: 'hiring-reply',
      sender: 'godwin',
      text: "Nice! Tell me more about what you're building.",
      quickReplies: [
        { id: 'request-cv', label: 'Send me your CV', nextNode: 'cv-request' },
        { id: 'hiring-chat', label: "Let's chat", nextNode: 'hiring-contact' },
      ],
    },
  ],
  'cv-request': [
    {
      id: 'cv-response',
      sender: 'viewer',
      text: 'Can you send me your CV?',
    },
    {
      id: 'cv-reply',
      sender: 'godwin',
      text: "Sure thing! Here you go.",
      showCV: true,
    },
  ],
  'hiring-contact': [
    {
      id: 'hiring-contact-response',
      sender: 'viewer',
      text: "I'd like to discuss an opportunity with you.",
    },
    {
      id: 'hiring-contact-reply',
      sender: 'godwin',
      text: "Sounds good. Drop me a message with some details.",
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

function ChatContactForm({ onSubmit }: { onSubmit: (data: { name: string; email: string; message: string }) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSubmit(formData);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-row-reverse items-start gap-3"
    >
      <ViewerAvatar />
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-text placeholder:text-muted/50 focus:border-accent focus:outline-none"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-text placeholder:text-muted/50 focus:border-accent focus:outline-none"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={3}
          placeholder="Tell me about your project..."
          className="w-full resize-none rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-text placeholder:text-muted/50 focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <CircleNotch size={16} weight="bold" className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <PaperPlaneTilt size={16} weight="bold" />
              Send message
            </>
          )}
        </button>
        {error && (
          <p className="text-center text-xs text-red-500">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </motion.div>
  );
}

function SentMessageBubble({ name, message }: { name: string; message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-row-reverse items-start gap-3"
    >
      <ViewerAvatar />
      <div className="flex max-w-[280px] flex-col items-end gap-1">
        <div className="rounded-2xl rounded-tr-sm bg-accent px-4 py-3 text-white">
          <p className="mb-1 text-xs opacity-70">From: {name}</p>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ThankYouBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex items-start gap-3"
    >
      <GodwinAvatar />
      <div className="flex max-w-[280px] flex-col gap-1">
        <div className="rounded-2xl rounded-tl-sm bg-bubble-chat px-4 py-3 text-text">
          <div className="mb-1 flex items-center gap-1.5 text-accent">
            <CheckCircle size={16} weight="bold" />
            <span className="text-xs font-medium">Message received!</span>
          </div>
          <p className="text-sm leading-relaxed">
            Thanks for reaching out! I'll get back to you as soon as I can.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function CVDownloadButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="pl-[52px]"
    >
      <a
        href="/godwin/Godwin_Laureto_CV.pdf"
        download
        className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent/90"
      >
        <DownloadSimple size={16} weight="bold" />
        Download CV
      </a>
    </motion.div>
  );
}

export function ChatCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<ConversationNode[]>([]);
  const [currentReplies, setCurrentReplies] = useState<QuickReply[] | null>(null);
  const [isTyping, setIsTyping] = useState<'godwin' | 'viewer' | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [sentMessage, setSentMessage] = useState<{ name: string; message: string } | null>(null);
  const [isReplyTyping, setIsReplyTyping] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showCVDownload, setShowCVDownload] = useState(false);
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
  }, [visibleMessages, isTyping, currentReplies, showContactForm, showCVDownload, sentMessage, isReplyTyping, showThankYou, hasStarted]);

  const handleFormSubmit = async (data: { name: string; email: string; message: string }) => {
    // Hide form and show the sent message
    setShowContactForm(false);
    setSentMessage({ name: data.name, message: data.message });

    // After a delay, show typing indicator then thank you message
    await new Promise((r) => setTimeout(r, 600));
    setIsReplyTyping(true);
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 500));
    setIsReplyTyping(false);
    setShowThankYou(true);
  };

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

        // If this message should show the contact form
        if (node.showCTA) {
          await new Promise((r) => setTimeout(r, 400));
          setShowContactForm(true);
          setIsProcessing(false);
          return;
        }

        // If this message should show the CV download
        if (node.showCV) {
          await new Promise((r) => setTimeout(r, 400));
          setShowCVDownload(true);
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
          <div className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-border bg-bubble shadow-sm">
            <div ref={scrollContainerRef} className="h-[480px] overflow-y-auto px-4 py-6">
              <div className="flex flex-col gap-4">
                <AnimatePresence mode="sync">
                  {visibleMessages.map((message, index) => (
                    <ChatBubble key={`${message.id}-${index}`} message={message} />
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

                {/* Contact form inside chat */}
                <AnimatePresence>
                  {showContactForm && (
                    <ChatContactForm
                      key="contact-form"
                      onSubmit={handleFormSubmit}
                    />
                  )}
                </AnimatePresence>

                {/* CV download button */}
                <AnimatePresence>
                  {showCVDownload && <CVDownloadButton key="cv-download" />}
                </AnimatePresence>

                {/* Sent message bubble */}
                <AnimatePresence>
                  {sentMessage && (
                    <SentMessageBubble
                      key="sent-message"
                      name={sentMessage.name}
                      message={sentMessage.message}
                    />
                  )}
                </AnimatePresence>

                {/* Typing indicator for reply (after sent message) */}
                <AnimatePresence>
                  {isReplyTyping && (
                    <TypingIndicator key="reply-typing" isGodwin={true} />
                  )}
                </AnimatePresence>

                {/* Thank you reply from Godwin */}
                <AnimatePresence>
                  {showThankYou && <ThankYouBubble key="thank-you" />}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
