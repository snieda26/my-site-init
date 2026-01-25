'use client';

import { useState, useEffect } from 'react';
import { Reveal, AnimatedBackground } from '@/components/Landing';
import { ProblemsHeader } from './ProblemsHeader';
import { TabNavigation } from './TabNavigation';
import { ProblemsFilters } from './ProblemsFilters';
import { ProblemList, getTotalPages } from './ProblemList';
import { ProblemsPagination } from './ProblemsPagination';
import styles from './ProblemsPage.module.scss';

export const ProblemsPage = () => {
  const [activeTab, setActiveTab] = useState<'problems' | 'react-problems' | 'quizzes'>('problems');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalProblems, setTotalProblems] = useState(0);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, statusFilter, companyFilter, itemsPerPage]);

  // Fetch total problems count
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/problems');
        if (response.ok) {
          const data = await response.json();
          const problemsData = data.data || data;
          setTotalProblems(Array.isArray(problemsData) ? problemsData.length : 0);
        }
      } catch (error) {
        console.error('Failed to fetch problems count:', error);
      }
    };
    fetchCount();
  }, []);

  const totalPages = getTotalPages(totalProblems, itemsPerPage);

  return (
    <div className={styles.page}>
      <AnimatedBackground />
      <div className={styles.pageContent}>
        <div className={styles.container}>
          <div className={styles.content}>
            <ProblemsHeader />
            
            <Reveal delay={100}>
              <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            </Reveal>
            
            <div className={styles.divider}></div>
            
            <Reveal delay={200}>
              <ProblemsFilters
                statusFilter={statusFilter}
                companyFilter={companyFilter}
                onStatusChange={setStatusFilter}
                onCompanyChange={setCompanyFilter}
              />
            </Reveal>
            
            <Reveal delay={300}>
              <ProblemList
                activeTab={activeTab}
                statusFilter={statusFilter}
                companyFilter={companyFilter}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
            </Reveal>
            
            <Reveal delay={400}>
              <ProblemsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};
