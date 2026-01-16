import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';
import { ProblemsPage } from '@/components/Problems/ProblemsPage';

export default function ProblemsPageRoute() {
  return (
    <>
      <Navigation />
      <main className="flex-1 w-full">
        <ProblemsPage />
      </main>
      <Footer />
    </>
  );
}
