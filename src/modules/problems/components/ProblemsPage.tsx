'use client';

import { useState, useEffect } from 'react';
import { Reveal } from '@/components/Landing';
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

  // Fetch total problems count based on active tab
  useEffect(() => {
    const fetchCount = async () => {
      try {
        // Map active tab to category filter
        const categoryMap = {
          'problems': 'javascript',
          'react-problems': 'react',
          'quizzes': 'quizzes'
        };
        const category = categoryMap[activeTab];
        const url = category ? `http://localhost:4000/api/problems?category=${category}` : 'http://localhost:4000/api/problems';
        
        const response = await fetch(url);
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
  }, [activeTab]);

  const totalPages = getTotalPages(totalProblems, itemsPerPage);

  return (
    <div className={styles.page}>
      <div className={styles.pageContent}>
        <div className={styles.container}>
          <div className={styles.content}>
            <ProblemsHeader />
            
            <Reveal delay={100}>
              <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            </Reveal>
            
            <div className={styles.divider}></div>
            
            {/* TODO: Add filters */}
            {/* <Reveal delay={200}>
              <ProblemsFilters
                statusFilter={statusFilter}
                companyFilter={companyFilter}
                onStatusChange={setStatusFilter}
                onCompanyChange={setCompanyFilter}
              />
            </Reveal> */}
            
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
