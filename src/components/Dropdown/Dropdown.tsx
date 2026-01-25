'use client';

import React, { ReactNode } from 'react';
import styles from './Dropdown.module.scss';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = 'right',
  className = '',
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.trigger}>{trigger}</div>
      <div className={`${styles.dropdown} ${styles[align]}`}>{children}</div>
    </div>
  );
};
