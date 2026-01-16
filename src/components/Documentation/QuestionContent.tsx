'use client';

import { useTranslations } from 'next-intl';
import { MarkdownContent } from './MarkdownContent';
import styles from './QuestionContent.module.scss';

interface QuestionContentProps {
  section: string;
  question: string;
}

export const QuestionContent = ({ section, question }: QuestionContentProps) => {
  let title = question;
  let markdownContent = '';
  
  try {
    const t = useTranslations(`docs.questions.questions.${section}.${question}`);
    title = t('title');
    // Use raw() to get the markdown string without parsing as translation template
    const rawContent = t.raw('content');
    if (typeof rawContent === 'string') {
      markdownContent = rawContent;
    }
  } catch (e) {
    // Translation not found, use defaults
    title = question.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  if (!markdownContent) {
    return (
      <div className={styles.typography}>
        <h1 className={styles.title}>{title}</h1>
        <p>Content for this question is not available yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.typography}>
      <h1 className={styles.title}>{title}</h1>
      <MarkdownContent content={markdownContent} />
    </div>
  );
};
