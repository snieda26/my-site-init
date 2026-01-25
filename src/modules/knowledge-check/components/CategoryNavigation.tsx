'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { LearnedStatus } from '../types/knowledge-check.types';
import styles from './CategoryNavigation.module.scss';

interface CategoryNavigationProps {
  category: string;
  locale: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  currentFilter: LearnedStatus;
  onFilterChange: (filter: LearnedStatus) => void;
  counts: {
    all: number;
    learned: number;
    notLearned: number;
  };
  isAuthenticated: boolean;
}

export const CategoryNavigation = ({ 
  category, 
  locale,
  currentPage,
  totalPages,
  onPageChange,
  currentFilter,
  onFilterChange,
  counts,
  isAuthenticated,
}: CategoryNavigationProps) => {
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

  const filters: { key: LearnedStatus; label: string; count: number }[] = [
    { key: 'all', label: t('filters.all'), count: counts?.all ?? 0 },
    { key: 'learned', label: t('filters.learned'), count: counts?.learned ?? 0 },
    { key: 'not-learned', label: t('filters.notLearned'), count: counts?.notLearned ?? 0 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <Link 
            href={`/check-knowledge/${locale}`}
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

          {/* Filter Tabs - only show when authenticated */}
          {isAuthenticated && (
            <div className={styles.filterTabs}>
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  className={`${styles.filterTab} ${currentFilter === filter.key ? styles.filterTabActive : ''}`}
                  onClick={() => onFilterChange(filter.key)}
                >
                  <span className={styles.filterLabel}>{filter.label}</span>
                  <span className={styles.filterCount}>{filter.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>

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
            <span className={styles.totalPages}>{totalPages || 1}</span>
          </div>
          <button 
            className={styles.paginationButton}
            onClick={handleNext}
            disabled={currentPage >= totalPages}
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
