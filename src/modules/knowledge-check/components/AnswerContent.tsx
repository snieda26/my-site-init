'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { MarkdownContent } from '@/modules/questions/components/MarkdownContent';
import styles from './AnswerContent.module.scss';

interface AnswerContentProps {
  shortAnswer: string | null | undefined;
  locale: 'en' | 'ua';
  questionSlug: string;
  categorySlug: string;
}

export const AnswerContent = ({ shortAnswer, locale, questionSlug, categorySlug }: AnswerContentProps) => {
  const t = useTranslations('knowledgeCheck.categoryPage.question');
  
  // Build the link to the full question page
  const questionLink = `/${locale}/interview-questions/${categorySlug}/${questionSlug}`;

  return (
    <div className={styles.container}>
      {/* Answer Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>{t('answer')}</span>
        </div>
        <div className={styles.answerBody}>
          {shortAnswer ? (
            <MarkdownContent content={shortAnswer} />
          ) : (
            <p className={styles.noAnswerText}>{t('noShortAnswer')}</p>
          )}
        </div>
      </div>
      
      {/* Read more on platform */}
      <div className={styles.resourceSection}>
        <div className={styles.resourceHeader}>
          <span className={styles.resourceTitle}>{t('readMoreOnPlatform')}</span>
        </div>
        <div className={styles.resourceLinks}>
          <Link 
            href={questionLink}
            className={styles.resourceBadge}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <span>itlead.io</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
