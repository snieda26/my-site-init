import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';
import { DocumentationLayout } from '@/components/Documentation/DocumentationLayout';
import { QuestionPageContent } from '@/components/Documentation/QuestionPageContent';

interface QuestionPageProps {
  params: Promise<{
    locale: string;
    section: string;
    question: string;
  }>;
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { section, question } = await params;

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full">
        <DocumentationLayout>
          <QuestionPageContent section={section} question={question} />
        </DocumentationLayout>
      </main>
      <Footer />
    </>
  );
}
