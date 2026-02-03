'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import rough from 'roughjs';

// Hand-drawn scribble types
type ScribbleType = 'circle' | 'underline' | 'arrow' | 'star';
type ScribblePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

// Hand-drawn scribble component
function HandDrawnScribble({
  type,
  className = '',
}: {
  type: ScribbleType;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 60 * 2;
    canvas.height = 60 * 2;
    ctx.scale(2, 2);

    const rc = rough.canvas(canvas);

    if (type === 'circle') {
      rc.circle(30, 30, 40, {
        stroke: '#FF5200',
        strokeWidth: 2,
        roughness: 2,
        fill: 'transparent',
      });
    } else if (type === 'underline') {
      rc.path('M 5 30 Q 30 35, 55 28', {
        stroke: '#FF5200',
        strokeWidth: 2,
        roughness: 2,
      });
    } else if (type === 'arrow') {
      rc.path('M 10 40 Q 30 20, 50 25 M 45 15 L 50 25 L 40 28', {
        stroke: '#FF5200',
        strokeWidth: 2,
        roughness: 2,
      });
    } else if (type === 'star') {
      rc.path(
        'M 30 5 L 35 20 L 50 20 L 38 30 L 43 45 L 30 35 L 17 45 L 22 30 L 10 20 L 25 20 Z',
        {
          stroke: '#FF5200',
          strokeWidth: 1.5,
          roughness: 1.5,
          fill: 'transparent',
        }
      );
    }
  }, [type]);

  return <canvas ref={canvasRef} className={`h-[60px] w-[60px] ${className}`} />;
}

interface PolaroidProps {
  src: string;
  alt: string;
  rotate?: string;
  label?: string;
  scribble?: ScribbleType;
  scribblePosition?: ScribblePosition;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: {
    image: 'h-[100px] w-[120px] md:h-[120px] md:w-[140px]',
    padding: 'p-2',
  },
  md: {
    image: 'h-[140px] w-[160px] md:h-[160px] md:w-[180px]',
    padding: 'p-3',
  },
  lg: {
    image: 'h-[180px] w-[200px] md:h-[200px] md:w-[220px]',
    padding: 'p-4',
  },
};

const scribblePositionClasses: Record<ScribblePosition, string> = {
  'top-right': '-top-6 -right-6',
  'top-left': '-top-6 -left-6',
  'bottom-right': '-bottom-6 -right-6',
  'bottom-left': '-bottom-6 -left-6',
};

export function Polaroid({
  src,
  alt,
  rotate = '',
  label,
  scribble,
  scribblePosition = 'top-right',
  size = 'md',
  className = '',
}: PolaroidProps) {
  const sizeClass = sizeClasses[size];

  return (
    <div className={`relative ${className}`}>
      <div
        className={`rounded bg-bubble shadow-lg dark:border dark:border-border dark:shadow-none ${sizeClass.padding} ${rotate}`}
        style={{ paddingBottom: label ? '1.75rem' : '0.75rem' }}
      >
        <div className="overflow-hidden rounded-sm">
          <Image
            src={src}
            alt={alt}
            width={220}
            height={220}
            className={`rounded-sm object-cover shadow-sm ${sizeClass.image}`}
          />
        </div>
        {label && (
          <p className="mt-2 text-center text-sm text-muted">{label}</p>
        )}
      </div>
      {scribble && (
        <HandDrawnScribble
          type={scribble}
          className={`absolute ${scribblePositionClasses[scribblePosition]}`}
        />
      )}
    </div>
  );
}
