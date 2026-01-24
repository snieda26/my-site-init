'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './Breadcrumb.module.scss';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const t = useTranslations('docs');

  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumb}>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            {index > 0 && (
              <span className={styles.separator} aria-hidden="true">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className={styles.separatorIcon}
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            )}
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.current} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
