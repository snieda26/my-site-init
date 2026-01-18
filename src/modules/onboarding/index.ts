// ============================================================================
// TEMPORARY: Onboarding module is disabled - all exports kept for type safety
// TODO: Re-enable when onboarding feature is ready
// ============================================================================

// Types
export type {
  ExperienceLevel,
  TargetPosition,
  LearningGoal,
  FrontendExperienceLevel,
  FrontendTargetPosition,
  FrontendLearningGoal,
  TechnologyOption,
  FocusAreaOption,
  OnboardingOptions,
  UserProfile,
  UpdateOnboardingDto,
  CompleteOnboardingDto,
  OnboardingWizardState,
} from './types/onboarding.types';

// Services
export { onboardingService } from './services/onboarding.service';

// Hooks
export {
  useOnboardingProfile,
  useOnboardingOptions,
  useUpdateOnboardingProfile,
  useCompleteOnboarding,
  useNeedsOnboarding,
  useFilteredSections,
  useSectionVisibility,
} from './hooks/use-onboarding';

// Components
export {
  OnboardingWizard,
  ExperienceLevelStep,
  TechnologiesStep,
  LearningGoalStep,
  FocusAreasStep,
  SummaryStep,
} from './components';
