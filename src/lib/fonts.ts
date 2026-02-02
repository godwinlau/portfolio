import localFont from 'next/font/local';
import { Libre_Baskerville } from 'next/font/google';

// PolySans for body text (Neutral/Regular weight)
export const polySans = localFont({
  src: [
    {
      path: '../fonts/PolySans-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/PolySans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/PolySans-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/PolySans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-polysans',
  display: 'swap',
});

// PolySans Wide variant (for special use cases)
export const polySansWide = localFont({
  src: [
    {
      path: '../fonts/PolySans-LightWide.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/PolySans-RegularWide.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/PolySans-MediumWide.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/PolySans-BoldWide.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-polysans-wide',
  display: 'swap',
});

// PolySans Mono variant (for code/monospace)
export const polySansMono = localFont({
  src: [
    {
      path: '../fonts/PolySans-LightMono.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/PolySans-RegularMono.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/PolySans-MediumMono.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/PolySans-BoldMono.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-polysans-mono',
  display: 'swap',
});

// Libre Baskerville for serif option
export const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre-baskerville',
  display: 'swap',
});
