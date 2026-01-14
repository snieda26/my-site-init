import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Badge.module.scss';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export const Badge = ({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={clsx(styles.badge, styles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};
