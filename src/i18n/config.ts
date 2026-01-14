/**
 * Internationalization Configuration
 * 
 * Centralized i18n settings for the application.
 * Defines supported locales and default language.
 */

export type Locale = 'ua' | 'en';

export const locales: readonly Locale[] = ['ua', 'en'] as const;

export const defaultLocale: Locale = 'ua';

export const localeNames: Record<Locale, string> = {
  ua: 'Українська',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  ua: '🇺🇦',
  en: '🇺🇸',
};
