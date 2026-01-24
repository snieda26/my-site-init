'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { LuArrowRight, LuSparkles, LuDatabase, LuCode, LuZap, LuMessageSquare } from 'react-icons/lu';
import styles from './LandingHero.module.scss';

export const LandingHero: React.FC = () => {
  const t = useTranslations('landing.hero');
  
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badgeWrapper}>
            <div className={styles.badge}>
              <LuSparkles size={12} className={styles.badgeIcon} />
              <span className={styles.badgeText}>{t('badge')}</span>
              <LuArrowRight size={12} className={styles.badgeArrow} />
            </div>
          </div>
          
          <h1 className={styles.title}>
            {t('title.line1')} <br />
            {t('title.line2')} <span className={styles.titleGradient}>{t('title.highlight')}</span>
          </h1>
          
          <div className={styles.descriptionWrapper}>
            <p className={styles.description}>
              <span className={styles.descriptionLine}>{t('description.line1')} <span className={styles.highlight}>{t('description.highlight')}</span>.</span>
              <span className={styles.descriptionLine}>{t('description.line2')}</span>
            </p>
            
            <div className={styles.actions}>
              <button className={styles.primaryBtn}>
                {t('cta')}
                <LuArrowRight className={styles.btnArrow} size={16} />
              </button>
              {/* <button className={styles.secondaryBtn}>
                Симуляція інтерв'ю
              </button> */}
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          <div className={styles.cardsGrid}>
            <PulseCard 
              icon={<LuCode size={18}/>} 
              label={t('cards.questions.label')}
              metric={t('cards.questions.metric')}
              color="indigo" 
              delay="0s" 
            />
            <PulseCard 
              icon={<LuDatabase size={18}/>} 
              label={t('cards.tasks.label')}
              metric={t('cards.tasks.metric')}
              color="purple" 
              delay="0.2s" 
            />
            <PulseCard 
              icon={<LuZap size={18}/>} 
              label={t('cards.cases.label')}
              metric={t('cards.cases.metric')}
              color="yellow" 
              delay="0.4s" 
            />
            <PulseCard 
              icon={<LuMessageSquare size={18}/>} 
              label={t('cards.mock.label')}
              metric={t('cards.mock.metric')}
              color="pink" 
              delay="0.6s" 
            />
          </div>
        </div>
      </div>
      
      <div className={styles.glow}></div>
    </section>
  );
};

interface PulseCardProps {
  icon: React.ReactNode;
  label: string;
  metric: string;
  color: 'indigo' | 'purple' | 'yellow' | 'pink';
  delay: string;
}

const PulseCard: React.FC<PulseCardProps> = ({ icon, label, metric, color, delay }) => (
  <div 
    className={styles.pulseCard}
    style={{ animationDelay: delay }}
  >
    <div className={`${styles.pulseCardIcon} ${styles[`icon${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>
      {icon}
    </div>
    <div className={styles.pulseCardContent}>
      <span className={styles.pulseCardLabel}>{label}</span>
      <span className={styles.pulseCardMetric}>{metric}</span>
    </div>
  </div>
);
