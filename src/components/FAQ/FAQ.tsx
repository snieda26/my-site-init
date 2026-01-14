'use client';

import { useState } from 'react';
import styles from './FAQ.module.scss';

const FAQ_ITEMS = [
  {
    question: 'What is Hack Frontend?',
    answer:
      'Hack Frontend is a comprehensive platform for frontend interview preparation. It offers a knowledge base with 200+ questions from real interviews, coding problems, quizzes, and an online IDE for practice. Everything is collected in one place to help you prepare efficiently.',
  },
  {
    question: 'What makes Hack Frontend different from other interview prep platforms?',
    answer:
      'Unlike other platforms, Hack Frontend focuses exclusively on real interview questions from top tech companies. Every question and problem is sourced from actual interviews. The platform also provides an integrated online IDE for immediate practice and automatic code checking.',
  },
  {
    question: 'Do I need to register to use Hack Frontend?',
    answer:
      'You can browse some content without registration, but creating a free account unlocks full access to all features including progress tracking, personalized recommendations, and the ability to save your favorite questions.',
  },
  {
    question: 'Which companies\' interview questions are included?',
    answer:
      'The platform includes interview questions from leading tech companies like Yandex, Ozon, Sber, Tinkoff, and many other top companies from the CIS region and international markets.',
  },
  {
    question: 'Can I practice coding problems online?',
    answer:
      'Yes! Hack Frontend provides an integrated online IDE where you can write and test code directly in your browser. The platform supports automatic checking of your solutions against test cases.',
  },
  {
    question: 'How often is new content added?',
    answer:
      'The platform is actively developed with new content added regularly. This includes new interview questions, coding problems, and improvements to existing materials based on user feedback and recent interview trends.',
  },
  {
    question: 'Is Hack Frontend suitable for beginners?',
    answer:
      'Absolutely! The platform caters to all levels from junior to senior developers. Content is organized by difficulty and topic, making it easy to start with basics and progressively tackle more advanced concepts.',
  },
  {
    question: 'Why is this platform needed if there are different resources like AI-powered platforms?',
    answer:
      'While AI platforms can generate answers, Hack Frontend provides curated, verified content from real interviews with detailed explanations. The platform offers a structured learning path and consistent quality that AI-generated content may lack.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Everything you need to know about Hack Frontend
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
