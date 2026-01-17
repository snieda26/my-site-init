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
    href: `/interview-questions/${section.id}`,
    questions: section.questions.map((q) => ({
      title: q.title[locale as 'en' | 'ua'] || q.title.en,
      href: `/interview-questions/${section.id}/${q.slug}`,
    })),
  })).filter(section => section.questions.length > 0), [locale]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {locale === 'ua' ? 'Питання для співбесіди' : 'Interview Questions'}
        </h1>
        <p className={styles.subtitle}>
          {locale === 'ua' 
            ? 'Вивчайте теорію та готуйтесь до технічних співбесід. Оберіть тему нижче.'
            : 'Study theory and prepare for technical interviews. Choose a topic below.'}
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.list}>
          {sections.map((section) => (
            <div key={section.id} className={styles.listItem}>
              <div className={styles.listTitle}>
                <Link href={localePath(section.href)} className={styles.listLink}>
                  {section.title}
                </Link>
              </div>
              <ul className={styles.listSub}>
                {section.questions.map((question) => (
                  <li key={question.href} className={styles.listSubItem}>
                    <div className={styles.listSubTitle}>
                      <Link href={localePath(question.href)} className={styles.listSubLink}>
                        {question.title}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
