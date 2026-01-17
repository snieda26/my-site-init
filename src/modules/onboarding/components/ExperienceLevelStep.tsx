'use client';

import { useTranslations } from 'next-intl';
import type { FrontendExperienceLevel, FrontendTargetPosition } from '../types/onboarding.types';
import styles from './OnboardingSteps.module.scss';

interface ExperienceLevelStepProps {
  experienceLevel: FrontendExperienceLevel | null;
  targetPosition: FrontendTargetPosition | null;
  yearsOfExperience: number | null;
  onExperienceLevelChange: (level: FrontendExperienceLevel) => void;
  onTargetPositionChange: (position: FrontendTargetPosition) => void;
  onYearsChange: (years: number | null) => void;
}

const experienceLevels: { value: FrontendExperienceLevel; icon: string }[] = [
  { value: 'beginner', icon: '🌱' },
  { value: 'junior', icon: '🚀' },
  { value: 'middle', icon: '⭐' },
  { value: 'senior', icon: '💎' },
  { value: 'lead', icon: '👑' },
];

const targetPositions: { value: FrontendTargetPosition; icon: string }[] = [
  { value: 'frontend', icon: '🎨' },
  { value: 'backend', icon: '⚙️' },
  { value: 'fullstack', icon: '🔗' },
  { value: 'devops', icon: '🛠️' },
  { value: 'mobile', icon: '📱' },
];

export function ExperienceLevelStep({
  experienceLevel,
  targetPosition,
  yearsOfExperience,
  onExperienceLevelChange,
  onTargetPositionChange,
  onYearsChange,
}: ExperienceLevelStepProps) {
  const t = useTranslations('onboarding.steps.experience');

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>{t('title')}</h2>
        <p className={styles.stepDescription}>{t('description')}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('levelLabel')}</h3>
        <div className={styles.optionGrid}>
          {experienceLevels.map(({ value, icon }) => (
            <button
              key={value}
              type="button"
              className={`${styles.optionCard} ${
                experienceLevel === value ? styles.selected : ''
              }`}
              onClick={() => onExperienceLevelChange(value)}
            >
              <span className={styles.optionIcon}>{icon}</span>
              <span className={styles.optionLabel}>{t(`levels.${value}`)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('positionLabel')}</h3>
        <div className={styles.optionGrid}>
          {targetPositions.map(({ value, icon }) => (
            <button
              key={value}
              type="button"
              className={`${styles.optionCard} ${
                targetPosition === value ? styles.selected : ''
              }`}
              onClick={() => onTargetPositionChange(value)}
            >
              <span className={styles.optionIcon}>{icon}</span>
              <span className={styles.optionLabel}>{t(`positions.${value}`)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('yearsLabel')}</h3>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="0"
            max="15"
            value={yearsOfExperience ?? 0}
            onChange={(e) => onYearsChange(Number(e.target.value) || null)}
            className={styles.slider}
          />
          <div className={styles.sliderValue}>
            {yearsOfExperience === null || yearsOfExperience === 0
              ? t('yearsNone')
              : yearsOfExperience === 15
              ? t('yearsMax')
              : t('yearsValue', { years: yearsOfExperience })}
          </div>
        </div>
      </div>
    </div>
  );
}
