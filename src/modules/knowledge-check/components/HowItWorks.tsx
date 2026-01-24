'use client';

import { useTranslations } from 'next-intl';
import styles from './HowItWorks.module.scss';

export const HowItWorks = () => {
  const t = useTranslations('knowledgeCheck.howItWorks');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('title')}</h2>
      <div className={styles.grid}>
        <div className={styles.step}>
          <div className={styles.iconWrapper}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={styles.icon}
            >
              <path d="M12 7v14"></path>
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
            </svg>
          </div>
          <h3 className={styles.stepTitle}>{t('step1.title')}</h3>
          <p className={styles.stepDescription}>{t('step1.description')}</p>
        </div>

        <div className={styles.step}>
          <div className={`${styles.iconWrapper} ${styles.iconWrapperStep2}`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={styles.icon}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h3 className={styles.stepTitle}>{t('step2.title')}</h3>
          <p className={styles.stepDescription}>{t('step2.description')}</p>
        </div>

        <div className={styles.step}>
          <div className={`${styles.iconWrapper} ${styles.iconWrapperStep3}`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={styles.icon}
            >
              <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
              <path d="m9 11 3 3L22 4"></path>
            </svg>
          </div>
          <h3 className={styles.stepTitle}>{t('step3.title')}</h3>
          <p className={styles.stepDescription}>{t('step3.description')}</p>
        </div>
      </div>
    </div>
  );
};
