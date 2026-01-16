'use client';

import Link from 'next/link';
import styles from './ProblemItem.module.scss';

interface ProblemItemProps {
  problem: {
    id: string;
    number: number;
    title: string;
    companies: string[];
  };
  locale: string;
}

export const ProblemItem = ({ problem, locale }: ProblemItemProps) => {
  return (
    <li className={styles.item}>
      <Link
        href={`/${locale}/problems/${problem.id}`}
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
