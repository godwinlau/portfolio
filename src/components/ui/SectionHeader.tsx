'use client';

import { cn } from '@/lib/cn';
import { ShootingStar } from '@phosphor-icons/react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  showIcon?: boolean;
  variant?: 'default' | 'label';
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  showIcon,
  variant = 'default',
  className,
}: SectionHeaderProps) {
  if (variant === 'label') {
    return (
      <div className={cn('mb-8 flex flex-col items-center gap-4', className)}>
        {showIcon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border p-3">
            <ShootingStar size={24} weight="bold" className="text-accent" />
          </div>
        )}
        <h5 className="text-base">{title}</h5>
      </div>
    );
  }

  return (
    <div className={cn('mb-8', className)}>
      <h2 className="font-serif text-2xl md:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 max-w-lg text-base text-muted">{subtitle}</p>
      )}
    </div>
  );
}
