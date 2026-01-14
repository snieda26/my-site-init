/**
 * Internationalization Configuration
 * 
 * Centralized i18n settings for the application.
 * Defines supported locales and default language.
 */

export type Locale = 'uk' | 'en';

export const locales: readonly Locale[] = ['uk', 'en'] as const;

export const defaultLocale: Locale = 'uk';

export const localeNames: Record<Locale, string> = {
  uk: 'Українська',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  uk: '🇺🇦',
  en: '🇺🇸',
};
