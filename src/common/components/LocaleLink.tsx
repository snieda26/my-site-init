'use client';

import Link, { LinkProps } from 'next/link';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';
import { createLocaleUrl } from '@/common/utils/locale-url';
import { Locale } from '@/i18n/config';

interface LocaleLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: ReactNode;
  className?: string;
  locale?: Locale;
}

/**
 * A Link component that automatically adds the locale suffix to URLs.
 * Use this instead of next/link for internal navigation.
 * 
 * Example:
 * <LocaleLink href="/problems">Problems</LocaleLink>
 * // With locale 'en' renders as: <a href="/problems/en">Problems</a>
 */
export function LocaleLink({ 
  href, 
  children, 
  locale: propLocale,
  ...props 
}: LocaleLinkProps) {
  const params = useParams();
  const currentLocale = (propLocale || params?.locale || 'en') as Locale;
  
  // If href already has locale suffix or is external, use as-is
  const isExternal = href.startsWith('http') || href.startsWith('//');
  const hasLocaleSuffix = href.endsWith('/en') || href.endsWith('/ua');
  
  const finalHref = isExternal || hasLocaleSuffix 
    ? href 
    : createLocaleUrl(href, currentLocale);
  
  return (
    <Link href={finalHref} {...props}>
      {children}
    </Link>
  );
}
