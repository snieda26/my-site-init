import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';
import { ArticleLayout } from '@/components/Documentation/ArticleLayout';
import { QuestionPageContent } from '@/components/Documentation/QuestionPageContent';
import { getDocBySlug } from '@/lib/docs';
import { notFound } from 'next/navigation';

interface QuestionPageProps {
  params: Promise<{
    locale: string;
    section: string;
    question: string;
  }>;
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { locale, section, question } = await params;

  // Load markdown content from file system
  const doc = getDocBySlug(section, question);

  // If no markdown file found, show 404
  if (!doc) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full">
        <ArticleLayout>
          <QuestionPageContent 
            section={section} 
            question={question}
            title={doc.frontmatter.title}
            content={doc.content}
            prev={doc.frontmatter.prev}
            next={doc.frontmatter.next}
            locale={locale}
          />
        </ArticleLayout>
      </main>
      <Footer />
    </>
  );
}
