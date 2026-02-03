'use client';

import { cn } from '@/lib/cn';
import { ArrowBendDownRight } from '@phosphor-icons/react';
import { useContactModal } from '@/components/ContactModal';

interface ContactButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'pill' | 'pill-light';
  className?: string;
}

export function ContactButton({
  children,
  variant = 'default',
  className,
}: ContactButtonProps) {
  const { openModal } = useContactModal();

  const baseStyles = 'group inline-flex items-center gap-2 transition-colors cursor-pointer';

  const variantStyles = {
    default: 'text-text hover:text-accent',
    pill: 'rounded-full border border-border bg-bubble px-4 py-2.5 text-text hover:border-accent hover:text-accent',
    'pill-light': 'rounded-full bg-white px-4 py-2.5 text-black hover:bg-white/90',
  };

  return (
    <button
      onClick={openModal}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      <ArrowBendDownRight
        size={18}
        weight="bold"
        className="text-accent transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
      />
      <span>{children}</span>
    </button>
  );
}
