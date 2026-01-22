'use client';

import React from 'react';
import { LuStar, LuQuote } from 'react-icons/lu';
import styles from './Reviews.module.scss';

const REVIEWS = [
  {
    name: "Олександр Шевченко",
    role: "Senior Frontend",
    company: "Preply",
    text: "DevPrep допоміг мені структурувати знання з System Design. Питання про масштабування React-додатків були один в один як на моєму фінальному інтерв'ю.",
    initials: "ОШ"
  },
  {
    name: "Дарина Коваленко",
    role: "Backend Engineer",
    company: "Genesis",
    text: "Найкраща база Node.js запитань, яку я бачила. Секція про івент-луп та потоки даних просто незамінна для Middle розробників.",
    initials: "ДК"
  },
  {
    name: "Максим Петров",
    role: "Staff Engineer",
    company: "MacPaw",
    text: "AI Mock інтерв'ю — це геймчейнджер. Отримав чесний фідбек щодо моєї манери пояснювати складні концепції простими словами.",
    initials: "МП"
  },
  {
    name: "Юлія Бондар",
    role: "Lead Developer",
    company: "Grammarly",
    text: "Ми часто використовуємо подібні кейси при наймі в нашу команду. DevPrep готує саме до реальних викликів, а не просто до сухої теорії.",
    initials: "ЮБ"
  },
  {
    name: "Олег Симоненко",
    role: "Fullstack Dev",
    company: "SoftServe",
    text: "Завдяки треку по алгоритмах нарешті зрозумів динамічне програмування. Отримав офер на +40% до попередньої зарплати.",
    initials: "ОС"
  },
  {
    name: "Олена Волошина",
    role: "Engineering Manager",
    company: "Ajax Systems",
    text: "Платформа економить місяці підготовки. Все зібрано в одному місці, з акцентом на архітектурне мислення.",
    initials: "ОВ"
  }
];

export const Reviews: React.FC = () => {
  // Use a longer sequence to ensure seamless looping without gaps
  const firstRow = [...REVIEWS.slice(0, 3), ...REVIEWS.slice(0, 3), ...REVIEWS.slice(0, 3)];
  const secondRow = [...REVIEWS.slice(3, 6), ...REVIEWS.slice(3, 6), ...REVIEWS.slice(3, 6)];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h3 className={styles.sectionLabel}>
            <LuStar size={12} className={styles.starIcon} />
            Довіра спільноти
          </h3>
          <h2 className={styles.title}>
            Відгуки тих, хто <br /><span className={styles.titleMuted}>вже отримав</span> офер.
          </h2>
        </div>
      </div>

      <div className={styles.carouselWrapper}>
        {/* Row 1: Leftwards */}
        <div className={styles.carouselRow}>
          <div className={styles.marquee}>
            {firstRow.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>

        {/* Row 2: Rightwards */}
        <div className={styles.carouselRow}>
          <div className={styles.marqueeReverse}>
            {secondRow.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Side Fades for depth */}
      <div className={styles.fadeLeft}></div>
      <div className={styles.fadeRight}></div>
    </section>
  );
};

interface ReviewCardProps {
  review: typeof REVIEWS[0];
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => (
  <div className={styles.reviewCard}>
    <div className={styles.reviewHeader}>
      <div className={styles.reviewAuthor}>
        <div className={styles.avatar}>
          <span>{review.initials}</span>
        </div>
        <div className={styles.authorInfo}>
          <h4 className={styles.authorName}>{review.name}</h4>
          <p className={styles.authorRole}>
            {review.role} <span className={styles.separator}>•</span> <span className={styles.company}>{review.company}</span>
          </p>
        </div>
      </div>
      <div className={styles.quoteIcon}>
        <LuQuote size={28} />
      </div>
    </div>
    <p className={styles.reviewText}>
      "{review.text}"
    </p>
  </div>
);
