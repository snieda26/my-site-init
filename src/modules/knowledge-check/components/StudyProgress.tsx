'use client';

import { useTranslations } from 'next-intl';
import styles from './StudyProgress.module.scss';

interface StudyProgressProps {
  learned: number;
  total: number;
}

export const StudyProgress = ({ learned, total }: StudyProgressProps) => {
  const t = useTranslations('knowledgeCheck.categoryPage.studyProgress');
  
  const percentage = total > 0 ? Math.round((learned / total) * 100) : 0;

  return (
    <div className={styles.progressCard}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <svg 
            className={styles.icon}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <span className={styles.title}>{t('title')}</span>
        <span className={styles.percentage}>{percentage}%</span>
      </div>
      
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      
      <div className={styles.footer}>
        <svg 
          className={styles.checkIcon}
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span className={styles.footerText}>
          {t('questionsLearned', { count: learned, total })}
        </span>
      </div>
    </div>
  );
};
