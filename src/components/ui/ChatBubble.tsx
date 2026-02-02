'use client';

import { cn } from '@/lib/cn';
import { Avatar } from './Avatar';
import { motion } from 'framer-motion';
import { Checks } from '@phosphor-icons/react';

interface ChatBubbleProps {
  avatarSrc?: string;
  initials?: string;
  greeting?: string;
  children: React.ReactNode;
  timestamp?: string;
  className?: string;
}

export function ChatBubble({
  avatarSrc,
  initials = 'GL',
  greeting,
  children,
  timestamp = '2 mins ago',
  className,
}: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn('flex gap-3', className)}
    >
      <Avatar src={avatarSrc} initials={initials} />
      <div className="flex flex-col">
        <div className="rounded-2xl rounded-tl-sm border border-border bg-bubble px-5 py-4">
          {greeting && (
            <p className="mb-1 text-sm text-muted">{greeting}</p>
          )}
          <div className="text-[15px] leading-relaxed">{children}</div>
        </div>
        <span className="ml-2 mt-1.5 flex items-center gap-1 text-xs text-muted opacity-60">
          {timestamp} <Checks size={14} weight="bold" />
        </span>
      </div>
    </motion.div>
  );
}
