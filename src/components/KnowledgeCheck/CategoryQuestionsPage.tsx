'use client';

import { useLocale } from '@/common/hooks';
import { CategoryHeader } from './CategoryHeader';
import { CategoryNavigation } from './CategoryNavigation';
import { QuestionList } from './QuestionList';
import { BottomPagination } from './BottomPagination';
import styles from './CategoryQuestionsPage.module.scss';

interface CategoryQuestionsPageProps {
  category: string;
}

export const CategoryQuestionsPage = ({ category }: CategoryQuestionsPageProps) => {
  const locale = useLocale();

  return (
    <div className={styles.container}>
      <CategoryHeader category={category} />
      <CategoryNavigation category={category} locale={locale} />
      <QuestionList category={category} />
      <BottomPagination />
    </div>
  );
};
