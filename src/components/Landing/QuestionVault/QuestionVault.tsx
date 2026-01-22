'use client';

import React, { useRef, useEffect } from 'react';
import { LuLock, LuArrowUpRight, LuCpu, LuUsers, LuBuilding2, LuLayers } from 'react-icons/lu';
import styles from './QuestionVault.module.scss';

const DEEP_LOOPS = [
  { 
    firm: 'Frontend Engineer', 
    loop: 'React Hooks', 
    query: 'Поясніть різницю між useMemo та useCallback. У яких випадках їх використання може навпаки погіршити продуктивність?' 
  },
  { 
    firm: 'JavaScript Developer', 
    loop: 'JS Core', 
    query: 'Що таке замикання (closures) і як вони допомагають інкапсулювати дані в JavaScript? Наведіть приклад з практики.' 
  },
  { 
    firm: 'Backend Developer', 
    loop: 'Node.js / Express', 
    query: 'Як реалізувати централізовану обробку помилок в Express.js через middleware для асинхронних операцій?' 
  },
  { 
    firm: 'Fullstack Engineer', 
    loop: 'NestJS / Architecture', 
    query: 'Поясніть концепцію Dependency Injection у NestJS. Як правильно організувати взаємодію між модулями через провайдери?' 
  },
];

const TOP_COMPANIES = ["Preply", "Grammarly", "MacPaw", "Ajax", "Genesis", "SoftServe"];

export const QuestionVault: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
              База знань Middle+
            </h3>
            <h2 className={styles.title}>
              Актуальні <br /><span className={styles.titleMuted}>Запитання.</span>
            </h2>
            <p className={styles.subtitle}>
              Ми відібрали найпопулярніші запитання, які ставлять на інтерв'ю для <span className={styles.subtitleHighlight}>Middle та Middle+</span> розробників.
            </p>
          </div>
          
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statIconIndigo}>
                  <LuLayers size={18} />
                </div>
                <span className={styles.statLabel}>Questions</span>
              </div>
              <div className={styles.statValue}>
                <div className={styles.statNumber}>5,200+</div>
                <div className={styles.statDesc}>Задач</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statIconPurple}>
                  <LuBuilding2 size={18} />
                </div>
                <span className={styles.statLabel}>Impact</span>
              </div>
              <div className={styles.statValue}>
                <div className={styles.statNumber}>240+</div>
                <div className={styles.statDesc}>UA Компаній</div>
              </div>
            </div>

            <div className={styles.companiesCard}>
              <div className={styles.companiesHeader}>
                <div className={styles.companiesIcon}>
                  <LuUsers size={14} />
                </div>
                <span className={styles.companiesLabel}>Топові UA Екосистеми</span>
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
                <span className={styles.tagPrimary}>Middle+</span>
                <span className={styles.tagSecondary}>Practice</span>
              </div>
              
              <LuLock className={styles.lockIcon} />
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>Прагнеш стати Middle+ швидше?</p>
          <button className={styles.ctaButton}>
            Отримати всі відповіді
          </button>
        </div>
      </div>
    </section>
  );
};
