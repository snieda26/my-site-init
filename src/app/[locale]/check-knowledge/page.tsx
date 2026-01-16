import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';
import { KnowledgeCheckPage } from '@/components/KnowledgeCheck/KnowledgeCheckPage';

export default function CheckKnowledgePage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 w-full">
        <KnowledgeCheckPage />
      </main>
      <Footer />
    </>
  );
}
