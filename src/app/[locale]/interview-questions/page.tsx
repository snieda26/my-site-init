import { LandingNavbar } from '@/components/Landing/LandingNavbar/LandingNavbar';
import { LandingFooter } from '@/components/Landing/LandingFooter/LandingFooter';
import { AnimatedBackground } from '@/components/Landing';
import { QuestionsGrid } from '@/components/Documentation/QuestionsGrid';
import styles from './interview-questions.module.scss';

export default function InterviewQuestionsPage() {
  return (
    <div className={styles.page}>
      <AnimatedBackground />
      <div className={styles.content}>
        <LandingNavbar />
        <main className={styles.main}>
          <QuestionsGrid />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
