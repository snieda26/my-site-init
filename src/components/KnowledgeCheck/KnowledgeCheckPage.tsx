'use client';

import { KnowledgeCheckHero } from './KnowledgeCheckHero';
import { LoginPromptCard } from './LoginPromptCard';
import { HowItWorks } from './HowItWorks';
import { CategoryGrid } from './CategoryGrid';
import styles from './KnowledgeCheckPage.module.scss';

export const KnowledgeCheckPage = () => {
  return (
    <div className={styles.container}>
      <KnowledgeCheckHero />
      <LoginPromptCard />
      <HowItWorks />
      <CategoryGrid />
    </div>
  );
};
