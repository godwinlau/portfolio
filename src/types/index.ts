// Project types for case studies and slider
export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  isExternal?: boolean;
}

// Skill types for stack grid
export interface Skill {
  name: string;
  category: 'design' | 'development' | 'tools';
}

export interface SkillCategory {
  title: string;
  items: string[];
}

// Social link types
export interface SocialLink {
  name: string;
  url: string;
}

// Animation variants for Framer Motion
export type AnimationVariant = 'fadeUp' | 'fadeIn' | 'slideIn';
