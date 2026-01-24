'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from '@/common/hooks';
import styles from './TabNavigation.module.scss';

interface TabNavigationProps {
  activeTab: 'problems' | 'react-problems' | 'quizzes';
  onTabChange: (tab: 'problems' | 'react-problems' | 'quizzes') => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const t = useTranslations('problems.tabs');
  const locale = useLocale();

  const tabs = [
    { id: 'problems' as const, label: t('problems'), href: `/problems/${locale}` },
    { id: 'react-problems' as const, label: t('reactProblems'), href: `/problems/react-problems/${locale}` },
    { id: 'quizzes' as const, label: t('quizzes'), href: `/problems/quizzes/${locale}` },
  ];

  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onTabChange(tab.id);
          }}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};
