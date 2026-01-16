'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    questionCount: number;
    gradient: string;
    icons: React.ReactNode[];
  };
  locale: string;
}

export const CategoryCard = ({ category, locale }: CategoryCardProps) => {
  const t = useTranslations('knowledgeCheck');

  return (
    <Link 
      href={`/check-knowledge/${category.id}/${locale}`}
      className={styles.card}
    >
      <div 
        className={styles.header}
        style={{ background: category.gradient }}
      >
        <div className={styles.overlay}></div>
        <div className={styles.icons}>
          {category.icons.map((icon, index) => (
            <div key={index} className={styles.iconWrapper}>
              {icon}
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{category.name}</h3>
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
            className={styles.arrow}
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>
        <p className={styles.description}>{category.description}</p>
        
        <div className={styles.footer}>
          <div className={styles.loginPrompt}>
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
              className={styles.loginIcon}
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" x2="3" y1="12" y2="12"></line>
            </svg>
            <span className={styles.loginText}>{t('loginPrompt.trackProgress')}</span>
          </div>
          <div className={styles.questionCount}>
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
              className={styles.bookIcon}
            >
              <path d="M12 7v14"></path>
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
            </svg>
            <span>{category.questionCount} {t('questions')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
