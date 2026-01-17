'use client';

import { useTranslations } from 'next-intl';
import type { TechnologyOption } from '../types/onboarding.types';
import styles from './OnboardingSteps.module.scss';

interface TechnologiesStepProps {
  technologies: TechnologyOption[];
  selectedTechnologies: string[];
  onSelectionChange: (technologies: string[]) => void;
}

const technologyIcons: Record<string, string> = {
  html_css: '🎨',
  javascript: '💛',
  typescript: '💙',
  react: '⚛️',
  vue: '💚',
  angular: '🔴',
  nextjs: '▲',
  nodejs: '🟢',
  python: '🐍',
  java: '☕',
  go: '🔵',
  rust: '🦀',
  sql: '🗄️',
  mongodb: '🍃',
  graphql: '💜',
  docker: '🐳',
  kubernetes: '⎈',
  aws: '☁️',
  git: '📝',
};

export function TechnologiesStep({
  technologies,
  selectedTechnologies,
  onSelectionChange,
}: TechnologiesStepProps) {
  const t = useTranslations('onboarding.steps.technologies');

  const toggleTechnology = (techId: string) => {
    if (selectedTechnologies.includes(techId)) {
      onSelectionChange(selectedTechnologies.filter((id) => id !== techId));
    } else {
      onSelectionChange([...selectedTechnologies, techId]);
    }
  };

  // Group technologies by category
  const groupedTechnologies = technologies.reduce((acc, tech) => {
    const category = tech.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tech);
    return acc;
  }, {} as Record<string, TechnologyOption[]>);

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>{t('title')}</h2>
        <p className={styles.stepDescription}>{t('description')}</p>
        <div className={styles.selectionCount}>
          {t('selected', { count: selectedTechnologies.length })}
        </div>
      </div>

      {Object.entries(groupedTechnologies).map(([category, techs]) => (
        <div key={category} className={styles.section}>
          <h3 className={styles.sectionTitle}>{t(`categories.${category}`)}</h3>
          <div className={styles.techGrid}>
            {techs.map((tech) => (
              <button
                key={tech.id}
                type="button"
                className={`${styles.techCard} ${
                  selectedTechnologies.includes(tech.id) ? styles.selected : ''
                }`}
                onClick={() => toggleTechnology(tech.id)}
              >
                <span className={styles.techIcon}>
                  {technologyIcons[tech.id] || '📦'}
                </span>
                <span className={styles.techLabel}>{tech.name}</span>
                {selectedTechnologies.includes(tech.id) && (
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
      ))}
    </div>
  );
}
