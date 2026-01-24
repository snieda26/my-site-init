'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useLocale, useLocalePath } from '@/common/hooks';
import { useCategoriesWithQuestions } from '@/modules/questions';
import { getLocalizedCategoryName, getLocalizedTitle } from '@/modules/questions/types/questions.types';
import { Spinner } from '@/components/Spinner';
import styles from './QuestionsGrid.module.scss';

export const QuestionsGrid = () => {
  const locale = useLocale();
  const localePath = useLocalePath();

  // Fetch categories with questions from API
  const { data: categoriesData, isLoading } = useCategoriesWithQuestions();

  // Build sections with questions
  const sections = useMemo(() => {
    if (!categoriesData) return [];
    
    return categoriesData.map(category => ({
      id: category.slug,
      title: getLocalizedCategoryName(category, locale as 'en' | 'ua'),
      href: `/interview-questions/${category.slug}`,
      questions: category.questions.map((q) => ({
        title: getLocalizedTitle(q, locale as 'en' | 'ua'),
        href: `/interview-questions/${category.slug}/${q.slug}`,
      })),
    }));
  }, [categoriesData, locale]);

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
                      <span className={styles.questionNumber}>{sectionIndex + 1}.{qIndex + 1}</span>
                      <span className={styles.questionTitle}>{question.title}</span>
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
