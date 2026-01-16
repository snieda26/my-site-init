'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './TabNavigation.module.scss';

interface TabNavigationProps {
  activeTab: 'problems' | 'react-problems' | 'quizzes';
  onTabChange: (tab: 'problems' | 'react-problems' | 'quizzes') => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const t = useTranslations('problems.tabs');
  const params = useParams();
  const locale = params.locale as string;

  const tabs = [
    { id: 'problems' as const, label: t('problems'), href: `/${locale}/problems` },
    { id: 'react-problems' as const, label: t('reactProblems'), href: `/${locale}/problems/react-problems` },
    { id: 'quizzes' as const, label: t('quizzes'), href: `/${locale}/problems/quizzes` },
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
