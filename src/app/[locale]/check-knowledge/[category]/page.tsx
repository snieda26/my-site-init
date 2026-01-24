import { LandingNavbar } from '@/components/Landing/LandingNavbar/LandingNavbar';
import { LandingFooter } from '@/components/Landing/LandingFooter/LandingFooter';
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
      <LandingNavbar />
      <main className="flex-1 w-full" style={{ paddingTop: '80px' }}>
        <CategoryQuestionsPage category={category} />
      </main>
      <LandingFooter />
    </>
  );
}
