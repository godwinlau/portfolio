'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FontType = 'sans' | 'serif';

interface FontContextType {
  font: FontType;
  setFont: (font: FontType) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useState<FontType>('sans');

  useEffect(() => {
    const stored = localStorage.getItem('font-preference') as FontType | null;
    if (stored) {
      setFont(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('font-preference', font);

    if (font === 'serif') {
      document.documentElement.classList.add('font-serif-mode');
      document.documentElement.classList.remove('font-sans-mode');
    } else {
      document.documentElement.classList.add('font-sans-mode');
      document.documentElement.classList.remove('font-serif-mode');
    }
  }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
}
