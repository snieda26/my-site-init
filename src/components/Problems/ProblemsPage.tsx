'use client';

import { useState, useEffect } from 'react';
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

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, statusFilter, companyFilter, itemsPerPage]);

  const totalPages = getTotalPages(activeTab, statusFilter, companyFilter, itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ProblemsHeader />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <div className={styles.divider}></div>
        <ProblemsFilters
          statusFilter={statusFilter}
          companyFilter={companyFilter}
          onStatusChange={setStatusFilter}
          onCompanyChange={setCompanyFilter}
        />
        <ProblemList
          activeTab={activeTab}
          statusFilter={statusFilter}
          companyFilter={companyFilter}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        <ProblemsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </div>
  );
};
