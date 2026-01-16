'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from '@/common/hooks';
import styles from './QuestionCard.module.scss';

interface QuestionCardProps {
  question: {
    id: number;
    title: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

export const QuestionCard = ({ question, isExpanded, onToggle }: QuestionCardProps) => {
  const t = useTranslations('knowledgeCheck.categoryPage');
  const locale = useLocale();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.questionInfo}>
          <span className={styles.badge}>#{question.id}</span>
          <div className={styles.title}>{question.title}</div>
        </div>
        <Link 
          href={`/auth/login/${locale}`}
          className={styles.trackButton}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={styles.lockIcon}
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span className={styles.trackTextDesktop}>{t('question.trackButton')}</span>
          <span className={styles.trackTextMobile}>{t('question.trackButtonShort')}</span>
        </Link>
      </div>
      
      <div className={styles.content}>
        <button
          type="button"
          className={styles.accordionButton}
          onClick={onToggle}
          aria-expanded={isExpanded}
        >
          <div className={styles.accordionLabel}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={styles.eyeIcon}
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            {t('question.viewAnswer')}
          </div>
          <svg 
            stroke="currentColor" 
            fill="none" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`${styles.chevronIcon} ${isExpanded ? styles.chevronExpanded : ''}`}
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        
        {isExpanded && (
          <div className={styles.answerContent}>
            <p>{t('question.answerPlaceholder')}</p>
            {/* In real app, this would show the actual answer content */}
          </div>
        )}
      </div>
    </div>
  );
};
