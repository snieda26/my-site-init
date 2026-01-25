'use client';

import { Reveal, AnimatedBackground } from '@/components/Landing';
import { KnowledgeCheckHero } from './KnowledgeCheckHero';
import { LoginPromptCard } from './LoginPromptCard';
import { HowItWorks } from './HowItWorks';
import { CategoryGrid } from './CategoryGrid';
import styles from './KnowledgeCheckPage.module.scss';

export const KnowledgeCheckPage = () => {
  return (
    <div className={styles.page}>
      <AnimatedBackground />
      <div className={styles.content}>
        <div className={styles.container}>
          {/* <KnowledgeCheckHero /> */}
          
          {/* <Reveal delay={100}>
            <LoginPromptCard />
          </Reveal> */}
          
          <Reveal delay={100}>
            <HowItWorks />
          </Reveal>
          
          <Reveal delay={200}>
            <CategoryGrid />
          </Reveal>
        </div>
      </div>
    </div>
  );
};
