import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'fintech-wallet',
    number: '01',
    title: 'Fintech Wallet',
    description:
      'Mobile banking app with payment features, top-up, and bill payments.',
    tags: ['Mobile', 'Fintech', 'UI Design'],
    image: '/projects/image.png',
    link: '/work/fintech-wallet',
  },
  {
    id: '2',
    slug: 'checkout-flow',
    number: '02',
    title: 'Checkout Flow',
    description:
      'Streamlined e-commerce checkout experience with multiple payment methods.',
    tags: ['E-commerce', 'UX Design', 'Mobile'],
    image: '/projects/image copy.png',
    link: '/work/checkout-flow',
  },
  {
    id: '3',
    slug: 'blaze2b',
    number: '03',
    title: 'Blaze2B',
    description:
      'Marketing site for a B2B SaaS platform. Brand identity and web development.',
    tags: ['Next.js', 'Tailwind CSS', 'Figma'],
    image: '/projects/blaze2b.png',
    link: '/work/blaze2b',
  },
];
