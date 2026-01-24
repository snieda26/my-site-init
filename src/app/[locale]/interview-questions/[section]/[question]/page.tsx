import { Header } from '@/components/Header'
import { LandingFooter } from '@/components/Landing/LandingFooter/LandingFooter'
import { notFound } from 'next/navigation'
import {
  ArticleLayout,
  QuestionPageContent,
  questionsService,
  getLocalizedTitle,
} from '@/modules/questions'

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
      <Header />
      <main className="flex-1 w-full" style={{ paddingTop: '80px' }}>
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
      <LandingFooter />
    </>
  );
}
