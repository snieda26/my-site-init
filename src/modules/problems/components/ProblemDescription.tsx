'use client';

import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './ProblemDescription.module.scss';

interface Problem {
  title: string;
  titleUa?: string;
  description: string;
  descriptionUa?: string;
  difficulty: 'JUNIOR' | 'MIDDLE' | 'SENIOR';
  companies?: Array<{ name: string }>;
  testCases?: string;
}

interface ProblemDescriptionProps {
  problem: Problem;
  isSolved?: boolean;
  hideExamples?: boolean;
}

export function ProblemDescription({ problem, isSolved = false, hideExamples = false }: ProblemDescriptionProps) {
  const params = useParams();
  const locale = params?.locale as string || 'en';
  const difficultyColors = {
    JUNIOR: styles.junior,
    MIDDLE: styles.middle,
    SENIOR: styles.senior,
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

  // Use Ukrainian if locale is 'ua' and Ukrainian version exists
  const title = locale === 'ua' && problem.titleUa ? problem.titleUa : problem.title;
  const description = locale === 'ua' && problem.descriptionUa ? problem.descriptionUa : problem.description;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.meta}>
          <span className={`${styles.difficulty} ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
          {isSolved && (
            <span className={styles.solvedBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Solved
            </span>
          )}
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
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // Style checkboxes properly
              input: ({ node, ...props }) => {
                if (props.type === 'checkbox') {
                  return <input {...props} className={styles.checkbox} />;
                }
                return <input {...props} />;
              },
              // Style links
              a: ({ node, ...props }) => (
                <a {...props} className={styles.link} target="_blank" rel="noopener noreferrer" />
              ),
              // Style code blocks
              code: ({ node, inline, ...props }) => (
                inline ? 
                  <code {...props} className={styles.inlineCode} /> : 
                  <code {...props} className={styles.codeBlock} />
              ),
              // Style lists
              ul: ({ node, ...props }) => <ul {...props} className={styles.list} />,
              ol: ({ node, ...props }) => <ol {...props} className={styles.orderedList} />,
              li: ({ node, ...props }) => <li {...props} className={styles.listItem} />,
              // Style headings
              h3: ({ node, ...props }) => <h3 {...props} className={styles.heading} />,
              h4: ({ node, ...props }) => <h4 {...props} className={styles.subheading} />,
              // Style paragraphs
              p: ({ node, ...props }) => <p {...props} className={styles.paragraph} />,
              // Style strong/bold text
              strong: ({ node, ...props }) => <strong {...props} className={styles.bold} />,
            }}
          >
            {description}
          </ReactMarkdown>
        </div>

        {!hideExamples && examples.length > 0 && (
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
