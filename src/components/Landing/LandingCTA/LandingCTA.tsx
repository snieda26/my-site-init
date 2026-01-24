'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLocalePath } from '@/common/hooks';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import styles from './LandingCTA.module.scss';

export const LandingCTA: React.FC = () => {
  const t = useTranslations('landing.cta');
  const router = useRouter();
  const localePath = useLocalePath();
  const { isAuthenticated } = useAuth();
  
  const handleClick = () => {
    const destination = isAuthenticated 
      ? localePath('/interview-questions') 
      : localePath('/auth/login');
    router.push(destination);
  };
  
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        {t('title')} <span className={styles.highlight}>{t('highlight')}</span>
      </h2>
      <button className={styles.button} onClick={handleClick}>
        <span className={styles.buttonText}>{t('button')}</span>
        <div className={styles.shimmer}></div>
      </button>
    </section>
  );
};
