'use client';

import { useMemo } from 'react';
import { useOnboardingProfile } from './use-onboarding';
import { useAuth } from '@/modules/auth/hooks/use-auth';

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
  const { isAuthenticated } = useAuth();
  const { data: profile, isLoading } = useOnboardingProfile();

  return useMemo(() => {
    // If not authenticated or loading, show all sections
    if (!isAuthenticated || isLoading) {
      return { sections: allSections, isFiltering: false };
    }

    // If no profile or onboarding not completed, show all sections
    if (!profile || !profile.onboardingCompleted) {
      return { sections: allSections, isFiltering: false };
    }

    // If user has no technology preferences, show all sections
    if (!profile.technologies || profile.technologies.length === 0) {
      return { sections: allSections, isFiltering: false };
    }

    // Build set of visible sections based on user's technology preferences
    const visibleSections = new Set<string>(alwaysVisibleSections);

    profile.technologies.forEach((techId) => {
      const mappedSections = technologyToSectionMap[techId];
      if (mappedSections) {
        mappedSections.forEach((sectionId) => visibleSections.add(sectionId));
      }
    });

    // Filter allSections to only include visible ones
    const filteredSections = allSections.filter((sectionId) =>
      visibleSections.has(sectionId)
    );

    return {
      sections: filteredSections,
      isFiltering: true,
      hiddenCount: allSections.length - filteredSections.length,
    };
  }, [allSections, isAuthenticated, isLoading, profile]);
}

// Hook to check if a specific section should be visible
export function useSectionVisibility(sectionId: string) {
  const { isAuthenticated } = useAuth();
  const { data: profile, isLoading } = useOnboardingProfile();

  return useMemo(() => {
    // If not authenticated or loading, section is visible
    if (!isAuthenticated || isLoading) {
      return { isVisible: true, isFiltering: false };
    }

    // If no profile or onboarding not completed, section is visible
    if (!profile || !profile.onboardingCompleted) {
      return { isVisible: true, isFiltering: false };
    }

    // If user has no technology preferences, section is visible
    if (!profile.technologies || profile.technologies.length === 0) {
      return { isVisible: true, isFiltering: false };
    }

    // Always visible sections
    if (alwaysVisibleSections.includes(sectionId)) {
      return { isVisible: true, isFiltering: true };
    }

    // Check if section is visible based on user's technologies
    const isVisible = profile.technologies.some((techId) => {
      const mappedSections = technologyToSectionMap[techId];
      return mappedSections && mappedSections.includes(sectionId);
    });

    return { isVisible, isFiltering: true };
  }, [sectionId, isAuthenticated, isLoading, profile]);
}
