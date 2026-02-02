import { cn } from '@/lib/cn';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-bubble px-2 py-1 text-xs font-medium',
        className
      )}
    >
      {children}
    </span>
  );
}
