// Backend enum types (match Prisma)
export type ExperienceLevel = 'BEGINNER' | 'JUNIOR' | 'MIDDLE' | 'SENIOR' | 'LEAD';
export type TargetPosition = 'JUNIOR' | 'MIDDLE' | 'SENIOR' | 'LEAD';
export type LearningGoal =
  | 'JOB_INTERVIEW'
  | 'SKILL_IMPROVEMENT'
  | 'CAREER_GROWTH'
  | 'KNOWLEDGE_REFRESH'
  | 'CERTIFICATION';

// Frontend display types (used in wizard UI)
export type FrontendExperienceLevel = 'beginner' | 'junior' | 'middle' | 'senior' | 'lead';
export type FrontendTargetPosition = 'frontend' | 'backend' | 'fullstack' | 'devops' | 'mobile';
export type FrontendLearningGoal =
  | 'interview_prep'
  | 'skill_improvement'
  | 'career_change'
  | 'certification'
  | 'hobby';

// Technology option from backend
export interface TechnologyOption {
  id: string;
  name: string;
  category: string;
  description?: string;
}

// Focus area option from backend
export interface FocusAreaOption {
  id: string;
  name: string;
  description?: string;
}

// Options fetched from backend
export interface OnboardingOptions {
  technologies: TechnologyOption[];
  focusAreas: FocusAreaOption[];
}

// User profile from backend
export interface UserProfile {
  id: string;
  accountId: string;
  onboardingCompleted: boolean;
  experienceLevel: ExperienceLevel;
  targetPosition: TargetPosition;
  yearsOfExperience: number | null;
  learningGoal: LearningGoal;
  weeklyHours: number | null;
  technologies: string[];
  focusAreas: string[];
  preferredLanguage: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// DTO for updating onboarding profile (backend format)
export interface UpdateOnboardingDto {
  onboardingCompleted?: boolean;
  experienceLevel?: ExperienceLevel;
  targetPosition?: TargetPosition;
  yearsOfExperience?: number;
  learningGoal?: LearningGoal;
  weeklyHours?: number;
  technologies?: string[];
  focusAreas?: string[];
  preferredLanguage?: string;
}

// Complete onboarding DTO (frontend format - used by wizard)
export interface CompleteOnboardingDto {
  experienceLevel: FrontendExperienceLevel;
  targetPosition: FrontendTargetPosition;
  yearsOfExperience?: number;
  learningGoal: FrontendLearningGoal;
  weeklyHours?: number;
  technologies: string[];
  focusAreas: string[];
  preferredLanguage?: string;
}

// Wizard state (uses frontend display types)
export interface OnboardingWizardState {
  step: number;
  experienceLevel: FrontendExperienceLevel | null;
  targetPosition: FrontendTargetPosition | null;
  yearsOfExperience: number | null;
  learningGoal: FrontendLearningGoal | null;
  weeklyHours: number | null;
  technologies: string[];
  focusAreas: string[];
}
