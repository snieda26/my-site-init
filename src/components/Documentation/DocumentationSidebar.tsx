'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { useLocale, useLocalePath } from '@/common/hooks';
import { docsConfig } from '@/content/docs/_config';
import { useFilteredSections } from '@/modules/onboarding/hooks/use-filtered-content';
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
  const [showAllSections, setShowAllSections] = useState(false);

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
  const allSections: Section[] = useMemo(() => docsConfig.map(section => ({
    id: section.id,
    title: section.title[locale as 'en' | 'ua'] || section.title.en,
    href: `/interview-questions/${section.id}`,
    children: section.questions.map(q => ({
      title: q.title[locale as 'en' | 'ua'] || q.title.en,
      href: `/interview-questions/${section.id}/${q.slug}`,
    })),
  })), [locale]);

  // Get all section IDs for filtering
  const allSectionIds = useMemo(() => docsConfig.map(s => s.id), []);
  
  // Use the filtering hook
  const { sections: visibleSectionIds, isFiltering, hiddenCount } = useFilteredSections(allSectionIds);

  // Filter sections based on user preferences (or show all if showAllSections is true)
  const sections = useMemo(() => {
    if (showAllSections || !isFiltering) {
      return allSections;
    }
    return allSections.filter(section => visibleSectionIds.includes(section.id));
  }, [allSections, visibleSectionIds, isFiltering, showAllSections]);

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

          {/* Show toggle for filtered content */}
          {isFiltering && hiddenCount && hiddenCount > 0 && (
            <>
              <hr className={styles.divider} />
              <div className={styles.section}>
                <button
                  className={styles.filterToggle}
                  onClick={() => setShowAllSections(!showAllSections)}
                >
                  {showAllSections ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                      {locale === 'ua' ? 'Сховати інші розділи' : 'Hide other sections'}
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {locale === 'ua' ? `Показати всі (ще ${hiddenCount})` : `Show all (${hiddenCount} more)`}
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
