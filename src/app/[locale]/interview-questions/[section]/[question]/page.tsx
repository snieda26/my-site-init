import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';
import { ArticleLayout } from '@/components/Documentation/ArticleLayout';
import { QuestionPageContent } from '@/components/Documentation/QuestionPageContent';
import { notFound } from 'next/navigation';
import { questionsService } from '@/modules/questions/services/questions.service';
import { getLocalizedTitle } from '@/modules/questions/types/questions.types';

interface QuestionPageProps {
  params: Promise<{
    locale: string;
    section: string;
    question: string;
  }>;
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { locale, section, question } = await params;

  // Fetch question from API
  let questionData;
  try {
    questionData = await questionsService.getQuestionBySlug(question);
  } catch (error) {
    // If question not found in API, show 404
    notFound();
  }

  if (!questionData) {
    notFound();
  }

  // Get localized content
  const title = getLocalizedTitle(questionData, locale as 'en' | 'ua');
  const content = locale === 'ua' 
    ? questionData.contentMarkdownUa 
    : questionData.contentMarkdownEn;

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full">
        <ArticleLayout>
          <QuestionPageContent 
            section={section} 
            question={question}
            title={title}
            content={content}
            prev={questionData.prevSlug}
            next={questionData.nextSlug}
            prevCategorySlug={questionData.prevCategorySlug}
            nextCategorySlug={questionData.nextCategorySlug}
            locale={locale}
          />
        </ArticleLayout>
      </main>
      <Footer />
    </>
  );
}
