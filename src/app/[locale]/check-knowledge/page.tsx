import { LandingNavbar } from '@/components/Landing/LandingNavbar/LandingNavbar';
import { LandingFooter } from '@/components/Landing/LandingFooter/LandingFooter';
import { KnowledgeCheckPage } from '@/components/KnowledgeCheck/KnowledgeCheckPage';

export default function CheckKnowledgePage() {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1 w-full" style={{ paddingTop: '80px' }}>
        <KnowledgeCheckPage />
      </main>
      <LandingFooter />
    </>
  );
}
