'use client';

import { useLocale } from '@/common/hooks';
import { Reveal, AnimatedBackground } from '@/components/Landing';
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
    <div className={styles.page}>
      <AnimatedBackground />
      <div className={styles.content}>
        <div className={styles.container}>
          <CategoryHeader category={category} />
          
          <Reveal delay={100}>
            <CategoryNavigation category={category} locale={locale} />
          </Reveal>
          
          <Reveal delay={200}>
            <QuestionList category={category} />
          </Reveal>
          
          <Reveal delay={300}>
            <BottomPagination />
          </Reveal>
        </div>
      </div>
    </div>
  );
};
