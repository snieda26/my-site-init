'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

// In-memory Set - resets on page refresh, persists during client-side navigation
const animatedPages = new Set<string>();

/**
 * Hook to determine if page animations should play.
 * Returns true if this is the first visit to this page since the last refresh.
 * 
 * - Page refresh: animations play again (memory is cleared)
 * - Client-side navigation back to page: animations are skipped
 */
export const usePageAnimation = (once: boolean = true): boolean => {
  const pathname = usePathname();

  // Compute synchronously and memoize per pathname
  const shouldAnimate = useMemo(() => {
    if (!once) {
      // Always animate if once=false
      return true;
    }
    
    if (animatedPages.has(pathname)) {
      // Already visited - skip animation
      return false;
    }
    
    // First visit - animate and mark as visited
    animatedPages.add(pathname);
    return true;
  }, [once, pathname]);

  return shouldAnimate;
};
