import type { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'design-to-code-workflow',
    title: 'My Design to Code Workflow',
    excerpt:
      'How I bridge the gap between design and development to ship faster and with fewer handoff issues.',
    date: '2024-01-15',
    readTime: '5 min read',
    tags: ['Design', 'Development', 'Workflow'],
  },
  {
    id: '2',
    slug: 'building-shopify-themes',
    title: 'Lessons from Building Shopify Themes',
    excerpt:
      'What I learned from building custom Shopify themes and working with the Liquid templating language.',
    date: '2024-01-08',
    readTime: '7 min read',
    tags: ['Shopify', 'E-commerce', 'Liquid'],
  },
  {
    id: '3',
    slug: 'react-patterns-i-use',
    title: 'React Patterns I Use Daily',
    excerpt:
      'A collection of React patterns and practices that have improved my code quality and developer experience.',
    date: '2024-01-02',
    readTime: '6 min read',
    tags: ['React', 'JavaScript', 'Patterns'],
  },
];
