'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { useLocale, useLocalePath } from '@/common/hooks';
import { useCategoriesWithQuestions } from '@/modules/questions';
import { getLocalizedCategoryName, getLocalizedTitle } from '@/modules/questions/types/questions.types';
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

  // Fetch categories with questions from API
  const { data: categoriesData, isLoading } = useCategoriesWithQuestions();

  // Build sections from API data
  const allSections: Section[] = useMemo(() => {
    if (!categoriesData) return [];
    
    return categoriesData.map(category => ({
      id: category.slug,
      title: getLocalizedCategoryName(category, locale as 'en' | 'ua'),
      href: `/interview-questions/${category.slug}`,
      children: category.questions.map(q => ({
        title: getLocalizedTitle(q, locale as 'en' | 'ua'),
        href: `/interview-questions/${category.slug}/${q.slug}`,
      })),
    }));
  }, [categoriesData, locale]);

  // For now, show all sections (filtering disabled)
  const sections = allSections;
  const isFiltering = false;
  const hiddenCount = 0;

  // Show loading state
  if (isLoading) {
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
              <p style={{ padding: '1rem', opacity: 0.6 }}>Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav className={styles.sidebar} aria-label="Sidebar">
      <div className={styles.scrollArea}>
        <div className={styles.content}>
          {/* Top Navigation */}
          <div className={styles.section}>
            <ul className={styles.navList}>
              <li>
                <Link href={`/${locale}`} className={styles.brandLink}>
                  {t('brand')}
                </Link>
              </li>
              <li>
                <Link href={localePath('/interview-questions/frontend-interview-preparation-guide')} className={styles.brandLink}>
                  {t('preparationGuide')}
                </Link>
              </li>
            </ul>
          </div>

          <hr className={styles.separator} />

          {/* Interview Questions Sections */}
          <div className={styles.section}>
            <h5 className={styles.sectionTitle}>{t('sections.title')}</h5>
            <ul className={styles.subList}>
              {sections.map((section) => {
                const isExpanded = expandedSections.has(section.id);
                const hasChildren = section.children && section.children.length > 0;
                
                return (
                  <li key={section.id} className={styles.sectionItem}>
                    {hasChildren ? (
                      <>
                        <div className={styles.sectionHeader}>
                          <Link href={localePath(section.href)} className={styles.sectionLink}>
                            <span>{section.title}</span>
                          </Link>
                          <button
                            className={styles.sectionToggle}
                            onClick={() => toggleSection(section.id)}
                            aria-expanded={isExpanded}
                          >
                            <svg
                              stroke="currentColor"
                              fill="none"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`${styles.toggleIcon} ${isExpanded ? styles.toggleIconExpanded : ''}`}
                            >
                              <path d={isExpanded ? "m6 9 6 6 6-6" : "m9 18 6-6-6-6"} />
                            </svg>
                          </button>
                        </div>
                        <div 
                          className={`${styles.childrenContainer} ${isExpanded ? styles.childrenExpanded : styles.childrenCollapsed}`}
                        >
                          <ul className={styles.childrenList}>
                            {section.children!.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={localePath(child.href)}
                                  className={styles.childLink}
                                >
                                  {child.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link href={localePath(section.href)} className={styles.link}>
                        {section.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <hr className={styles.separator} />

          {/* Additional Resources */}
          <div className={styles.section}>
            <h5 className={styles.sectionTitle}>{locale === 'ua' ? 'Ресурси' : 'Resources'}</h5>
            <ul className={styles.subList}>
              <li>
                <Link href={localePath('/interview-questions/git')} className={styles.link}>
                  {t('gitCheatSheet')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Show toggle for filtered content */}
          {isFiltering && hiddenCount && hiddenCount > 0 && (
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
          )}
        </div>
      </div>
    </nav>
  );
};
