'use client';

import React, { useState } from 'react';
import { LuPlus, LuMinus } from 'react-icons/lu';
import styles from './LandingFAQ.module.scss';

const FAQ_DATA = [
  {
    id: 1,
    question: "Is DevPrep for beginners or experienced developers?",
    answer: "Both. We have foundational algorithmic tracks for entry-level candidates and deep-dive distributed systems modules specifically for Senior, Staff, and Principal engineering interviews."
  },
  {
    id: 2,
    question: "How does the AI Mock Interview work?",
    answer: "Our engine uses low-latency speech-to-text and LLM-based evaluation to simulate a real interviewer. It assesses your logic, your ability to explain trade-offs, and your 'soft skills' under pressure."
  },
  {
    id: 3,
    question: "Can I cancel my subscription at any time?",
    answer: "Absolutely. We offer a transparent month-to-month plan with no lock-in periods. You can manage your billing directly from your dashboard."
  },
  {
    id: 4,
    question: "Are the interview questions up-to-date?",
    answer: "Yes. Our question bank is updated weekly based on verified community reports from recent interviews at companies like Meta, OpenAI, and Stripe."
  },
  {
    id: 5,
    question: "Does DevPrep provide referral opportunities?",
    answer: "Active members in our 'Pro' tier gain access to an exclusive referral network where verified mentors can refer candidates directly into their internal hiring pipelines."
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
              <span>SUPPORT</span>
            </div>
            
            <h2 className={styles.title}>
              Common Questions
            </h2>
            
            <p className={styles.subtitle}>
              Can't find what you're looking for? Reach out to our engineering support team anytime.
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
