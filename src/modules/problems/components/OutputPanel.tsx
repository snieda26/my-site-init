'use client';

import { useState } from 'react';
import { CheckCircle, Terminal, XCircle, Clock } from 'lucide-react';
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
  // Backend wraps each value with JSON.stringify, separated by literal \n
  const formatConsoleOutput = (output: string): string[] => {
    if (!output) return [];
    
    const results: string[] = [];
    let i = 0;
    
    while (i < output.length) {
      // Skip separator (literal backslash + n)
      if (output[i] === '\\' && output[i + 1] === 'n') {
        i += 2;
        continue;
      }
      
      // Skip whitespace
      if (output[i] === ' ' || output[i] === '\t') {
        i++;
        continue;
      }
      
      const char = output[i];
      
      if (char === '"') {
        // Parse JSON string value
        let end = i + 1;
        while (end < output.length) {
          if (output[end] === '\\' && end + 1 < output.length) {
            end += 2; // Skip escaped character
          } else if (output[end] === '"') {
            end++;
            break;
          } else {
            end++;
          }
        }
        const jsonStr = output.slice(i, end);
        try {
          const parsed = JSON.parse(jsonStr);
          if (String(parsed).trim()) results.push(String(parsed));
        } catch {
          const raw = jsonStr.slice(1, -1).replace(/\\n/g, '\n').replace(/\\t/g, '\t');
          if (raw.trim()) results.push(raw);
        }
        i = end;
      } else if (char === '{' || char === '[') {
        // Parse object or array
        const closeChar = char === '{' ? '}' : ']';
        let depth = 1;
        let end = i + 1;
        let inString = false;
        while (end < output.length && depth > 0) {
          if (output[end] === '\\' && inString) {
            end += 2;
            continue;
          }
          if (output[end] === '"') {
            inString = !inString;
          }
          if (!inString) {
            if (output[end] === char) depth++;
            if (output[end] === closeChar) depth--;
          }
          end++;
        }
        const jsonVal = output.slice(i, end);
        try {
          const parsed = JSON.parse(jsonVal);
          results.push(JSON.stringify(parsed, null, 2));
        } catch {
          results.push(jsonVal);
        }
        i = end;
      } else if ((char >= '0' && char <= '9') || char === '-') {
        // Parse number
        let end = i;
        while (end < output.length && /[\d.\-eE+]/.test(output[end])) {
          end++;
        }
        results.push(output.slice(i, end));
        i = end;
      } else if (output.slice(i, i + 4) === 'true') {
        results.push('true');
        i += 4;
      } else if (output.slice(i, i + 5) === 'false') {
        results.push('false');
        i += 5;
      } else if (output.slice(i, i + 4) === 'null') {
        results.push('null');
        i += 4;
      } else {
        i++; // Skip unknown character
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
            <CheckCircle size={16} />
            Output
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'console' ? styles.active : ''}`}
            onClick={() => setActiveTab('console')}
          >
            <Terminal size={16} />
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
                        <CheckCircle size={18} />
                      ) : (
                        <XCircle size={18} />
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
                <Clock size={48} strokeWidth={1.5} />
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
                <Terminal size={48} strokeWidth={1.5} />
                <p className={styles.emptyTitle}>Console logs will appear here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
