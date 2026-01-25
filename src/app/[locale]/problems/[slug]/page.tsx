import { Header } from '@/components/Header';
import { ProblemDetailPage } from '@/modules/problems/components/ProblemDetailPage';

export default async function ProblemDetail({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug } = await params;
  
  return (
    <>
      <Header />
      <main className="flex-1 w-full h-screen" style={{ paddingTop: '64px' }}>
        <ProblemDetailPage slug={slug} />
      </main>
    </>
  );
}
