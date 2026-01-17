'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useLocale, useLocalePath } from '@/common/hooks';
import { docsConfig } from '@/content/docs/_config';
import styles from './QuestionsGrid.module.scss';

export const QuestionsGrid = () => {
  const locale = useLocale();
  const localePath = useLocalePath();

  // Build sections with questions
  const sections = useMemo(() => docsConfig.map(section => ({
    id: section.id,
    title: section.title[locale as 'en' | 'ua'] || section.title.en,
    questions: section.questions.map((q, index) => ({
      number: `${index + 1}`,
      title: q.title[locale as 'en' | 'ua'] || q.title.en,
      href: `/interview-questions/${section.id}/${q.slug}`,
    })),
  })).filter(section => section.questions.length > 0), [locale]);

  // Group sections into columns for better layout
  const groupedSections = useMemo(() => {
    const result: typeof sections[] = [[], [], []];
    sections.forEach((section, index) => {
      result[index % 3].push(section);
    });
    return result;
  }, [sections]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {locale === 'ua' ? 'Питання для співбесіди' : 'Interview Questions'}
        </h1>
        <p className={styles.subtitle}>
          {locale === 'ua' 
            ? 'Вивчайте теорію та готуйтесь до технічних співбесід'
            : 'Study theory and prepare for technical interviews'}
        </p>
      </div>

      <div className={styles.grid}>
        {groupedSections.map((column, columnIndex) => (
          <div key={columnIndex} className={styles.column}>
            {column.map((section) => (
              <div key={section.id} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <div className={styles.questions}>
                  {section.questions.map((question) => (
                    <Link
                      key={question.href}
                      href={localePath(question.href)}
                      className={styles.questionLink}
                    >
                      <span className={styles.questionNumber}>{question.number}.</span>
                      <span className={styles.questionTitle}>{question.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {sections.length === 0 && (
        <div className={styles.empty}>
          <p>
            {locale === 'ua' 
              ? 'Питання скоро будуть додані...'
              : 'Questions coming soon...'}
          </p>
        </div>
      )}
    </div>
  );
};
