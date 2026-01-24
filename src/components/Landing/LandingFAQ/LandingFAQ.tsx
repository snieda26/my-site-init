'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LuPlus, LuMinus } from 'react-icons/lu';
import styles from './LandingFAQ.module.scss';

export const LandingFAQ: React.FC = () => {
  const t = useTranslations('landing.faq');
  const [openId, setOpenId] = useState<number | null>(null);
  
  const FAQ_DATA = [
    {
      id: 1,
      question: t('items.beginners.question'),
      answer: t('items.beginners.answer')
    },
    {
      id: 2,
      question: t('items.aiMock.question'),
      answer: t('items.aiMock.answer')
    },
    {
      id: 3,
      question: t('items.cancel.question'),
      answer: t('items.cancel.answer')
    },
    {
      id: 4,
      question: t('items.relevant.question'),
      answer: t('items.relevant.answer')
    },
    {
      id: 5,
      question: t('items.referrals.question'),
      answer: t('items.referrals.answer')
    }
  ];

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
              <span>{t('badge')}</span>
            </div>
            
            <h2 className={styles.title}>
              {t('title')}
            </h2>
            
            <p className={styles.subtitle}>
              {t('subtitle')}
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
