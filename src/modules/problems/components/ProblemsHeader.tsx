'use client';

import { useTranslations } from 'next-intl';
import styles from './ProblemsHeader.module.scss';

export const ProblemsHeader = () => {
  const t = useTranslations('problems');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.description}>{t('description')}</p>
    </div>
  );
};
