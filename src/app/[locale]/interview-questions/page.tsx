import { LandingNavbar } from '@/components/Landing/LandingNavbar/LandingNavbar';
import { LandingFooter } from '@/components/Landing/LandingFooter/LandingFooter';
import { QuestionsGrid } from '@/components/Documentation/QuestionsGrid';

export default function InterviewQuestionsPage() {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1 w-full" style={{ paddingTop: '80px' }}>
        <QuestionsGrid />
      </main>
      <LandingFooter />
    </>
  );
}
