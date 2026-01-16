'use client';

import { usePathname } from 'next/navigation';
import { locales, defaultLocale, type Locale } from '@/i18n/config';

/**
 * Custom hook to extract the locale from the URL.
 * Works with locale-suffix URLs (e.g., /problems/en)
 * 
 * @returns The current locale
 */
export function useLocale(): Locale {
  const pathname = usePathname();
  
  if (!pathname) {
    return defaultLocale;
  }
  
  const segments = pathname.split('/').filter(Boolean);
  
  // Check if locale is at the end (new format: /path/locale)
  const lastSegment = segments[segments.length - 1];
  if (lastSegment && locales.includes(lastSegment as Locale)) {
    return lastSegment as Locale;
  }
  
  // Check if locale is at the start (old format: /locale/path or just /locale)
  const firstSegment = segments[0];
  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  
  return defaultLocale;
}

/**
 * Helper to create locale-suffix URLs
 * @param path - The path without locale
 * @returns The path with locale suffix
 */
export function useLocalePath() {
  const locale = useLocale();
  
  return (path: string) => {
    if (path === '/' || path === '') {
      return `/${locale}`;
    }
    
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const normalizedPath = cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;
    
    return `${normalizedPath}/${locale}`;
  };
}
