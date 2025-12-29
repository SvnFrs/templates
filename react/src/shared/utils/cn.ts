import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for merging Tailwind CSS classes with clsx
 * Handles conditional classes and deduplication
 * 
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary-500', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Creates a reusable class variant helper
 * Useful for component variants with consistent base styles
 */
export function createVariantClasses<T extends Record<string, string>>(
  baseClasses: string,
  variants: T
): (variant: keyof T, additionalClasses?: ClassValue) => string {
  return (variant, additionalClasses) => {
    return cn(baseClasses, variants[variant], additionalClasses);
  };
}