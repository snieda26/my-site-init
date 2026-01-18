'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useLocale, useLocalePath } from '@/common/hooks';
import { useCategoriesWithQuestions } from '@/modules/questions';
import { getLocalizedCategoryName, getLocalizedTitle } from '@/modules/questions/types/questions.types';
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
    })).filter(section => section.questions.length > 0);
  }, [categoriesData, locale]);

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {locale === 'ua' ? 'Питання для співбесіди' : 'Interview Questions'}
          </h1>
          <p className={styles.subtitle}>
            {locale === 'ua' ? 'Завантаження...' : 'Loading...'}
          </p>
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
        <div className={styles.list}>
          {sections.map((section) => (
            <div key={section.id} className={styles.listItem}>
              <div className={styles.listTitle}>
                <Link href={localePath(section.href)} className={styles.listLink}>
                  {section.title}
                </Link>
              </div>
              <ul className={styles.listSub}>
                {section.questions.map((question) => (
                  <li key={question.href} className={styles.listSubItem}>
                    <div className={styles.listSubTitle}>
                      <Link href={localePath(question.href)} className={styles.listSubLink}>
                        {question.title}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {sections.length === 0 && (
        <div className={styles.empty}>
          <p>
            {locale === 'ua' 
              ? 'Питання скоро будуть додані...'
              : 'Questions coming soon...'}
          </p>
        </div>
      )}
    </div>
  );
};
