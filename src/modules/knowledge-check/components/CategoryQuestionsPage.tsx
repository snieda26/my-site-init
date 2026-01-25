'use client';

import { useState, useCallback } from 'react';
import { useLocale } from '@/common/hooks';
import { Reveal, AnimatedBackground } from '@/components/Landing';
import { CategoryHeader } from './CategoryHeader';
import { CategoryNavigation } from './CategoryNavigation';
import { QuestionList } from './QuestionList';
import { BottomPagination } from './BottomPagination';
import { useKnowledgeCheckQuestions, useToggleLearned } from '../hooks/use-knowledge-check';
import type { LearnedStatus } from '../types/knowledge-check.types';
import styles from './CategoryQuestionsPage.module.scss';

interface CategoryQuestionsPageProps {
  category: string;
}

const QUESTIONS_PER_PAGE = 10;

export const CategoryQuestionsPage = ({ category }: CategoryQuestionsPageProps) => {
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState<LearnedStatus>('all');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  
  const {
    questions,
    totalQuestions,
    totalPages,
    counts,
    isLoading,
    isAuthenticated,
  } = useKnowledgeCheckQuestions({
    categorySlug: category,
    page: currentPage,
    limit: QUESTIONS_PER_PAGE,
    status: currentFilter,
  });
  
  const { mutate: toggleLearned, isPending: isTogglingLearned } = useToggleLearned();
  
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setExpandedQuestion(null);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const handleFilterChange = useCallback((filter: LearnedStatus) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
    setExpandedQuestion(null);
  }, []);
  
  const handleToggleQuestion = useCallback((id: string) => {
    setExpandedQuestion(prev => prev === id ? null : id);
  }, []);
  
  const handleToggleLearned = useCallback((questionId: string, isLearned: boolean) => {
    toggleLearned({ questionId, isLearned });
  }, [toggleLearned]);

  return (
    <div className={styles.page}>
      <AnimatedBackground />
      <div className={styles.content}>
        <div className={styles.container}>
          <CategoryHeader category={category} />
          
          <Reveal delay={100}>
            <CategoryNavigation 
              category={category} 
              locale={locale}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              currentFilter={currentFilter}
              onFilterChange={handleFilterChange}
              counts={counts}
              isAuthenticated={isAuthenticated}
            />
          </Reveal>
          
          <QuestionList 
            category={category}
            questions={questions}
            isLoading={isLoading}
            isAuthenticated={isAuthenticated}
            expandedQuestion={expandedQuestion}
            onToggleQuestion={handleToggleQuestion}
            onToggleLearned={handleToggleLearned}
            isTogglingLearned={isTogglingLearned}
          />
          
          {totalPages > 1 && questions.length > 0 && (
            <Reveal delay={300}>
              <BottomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
};
