'use client';

import { useTranslations } from 'next-intl';
import styles from './KnowledgeCheckHero.module.scss';

export const KnowledgeCheckHero = () => {
  const t = useTranslations('knowledgeCheck');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.description}>{t('description')}</p>
    </div>
  );
};
