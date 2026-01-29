'use client';

import Link from 'next/link';
import { useRef, MouseEvent } from 'react';
import { Check } from 'lucide-react';
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
                <Check size={12} strokeWidth={3} />
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
