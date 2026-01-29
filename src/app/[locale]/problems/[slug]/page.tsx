import { Header } from '@/components/Header';
import { ProblemDetailPageWrapper } from '@/modules/problems/components/ProblemDetailPageWrapper';
import '@/modules/problems/styles/scrollbar.scss';

export default async function ProblemDetail({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug } = await params;
  
  return (
    <div style={{ height: '100vh', background: '#000000', overflow: 'hidden' }}>
      <Header />
      <ProblemDetailPageWrapper slug={slug} />
    </div>
  );
}
