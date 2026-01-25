'use client';

import { useTranslations } from 'next-intl';
import { usePageAnimation } from '@/common/hooks';
import styles from './KnowledgeCheckHero.module.scss';

export const KnowledgeCheckHero = () => {
  const t = useTranslations('knowledgeCheck');
  const shouldAnimate = usePageAnimation();

  return (
    <div className={`${styles.container} ${!shouldAnimate ? styles.noAnimation : ''}`}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.description}>{t('description')}</p>
    </div>
  );
};
