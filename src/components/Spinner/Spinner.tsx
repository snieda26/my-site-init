'use client';

import React from 'react';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md',
  className = '' 
}) => {
  return (
    <div className={`${styles.loader} ${styles[size]} ${className}`} />
  );
};
