'use client';

import { useTranslations } from 'next-intl';
import { QuestionCard } from './QuestionCard';
import { QuestionCardSkeleton } from './QuestionCardSkeleton';
import { useLocale } from '@/common/hooks';
import type { QuestionWithProgress } from '../types/knowledge-check.types';
import styles from './QuestionList.module.scss';

interface QuestionListProps {
  category: string;
  questions: QuestionWithProgress[];
  isLoading: boolean;
  isAuthenticated: boolean;
  expandedQuestion: string | null;
  onToggleQuestion: (id: string) => void;
  onToggleLearned: (questionId: string, isLearned: boolean) => void;
  isTogglingLearned: boolean;
  onAuthRequired: () => void;
}

export const QuestionList = ({ 
  category, 
  questions,
  isLoading,
  isAuthenticated,
  expandedQuestion,
  onToggleQuestion,
  onToggleLearned,
  isTogglingLearned,
  onAuthRequired,
}: QuestionListProps) => {
  const t = useTranslations('knowledgeCheck.categoryPage.question');
  const locale = useLocale();

  // Always render container for consistent layout
  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.questions}>
          {[1, 2, 3, 4, 5].map((i) => (
            <QuestionCardSkeleton key={i} index={i} />
          ))}
        </div>
      ) : questions.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <h3 className={styles.emptyTitle}>{t('noQuestions')}</h3>
          <p className={styles.emptyDescription}>{t('noQuestionsDescription')}</p>
        </div>
      ) : (
        <div className={styles.questions}>
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index + 1}
              isExpanded={expandedQuestion === question.id}
              onToggle={() => onToggleQuestion(question.id)}
              isAuthenticated={isAuthenticated}
              onToggleLearned={onToggleLearned}
              isTogglingLearned={isTogglingLearned}
              locale={locale as 'en' | 'ua'}
              onAuthRequired={onAuthRequired}
              categorySlug={category}
            />
          ))}
        </div>
      )}
    </div>
  );
};
