// ============================================================================
// TEMPORARY: Onboarding hooks are disabled
// TODO: Re-enable these hooks when onboarding feature is ready
// ============================================================================

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useLocale } from '@/common/hooks';
import { onboardingService } from '../services/onboarding.service';
import type {
  UpdateOnboardingDto,
  UserProfile,
  OnboardingOptions,
  CompleteOnboardingDto,
} from '../types/onboarding.types';

interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
}

export function useOnboardingProfile() {
  return useQuery<UserProfile, AxiosError<ApiErrorResponse>>({
    queryKey: ['onboardingProfile'],
    queryFn: () => onboardingService.getProfile(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1,
  });
}

export function useOnboardingOptions() {
  return useQuery<OnboardingOptions, AxiosError<ApiErrorResponse>>({
    queryKey: ['onboardingOptions'],
    queryFn: () => onboardingService.getOptions(),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour (options rarely change)
  });
}

export function useUpdateOnboardingProfile() {
  const queryClient = useQueryClient();

  return useMutation<UserProfile, AxiosError<ApiErrorResponse>, UpdateOnboardingDto>({
    mutationFn: (data: UpdateOnboardingDto) => onboardingService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboardingProfile'] });
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update onboarding profile.';
      toast.error(message);
    },
  });
}

export function useCompleteOnboarding() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const locale = useLocale();

  return useMutation<UserProfile, AxiosError<ApiErrorResponse>, CompleteOnboardingDto>({
    mutationFn: (data: CompleteOnboardingDto) => onboardingService.completeOnboarding(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboardingProfile'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Your profile has been set up successfully!');
      // Redirect to the dashboard or interview questions page
      router.push(`/interview-questions/${locale}`);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to complete onboarding.';
      toast.error(message);
    },
  });
}

// Hook to check if user needs onboarding
export function useNeedsOnboarding() {
  const { data: profile, isLoading } = useOnboardingProfile();

  return {
    needsOnboarding: profile ? !profile.onboardingCompleted : false,
    isLoading,
  };
}

// Re-export filtered content hooks
export { useFilteredSections, useSectionVisibility } from './use-filtered-content';
