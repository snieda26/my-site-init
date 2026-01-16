'use client';

import { useLocale } from '@/common/hooks';
import { ProblemItem } from './ProblemItem';
import styles from './ProblemList.module.scss';

interface ProblemListProps {
  activeTab: 'problems' | 'react-problems' | 'quizzes';
  statusFilter: string;
  companyFilter: string;
  currentPage: number;
  itemsPerPage: number;
}

// Mock data - in real app, this would come from an API or data source
const getProblems = (tab: string, status: string, company: string) => {
  const allProblems = [
    {
      id: 'cm6b5wm4a0029ih1prn41pwml',
      number: 1,
      title: 'K Most Frequent Elements',
      companies: ['EPAM', 'SoftServe', 'GlobalLogic'],
    },
    {
      id: 'cm6b5wfhc001gih1pheddzt5k',
      number: 2,
      title: 'Group Anagrams',
      companies: ['Grammarly', 'SoftServe', 'Luxoft'],
    },
    {
      id: 'cm6b5w4ro0004ih1px6xahwn6',
      number: 3,
      title: 'Extract Nodes by Type',
      companies: ['EPAM', 'Ciklum', 'GlobalLogic'],
    },
    {
      id: 'cm6b5w8ux000rih1pky1dueno',
      number: 4,
      title: 'Reverse Polish Notation Calculator',
      companies: ['EPAM', 'GlobalLogic'],
    },
    {
      id: 'cm6b5wibk001tih1pafpep7vc',
      number: 5,
      title: 'Capitalize Words in String',
      companies: ['GlobalLogic', 'Luxoft'],
    },
    {
      id: 'cm6b5wejq001dih1p72d9kx71',
      number: 6,
      title: 'Concatenate Strings from Objects',
      companies: ['Ciklum', 'SoftServe', 'Luxoft'],
    },
    {
      id: 'cm6b5wain000xih1pkag1ocar',
      number: 7,
      title: 'Find Indices of Elements for Sum',
      companies: ['GlobalLogic'],
    },
    {
      id: 'cm6b5wdu4001aih1pnrt9ff3t',
      number: 8,
      title: 'Find Deepest Maximum Element',
      companies: ['N-iX', 'Ciklum', 'Luxoft'],
    },
    {
      id: 'cm6b5whpi001qih1ps7s2hx17',
      number: 9,
      title: 'Find Strings with Substring',
      companies: ['GlobalLogic'],
    },
    {
      id: 'cm6b5wgab001jih1pf27mum8t',
      number: 10,
      title: 'Get Value from Object by Path',
      companies: ['N-iX'],
    },
  ];

  // Filter by company
  let filtered = allProblems;
  if (company !== 'all') {
    filtered = filtered.filter(problem =>
      problem.companies.some(comp =>
        comp.toLowerCase() === company.toLowerCase()
      )
    );
  }

  // Filter by status would be applied here when user is logged in
  // For now, we just return all problems

  return filtered;
};

export const getTotalPages = (
  tab: string,
  status: string,
  company: string,
  itemsPerPage: number
) => {
  const problems = getProblems(tab, status, company);
  return Math.ceil(problems.length / itemsPerPage);
};

export const ProblemList = ({
  activeTab,
  statusFilter,
  companyFilter,
  currentPage,
  itemsPerPage,
}: ProblemListProps) => {
  const locale = useLocale();

  const problems = getProblems(activeTab, statusFilter, companyFilter);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProblems = problems.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {paginatedProblems.map((problem) => (
          <ProblemItem
            key={problem.id}
            problem={problem}
            locale={locale}
          />
        ))}
      </ul>
    </div>
  );
};
