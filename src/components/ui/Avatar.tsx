import { cn } from '@/lib/cn';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: number;
  className?: string;
}

export function Avatar({
  src,
  alt = 'Avatar',
  initials = 'GL',
  size = 40,
  className,
}: AvatarProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-neutral-200 text-sm font-medium text-neutral-600 shrink-0',
        className
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="rounded-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
