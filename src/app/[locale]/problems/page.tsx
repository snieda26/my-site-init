import { Header } from '@/components/Header';
import { LandingFooter } from '@/components/Landing/LandingFooter/LandingFooter';
import { ProblemsPage } from '@/components/Problems/ProblemsPage';

export default function ProblemsPageRoute() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ paddingTop: '80px' }}>
        <ProblemsPage />
      </main>
      <LandingFooter />
    </>
  );
}
