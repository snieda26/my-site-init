import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { locales, defaultLocale, type Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // Try to get locale from requestLocale first
  let locale = await requestLocale;

  // If requestLocale is not set, try to extract from the URL
  if (!locale || !locales.includes(locale as Locale)) {
    try {
      const headersList = await headers();
      const referer = headersList.get('referer') || '';
      const pathname = headersList.get('x-pathname') || new URL(referer || 'http://localhost').pathname;
      
      // Extract locale from URL (could be at start or end)
      const segments = pathname.split('/').filter(Boolean);
      
      // Check last segment (new format: /path/locale)
      const lastSegment = segments[segments.length - 1];
      if (lastSegment && locales.includes(lastSegment as Locale)) {
        locale = lastSegment;
      }
      // Check first segment (standard format: /locale/path)
      else if (segments[0] && locales.includes(segments[0] as Locale)) {
        locale = segments[0];
      }
    } catch {
      // Fallback silently
    }
  }

  // Final validation
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
