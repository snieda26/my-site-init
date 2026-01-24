'use client';

import React, { useState } from 'react';
import { LuPlus, LuMinus } from 'react-icons/lu';
import styles from './LandingFAQ.module.scss';

const FAQ_DATA = [
  {
    id: 1,
    question: "Чи підходить ITLead для початківців або досвідчених розробників?",
    answer: "Для обох. У нас є базові алгоритмічні треки для кандидатів початкового рівня та поглиблені модулі з розподілених систем спеціально для співбесід на позиції Senior, Staff та Principal."
  },
  {
    id: 2,
    question: "Як працює AI Mock співбесіда?",
    answer: "Наш движок використовує швидке перетворення мови в текст та оцінку на базі LLM для симуляції реального інтерв'юера. Він оцінює вашу логіку, здатність пояснювати компроміси та 'м'які навички' під тиском."
  },
  {
    id: 3,
    question: "Чи можу я скасувати підписку в будь-який час?",
    answer: "Абсолютно. Ми пропонуємо прозорий помісячний план без періодів блокування. Ви можете керувати своїм біллінгом безпосередньо з панелі керування."
  },
  {
    id: 4,
    question: "Чи актуальні питання для співбесід?",
    answer: "Так. Наша база питань оновлюється щотижня на основі перевірених звітів спільноти про нещодавні співбесіди в таких компаніях, як Meta, OpenAI та Stripe."
  },
  {
    id: 5,
    question: "Чи надає ITLead можливості для рефералів?",
    answer: "Активні учасники нашого 'Pro' рівня отримують доступ до ексклюзивної реферальної мережі, де перевірені ментори можуть рекомендувати кандидатів безпосередньо у свої внутрішні конвеєри найму."
  }
];

export const LandingFAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Title & Info */}
          <div className={styles.leftColumn}>
            <div className={styles.badge}>
              <div className={styles.badgeDot}></div>
              <span>ПІДТРИМКА</span>
            </div>
            
            <h2 className={styles.title}>
              Поширені питання
            </h2>
            
            <p className={styles.subtitle}>
              Не знайшли те, що шукали? Зверніться до нашої команди технічної підтримки в будь-який час.
            </p>
          </div>
          
          {/* Right Column: Accordion */}
          <div className={styles.rightColumn}>
            {FAQ_DATA.map((item) => (
              <FAQItem 
                key={item.id} 
                question={item.question} 
                answer={item.answer} 
                isOpen={openId === item.id}
                onClick={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
      <button 
        onClick={onClick}
        className={styles.faqButton}
      >
        <span className={`${styles.faqQuestion} ${isOpen ? styles.faqQuestionOpen : ''}`}>
          {question}
        </span>
        <div className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ''}`}>
          {isOpen ? <LuMinus size={16} /> : <LuPlus size={16} />}
        </div>
      </button>
      <div className={`${styles.faqContent} ${isOpen ? styles.faqContentOpen : ''}`}>
        <div className={styles.faqAnswer}>
          <div className={styles.divider}></div>
          <p className={styles.answerText}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};
