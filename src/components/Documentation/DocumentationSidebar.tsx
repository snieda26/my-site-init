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
      children: [
        { title: 'What is React and Why is it Needed?', href: '/interview-questions/react/what-is-react' },
        { title: 'Virtual DOM in React', href: '/interview-questions/react/virtual-dom' },
        { title: 'React Fiber and Virtual DOM Update Process', href: '/interview-questions/react/react-fiber' },
        { title: 'Why is key Needed in React?', href: '/interview-questions/react/why-key' },
        { title: 'What is Batching in React?', href: '/interview-questions/react/batching' },
        { title: 'What is JSX in React?', href: '/interview-questions/react/jsx' },
        { title: 'How useState Works in React?', href: '/interview-questions/react/usestate' },
        { title: 'How useEffect Works in React?', href: '/interview-questions/react/useeffect' },
        { title: 'How useLayoutEffect Works in React and How Does it Differ from useEffect?', href: '/interview-questions/react/uselayout-effect' },
        { title: 'How useRef Works in React?', href: '/interview-questions/react/useref' },
        { title: 'Why useImperativeHandle is Needed in React', href: '/interview-questions/react/useimperative-handle' },
        { title: 'How useCallback Works and Why is it Needed', href: '/interview-questions/react/usecallback' },
        { title: 'How useMemo Works and Why is it Needed', href: '/interview-questions/react/usememo' },
      ]
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
            {sections.map((section) => {
              const isExpanded = expandedSections.has(section.title);
              const hasChildren = section.children && section.children.length > 0;
              
              return (
                <div key={section.title} className={styles.sectionItem}>
                  <div className={styles.sectionHeader}>
                    {hasChildren ? (
                      <button
                        className={styles.sectionToggle}
                        onClick={() => toggleSection(section.title)}
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
                      <Link href={section.href} className={styles.link}>
                        {section.title}
                      </Link>
                    )}
                  </div>
                  {hasChildren && (
                    <div 
                      className={`${styles.childrenContainer} ${isExpanded ? styles.childrenExpanded : styles.childrenCollapsed}`}
                    >
                      <div className={styles.childrenList}>
                        {section.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
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
            <Link href="/interview-questions/git" className={styles.link}>
              {t('gitCheatSheet')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
