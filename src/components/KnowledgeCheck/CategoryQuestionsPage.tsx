'use client';

import { useParams } from 'next/navigation';
import { CategoryHeader } from './CategoryHeader';
import { CategoryNavigation } from './CategoryNavigation';
import { QuestionList } from './QuestionList';
import { BottomPagination } from './BottomPagination';
import styles from './CategoryQuestionsPage.module.scss';

interface CategoryQuestionsPageProps {
  category: string;
}

export const CategoryQuestionsPage = ({ category }: CategoryQuestionsPageProps) => {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className={styles.container}>
      <CategoryHeader category={category} />
      <CategoryNavigation category={category} locale={locale} />
      <QuestionList category={category} />
      <BottomPagination />
    </div>
  );
};
