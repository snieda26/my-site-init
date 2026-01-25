'use client';

import styles from './ProblemDescription.module.scss';

interface Problem {
  title: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  companies?: Array<{ name: string }>;
  testCases?: string;
}

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const difficultyColors = {
    EASY: styles.easy,
    MEDIUM: styles.medium,
    HARD: styles.hard,
  };

  // Parse test cases for examples
  const examples = problem.testCases ? (() => {
    try {
      const testCases = JSON.parse(problem.testCases);
      return testCases.slice(0, 2).map((tc: any) => ({
        input: JSON.stringify(tc.input),
        output: JSON.stringify(tc.expected),
      }));
    } catch {
      return [];
    }
  })() : [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{problem.title}</h1>
        <div className={styles.meta}>
          <span className={`${styles.difficulty} ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
        </div>
      </div>

      {problem.companies && problem.companies.length > 0 && (
        <div className={styles.companies}>
          {problem.companies.map((company, index) => (
            <span key={index} className={styles.companyTag}>
              {company.name}
            </span>
          ))}
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.description}>
          <p>{problem.description}</p>
        </div>

        {examples.length > 0 && (
          <div className={styles.examples}>
            <h3 className={styles.examplesTitle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              Examples:
            </h3>
            {examples.map((example: any, index: number) => (
              <div key={index} className={styles.example}>
                <div className={styles.exampleInput}>
                  <span className={styles.exampleLabel}>Input {index + 1}:</span>
                  <code>{example.input}</code>
                </div>
                <div className={styles.exampleOutput}>
                  <span className={styles.exampleLabel}>Output {index + 1}:</span>
                  <code>{example.output}</code>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
