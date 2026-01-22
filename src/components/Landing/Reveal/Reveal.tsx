'use client';

import React, { useEffect, useRef } from 'react';
import styles from './Reveal.module.scss';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div 
      ref={ref} 
      className={styles.reveal}
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
