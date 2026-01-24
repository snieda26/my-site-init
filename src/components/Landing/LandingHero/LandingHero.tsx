'use client';

import React from 'react';
import { LuArrowRight, LuSparkles, LuDatabase, LuCode, LuZap, LuMessageSquare } from 'react-icons/lu';
import styles from './LandingHero.module.scss';

export const LandingHero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badgeWrapper}>
            <div className={styles.badge}>
              <LuSparkles size={12} className={styles.badgeIcon} />
              <span className={styles.badgeText}>Створено для Топ 1% розробників</span>
              <LuArrowRight size={12} className={styles.badgeArrow} />
            </div>
          </div>
          
          <h1 className={styles.title}>
            ГОТУЙСЯ ДО <br />
            СПІВБЕСІД ЯК <span className={styles.titleGradient}>ТОП 1%</span>
          </h1>
          
          <div className={styles.descriptionWrapper}>
            <p className={styles.description}>
              Досить готуватися наосліп. Отримай доступ до <span className={styles.highlight}>Інтелектуального хабу інтерв'ю</span>. Опануй тисячі реальних технічних запитань з фідбеком від експертів.
            </p>
            
            <div className={styles.actions}>
              <button className={styles.primaryBtn}>
                Відкрити сховище
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
              label="Технічних питань" 
              metric="5,200+"
              color="indigo" 
              delay="0s" 
            />
            <PulseCard 
              icon={<LuDatabase size={18}/>} 
              label="Кодинг тасків" 
              metric="150+ Middle+"
              color="purple" 
              delay="0.2s" 
            />
            <PulseCard 
              icon={<LuZap size={18}/>} 
              label="Арх. кейсів" 
              metric="80+ Сценаріїв"
              color="yellow" 
              delay="0.4s" 
            />
            <PulseCard 
              icon={<LuMessageSquare size={18}/>} 
              label="AI Mock Loops" 
              metric="Безлімітно"
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
