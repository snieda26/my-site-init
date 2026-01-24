'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { LandingNavbar } from '@/components/Landing/LandingNavbar/LandingNavbar';
import { LandingFooter } from '@/components/Landing/LandingFooter/LandingFooter';
import { AnimatedBackground } from '@/components/Landing';
import { Spinner } from '@/components/Spinner';
import { useLocale, useLocalePath } from '@/common/hooks';
import { useCategoriesWithQuestions } from '@/modules/questions';
import { getLocalizedCategoryName, getLocalizedTitle } from '@/modules/questions/types/questions.types';
import styles from './section.module.scss';

export default function SectionPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const localePath = useLocalePath();
  const section = params?.section as string;

  // Fetch categories with questions from API
  const { data: categoriesData, isLoading } = useCategoriesWithQuestions();

  // Find the current category and its questions
  const categoryData = useMemo(() => {
    if (!categoriesData || !section) return null;
    
    const category = categoriesData.find(cat => cat.slug === section);
    if (!category) return null;

    return {
      id: category.slug,
      title: getLocalizedCategoryName(category, locale as 'en' | 'ua'),
      questions: category.questions.map((q, index) => ({
        number: index + 1,
        title: getLocalizedTitle(q, locale as 'en' | 'ua'),
        href: `/interview-questions/${category.slug}/${q.slug}`,
        slug: q.slug,
      })),
    };
  }, [categoriesData, section, locale]);

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.page}>
        <AnimatedBackground />
        <div className={styles.content}>
          <LandingNavbar />
          <main className={styles.main}>
            <div className={styles.loading}>
              <Spinner size="lg" />
            </div>
          </main>
          <LandingFooter />
        </div>
      </div>
    );
  }

  // If category not found, show error
  if (!categoryData) {
    return (
      <div className={styles.page}>
        <AnimatedBackground />
        <div className={styles.content}>
          <LandingNavbar />
          <main className={styles.main}>
            <div className={styles.container}>
              <div className={styles.error}>
                <h1>{locale === 'ua' ? 'Розділ не знайдено' : 'Section not found'}</h1>
                <p>
                  {locale === 'ua' 
                    ? 'Вибачте, цей розділ не існує або був видалений.'
                    : 'Sorry, this section does not exist or has been removed.'}
                </p>
                <button 
                  className={styles.backButton}
                  onClick={() => router.push(localePath('/interview-questions'))}
                >
                  {locale === 'ua' ? 'Повернутись до всіх питань' : 'Back to all questions'}
                </button>
              </div>
            </div>
          </main>
          <LandingFooter />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <AnimatedBackground />
      <div className={styles.content}>
        <LandingNavbar />
        <main className={styles.main}>
          <div className={styles.container}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb}>
              <Link href={localePath('/interview-questions')} className={styles.breadcrumbLink}>
                {locale === 'ua' ? 'Питання для співбесіди' : 'Interview Questions'}
              </Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>{categoryData.title}</span>
            </nav>

            {/* Header */}
            <div className={styles.header}>
              <h1 className={styles.title}>{categoryData.title}</h1>
              <p className={styles.subtitle}>
                {locale === 'ua' 
                  ? `${categoryData.questions.length} питань для підготовки до співбесіди`
                  : `${categoryData.questions.length} questions for interview preparation`}
              </p>
            </div>

            {/* Questions List */}
            {categoryData.questions.length > 0 ? (
              <div className={styles.questionsList}>
                {categoryData.questions.map((question) => (
                  <Link 
                    key={question.href} 
                    href={localePath(question.href)} 
                    className={styles.questionCard}
                  >
                    <div className={styles.questionNumber}>{question.number}</div>
                    <div className={styles.questionContent}>
                      <h3 className={styles.questionTitle}>{question.title}</h3>
                      <span className={styles.questionArrow}>→</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>
                  {locale === 'ua' 
                    ? 'Питання скоро будуть додані...' 
                    : 'Questions coming soon...'}
                </p>
              </div>
            )}
          </div>
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
