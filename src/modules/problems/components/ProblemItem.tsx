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
    companies: string[];
  };
  locale: string;
}

export const ProblemItem = ({ problem, locale }: ProblemItemProps) => {
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
            {/* Status icons or actions can go here */}
          </div>
        </div>
        <div className={styles.companies}>
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
