'use client';

import { useTranslations } from 'next-intl';
import { AnswerContent } from './AnswerContent';
import type { QuestionWithProgress } from '../types/knowledge-check.types';
import { getLocalizedQuestionTitle, getLocalizedShortAnswer } from '../types/knowledge-check.types';
import styles from './QuestionCard.module.scss';

interface QuestionCardProps {
  question: QuestionWithProgress;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  isAuthenticated: boolean;
  onToggleLearned: (questionId: string, isLearned: boolean) => void;
  isTogglingLearned: boolean;
  locale: 'en' | 'ua';
  onAuthRequired: () => void;
  categorySlug: string;
}

export const QuestionCard = ({ 
  question, 
  index,
  isExpanded, 
  onToggle,
  isAuthenticated,
  onToggleLearned,
  isTogglingLearned,
  locale,
  onAuthRequired,
  categorySlug,
}: QuestionCardProps) => {
  const t = useTranslations('knowledgeCheck.categoryPage.question');
  
  const title = getLocalizedQuestionTitle(question, locale);
  const shortAnswer = getLocalizedShortAnswer(question, locale);
  
  const handleToggleLearned = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isTogglingLearned) {
      onToggleLearned(question.id, !question.isLearned);
    }
  };

  return (
    <div className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}>
      <div className={styles.header}>
        <div className={styles.questionInfo}>
          <span className={styles.badge}>#{index}</span>
          <div className={styles.title}>{title}</div>
        </div>
        
        {isAuthenticated ? (
          <button
            type="button"
            className={`${styles.statusButton} ${question.isLearned ? styles.statusButtonLearned : styles.statusButtonNotLearned}`}
            onClick={handleToggleLearned}
            disabled={isTogglingLearned}
            title={question.isLearned ? t('markAsNotLearned') : t('markAsLearned')}
          >
            <span className={styles.statusIndicator}>
              {question.isLearned ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={styles.checkIcon}
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              ) : (
                <span className={styles.emptyCircle} />
              )}
            </span>
            <span className={styles.statusTextDesktop}>
              {question.isLearned ? t('learned') : t('notLearned')}
            </span>
            <span className={styles.statusTextMobile}>
              {question.isLearned ? t('learned') : t('notLearned')}
            </span>
          </button>
        ) : (
          <button 
            type="button"
            onClick={onAuthRequired}
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
            <span className={styles.trackTextDesktop}>{t('trackButton')}</span>
            <span className={styles.trackTextMobile}>{t('trackButtonShort')}</span>
          </button>
        )}
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
            {t('viewAnswer')}
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
        
        <div className={`${styles.answerWrapper} ${isExpanded ? styles.answerWrapperExpanded : ''}`}>
          <div className={styles.answerContent}>
            <AnswerContent 
              shortAnswer={shortAnswer} 
              locale={locale} 
              questionSlug={question.slug} 
              categorySlug={categorySlug}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
