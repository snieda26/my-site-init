'use client';

import { useState, useCallback, useMemo } from 'react';
import { useLocale } from '@/common/hooks';
import { AuthModal } from '@/common/components/ui';
import { Reveal } from '@/components/Landing';
import { CategoryHeader } from './CategoryHeader';
import { StudyProgress } from './StudyProgress';
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

// Map old URL slugs to database slugs for backwards compatibility
const SLUG_MAP: Record<string, string> = {
  'html-and-css': 'html-css',
  'general-questions': 'general',
};

export const CategoryQuestionsPage = ({ category }: CategoryQuestionsPageProps) => {
  // Map URL slug to database slug
  const categorySlug = useMemo(() => SLUG_MAP[category] || category, [category]);
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState<LearnedStatus>('all');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const {
    questions,
    totalQuestions,
    totalPages,
    counts,
    isLoading,
    isAuthenticated,
  } = useKnowledgeCheckQuestions({
    categorySlug,
    page: currentPage,
    limit: QUESTIONS_PER_PAGE,
    status: currentFilter,
  });
  
  const { mutate: toggleLearned, isPending: isTogglingLearned } = useToggleLearned({
    onAuthError: () => setShowAuthModal(true),
  });
  
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

  const handleAuthRequired = useCallback(() => {
    setShowAuthModal(true);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.container}>
          <CategoryHeader category={categorySlug} />
          
          <Reveal delay={50}>
            <StudyProgress 
              learned={counts.learned} 
              total={counts.all} 
            />
          </Reveal>
          
          <Reveal delay={100}>
            <CategoryNavigation 
              category={categorySlug} 
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
            category={categorySlug}
            questions={questions}
            isLoading={isLoading}
            isAuthenticated={isAuthenticated}
            expandedQuestion={expandedQuestion}
            onToggleQuestion={handleToggleQuestion}
            onToggleLearned={handleToggleLearned}
            isTogglingLearned={isTogglingLearned}
            onAuthRequired={handleAuthRequired}
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

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
};
