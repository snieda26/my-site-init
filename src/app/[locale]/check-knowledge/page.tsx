import { Header } from '@/components/Header';
import { LandingFooter } from '@/components/Landing/LandingFooter/LandingFooter';
import { KnowledgeCheckPage } from '@/components/KnowledgeCheck/KnowledgeCheckPage';

export default function CheckKnowledgePage() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ paddingTop: '80px' }}>
        <KnowledgeCheckPage />
      </main>
      <LandingFooter />
    </>
  );
}
