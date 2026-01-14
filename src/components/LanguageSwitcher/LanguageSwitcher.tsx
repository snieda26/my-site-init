'use client';

import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params.locale as Locale) || 'uk';

  const switchLocale = (newLocale: Locale) => {
    if (!pathname) return;

    // Replace the locale in the pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPathname = segments.join('/');

    router.push(newPathname);
  };

  return (
    <div className={styles.container}>
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

      <div className={styles.dropdown}>
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
      </div>
    </div>
  );
};
