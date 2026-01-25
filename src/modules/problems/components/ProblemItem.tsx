'use client';

import Link from 'next/link';
import { useRef, MouseEvent } from 'react';
import styles from './ProblemItem.module.scss';

interface ProblemItemProps {
  problem: {
    id: string;
    slug?: string;
    number: number;
    title: string;
    difficulty: 'JUNIOR' | 'MIDDLE' | 'SENIOR';
    companies: string[];
  };
  locale: string;
  isSolved?: boolean;
}

export const ProblemItem = ({ problem, locale, isSolved = false }: ProblemItemProps) => {
  const problemSlug = problem.slug || problem.id;
  const itemRef = useRef<HTMLLIElement>(null);
  
  const handleMouseMove = (e: MouseEvent<HTMLLIElement>) => {
    if (!itemRef.current) return;
    
    const rect = itemRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    itemRef.current.style.setProperty('--mouse-x', `${x}px`);
    itemRef.current.style.setProperty('--mouse-y', `${y}px`);
  };
  
  return (
    <li 
      ref={itemRef}
      className={styles.item}
      onMouseMove={handleMouseMove}
    >
      <Link
        href={`/${locale}/problems/${problemSlug}`}
        className={styles.link}
      >
        <div className={styles.header}>
          <div className={styles.title}>
            {problem.number}. {problem.title}
          </div>
          <div className={styles.actions}>
            {isSolved && (
              <span className={styles.solvedBadge}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Solved
              </span>
            )}
          </div>
        </div>
        <div className={styles.tags}>
          <span className={`${styles.levelBadge} ${styles[problem.difficulty.toLowerCase()]}`}>
            {problem.difficulty}
          </span>
          {problem.companies.map((company) => (
            <span key={company} className={styles.badge}>
              {company}
            </span>
          ))}
        </div>
      </Link>
    </li>
  );
};
