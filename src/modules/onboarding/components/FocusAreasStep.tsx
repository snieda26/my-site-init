// ============================================================================
// TEMPORARY: FocusAreasStep component is disabled as part of onboarding
// TODO: Re-enable when onboarding feature is ready
// ============================================================================

'use client';

import { useTranslations } from 'next-intl';
import type { FocusAreaOption } from '../types/onboarding.types';
import styles from './OnboardingSteps.module.scss';

interface FocusAreasStepProps {
  focusAreas: FocusAreaOption[];
  selectedFocusAreas: string[];
  onSelectionChange: (areas: string[]) => void;
}

const focusAreaIcons: Record<string, string> = {
  algorithms: '🧮',
  data_structures: '📊',
  system_design: '🏗️',
  coding_challenges: '💻',
  theoretical_knowledge: '📚',
  practical_projects: '🔨',
  soft_skills: '🤝',
  communication: '💬',
};

export function FocusAreasStep({
  focusAreas,
  selectedFocusAreas,
  onSelectionChange,
}: FocusAreasStepProps) {
  const t = useTranslations('onboarding.steps.focus');

  const toggleFocusArea = (areaId: string) => {
    if (selectedFocusAreas.includes(areaId)) {
      onSelectionChange(selectedFocusAreas.filter((id) => id !== areaId));
    } else {
      onSelectionChange([...selectedFocusAreas, areaId]);
    }
  };

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>{t('title')}</h2>
        <p className={styles.stepDescription}>{t('description')}</p>
        <div className={styles.selectionHint}>{t('hint')}</div>
      </div>

      <div className={styles.section}>
        <div className={styles.focusGrid}>
          {focusAreas.map((area) => (
            <button
              key={area.id}
              type="button"
              className={`${styles.focusCard} ${
                selectedFocusAreas.includes(area.id) ? styles.selected : ''
              }`}
              onClick={() => toggleFocusArea(area.id)}
            >
              <span className={styles.focusIcon}>
                {focusAreaIcons[area.id] || '📌'}
              </span>
              <div className={styles.focusContent}>
                <span className={styles.focusLabel}>{area.name}</span>
                {area.description && (
                  <span className={styles.focusDescription}>{area.description}</span>
                )}
              </div>
              {selectedFocusAreas.includes(area.id) && (
                <span className={styles.checkmark}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
