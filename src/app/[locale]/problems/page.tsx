import { Header } from '@/components/Header'
import { LandingFooter } from '@/components/Landing/LandingFooter/LandingFooter'
import { ProblemsPage } from '@/modules/problems'

export default function ProblemsPageRoute() {
  return (
    <div style={{ minHeight: '100vh', background: '#000000' }}>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <ProblemsPage />
      </main>
      <LandingFooter />
    </div>
  );
}
