'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { ArrowBendDownRight } from '@phosphor-icons/react';

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'default' | 'pill' | 'pill-light';
  external?: boolean;
  className?: string;
}

export function ArrowLink({
  href,
  children,
  variant = 'default',
  external = false,
  className,
}: ArrowLinkProps) {
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  const baseStyles = 'group inline-flex items-center gap-2 transition-colors';

  const variantStyles = {
    default: 'text-text hover:text-accent',
    pill: 'rounded-full border border-border bg-bubble px-4 py-2.5 text-text hover:border-accent hover:text-accent',
    'pill-light': 'rounded-full bg-white px-4 py-2.5 text-black hover:bg-white/90',
  };

  return (
    <Link
      href={href}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...linkProps}
    >
      <ArrowBendDownRight
        size={18}
        weight="bold"
        className="text-accent transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
      />
      <span>{children}</span>
    </Link>
  );
}
