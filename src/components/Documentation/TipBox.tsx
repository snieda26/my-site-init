'use client';

import styles from './TipBox.module.scss';

interface TipBoxProps {
  title?: string;
  content: string;
}

export const TipBox = ({ title = 'Tip:', content }: TipBoxProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
