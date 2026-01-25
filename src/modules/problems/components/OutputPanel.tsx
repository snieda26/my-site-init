'use client';

import { useState } from 'react';
import styles from './OutputPanel.module.scss';

interface TestResult {
  passed: boolean;
  input: any;
  expected: any;
  actual: any;
  error?: string;
}

interface OutputPanelProps {
  output: string;
  testResults?: TestResult[];
  consoleOutput?: string;
}

export function OutputPanel({ output, testResults, consoleOutput }: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState<'output' | 'console'>('output');

  const formatValue = (value: any): string => {
    if (value === undefined) return '';
    if (value === null) return 'null';
    return JSON.stringify(value);
  };

  // Parse console output - each console.log execution should be separate
  // Backend wraps each value with JSON.stringify, so we need to parse JSON values
  const formatConsoleOutput = (output: string): string[] => {
    if (!output) return [];
    
    const results: string[] = [];
    
    // Match JSON string values: "..." handling escaped quotes and other escapes
    // This regex matches: opening quote, then any non-quote/non-backslash OR any escaped char, then closing quote
    const jsonStringRegex = /"(?:[^"\\]|\\.)*"/g;
    
    let match;
    while ((match = jsonStringRegex.exec(output)) !== null) {
      try {
        // Parse the JSON string to get actual content (converts \n to real newlines)
        const parsed = JSON.parse(match[0]);
        if (parsed !== '' && String(parsed).trim() !== '') {
          results.push(String(parsed));
        }
      } catch {
        // If parsing fails, use raw match without outer quotes
        const raw = match[0].slice(1, -1);
        if (raw.trim() !== '') {
          results.push(raw.replace(/\\n/g, '\n').replace(/\\t/g, '\t'));
        }
      }
    }
    
    // Also handle non-string JSON values (numbers, booleans, arrays, objects)
    // that might appear between string matches
    const nonStringRegex = /(?<=\\n|^)(\d+\.?\d*|true|false|null|\[[\s\S]*?\]|\{[\s\S]*?\})(?=\\n|$)/g;
    let nonStringMatch;
    while ((nonStringMatch = nonStringRegex.exec(output)) !== null) {
      if (nonStringMatch[1].trim() !== '') {
        results.push(nonStringMatch[1]);
      }
    }
    
    return results;
  };

  const consoleLines = formatConsoleOutput(consoleOutput || '');

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
            {testResults && testResults.length > 0 ? (
              <div className={styles.testResults}>
                {testResults.map((test, index) => (
                  <div 
                    key={index} 
                    className={`${styles.testCase} ${test.passed ? styles.passed : styles.failed}`}
                  >
                    <div className={styles.testIcon}>
                      {test.passed ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                      )}
                    </div>
                    <div className={styles.testContent}>
                      <div className={styles.testRow}>
                        <span className={styles.testLabel}>Input:</span>
                        <code className={styles.testValue}>{formatValue(test.input)}</code>
                      </div>
                      <div className={styles.testRow}>
                        <span className={styles.testLabel}>Output:</span>
                        <code className={styles.testValue}>{formatValue(test.actual)}</code>
                      </div>
                      <div className={styles.testRow}>
                        <span className={styles.testLabel}>Expected:</span>
                        <code className={styles.testValue}>{formatValue(test.expected)}</code>
                      </div>
                      {test.error && (
                        <div className={styles.testRow}>
                          <span className={styles.testLabel}>Error:</span>
                          <code className={`${styles.testValue} ${styles.errorText}`}>{test.error}</code>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : output ? (
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
            {consoleLines.length > 0 ? (
              <div className={styles.consoleLogs}>
                {consoleLines.map((line, index) => (
                  <div key={index} className={styles.consoleLine}>
                    <span className={styles.consolePrompt}>&gt;</span>
                    <code className={styles.consoleValue}>{line}</code>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <p className={styles.emptyTitle}>Console logs will appear here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
