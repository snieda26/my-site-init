import Link from 'next/link';
import { Button } from '@/components/UI/Button/Button';
import { Card } from '@/components/UI/Card/Card';
import styles from './About.module.scss';

const STATS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    value: '2300+',
    label: 'Registered users',
    color: 'green',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    value: '200+',
    label: 'Questions and breakdowns from real interviews',
    color: 'blue',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    value: '~500',
    label: 'Daily visitors',
    color: 'purple',
  },
];

export const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.badge}>About the creator</div>
          <h2 className={styles.title}>
            Created with{' '}
            <svg
              className={styles.heart}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>{' '}
            by a developer for developers
          </h2>
          <p className={styles.subtitle}>
            The story of how one person turned their experience into a platform
            for thousands
          </p>
        </div>

        {/* Main Content Card */}
        <Card className={styles.mainCard}>
          <div className={styles.cardContent}>
            {/* Profile Info */}
            <div className={styles.profileSection}>
              <div className={styles.profileHeader}>
                <h3 className={styles.profileName}>Dastan Salmurzaev</h3>
                <div className={styles.profileInfo}>
                  <div className={styles.profileItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      <rect width="20" height="14" x="2" y="6" rx="2" />
                    </svg>
                    <span>Frontend Developer in London</span>
                  </div>
                  <div className={styles.profileItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Bishkek, Kyrgyzstan</span>
                  </div>
                </div>
              </div>

              <div className={styles.story}>
                <p>
                  I went through a large number of interviews for a frontend
                  developer position myself. I know how difficult it is to
                  prepare when information is scattered across different
                  sources.
                </p>
                <p>
                  That&apos;s why on <strong>January 26, 2025</strong> I launched
                  Hack Frontend — a platform that brings everything you need in
                  one place.
                </p>
                <p>
                  Today the platform is used by <strong>2300+</strong> from CIS
                  countries, and I continue to develop it every day.
                </p>
              </div>

              <div className={styles.links}>
                <Button asChild>
                  <Link
                    href="https://www.linkedin.com/in/dastan-salmurzaev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    Connect on LinkedIn
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link
                    href="https://t.me/frontend_hackers"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Telegram community
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className={styles.statsSection}>
              {STATS.map((stat, index) => (
                <Card key={index} className={styles.statCard}>
                  <div className={styles.statContent}>
                    <div className={`${styles.statIcon} ${styles[stat.color]}`}>
                      {stat.icon}
                    </div>
                    <div className={styles.statInfo}>
                      <div className={styles.statValue}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                  </div>
                </Card>
              ))}
              <Card className={styles.growthCard}>
                <p className={styles.growthText}>
                  <span className={styles.highlight}>100% organic growth</span>{' '}
                  without advertising budget
                </p>
              </Card>
            </div>
          </div>
        </Card>

        {/* Bottom Text */}
        <div className={styles.footer}>
          <p>
            <strong>Why did I create this platform?</strong> Because I know
            what it&apos;s like to prepare for interviews while working full-time.
            Hack Frontend is the tool I wish I had at the start of my career.
          </p>
        </div>
      </div>
    </section>
  );
};
