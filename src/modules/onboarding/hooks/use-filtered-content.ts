// ============================================================================
// TEMPORARY: This file is disabled as part of temporarily disabling onboarding
// TODO: Re-enable this functionality when onboarding feature is ready
// ============================================================================

'use client';

import { useMemo } from 'react';
// TEMPORARILY COMMENTED OUT
// import { useOnboardingProfile } from './use-onboarding';
// import { useAuth } from '@/modules/auth/hooks/use-auth';

// Mapping from technology IDs to section IDs in docs
const technologyToSectionMap: Record<string, string[]> = {
  html_css: ['html-css'],
  javascript: ['javascript'],
  typescript: ['typescript'],
  react: ['react', 'redux'],
  vue: ['vue'],
  angular: ['angular'],
  nextjs: ['react'],
  nodejs: ['javascript', 'typescript'],
};

// Sections that should always be visible regardless of user preferences
const alwaysVisibleSections = [
  'general-questions',
  'architecture',
  'principles',
  'patterns',
  'html-css',
  'javascript', // JavaScript is fundamental
];

export function useFilteredSections(allSections: string[]) {
  // TEMPORARY: Filtering disabled - always show all sections
  // TODO: Re-enable when onboarding feature is ready
  return useMemo(() => {
    return { sections: allSections, isFiltering: false, hiddenCount: 0 };
  }, [allSections]);
  
  // TEMPORARILY COMMENTED OUT - Original filtering logic
  // const { isAuthenticated } = useAuth();
  // const { data: profile, isLoading } = useOnboardingProfile();
  //
  // return useMemo(() => {
  //   if (!isAuthenticated || isLoading) {
  //     return { sections: allSections, isFiltering: false };
  //   }
  //   if (!profile || !profile.onboardingCompleted) {
  //     return { sections: allSections, isFiltering: false };
  //   }
  //   if (!profile.technologies || profile.technologies.length === 0) {
  //     return { sections: allSections, isFiltering: false };
  //   }
  //   const visibleSections = new Set<string>(alwaysVisibleSections);
  //   profile.technologies.forEach((techId) => {
  //     const mappedSections = technologyToSectionMap[techId];
  //     if (mappedSections) {
  //       mappedSections.forEach((sectionId) => visibleSections.add(sectionId));
  //     }
  //   });
  //   const filteredSections = allSections.filter((sectionId) =>
  //     visibleSections.has(sectionId)
  //   );
  //   return {
  //     sections: filteredSections,
  //     isFiltering: true,
  //     hiddenCount: allSections.length - filteredSections.length,
  //   };
  // }, [allSections, isAuthenticated, isLoading, profile]);
}

// Hook to check if a specific section should be visible
export function useSectionVisibility(sectionId: string) {
  // TEMPORARY: Filtering disabled - all sections always visible
  // TODO: Re-enable when onboarding feature is ready
  return useMemo(() => {
    return { isVisible: true, isFiltering: false };
  }, [sectionId]);
  
  // TEMPORARILY COMMENTED OUT - Original visibility logic
  // const { isAuthenticated } = useAuth();
  // const { data: profile, isLoading } = useOnboardingProfile();
  //
  // return useMemo(() => {
  //   if (!isAuthenticated || isLoading) {
  //     return { isVisible: true, isFiltering: false };
  //   }
  //   if (!profile || !profile.onboardingCompleted) {
  //     return { isVisible: true, isFiltering: false };
  //   }
  //   if (!profile.technologies || profile.technologies.length === 0) {
  //     return { isVisible: true, isFiltering: false };
  //   }
  //   if (alwaysVisibleSections.includes(sectionId)) {
  //     return { isVisible: true, isFiltering: true };
  //   }
  //   const isVisible = profile.technologies.some((techId) => {
  //     const mappedSections = technologyToSectionMap[techId];
  //     return mappedSections && mappedSections.includes(sectionId);
  //   });
  //   return { isVisible, isFiltering: true };
  // }, [sectionId, isAuthenticated, isLoading, profile]);
}
