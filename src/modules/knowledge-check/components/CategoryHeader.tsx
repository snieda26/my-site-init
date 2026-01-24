'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from '@/common/hooks';
import styles from './CategoryHeader.module.scss';

interface CategoryHeaderProps {
  category: string;
}

export const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  const t = useTranslations('knowledgeCheck.categoryPage');
  const locale = useLocale();

  const categoryName = t(`categories.${category}.name`) || category;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {t('title', { category: categoryName })}
        </h1>
        <p className={styles.description}>{categoryName}</p>
        <div className={styles.loginCard}>
          <div className={styles.loginContent}>
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
              className={styles.lockIcon}
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <h3 className={styles.loginTitle}>{t('loginPrompt.title')}</h3>
            <p className={styles.loginDescription}>{t('loginPrompt.description')}</p>
            <Link 
              href={`/auth/login/${locale}`}
              className={styles.loginButton}
            >
              {t('loginPrompt.button')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
