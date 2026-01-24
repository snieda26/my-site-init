import { HTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'
import styles from './Card.module.scss'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, padding = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.card,
          hoverable && styles.hoverable,
          styles[`padding-${padding}`],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(styles.cardHeader, className)} {...props}>
    {children}
  </div>
)

export const CardBody = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(styles.cardBody, className)} {...props}>
    {children}
  </div>
)

export const CardFooter = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(styles.cardFooter, className)} {...props}>
    {children}
  </div>
)
