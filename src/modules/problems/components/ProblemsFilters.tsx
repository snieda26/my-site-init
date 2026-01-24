'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import styles from './ProblemsFilters.module.scss';

interface ProblemsFiltersProps {
  statusFilter: string;
  companyFilter: string;
  onStatusChange: (status: string) => void;
  onCompanyChange: (company: string) => void;
}

export const ProblemsFilters = ({
  statusFilter,
  companyFilter,
  onStatusChange,
  onCompanyChange,
}: ProblemsFiltersProps) => {
  const t = useTranslations('problems.filters');
  const [statusOpen, setStatusOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setStatusOpen(false);
      }
      if (companyRef.current && !companyRef.current.contains(event.target as Node)) {
        setCompanyOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const statusOptions = [
    { value: 'all', label: t('status.all') },
    { value: 'solved', label: t('status.solved') },
    { value: 'unsolved', label: t('status.unsolved') },
  ];

  const companyOptions = [
    { value: 'all', label: t('company.all') },
    { value: 'epam', label: 'EPAM' },
    { value: 'softserve', label: 'SoftServe' },
    { value: 'globallogic', label: 'GlobalLogic' },
    { value: 'luxoft', label: 'Luxoft' },
    { value: 'ciklum', label: 'Ciklum' },
    { value: 'nix', label: 'N-iX' },
    { value: 'grammarly', label: 'Grammarly' },
  ];

  const selectedStatus = statusOptions.find(opt => opt.value === statusFilter)?.label || t('status.all');
  const selectedCompany = companyOptions.find(opt => opt.value === companyFilter)?.label || t('company.all');

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.filterGroup} ref={statusRef}>
          <button
            type="button"
            className={styles.dropdown}
            onClick={() => {
              setStatusOpen(!statusOpen);
              setCompanyOpen(false);
            }}
            aria-expanded={statusOpen}
          >
            <span className={styles.label}>
              <span className={styles.labelText}>{t('status.label')}</span>
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.chevron}
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
          {statusOpen && (
            <div className={styles.dropdownMenu}>
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.menuItem} ${statusFilter === option.value ? styles.active : ''}`}
                  onClick={() => {
                    onStatusChange(option.value);
                    setStatusOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.filterGroup} ref={companyRef}>
          <button
            type="button"
            className={styles.dropdown}
            onClick={() => {
              setCompanyOpen(!companyOpen);
              setStatusOpen(false);
            }}
            aria-expanded={companyOpen}
          >
            <span className={styles.label}>
              <span className={styles.labelText}>{t('company.label')}</span>
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.chevron}
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
          {companyOpen && (
            <div className={styles.dropdownMenu}>
              {companyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.menuItem} ${companyFilter === option.value ? styles.active : ''}`}
                  onClick={() => {
                    onCompanyChange(option.value);
                    setCompanyOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
