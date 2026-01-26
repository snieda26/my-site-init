'use client';

import { TableOfContents } from './TableOfContents';
import styles from './ArticleLayout.module.scss';

interface ArticleLayoutProps {
  children: React.ReactNode;
}

export const ArticleLayout = ({ children }: ArticleLayoutProps) => {
  return (
    <div className={styles.wrapper}>
      {/* Animated background effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.gradientOrb} />
        <div className={styles.gradientOrb} />
        <div className={styles.gradientOrb} />
        <div className={styles.gridPattern} />
      </div>
      
      <div className={styles.container}>
        <aside className={styles.tocSidebar}>
          <TableOfContents />
        </aside>
        <div className={styles.content}>
          <div className={styles.contentInner}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
