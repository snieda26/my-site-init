'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/common/hooks';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import apiClient from '@/infrastructure/api/client';
import { ProblemItem } from './ProblemItem';
import styles from './ProblemList.module.scss';

interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: string;
  companies?: Array<{ id: string; name: string }>;
}

interface ProblemListProps {
  activeTab: 'problems' | 'react-problems' | 'quizzes';
  statusFilter: string;
  companyFilter: string;
  currentPage: number;
  itemsPerPage: number;
}

export const getTotalPages = (
  totalProblems: number,
  itemsPerPage: number
) => {
  return Math.ceil(totalProblems / itemsPerPage);
};

export const ProblemList = ({
  activeTab,
  statusFilter,
  companyFilter,
  currentPage,
  itemsPerPage,
}: ProblemListProps) => {
  const locale = useLocale();
  const { isAuthenticated } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [solvedProblemIds, setSolvedProblemIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
    if (isAuthenticated) {
      fetchSolvedProblems();
    }
  }, [isAuthenticated]);

  const fetchProblems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:4000/api/problems');
      if (response.ok) {
        const data = await response.json();
        // Handle both paginated and direct array responses
        const problemsData = data.data || data;
        setProblems(Array.isArray(problemsData) ? problemsData : []);
      }
    } catch (error) {
      console.error('Failed to fetch problems:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSolvedProblems = async () => {
    try {
      const response = await apiClient.get('/problems/solved/me');
      const solved = response.data?.solved || [];
      setSolvedProblemIds(new Set(solved.map((s: any) => s.problemId)));
    } catch (error) {
      console.error('Failed to fetch solved problems:', error);
    }
  };

  // Filter by company
  let filtered = problems;
  if (companyFilter !== 'all') {
    filtered = filtered.filter(problem =>
      problem.companies?.some(comp =>
        comp.name.toLowerCase() === companyFilter.toLowerCase()
      )
    );
  }

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProblems = filtered.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading problems...</div>
      </div>
    );
  }

  if (problems.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>No problems found</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {paginatedProblems.map((problem, index) => (
          <ProblemItem
            key={problem.id}
            problem={{
              id: problem.id,
              slug: problem.slug,
              number: startIndex + index + 1,
              title: problem.title,
              companies: problem.companies?.map(c => c.name) || [],
            }}
            locale={locale}
            isSolved={solvedProblemIds.has(problem.id)}
          />
        ))}
      </ul>
    </div>
  );
};
