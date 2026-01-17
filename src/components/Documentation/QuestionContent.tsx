'use client';

import { MarkdownContent } from './MarkdownContent';
import styles from './QuestionContent.module.scss';

interface QuestionContentProps {
  title: string;
  content: string;
}

export const QuestionContent = ({ title, content }: QuestionContentProps) => {
  return (
    <div className={styles.typography}>
      <h1 className={styles.title}>{title}</h1>
      <MarkdownContent content={content} />
    </div>
  );
};
