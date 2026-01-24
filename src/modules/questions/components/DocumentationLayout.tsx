'use client';

import { DocumentationSidebar } from './DocumentationSidebar';
import { TableOfContents } from './TableOfContents';
import styles from './DocumentationLayout.module.scss';

interface DocumentationLayoutProps {
  children: React.ReactNode;
}

export const DocumentationLayout = ({ children }: DocumentationLayoutProps) => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <DocumentationSidebar />
      </aside>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          {children}
        </div>
        <aside className={styles.toc}>
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
};
