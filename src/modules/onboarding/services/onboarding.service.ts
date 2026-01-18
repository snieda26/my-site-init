// ============================================================================
// TEMPORARY: Onboarding service is disabled
// TODO: Re-enable this service when onboarding feature is ready
// ============================================================================

import apiClient from '@/infrastructure/api/client';
import type {
  UpdateOnboardingDto,
  UserProfile,
  OnboardingOptions,
  CompleteOnboardingDto,
  ExperienceLevel,
  LearningGoal,
} from '../types/onboarding.types';

// Map frontend display values to backend enum values
const experienceLevelMap: Record<string, ExperienceLevel> = {
  beginner: 'BEGINNER',
  junior: 'JUNIOR',
  middle: 'MIDDLE',
  senior: 'SENIOR',
  lead: 'LEAD',
};

const learningGoalMap: Record<string, LearningGoal> = {
  interview_prep: 'JOB_INTERVIEW',
  skill_improvement: 'SKILL_IMPROVEMENT',
  career_change: 'CAREER_GROWTH',
  certification: 'CERTIFICATION',
  hobby: 'KNOWLEDGE_REFRESH',
};

// Default options (fallback if backend doesn't provide them)
const DEFAULT_TECHNOLOGIES = [
  { id: 'html_css', name: 'HTML & CSS', category: 'frontend' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend' },
  { id: 'react', name: 'React', category: 'frontend' },
  { id: 'vue', name: 'Vue.js', category: 'frontend' },
  { id: 'angular', name: 'Angular', category: 'frontend' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend' },
  { id: 'nodejs', name: 'Node.js', category: 'backend' },
  { id: 'python', name: 'Python', category: 'backend' },
  { id: 'java', name: 'Java', category: 'backend' },
  { id: 'go', name: 'Go', category: 'backend' },
  { id: 'rust', name: 'Rust', category: 'backend' },
  { id: 'sql', name: 'SQL', category: 'database' },
  { id: 'mongodb', name: 'MongoDB', category: 'database' },
  { id: 'graphql', name: 'GraphQL', category: 'api' },
  { id: 'docker', name: 'Docker', category: 'devops' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops' },
  { id: 'aws', name: 'AWS', category: 'cloud' },
  { id: 'git', name: 'Git', category: 'tools' },
];

const DEFAULT_FOCUS_AREAS = [
  { id: 'algorithms', name: 'Algorithms & Data Structures', description: 'Master coding challenges and optimize solutions' },
  { id: 'system_design', name: 'System Design', description: 'Design scalable and reliable systems' },
  { id: 'coding_challenges', name: 'Coding Challenges', description: 'Practice problem-solving with real interview questions' },
  { id: 'theoretical_knowledge', name: 'Theoretical Knowledge', description: 'Deep dive into CS fundamentals' },
  { id: 'practical_projects', name: 'Practical Projects', description: 'Build real-world applications' },
  { id: 'soft_skills', name: 'Soft Skills', description: 'Improve communication and teamwork' },
];

export const onboardingService = {
  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>('/onboarding/profile');
    return response.data;
  },

  async updateProfile(data: UpdateOnboardingDto): Promise<UserProfile> {
    const response = await apiClient.patch<UserProfile>('/onboarding/profile', data);
    return response.data;
  },

  async completeOnboarding(data: CompleteOnboardingDto): Promise<UserProfile> {
    // Map frontend values to backend enum values
    const payload: UpdateOnboardingDto = {
      onboardingCompleted: true,
      experienceLevel: experienceLevelMap[data.experienceLevel] || 'JUNIOR',
      learningGoal: learningGoalMap[data.learningGoal] || 'JOB_INTERVIEW',
      yearsOfExperience: data.yearsOfExperience,
      weeklyHours: data.weeklyHours,
      technologies: data.technologies,
      focusAreas: data.focusAreas,
      preferredLanguage: data.preferredLanguage,
    };

    const response = await apiClient.patch<UserProfile>('/onboarding/profile', payload);
    return response.data;
  },

  async getOptions(): Promise<OnboardingOptions> {
    try {
      const response = await apiClient.get<OnboardingOptions>('/onboarding/options');
      return response.data;
    } catch {
      // Return defaults if endpoint doesn't exist yet
      return {
        technologies: DEFAULT_TECHNOLOGIES,
        focusAreas: DEFAULT_FOCUS_AREAS,
      };
    }
  },
};
