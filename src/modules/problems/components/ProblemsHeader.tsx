'use client';

import { useTranslations } from 'next-intl';
import { usePageAnimation } from '@/common/hooks';
import styles from './ProblemsHeader.module.scss';

export const ProblemsHeader = () => {
  const t = useTranslations('problems');
  const shouldAnimate = usePageAnimation();

  return (
    <div className={`${styles.container} ${!shouldAnimate ? styles.noAnimation : ''}`}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.description}>{t('description')}</p>
    </div>
  );
};
