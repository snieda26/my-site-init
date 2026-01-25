import { Header } from '@/components/Header';
import { ProblemDetailPage } from '@/modules/problems/components/ProblemDetailPage';

export default async function ProblemDetail({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug } = await params;
  
  return (
    <div style={{ minHeight: '100vh', background: '#000000' }}>
      <Header />
      <ProblemDetailPage slug={slug} />
    </div>
  );
}
