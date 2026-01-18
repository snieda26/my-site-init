// ============================================================================
// TEMPORARY: SummaryStep component is disabled as part of onboarding
// TODO: Re-enable when onboarding feature is ready
// ============================================================================

'use client';

import { useTranslations } from 'next-intl';
import type { OnboardingWizardState, OnboardingOptions } from '../types/onboarding.types';
import styles from './OnboardingSteps.module.scss';

interface SummaryStepProps {
  state: OnboardingWizardState;
  options: OnboardingOptions;
}

export function SummaryStep({ state, options }: SummaryStepProps) {
  const t = useTranslations('onboarding.steps.summary');
  const tExp = useTranslations('onboarding.steps.experience');
  const tGoals = useTranslations('onboarding.steps.goals');

  const selectedTechnologies = options.technologies.filter((tech) =>
    state.technologies.includes(tech.id)
  );

  const selectedFocusAreas = options.focusAreas.filter((area) =>
    state.focusAreas.includes(area.id)
  );

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>{t('title')}</h2>
        <p className={styles.stepDescription}>{t('description')}</p>
      </div>

      <div className={styles.summaryContainer}>
        {/* Experience */}
        <div className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <span className={styles.summaryIcon}>👤</span>
            <h3 className={styles.summaryTitle}>{t('experience')}</h3>
          </div>
          <div className={styles.summaryContent}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>{t('level')}</span>
              <span className={styles.summaryValue}>
                {state.experienceLevel && tExp(`levels.${state.experienceLevel}`)}
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>{t('position')}</span>
              <span className={styles.summaryValue}>
                {state.targetPosition && tExp(`positions.${state.targetPosition}`)}
              </span>
            </div>
            {state.yearsOfExperience !== null && state.yearsOfExperience > 0 && (
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>{t('years')}</span>
                <span className={styles.summaryValue}>
                  {state.yearsOfExperience} {t('yearsLabel')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <span className={styles.summaryIcon}>💻</span>
            <h3 className={styles.summaryTitle}>{t('technologies')}</h3>
          </div>
          <div className={styles.summaryTags}>
            {selectedTechnologies.map((tech) => (
              <span key={tech.id} className={styles.summaryTag}>
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Learning Goal */}
        <div className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <span className={styles.summaryIcon}>🎯</span>
            <h3 className={styles.summaryTitle}>{t('learningGoal')}</h3>
          </div>
          <div className={styles.summaryContent}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>{t('goal')}</span>
              <span className={styles.summaryValue}>
                {state.learningGoal && tGoals(`goals.${state.learningGoal}.title`)}
              </span>
            </div>
            {state.weeklyHours && (
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>{t('weeklyHours')}</span>
                <span className={styles.summaryValue}>
                  {state.weeklyHours}+ {tGoals('hoursPerWeek')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Focus Areas */}
        {selectedFocusAreas.length > 0 && (
          <div className={styles.summaryCard}>
            <div className={styles.summaryHeader}>
              <span className={styles.summaryIcon}>📍</span>
              <h3 className={styles.summaryTitle}>{t('focusAreas')}</h3>
            </div>
            <div className={styles.summaryTags}>
              {selectedFocusAreas.map((area) => (
                <span key={area.id} className={styles.summaryTag}>
                  {area.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.confirmationMessage}>
        <div className={styles.confirmationIcon}>✨</div>
        <p>{t('confirmationMessage')}</p>
      </div>
    </div>
  );
}
