'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from '@/common/hooks';
import styles from './LoginPromptCard.module.scss';

export const LoginPromptCard = () => {
  const t = useTranslations('knowledgeCheck');
  const locale = useLocale();

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>{t('loginPrompt.title')}</h2>
        <Link 
          href={`/${locale}/auth/login`}
          className={styles.button}
        >
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
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" x2="3" y1="12" y2="12"></line>
          </svg>
          {t('loginPrompt.button')}
        </Link>
      </div>
    </div>
  );
};
