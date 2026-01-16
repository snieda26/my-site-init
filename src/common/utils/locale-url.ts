import { Locale } from '@/i18n/config';

/**
 * Generates a URL with the locale as a suffix instead of prefix.
 * Example: createLocaleUrl('/problems', 'en') => '/problems/en'
 * 
 * @param path - The path without locale (e.g., '/problems', '/interview-questions')
 * @param locale - The locale code (e.g., 'en', 'ua')
 * @returns The URL with locale suffix
 */
export function createLocaleUrl(path: string, locale: Locale): string {
  // Handle root path
  if (path === '/' || path === '') {
    return `/${locale}`;
  }
  
  // Remove leading slash if present for consistent handling
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Remove trailing slash if present
  const normalizedPath = cleanPath.endsWith('/') 
    ? cleanPath.slice(0, -1) 
    : cleanPath;
  
  return `${normalizedPath}/${locale}`;
}

/**
 * Extracts the locale from a URL with locale suffix.
 * Example: extractLocaleFromUrl('/problems/en') => 'en'
 * 
 * @param url - The full URL or pathname
 * @param locales - Array of valid locales
 * @returns The locale if found, undefined otherwise
 */
export function extractLocaleFromUrl(
  url: string, 
  locales: readonly string[]
): string | undefined {
  const parts = url.split('/').filter(Boolean);
  const lastPart = parts[parts.length - 1];
  
  if (locales.includes(lastPart)) {
    return lastPart;
  }
  
  return undefined;
}

/**
 * Removes the locale suffix from a URL.
 * Example: removeLocaleSuffix('/problems/en', 'en') => '/problems'
 * 
 * @param url - The URL with locale suffix
 * @param locale - The locale to remove
 * @returns The URL without locale suffix
 */
export function removeLocaleSuffix(url: string, locale: string): string {
  const suffix = `/${locale}`;
  if (url.endsWith(suffix)) {
    const result = url.slice(0, -suffix.length);
    return result || '/';
  }
  return url;
}
