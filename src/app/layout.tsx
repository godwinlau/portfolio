import type { Metadata } from 'next';
import { polySans, polySansMono, libreBaskerville } from '@/lib/fonts';
import { ThemeToggle } from '@/components/ThemeToggle';
import { FontToggle } from '@/components/FontToggle';
import { FontProvider } from '@/components/FontProvider';
import { LoadingProvider } from '@/components/LoadingContext';
import { LoadingScreen } from '@/components/LoadingScreen';
import { AnimatedLogo } from '@/components/AnimatedLogo';
import './globals.css';

export const metadata: Metadata = {
  title: 'Godwin Laureto — Product Designer Who Ships Code',
  description:
    'Product engineer specializing in design and frontend development. From Figma to production — one workflow, no handoffs.',
  openGraph: {
    title: 'Godwin Laureto — Product Designer Who Ships Code',
    description:
      'Product engineer specializing in design and frontend development. From Figma to production — one workflow, no handoffs.',
    type: 'website',
    url: 'https://godwinlaureto.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Godwin Laureto — Product Designer Who Ships Code',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Godwin Laureto — Product Designer Who Ships Code',
    description:
      'Product engineer specializing in design and frontend development. From Figma to production — one workflow, no handoffs.',
    images: ['/og-image.png'],
  },
};

// Script to prevent flash of wrong theme/font
const initScript = `
  (function() {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (storedTheme !== 'light' && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }

    const storedFont = localStorage.getItem('font-preference');
    if (storedFont === 'serif') {
      document.documentElement.classList.add('font-serif-mode');
    } else {
      document.documentElement.classList.add('font-sans-mode');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body
        className={`${polySans.variable} ${polySansMono.variable} ${libreBaskerville.variable} antialiased`}
      >
        <FontProvider>
          <LoadingProvider>
            <LoadingScreen />
            <AnimatedLogo />
            <div className="noise-overlay" aria-hidden="true" />
            {children}
            <FontToggle />
            <div className="fixed bottom-6 right-6 z-50">
              <ThemeToggle />
            </div>
          </LoadingProvider>
        </FontProvider>
      </body>
    </html>
  );
}
