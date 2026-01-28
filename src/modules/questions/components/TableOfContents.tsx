'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/common/hooks';
import styles from './TableOfContents.module.scss';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents = () => {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const locale = useLocale();

  // Track scroll position for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const headings = document.querySelectorAll('h2, h3');
    const tocItems: TOCItem[] = [];

    headings.forEach((heading) => {
      // Get or generate a clean ID
      let id = heading.id;
      if (!id) {
        // Generate ID from text content with proper sanitization
        id = (heading.textContent || '')
          .toLowerCase()
          .replace(/^#+\s*/, '') // Remove leading hashtags
          .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
          .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
        heading.id = id;
      }
      
      // Remove all hashtags and anchor symbols from text content for display in sidebar
      const text = (heading.textContent || '')
        .replace(/^#+\s*/, '') // Remove leading hashtags with optional space
        .replace(/#/g, '') // Remove any remaining hashtags
        .trim();
      tocItems.push({
        id,
        text,
        level: parseInt(heading.tagName.charAt(1)) - 2, // h2 = 0, h3 = 1
      });
    });

    setItems(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  if (items.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Account for sticky header (80px) + extra padding
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      // Update active state immediately
      setActiveId(id);
    }
  };

  return (
    <>
      <div className={styles.toc}>
        <h3 className={styles.title}>{locale === 'ua' ? 'Зміст' : 'Content'}</h3>
        <div className={styles.scrollArea}>
          <div className={styles.items}>
            {items.map((item) => (
              <button
                key={item.id}
                className={`${styles.item} ${activeId === item.id ? styles.active : ''} ${item.level > 0 ? styles.nested : ''}`}
                style={item.level > 0 ? { paddingLeft: `${item.level * 16}px` } : undefined}
                onClick={() => scrollToHeading(item.id)}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Fixed Back to Top button */}
      <button
        className={`${styles.backToTop} ${showBackToTop ? styles.visible : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className={styles.icon}
        >
          <path d="m5 12 7-7 7 7" />
          <path d="M12 19V5" />
        </svg>
        <span>{locale === 'ua' ? 'На початок' : 'Back to Top'}</span>
      </button>
    </>
  );
};
