'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

// Set to track which pages have been visited - cleared on page refresh
const visitedPages = new Set<string>();

/**
 * Hook to determine if page animations should play.
 * Returns true if this is the first visit to this page since the last refresh.
 * 
 * Behavior:
 * - First visit to page: animations play, page marked as visited
 * - Return visit (same session): animations skipped
 * - Page refresh: visitedPages cleared, animations play again
 * - Home page (once=false): always animates
 */
export const usePageAnimation = (once: boolean = true): boolean => {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const [shouldAnimate] = useState(() => {
    // Always animate if once=false (home page)
    if (!once) {
      return true;
    }

    // Check if page has been visited before
    const hasVisited = visitedPages.has(pathname);
    
    // Mark as visited for future navigations
    if (!hasVisited) {
      visitedPages.add(pathname);
    }

    // Animate only if this is the first visit
    return !hasVisited;
  });

  // Mark that we've completed the first render
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return shouldAnimate;
};
