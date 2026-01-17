'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './QuestionNavigation.module.scss';

interface QuestionNavigationProps {
  section: string;
  prev?: string | null;
  next?: string | null;
  locale: string;
}

export const QuestionNavigation = ({ section, prev, next, locale }: QuestionNavigationProps) => {
  const t = useTranslations('docs.questions');

  return (
    <div className={styles.container}>
      <div className={styles.navGroup}>
        {prev ? (
          <Link
            href={`/interview-questions/${section}/${prev}/${locale}`}
            className={styles.navButton}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.icon}
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <p>{t('navigation.back')}</p>
          </Link>
        ) : (
          <div className={styles.navButtonDisabled}>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.icon}
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <p>{t('navigation.back')}</p>
          </div>
        )}
      </div>
      <div className={styles.navGroup}>
        {next ? (
          <Link
            href={`/interview-questions/${section}/${next}/${locale}`}
            className={styles.navButton}
          >
            <p>{t('navigation.forward')}</p>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.icon}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        ) : (
          <div className={styles.navButtonDisabled}>
            <p>{t('navigation.forward')}</p>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.icon}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
