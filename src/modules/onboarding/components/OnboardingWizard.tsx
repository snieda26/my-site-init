'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/common/hooks';
import { useCompleteOnboarding, useOnboardingOptions } from '../hooks/use-onboarding';
import { ExperienceLevelStep } from './ExperienceLevelStep';
import { TechnologiesStep } from './TechnologiesStep';
import { LearningGoalStep } from './LearningGoalStep';
import { FocusAreasStep } from './FocusAreasStep';
import { SummaryStep } from './SummaryStep';
import type {
  FrontendExperienceLevel,
  FrontendTargetPosition,
  FrontendLearningGoal,
  OnboardingWizardState,
} from '../types/onboarding.types';
import styles from './OnboardingWizard.module.scss';

const TOTAL_STEPS = 5;

export function OnboardingWizard() {
  const t = useTranslations('onboarding');
  const locale = useLocale();
  const { data: options, isLoading: optionsLoading } = useOnboardingOptions();
  const completeOnboarding = useCompleteOnboarding();

  const [state, setState] = useState<OnboardingWizardState>({
    step: 1,
    experienceLevel: null,
    targetPosition: null,
    yearsOfExperience: null,
    learningGoal: null,
    weeklyHours: null,
    technologies: [],
    focusAreas: [],
  });

  const updateState = (updates: Partial<OnboardingWizardState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (state.step < TOTAL_STEPS) {
      updateState({ step: state.step + 1 });
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      updateState({ step: state.step - 1 });
    }
  };

  const handleComplete = () => {
    if (!state.experienceLevel || !state.targetPosition || !state.learningGoal) {
      return;
    }

    completeOnboarding.mutate({
      experienceLevel: state.experienceLevel,
      targetPosition: state.targetPosition,
      yearsOfExperience: state.yearsOfExperience ?? undefined,
      learningGoal: state.learningGoal,
      weeklyHours: state.weeklyHours ?? undefined,
      technologies: state.technologies,
      focusAreas: state.focusAreas,
      preferredLanguage: locale,
    });
  };

  const canProceed = () => {
    switch (state.step) {
      case 1:
        return !!state.experienceLevel && !!state.targetPosition;
      case 2:
        return state.technologies.length > 0;
      case 3:
        return !!state.learningGoal;
      case 4:
        return true; // Focus areas are optional
      case 5:
        return true; // Summary, can always proceed
      default:
        return false;
    }
  };

  if (optionsLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className={styles.wizard}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </div>

      {/* Progress bar */}
      <div className={styles.progress}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(state.step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
        <div className={styles.progressSteps}>
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div
              key={i}
              className={`${styles.progressStep} ${
                i + 1 <= state.step ? styles.active : ''
              } ${i + 1 < state.step ? styles.completed : ''}`}
            >
              {i + 1 < state.step ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className={styles.content}>
        {state.step === 1 && (
          <ExperienceLevelStep
            experienceLevel={state.experienceLevel}
            targetPosition={state.targetPosition}
            yearsOfExperience={state.yearsOfExperience}
            onExperienceLevelChange={(level) => updateState({ experienceLevel: level })}
            onTargetPositionChange={(position) => updateState({ targetPosition: position })}
            onYearsChange={(years) => updateState({ yearsOfExperience: years })}
          />
        )}

        {state.step === 2 && options && (
          <TechnologiesStep
            technologies={options.technologies}
            selectedTechnologies={state.technologies}
            onSelectionChange={(techs) => updateState({ technologies: techs })}
          />
        )}

        {state.step === 3 && (
          <LearningGoalStep
            learningGoal={state.learningGoal}
            weeklyHours={state.weeklyHours}
            onLearningGoalChange={(goal) => updateState({ learningGoal: goal })}
            onWeeklyHoursChange={(hours) => updateState({ weeklyHours: hours })}
          />
        )}

        {state.step === 4 && options && (
          <FocusAreasStep
            focusAreas={options.focusAreas}
            selectedFocusAreas={state.focusAreas}
            onSelectionChange={(areas) => updateState({ focusAreas: areas })}
          />
        )}

        {state.step === 5 && options && (
          <SummaryStep
            state={state}
            options={options}
          />
        )}
      </div>

      {/* Navigation buttons */}
      <div className={styles.navigation}>
        {state.step > 1 && (
          <button
            type="button"
            className={styles.backButton}
            onClick={prevStep}
            disabled={completeOnboarding.isPending}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            {t('back')}
          </button>
        )}

        <div className={styles.spacer} />

        {state.step < TOTAL_STEPS ? (
          <button
            type="button"
            className={styles.nextButton}
            onClick={nextStep}
            disabled={!canProceed()}
          >
            {t('next')}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            className={styles.completeButton}
            onClick={handleComplete}
            disabled={completeOnboarding.isPending}
          >
            {completeOnboarding.isPending ? (
              <>
                <span className={styles.buttonSpinner} />
                {t('saving')}
              </>
            ) : (
              <>
                {t('complete')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
