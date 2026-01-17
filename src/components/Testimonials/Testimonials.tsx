'use client';

import Link from 'next/link';
import { Button } from '@/components/UI/Button/Button';
import { Card } from '@/components/UI/Card/Card';
import { useTranslations } from 'next-intl';
import styles from './Testimonials.module.scss';

const TESTIMONIALS = [
  {
    initial: 'S',
    name: 'Senior Frontend Developer',
    text: 'Recently, I conducted an interview with a manager. I stumbled upon the platform and was surprised. Everything is gathered together. Not just a knowledge base, but a structured one with examples. I wish there was such a platform in my time!',
  },
  {
    initial: 'J',
    name: 'Junior Developer',
    text: 'At the interview, 90% of the questions were about things I studied here. The documentation is written in clear language. I hope the knowledge base keeps growing!',
  },
  {
    initial: 'F',
    name: 'Frontend Engineer',
    text: 'ITLead fills a preparation gap: everything is structured, straight to the point, and without fluff. Theory is immediately backed by practice—you can solve problems right in a convenient IDE.',
  },
  {
    initial: 'E',
    name: 'Elzar',
    text: 'I prepared with the platform and 70% of what I studied or solved appeared in interviews! The problems and quizzes are pure fire 🔥',
  },
  {
    initial: 'A',
    name: 'Aleksandr Zheltov',
    text: 'A great place to prepare! Well-chosen theory and practice helped me feel much more confident at interviews. 100% recommended!',
  },
  {
    initial: 'B',
    name: 'Baitemir',
    text: 'Thanks to this platform and the mock interviews I managed to get hired by a great company. Everything is sharp and structured. Wishing you success 🔥',
  },
  {
    initial: 'Y',
    name: 'Yerasyl',
    text: 'The platform pleasantly surprised me with how thoughtful and convenient it is. The visually pleasing interface makes studying the materials comfortable and inspiring.',
  },
  {
    initial: 'A',
    name: 'Adilet',
    text: 'I used it as a checklist to see which topics I hadn\'t touched during prep. The highly concentrated information helps to refresh the material fast.',
  },
  {
    initial: 'I',
    name: 'Ilgiz',
    text: 'My current level is senior front-end. When I restarted my job search the platform helped me save time on preparation. The questions and answers are up to date 👍',
  },
  {
    initial: 'G',
    name: 'Giokutela',
    text: 'A clear focus—you can tell the site is built for practice without any extra noise. Modern minimalist style, great readability, fast loading. Building such a platform is a huge achievement! 👏',
  },
];

export const Testimonials = () => {
  const t = useTranslations('testimonials');

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>
        </div>

        <div className={styles.marqueeContainer}>
          {/* First Row - Normal Direction */}
          <div className={styles.marqueeRow}>
            <div className={styles.marqueeContent}>
              {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
                <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Second Row - Reverse Direction */}
          <div className={`${styles.marqueeRow} ${styles.reverse}`}>
            <div className={styles.marqueeContent}>
              {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
                <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button asChild>
            <Link
              href="https://t.me/frontend_hackers"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('allReviews')}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href="https://t.me/frontend_hackers"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('leaveReview')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: {
    initial: string;
    name: string;
    text: string;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.avatar}>{testimonial.initial}</div>
        <div className={styles.cardInfo}>
          <p className={styles.name}>{testimonial.name}</p>
        </div>
      </div>
      <p className={styles.text}>{testimonial.text}</p>
    </Card>
  );
};
