'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useLocale, useLocalePath } from '@/common/hooks';
import { docsConfig } from '@/content/docs/_config';
import styles from './DocumentationSidebar.module.scss';

interface Section {
  id: string;
  title: string;
  href: string;
  children?: { title: string; href: string }[];
}

export const DocumentationSidebar = () => {
  const t = useTranslations('docs');
  const locale = useLocale();
  const localePath = useLocalePath();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  // Build sections from config
  const sections: Section[] = docsConfig.map(section => ({
    id: section.id,
    title: section.title[locale as 'en' | 'ua'] || section.title.en,
    href: `/interview-questions/${section.id}`,
    children: section.questions.map(q => ({
      title: q.title[locale as 'en' | 'ua'] || q.title.en,
      href: `/interview-questions/${section.id}/${q.slug}`,
    })),
  }));

  return (
    <div className={styles.sidebar}>
      <div className={styles.scrollArea}>
        <div className={styles.content}>
          <div className={styles.section}>
            <Link href={`/${locale}`} className={styles.brandLink}>
              {t('brand')}
            </Link>
          </div>

          <div className={styles.section}>
            <Link href={localePath('/interview-questions/frontend-interview-preparation-guide')} className={styles.link}>
              {t('preparationGuide')}
            </Link>
          </div>

          <hr className={styles.divider} />

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('sections.title')}</h2>
            {sections.map((section) => {
              const isExpanded = expandedSections.has(section.id);
              const hasChildren = section.children && section.children.length > 0;
              
              return (
                <div key={section.id} className={styles.sectionItem}>
                  <div className={styles.sectionHeader}>
                    {hasChildren ? (
                      <button
                        className={styles.sectionToggle}
                        onClick={() => toggleSection(section.id)}
                        aria-expanded={isExpanded}
                      >
                        <span className={styles.link}>{section.title}</span>
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          className={`${styles.toggleIcon} ${isExpanded ? styles.toggleIconExpanded : ''}`}
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    ) : (
                      <Link href={localePath(section.href)} className={styles.link}>
                        {section.title}
                      </Link>
                    )}
                  </div>
                  {hasChildren && (
                    <div 
                      className={`${styles.childrenContainer} ${isExpanded ? styles.childrenExpanded : styles.childrenCollapsed}`}
                    >
                      <div className={styles.childrenList}>
                        {section.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={localePath(child.href)}
                            className={styles.childLink}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <hr className={styles.divider} />

          <div className={styles.section}>
            <Link href={localePath('/interview-questions/git')} className={styles.link}>
              {t('gitCheatSheet')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
