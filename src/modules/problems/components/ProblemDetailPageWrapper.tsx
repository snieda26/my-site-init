'use client';

import { useEffect, useState } from 'react';
import { ProblemDetailPage } from './ProblemDetailPage';
import { ReactProblemDetailPage } from './ReactProblemDetailPage';

interface Problem {
  id: string;
  slug: string;
  category?: 'javascript' | 'react' | 'typescript' | 'other';
}

interface ProblemDetailPageWrapperProps {
  slug: string;
}

const loadingStyles: React.CSSProperties = {
  position: 'fixed',
  top: 80,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 20,
  background: '#0a0a0a',
  zIndex: 40,
};

const spinnerStyles: React.CSSProperties = {
  width: 44,
  height: 44,
  border: '3px solid #1e1e1e',
  borderTopColor: '#7c3aed',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite',
};

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
      <>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={loadingStyles}>
          <div style={spinnerStyles} />
          <p style={{ margin: 0, fontSize: 14, color: '#888' }}>Loading problem...</p>
        </div>
      </>
    );
  }

  // Render React-specific page for React problems
  if (problem?.category === 'react') {
    return <ReactProblemDetailPage slug={slug} />;
  }

  // Default to JavaScript problem page
  return <ProblemDetailPage slug={slug} />;
}
