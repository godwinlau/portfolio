'use client';

import { useFont } from './FontProvider';
import { useTheme } from '@/hooks/useTheme';
import { TextAa, TextT, Sun, Moon } from '@phosphor-icons/react';

export function FontToggle() {
  const { font, setFont } = useFont();
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-20 left-4 z-50 flex flex-col gap-1 rounded-lg border border-border bg-bg/80 p-1.5 backdrop-blur-md md:bottom-auto md:top-1/2 md:-translate-y-1/2">
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
      <div className="my-1 h-px bg-border" />
      <button
        onClick={toggleTheme}
        className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
          resolvedTheme === 'dark'
            ? 'bg-indigo-400/20 text-indigo-400 hover:bg-indigo-400/30'
            : 'bg-amber-400/20 text-amber-400 hover:bg-amber-400/30'
        }`}
        title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
        aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {resolvedTheme === 'dark' ? (
          <Moon size={20} weight="fill" />
        ) : (
          <Sun size={20} weight="fill" />
        )}
      </button>
    </div>
  );
}
