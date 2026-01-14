'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './FAQ.module.scss';

export const FAQ = () => {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const FAQ_ITEMS = [
    {
      question: t('items.what.question'),
      answer: t('items.what.answer'),
    },
    {
      question: t('items.different.question'),
      answer: t('items.different.answer'),
    },
    {
      question: t('items.register.question'),
      answer: t('items.register.answer'),
    },
    {
      question: t('items.companies.question'),
      answer: t('items.companies.answer'),
    },
    {
      question: t('items.practice.question'),
      answer: t('items.practice.answer'),
    },
    {
      question: t('items.updates.question'),
      answer: t('items.updates.answer'),
    },
    {
      question: t('items.beginners.question'),
      answer: t('items.beginners.answer'),
    },
    {
      question: t('items.ai.question'),
      answer: t('items.ai.answer'),
    },
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>
        </div>

        <div className={styles.accordion}>
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className={`${styles.item} ${openIndex === index ? styles.open : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => toggleItem(index)}
                aria-expanded={openIndex === index}
              >
                <span className={styles.questionText}>{item.question}</span>
                <svg
                  className={styles.icon}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div
                className={styles.answerWrapper}
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                }}
              >
                <div className={styles.answer}>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
