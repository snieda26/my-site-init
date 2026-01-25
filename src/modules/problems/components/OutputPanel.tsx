'use client';

import { useState } from 'react';
import styles from './OutputPanel.module.scss';

interface OutputPanelProps {
  output: string;
}

export function OutputPanel({ output }: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState<'output' | 'console'>('output');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'output' ? styles.active : ''}`}
            onClick={() => setActiveTab('output')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Output
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'console' ? styles.active : ''}`}
            onClick={() => setActiveTab('console')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            Console
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {activeTab === 'output' && (
          <div className={styles.outputContent}>
            {output ? (
              <pre className={styles.outputText}>{output}</pre>
            ) : (
              <div className={styles.emptyState}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <p className={styles.emptyTitle}>Run your code to see results</p>
                <p className={styles.emptySubtitle}>Click the Run button above</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'console' && (
          <div className={styles.consoleContent}>
            <div className={styles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              <p className={styles.emptyTitle}>Console logs will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
