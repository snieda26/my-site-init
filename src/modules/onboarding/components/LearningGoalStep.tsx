// ============================================================================
// TEMPORARY: LearningGoalStep component is disabled as part of onboarding
// TODO: Re-enable when onboarding feature is ready
// ============================================================================

'use client';

import { useTranslations } from 'next-intl';
import type { FrontendLearningGoal } from '../types/onboarding.types';
import styles from './OnboardingSteps.module.scss';

interface LearningGoalStepProps {
  learningGoal: FrontendLearningGoal | null;
  weeklyHours: number | null;
  onLearningGoalChange: (goal: FrontendLearningGoal) => void;
  onWeeklyHoursChange: (hours: number | null) => void;
}

const learningGoals: { value: FrontendLearningGoal; icon: string }[] = [
  { value: 'interview_prep', icon: '🎯' },
  { value: 'skill_improvement', icon: '📈' },
  { value: 'career_change', icon: '🔄' },
  { value: 'certification', icon: '📜' },
  { value: 'hobby', icon: '🎮' },
];

const weeklyHoursOptions = [
  { value: 1, label: '1-2' },
  { value: 5, label: '3-5' },
  { value: 10, label: '5-10' },
  { value: 15, label: '10-15' },
  { value: 20, label: '15-20' },
  { value: 25, label: '20+' },
];

export function LearningGoalStep({
  learningGoal,
  weeklyHours,
  onLearningGoalChange,
  onWeeklyHoursChange,
}: LearningGoalStepProps) {
  const t = useTranslations('onboarding.steps.goals');

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>{t('title')}</h2>
        <p className={styles.stepDescription}>{t('description')}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('goalLabel')}</h3>
        <div className={styles.goalGrid}>
          {learningGoals.map(({ value, icon }) => (
            <button
              key={value}
              type="button"
              className={`${styles.goalCard} ${
                learningGoal === value ? styles.selected : ''
              }`}
              onClick={() => onLearningGoalChange(value)}
            >
              <span className={styles.goalIcon}>{icon}</span>
              <div className={styles.goalContent}>
                <span className={styles.goalLabel}>{t(`goals.${value}.title`)}</span>
                <span className={styles.goalDescription}>{t(`goals.${value}.description`)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('hoursLabel')}</h3>
        <p className={styles.sectionHint}>{t('hoursHint')}</p>
        <div className={styles.hoursGrid}>
          {weeklyHoursOptions.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              className={`${styles.hoursCard} ${
                weeklyHours === value ? styles.selected : ''
              }`}
              onClick={() => onWeeklyHoursChange(value)}
            >
              <span className={styles.hoursValue}>{label}</span>
              <span className={styles.hoursUnit}>{t('hoursPerWeek')}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
