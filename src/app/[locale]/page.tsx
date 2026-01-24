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
          
          <Reveal delay={200}>
            <PlatformPreview />
          </Reveal>

          <Reveal delay={300}>
            <QuestionVault />
          </Reveal>
          
          {/* <Reveal delay={100}>
            <Reviews />
          </Reveal> */}
          
          <Reveal>
            <div className={styles.faqSection}>
              <LandingFAQ />
            </div>
          </Reveal>
          
          <Reveal>
            <LandingCTA />
          </Reveal>
        </main>
        
        <LandingFooter />
      </div>
    </div>
  );
}
