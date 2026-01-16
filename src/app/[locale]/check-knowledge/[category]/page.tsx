import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';
import { CategoryQuestionsPage } from '@/components/KnowledgeCheck/CategoryQuestionsPage';

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full">
        <CategoryQuestionsPage category={category} />
      </main>
      <Footer />
    </>
  );
}
