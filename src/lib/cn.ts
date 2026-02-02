import { clsx, type ClassValue } from 'clsx';

/**
 * Utility for conditionally joining class names
 * Combines clsx for conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
