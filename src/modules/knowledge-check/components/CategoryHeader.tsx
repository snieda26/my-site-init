'use client';

import { useTranslations } from 'next-intl';
import { usePageAnimation } from '@/common/hooks';
import styles from './CategoryHeader.module.scss';

interface CategoryHeaderProps {
  category: string;
}

export const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  const t = useTranslations('knowledgeCheck.categoryPage');
  const shouldAnimate = usePageAnimation();

  const categoryName = t(`categories.${category}.name`) || category;

  return (
    <div className={`${styles.container} ${!shouldAnimate ? styles.noAnimation : ''}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {t('title', { category: categoryName })}
        </h1>
        <p className={styles.description}>{categoryName}</p>
      </div>
    </div>
  );
};
