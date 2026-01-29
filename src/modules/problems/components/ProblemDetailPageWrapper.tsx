'use client';

import { useEffect, useState } from 'react';
import { ProblemDetailPage } from './ProblemDetailPage';
import { ReactProblemDetailPage } from './ReactProblemDetailPage';
import styles from './ProblemDetailPage.module.scss';

interface Problem {
  id: string;
  slug: string;
  category?: 'javascript' | 'react' | 'typescript' | 'other';
}

interface ProblemDetailPageWrapperProps {
  slug: string;
}

export function ProblemDetailPageWrapper({ slug }: ProblemDetailPageWrapperProps) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProblemCategory = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:4000/api/problems/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setProblem(data);
        }
      } catch (error) {
        console.error('Failed to fetch problem:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblemCategory();
  }, [slug]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading problem...</p>
      </div>
    );
  }

  // Render React-specific page for React problems
  if (problem?.category === 'react') {
    return <ReactProblemDetailPage slug={slug} />;
  }

  // Default to JavaScript problem page
  return <ProblemDetailPage slug={slug} />;
}
