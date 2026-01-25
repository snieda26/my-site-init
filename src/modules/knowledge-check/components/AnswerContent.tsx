'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { MarkdownContent } from '@/modules/questions/components/MarkdownContent';
import styles from './AnswerContent.module.scss';

interface AnswerContentProps {
  content: string;
  locale: 'en' | 'ua';
  questionSlug: string;
}

export const AnswerContent = ({ content, locale, questionSlug }: AnswerContentProps) => {
  const t = useTranslations('knowledgeCheck.categoryPage.question');
  
  // Parse the content to extract the answer section
  // The markdown content typically starts with an answer section
  const answerContent = content || '';

  return (
    <div className={styles.container}>
      {/* Answer Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>{t('answer')}</span>
        </div>
        <div className={styles.answerBody}>
          <MarkdownContent content={answerContent} />
        </div>
      </div>
      
      {/* Read more on platform */}
      <div className={styles.resourceSection}>
        <div className={styles.resourceHeader}>
          <span className={styles.resourceTitle}>{t('readMoreOnPlatform')}</span>
        </div>
        <div className={styles.resourceLinks}>
          <Link 
            href={`/${locale}/interview-questions/${questionSlug}`}
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
      
      {/* Useful resources */}
      <div className={styles.resourceSection}>
        <div className={styles.resourceHeader}>
          <span className={styles.resourceTitle}>{t('usefulResources')}</span>
        </div>
        <div className={styles.resourceLinks}>
          <a 
            href="https://developer.mozilla.org"
            target="_blank"
            rel="noopener noreferrer"
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
            <span>MDN Web Docs</span>
          </a>
        </div>
      </div>
    </div>
  );
};
