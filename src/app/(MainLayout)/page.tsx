'use client';
import Hero from '@/components/main/home/Hero';
import HowItWorks from '@/components/main/home/HowItWorks';
import Pricing from '@/components/main/home/Pricing';
import WhatYouGet from '@/components/main/home/WhatYouGet';
import FAQ from '@/components/main/home/FAQ';
import CTA1 from '@/components/main/home/CTA1';
import CTA2 from '@/components/main/home/CTA2';
import Testimonials from '@/components/main/home/Testimonials';

export default function LenguableLanding() {

  return (
    <div>
      <Hero />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <WhatYouGet />
      <FAQ />
      <CTA1 />
      <CTA2 />
    </div>
  );
}