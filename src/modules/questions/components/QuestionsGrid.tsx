'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocale, useLocalePath } from '@/common/hooks';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { useCategoriesWithQuestions } from '@/modules/questions';
import { getLocalizedCategoryName, getLocalizedTitle } from '@/modules/questions/types/questions.types';
import { progressService } from '@/modules/progress/services/progress.service';
import { Spinner } from '@/components/Spinner';
import styles from './QuestionsGrid.module.scss';

export const QuestionsGrid = () => {
  const locale = useLocale();
  const localePath = useLocalePath();
  const { isAuthenticated } = useAuth();

  // Fetch categories with questions from API
  const { data: categoriesData, isLoading } = useCategoriesWithQuestions();

  // Fetch all progress data for all categories
  const { data: allProgressData } = useQuery({
    queryKey: ['all-categories-progress', categoriesData?.map(c => c.slug)],
    queryFn: async () => {
      if (!categoriesData) return {};
      
      const progressByCategory: Record<string, Set<string>> = {};
      
      await Promise.all(
        categoriesData.map(async (category) => {
          try {
            const categoryProgress = await progressService.getCategoryProgress(category.slug);
            const completedSlugs = categoryProgress.questions
              .filter(q => q.status === 'COMPLETED')
              .map(q => q.slug);
            progressByCategory[category.slug] = new Set(completedSlugs);
          } catch (error) {
            progressByCategory[category.slug] = new Set();
          }
        })
      );
      
      return progressByCategory;
    },
    enabled: !!categoriesData && isAuthenticated,
    retry: false,
  });

  // Build sections with questions
  const sections = useMemo(() => {
    if (!categoriesData) return [];
    
    return categoriesData.map(category => {
      const completedInCategory = allProgressData?.[category.slug] || new Set();
      
      return {
        id: category.slug,
        title: getLocalizedCategoryName(category, locale as 'en' | 'ua'),
        href: `/interview-questions/${category.slug}`,
        questions: category.questions.map((q) => ({
          title: getLocalizedTitle(q, locale as 'en' | 'ua'),
          href: `/interview-questions/${category.slug}/${q.slug}`,
          isCompleted: completedInCategory.has(q.slug),
        })),
      };
    });
  }, [categoriesData, locale, allProgressData]);

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {locale === 'ua' ? 'Питання для співбесіди' : 'Interview Questions'}
        </h1>
        <p className={styles.subtitle}>
          {locale === 'ua' 
            ? 'Вивчайте теорію та готуйтесь до технічних співбесід. Оберіть тему нижче.'
            : 'Study theory and prepare for technical interviews. Choose a topic below.'}
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.sections}>
          {sections.map((section, sectionIndex) => (
            <div key={section.id} className={styles.section}>
              <div className={styles.sectionHeader}>
                <Link href={localePath(section.href)} className={styles.sectionTitle}>
                  {section.title}
                </Link>
              </div>
              {section.questions.length > 0 ? (
                <div className={styles.questionsGrid}>
                  {section.questions.map((question, qIndex) => (
                    <Link 
                      key={question.href} 
                      href={localePath(question.href)} 
                      className={styles.questionItem}
                    >
                      <span className={styles.questionNumber}>{qIndex + 1}</span>
                      <span className={styles.questionTitle}>
                        {question.title}
                        {question.isCompleted && (
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className={styles.checkIcon}
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className={styles.emptySection}>
                  {locale === 'ua' ? 'Питання скоро будуть додані...' : 'Questions coming soon...'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
