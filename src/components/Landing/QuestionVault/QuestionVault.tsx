'use client';

import React, { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { LuLock, LuArrowUpRight, LuCpu, LuUsers, LuBuilding2, LuLayers } from 'react-icons/lu';
import styles from './QuestionVault.module.scss';

const TOP_COMPANIES = ["Preply", "Grammarly", "MacPaw", "Ajax", "Genesis", "SoftServe"];

export const QuestionVault: React.FC = () => {
  const t = useTranslations('landing.questionVault');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const DEEP_LOOPS = [
    { 
      firm: t('questions.react.firm'),
      loop: t('questions.react.loop'),
      query: t('questions.react.query')
    },
    { 
      firm: t('questions.js.firm'),
      loop: t('questions.js.loop'),
      query: t('questions.js.query')
    },
    { 
      firm: t('questions.backend.firm'),
      loop: t('questions.backend.loop'),
      query: t('questions.backend.query')
    },
    { 
      firm: t('questions.fullstack.firm'),
      loop: t('questions.fullstack.loop'),
      query: t('questions.fullstack.query')
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = containerRef.current?.getElementsByClassName(styles.questionCard);
      if (!cards) return;

      for (const card of Array.from(cards) as HTMLElement[]) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h3 className={styles.sectionLabel}>
              <LuCpu size={12} />
              {t('label')}
            </h3>
            <h2 className={styles.title}>
              {t('title')} <br /><span className={styles.titleMuted}>{t('titleMuted')}</span>
            </h2>
            <p className={styles.subtitle}>
              {t('subtitle')} <span className={styles.subtitleHighlight}>{t('subtitleHighlight')}</span> {t('subtitleEnd')}
            </p>
          </div>
          
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statIconIndigo}>
                  <LuLayers size={18} />
                </div>
                <span className={styles.statLabel}>{t('stats.questions.label')}</span>
              </div>
              <div className={styles.statValue}>
                <div className={styles.statNumber}>{t('stats.questions.number')}</div>
                <div className={styles.statDesc}>{t('stats.questions.desc')}</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statIconPurple}>
                  <LuBuilding2 size={18} />
                </div>
                <span className={styles.statLabel}>{t('stats.impact.label')}</span>
              </div>
              <div className={styles.statValue}>
                <div className={styles.statNumber}>{t('stats.impact.number')}</div>
                <div className={styles.statDesc}>{t('stats.impact.desc')}</div>
              </div>
            </div>

            <div className={styles.companiesCard}>
              <div className={styles.companiesHeader}>
                <div className={styles.companiesIcon}>
                  <LuUsers size={14} />
                </div>
                <span className={styles.companiesLabel}>{t('stats.companies.label')}</span>
              </div>
              <div className={styles.companiesList}>
                {TOP_COMPANIES.map(company => (
                  <span key={company} className={styles.companyTag}>
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.questionsGrid}>
          {DEEP_LOOPS.map((item, i) => (
            <div 
              key={i} 
              className={styles.questionCard}
            >
              <div className={styles.questionHeader}>
                <div className={styles.questionMeta}>
                  <div className={styles.questionLoop}>{item.loop}</div>
                  <div className={styles.questionFirm}>{item.firm}</div>
                </div>
                <div className={styles.questionArrow}>
                  <LuArrowUpRight size={18} />
                </div>
              </div>
              <h4 className={styles.questionText}>
                "{item.query}"
              </h4>
              <div className={styles.questionTags}>
                <span className={styles.tagPrimary}>{t('tags.middlePlus')}</span>
                <span className={styles.tagSecondary}>{t('tags.practice')}</span>
              </div>
              
              <LuLock className={styles.lockIcon} />
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>{t('cta.text')}</p>
          <button className={styles.ctaButton}>
            {t('cta.button')}
          </button>
        </div>
      </div>
    </section>
  );
};
