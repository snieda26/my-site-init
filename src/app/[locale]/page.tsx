'use client';

import { Navigation } from '@/components/Navigation/Navigation';
import { Banner } from '@/components/Banner/Banner';
import { Hero } from '@/components/Hero/Hero';
import { About } from '@/components/About/About';
import { Testimonials } from '@/components/Testimonials/Testimonials';
import { FAQ } from '@/components/FAQ/FAQ';
import { Footer } from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <>
      <Banner />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
