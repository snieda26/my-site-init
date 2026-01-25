'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Tooltip.module.scss';

interface TooltipProps {
  children: ReactNode;
  content: string | ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  maxWidth?: number;
}

export const Tooltip = ({ 
  children, 
  content, 
  position = 'top',
  delay = 200,
  maxWidth = 250 
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef({ x: 0, y: 0 });

  const calculatePosition = () => {
    if (!triggerRef.current) return { x: 0, y: 0 };
    
    const rect = triggerRef.current.getBoundingClientRect();
    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = rect.left + rect.width / 2;
        y = rect.top;
        break;
      case 'bottom':
        x = rect.left + rect.width / 2;
        y = rect.bottom;
        break;
      case 'left':
        x = rect.left;
        y = rect.top + rect.height / 2;
        break;
      case 'right':
        x = rect.right;
        y = rect.top + rect.height / 2;
        break;
    }

    return { x, y };
  };

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      // Calculate and store position immediately
      coordsRef.current = calculatePosition();
      // Show tooltip with correct position already set
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      const handleResize = () => {
        coordsRef.current = calculatePosition();
        // Force re-render if needed
        if (tooltipRef.current) {
          tooltipRef.current.style.left = `${coordsRef.current.x}px`;
          tooltipRef.current.style.top = `${coordsRef.current.y}px`;
        }
      };
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleResize, true);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize, true);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipElement = isVisible ? (
    <div 
      ref={tooltipRef}
      className={`${styles.tooltip} ${styles[position]}`}
      style={{ 
        maxWidth: `${maxWidth}px`,
        left: `${coordsRef.current.x}px`,
        top: `${coordsRef.current.y}px`,
      }}
    >
      <div className={styles.content}>{content}</div>
      <div className={styles.arrow} />
    </div>
  ) : null;

  return (
    <>
      <div 
        className={styles.wrapper}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        ref={triggerRef}
      >
        {children}
      </div>
      {typeof window !== 'undefined' && tooltipElement && createPortal(
        tooltipElement,
        document.body
      )}
    </>
  );
};
