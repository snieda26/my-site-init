'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/common/hooks';
import styles from './QuestionNavigation.module.scss';

interface QuestionNavigationProps {
  section: string;
  question: string;
}

export const QuestionNavigation = ({ section, question }: QuestionNavigationProps) => {
  const t = useTranslations('docs.questions');
  const locale = useLocale();

  // TODO: Implement actual navigation logic based on question order
  const prevQuestion = null; // Get previous question
  const nextQuestion = null; // Get next question

  return (
    <div className={styles.container}>
      <div className={styles.navGroup}>
        {prevQuestion ? (
          <Link
            href={`/interview-questions/${section}/${prevQuestion}/${locale}`}
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
        {nextQuestion ? (
          <Link
            href={`/interview-questions/${section}/${nextQuestion}/${locale}`}
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
