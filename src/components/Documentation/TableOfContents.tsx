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
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      if (!heading.id) {
        heading.id = id;
      }
      // Remove hashtag from text content for display in sidebar
      const text = (heading.textContent || '').replace(/^#\s*/, '').trim();
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
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  return (
    <>
      <div className={styles.toc}>
        <h3 className={styles.title}>{locale === 'ua' ? 'ЗМІСТ' : 'CONTENT'}</h3>
        <div className={styles.scrollArea}>
          <div className={styles.items}>
            {items.map((item) => (
              <button
                key={item.id}
                className={`${styles.item} ${activeId === item.id ? styles.active : ''}`}
                style={{ paddingLeft: `${item.level * 12 + 12}px` }}
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
