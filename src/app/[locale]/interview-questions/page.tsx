import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';
import { QuestionsGrid } from '@/components/Documentation/QuestionsGrid';

export default function InterviewQuestionsPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 w-full">
        <QuestionsGrid />
      </main>
      <Footer />
    </>
  );
}
