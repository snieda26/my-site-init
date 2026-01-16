import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';
import { DocumentationLayout } from '@/components/Documentation/DocumentationLayout';
import { IntroductionContent } from '@/components/Documentation/IntroductionContent';

export default function InterviewQuestionsPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 w-full">
        <DocumentationLayout>
          <IntroductionContent />
        </DocumentationLayout>
      </main>
      <Footer />
    </>
  );
}
