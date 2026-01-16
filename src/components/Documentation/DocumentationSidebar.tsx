'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styles from './DocumentationSidebar.module.scss';

interface Section {
  title: string;
  href: string;
  children?: Section[];
}

export const DocumentationSidebar = () => {
  const t = useTranslations('docs');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (title: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedSections(newExpanded);
  };

  const sections: Section[] = [
    {
      title: t('sections.htmlCss'),
      href: '/interview-questions/html-and-css',
      children: []
    },
    {
      title: t('sections.javascript'),
      href: '/interview-questions/javascript',
      children: []
    },
    {
      title: t('sections.typescript'),
      href: '/interview-questions/typescript',
      children: []
    },
    {
      title: t('sections.react'),
      href: '/interview-questions/react',
      children: []
    },
    {
      title: t('sections.vue'),
      href: '/interview-questions/vue',
      children: []
    },
    {
      title: t('sections.angular'),
      href: '/interview-questions/angular',
      children: []
    },
    {
      title: t('sections.redux'),
      href: '/interview-questions/redux',
      children: []
    },
    {
      title: t('sections.generalQuestions'),
      href: '/interview-questions/general-questions',
      children: []
    },
    {
      title: t('sections.architecture'),
      href: '/interview-questions/architecture',
      children: []
    },
    {
      title: t('sections.principles'),
      href: '/interview-questions/principles',
      children: []
    },
    {
      title: t('sections.patterns'),
      href: '/interview-questions/patterns',
      children: []
    }
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.scrollArea}>
        <div className={styles.content}>
          <div className={styles.section}>
            <Link href="/" className={styles.brandLink}>
              {t('brand')}
            </Link>
          </div>

          <div className={styles.section}>
            <Link href="/interview-questions/frontend-interview-preparation-guide" className={styles.link}>
              {t('preparationGuide')}
            </Link>
          </div>

          <hr className={styles.divider} />

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('sections.title')}</h2>
            {sections.map((section) => (
              <div key={section.title} className={styles.sectionItem}>
                <div className={styles.sectionHeader}>
                  <Link href={section.href} className={styles.link}>
                    {section.title}
                  </Link>
                  {section.children && section.children.length > 0 && (
                    <button
                      className={styles.toggleBtn}
                      onClick={() => toggleSection(section.title)}
                      aria-expanded={expandedSections.has(section.title)}
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className={styles.toggleIcon}
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <hr className={styles.divider} />

          <div className={styles.section}>
            <Link href="/interview-questions/git" className={styles.link}>
              {t('gitCheatSheet')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
