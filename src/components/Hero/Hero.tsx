'use client';

import { Badge } from '@/components/UI/Badge/Badge';
import { Button } from '@/components/UI/Button/Button';
import { Card } from '@/components/UI/Card/Card';
import { useTranslations } from 'next-intl';
import styles from './Hero.module.scss';

export const Hero = () => {
  const t = useTranslations('hero');
  const tFeatures = useTranslations('features');

  const FEATURES = [
    {
      icon: '📚',
      title: tFeatures('knowledge.title'),
      description: tFeatures('knowledge.description'),
    },
    {
      icon: '💻',
      title: tFeatures('ide.title'),
      description: tFeatures('ide.description'),
    },
    {
      icon: '🎯',
      title: tFeatures('problems.title'),
      description: tFeatures('problems.description'),
    },
    {
      icon: '🏆',
      title: tFeatures('progress.title'),
      description: tFeatures('progress.description'),
    },
  ];

  const CHECK_ITEMS = [
    t('features.theory'),
    t('features.code'),
    t('features.problems'),
    t('features.progress'),
  ];
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
              {t('badge')}
            </Badge>

            <h1 className={styles.title}>
              <span className={styles.titleMain}>{t('title.line1')}</span>
              <span className={styles.titleGradient}>
                {t('title.line2')}
              </span>
            </h1>

            <p className={styles.description}>
              {t('description')}
            </p>

            <div className={styles.actions}>
              <Button size="lg" className={styles.ctaButton}>
                {t('cta')}
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
              {t('stats', { count: '2300+' })}
            </p>
          </div>

          {/* Right Column - Code Example */}
          <div className={styles.rightColumn}>
            <Card className={styles.codeCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <p className={styles.cardSubtitle}>{t('card.label')}</p>
                  <p className={styles.cardName}>
                    {t('card.title')}
                  </p>
                </div>
                <div className={styles.tags}>
                  <Badge>{t('card.badge')}</Badge>
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
                    <p className={styles.resultsTitle}>{t('card.results')}</p>
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
