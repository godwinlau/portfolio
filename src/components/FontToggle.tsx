'use client';

import { useFont } from './FontProvider';
import { TextAa, TextT } from '@phosphor-icons/react';

export function FontToggle() {
  const { font, setFont } = useFont();

  return (
    <div className="fixed left-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-1 rounded-lg border border-border bg-bg/80 p-1.5 backdrop-blur-md">
      <button
        onClick={() => setFont('sans')}
        className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
          font === 'sans'
            ? 'bg-accent text-white'
            : 'text-muted hover:bg-bubble hover:text-text'
        }`}
        title="Sans-serif (PolySans)"
        aria-label="Switch to sans-serif font"
      >
        <TextAa size={20} weight="bold" />
      </button>
      <button
        onClick={() => setFont('serif')}
        className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
          font === 'serif'
            ? 'bg-accent text-white'
            : 'text-muted hover:bg-bubble hover:text-text'
        }`}
        title="Serif (Libre Baskerville)"
        aria-label="Switch to serif font"
      >
        <TextT size={20} weight="bold" />
      </button>
    </div>
  );
}
