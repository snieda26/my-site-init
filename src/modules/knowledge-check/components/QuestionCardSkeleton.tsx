'use client';

import styles from './QuestionCardSkeleton.module.scss';

interface QuestionCardSkeletonProps {
  index: number;
}

export const QuestionCardSkeleton = ({ index }: QuestionCardSkeletonProps) => {
  return (
    <div 
      className={styles.card}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={styles.header}>
        <div className={styles.questionInfo}>
          <div className={styles.badge} />
          <div className={styles.title} />
        </div>
        <div className={styles.statusButton} />
      </div>
      <div className={styles.content}>
        <div className={styles.accordionButton} />
      </div>
    </div>
  );
};
