'use client';

import React from 'react';
import { AnimatedBackground } from '@/components/Landing';
import styles from './PageWrapper.module.scss';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  withBackground?: boolean;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ 
  children, 
  className = '',
  withBackground = true 
}) => {
  return (
    <div className={`${styles.page} ${className}`}>
      {withBackground && <AnimatedBackground />}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
