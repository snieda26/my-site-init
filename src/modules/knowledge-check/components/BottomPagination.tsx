'use client';

import { useTranslations } from 'next-intl';
import styles from './BottomPagination.module.scss';

interface BottomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const BottomPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: BottomPaginationProps) => {
  const t = useTranslations('knowledgeCheck.categoryPage');

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.container}>
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
  );
};
