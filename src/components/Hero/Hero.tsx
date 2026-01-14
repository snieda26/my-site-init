'use client';

import { Badge } from '@/components/UI/Badge/Badge';
import { Button } from '@/components/UI/Button/Button';
import { Card } from '@/components/UI/Card/Card';
import styles from './Hero.module.scss';

const FEATURES = [
  {
    icon: '📚',
    title: 'Knowledge Base',
    description:
      'Questions and their breakdowns on theory and practice from real interviews.',
  },
  {
    icon: '💻',
    title: 'Online IDE',
    description:
      'Write and check code directly in the browser with automatic checking.',
  },
  {
    icon: '🎯',
    title: 'Problems from real companies',
    description:
      'Practice on problems from Yandex, Ozon, Sber and other top companies.',
  },
  {
    icon: '🏆',
    title: 'Progress tracking',
    description: 'See how your skills and achievements grow.',
  },
];

const CHECK_ITEMS = [
  'Study theory, questions and answers only from real interviews',
  'Write code directly in the browser with automatic checking',
  'Solve problems from real interviews',
  'View statistics and achievements',
];

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.background} />
      <div className={styles.grid} />

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            <Badge variant="primary" className={styles.badge}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              </svg>
              Everything for frontend interview preparation
            </Badge>

            <h1 className={styles.title}>
              <span className={styles.titleMain}>Prepare for interviews</span>
              <span className={styles.titleGradient}>
                and land your dream offer
              </span>
            </h1>

            <p className={styles.description}>
              Hack Frontend is where theory meets practice. Learn key topics,
              solve problems, and feel confident before any interview.
            </p>

            <div className={styles.actions}>
              <Button size="lg" className={styles.ctaButton}>
                Start preparing
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </div>

            <div className={styles.checkList}>
              {CHECK_ITEMS.map((item, index) => (
                <div key={index} className={styles.checkItem}>
                  <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className={styles.stats}>
              Over <strong>2300+</strong> developers have prepared for
              interviews with Hack Frontend
            </p>
          </div>

          {/* Right Column - Code Example */}
          <div className={styles.rightColumn}>
            <Card className={styles.codeCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <p className={styles.cardSubtitle}>Test task</p>
                  <p className={styles.cardName}>
                    Implement flattenArray function
                  </p>
                </div>
                <div className={styles.tags}>
                  <Badge>JavaScript</Badge>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.codeBlock}>
                  <div className={styles.browserDots}>
                    <span className={styles.dot} data-color="red" />
                    <span className={styles.dot} data-color="yellow" />
                    <span className={styles.dot} data-color="green" />
                  </div>
                  <pre className={styles.code}>
                    {`function flattenArray(arr) {
  return arr.reduce((acc, el) => 
    Array.isArray(el) ? 
      acc.concat(flattenArray(el)) : 
      acc.concat(el)
  , [])
}`}
                  </pre>
                </div>

                <div className={styles.results}>
                  <div className={styles.resultsHeader}>
                    <p className={styles.resultsTitle}>Check results</p>
                  </div>
                  <div className={styles.resultsList}>
                    <div className={styles.resultItem}>
                      <svg className={styles.resultIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      <span>[[1,2],[3]] → [1,2,3]</span>
                    </div>
                    <div className={styles.resultItem}>
                      <svg className={styles.resultIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      <span>[1,[2,[3]]] → [1,2,3]</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Feature Cards */}
        <div className={styles.features}>
          {FEATURES.map((feature, index) => (
            <Card key={index} hoverable className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
