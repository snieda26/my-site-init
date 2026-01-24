'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import styles from './ProblemsPagination.module.scss';

interface ProblemsPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export const ProblemsPagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: ProblemsPaginationProps) => {
  const t = useTranslations('problems.pagination');
  const [itemsPerPageOpen, setItemsPerPageOpen] = useState(false);
  const itemsPerPageRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (itemsPerPageRef.current && !itemsPerPageRef.current.contains(event.target as Node)) {
        setItemsPerPageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const itemsPerPageOptions = [10, 20, 50];

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

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 3;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 1) {
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }

    return pages;
  };

  return (
    <div className={styles.container}>
      <div className={styles.itemsPerPage} ref={itemsPerPageRef}>
        <button
          type="button"
          className={styles.itemsPerPageButton}
          onClick={() => setItemsPerPageOpen(!itemsPerPageOpen)}
        >
          <span>{itemsPerPage}</span>
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
            className={styles.chevron}
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        {itemsPerPageOpen && (
          <div className={styles.itemsPerPageMenu}>
            {itemsPerPageOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.menuItem} ${itemsPerPage === option ? styles.active : ''}`}
                onClick={() => {
                  onItemsPerPageChange(option);
                  setItemsPerPageOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <nav className={styles.pagination} aria-label="pagination">
        <ul className={styles.paginationList}>
          <li>
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
          </li>
          {getPageNumbers().map((page, index) => (
            <li key={index}>
              {typeof page === 'number' ? (
                <button
                  className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </button>
              ) : (
                <span className={styles.ellipsis}>{page}</span>
              )}
            </li>
          ))}
          <li>
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
          </li>
        </ul>
      </nav>
    </div>
  );
};
