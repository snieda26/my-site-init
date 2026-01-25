'use client';

import React, { useEffect, useRef } from 'react';
import { usePageAnimation } from '@/common/hooks';
import styles from './Reveal.module.scss';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  /** If true (default), animation only plays once per session for this page */
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, once = true }) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldAnimate = usePageAnimation(once);

  useEffect(() => {
    // Don't animate - content is already visible via noAnimation class
    if (!shouldAnimate) {
      return;
    }

    // Animate on scroll into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.active);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [shouldAnimate]);

  return (
    <div 
      ref={ref} 
      className={`${styles.reveal} ${!shouldAnimate ? styles.noAnimation : ''}`}
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
