'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';
import { useLocale } from '@/common/hooks';
import { Dropdown } from '@/components/Dropdown';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLocale = (newLocale: Locale) => {
    if (!pathname) return;

    const segments = pathname.split('/').filter(Boolean);
    
    // Check if locale is at the end (new format: /path/locale)
    const lastSegment = segments[segments.length - 1];
    if (locales.includes(lastSegment as Locale)) {
      // Replace locale at the end
      segments[segments.length - 1] = newLocale;
    } 
    // Check if locale is at the start (old format: /locale/path)
    else if (locales.includes(segments[0] as Locale)) {
      segments[0] = newLocale;
    }
    // No locale found, append new locale
    else {
      segments.push(newLocale);
    }

    const newPathname = '/' + segments.join('/');
    router.push(newPathname);
  };

  return (
    <Dropdown
      trigger={
        <button
          className={styles.trigger}
          aria-label="Change language"
          title="Change language"
        >
          <span className={styles.flag}>{localeFlags[currentLocale]}</span>
          <svg
            className={styles.icon}
            width="12"
            height="12"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L7.5 9.5L11 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      }
    >
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`${styles.option} ${
            locale === currentLocale ? styles.active : ''
          }`}
          aria-label={`Switch to ${localeNames[locale]}`}
        >
          <span className={styles.optionFlag}>{localeFlags[locale]}</span>
          <span className={styles.optionName}>{localeNames[locale]}</span>
          {locale === currentLocale && (
            <svg
              className={styles.checkIcon}
              width="16"
              height="16"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 3.5L6 9.5L3.5 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      ))}
    </Dropdown>
  );
};
