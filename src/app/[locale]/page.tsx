'use client';

import {
  AnimatedBackground,
  LandingHero,
  PlatformPreview,
  QuestionVault,
  Reviews,
  LandingFAQ,
  LandingFooter,
  LandingCTA,
  Reveal,
} from '@/components/Landing';
import { Header } from '@/components/Header';
import styles from './page.module.scss';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <AnimatedBackground />
      
      <div className={styles.content}>
        <Header />
        
        <main>
          <LandingHero />
          
          <Reveal delay={200} once={false}>
            <PlatformPreview />
          </Reveal>

          <Reveal delay={300} once={false}>
            <QuestionVault />
          </Reveal>
          
          {/* <Reveal delay={100}>
            <Reviews />
          </Reveal> */}
          
          <Reveal once={false}>
            <div className={styles.faqSection}>
              <LandingFAQ />
            </div>
          </Reveal>
          
          <Reveal once={false}>
            <LandingCTA />
          </Reveal>
        </main>
        
        <LandingFooter />
      </div>
    </div>
  );
}
