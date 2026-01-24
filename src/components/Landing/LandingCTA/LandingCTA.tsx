'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './LandingCTA.module.scss';

export const LandingCTA: React.FC = () => {
  const t = useTranslations('landing.cta');
  
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        {t('title')} <span className={styles.highlight}>{t('highlight')}</span>
      </h2>
      <button className={styles.button}>
        <span className={styles.buttonText}>{t('button')}</span>
        <div className={styles.shimmer}></div>
      </button>
    </section>
  );
};
