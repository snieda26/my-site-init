'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './CategoryNavigation.module.scss';

interface CategoryNavigationProps {
  category: string;
  locale: string;
}

export const CategoryNavigation = ({ category, locale }: CategoryNavigationProps) => {
  const t = useTranslations('knowledgeCheck.categoryPage');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 7; // This would come from your data source

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link 
          href={`/${locale}/check-knowledge`}
          className={styles.backButton}
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
            className={styles.backIcon}
          >
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          <span className={styles.backTextDesktop}>{t('navigation.backToCategories')}</span>
          <span className={styles.backTextMobile}>{t('navigation.back')}</span>
        </Link>

        <div className={styles.pagination}>
          <button 
            className={styles.paginationButton}
            onClick={handlePrev}
            disabled={currentPage === 1}
            aria-label="Previous page"
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
              className={styles.chevronIcon}
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <div className={styles.pageInfo}>
            <span className={styles.currentPage}>{currentPage}</span>
            <span className={styles.ofText}>{t('navigation.of')}</span>
            <span className={styles.totalPages}>{totalPages}</span>
          </div>
          <button 
            className={styles.paginationButton}
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Next page"
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
              className={styles.chevronIcon}
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
