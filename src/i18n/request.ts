import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // This function gets called on each request with the locale from the URL
  let locale = await requestLocale;

  // Validate that the incoming locale parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'ua'; // fallback to default
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
