import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { SearchPanel } from '@/components/home/SearchPanel';
import { ResortsCollection } from '@/components/home/ResortsCollection';
import { WhyElanVanya } from '@/components/home/WhyElanVanya';
import { ExperiencesGrid } from '@/components/home/ExperiencesGrid';
import { BrandStory } from '@/components/home/BrandStory';
import { ParallaxStatement } from '@/components/home/ParallaxStatement';
import { MomentsCarousel } from '@/components/home/MomentsCarousel';
import { TestimonialSlider } from '@/components/home/TestimonialSlider';
import { FinalCta } from '@/components/home/FinalCta';

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Cinematic Hero */}
      <HeroSection />

      {/* 2. Overlapping Booking Search Panel */}
      <SearchPanel />

      {/* 3. Resorts Collection */}
      <ResortsCollection />

      {/* 4. Why Élan Vanya Pillars */}
      <WhyElanVanya />

      {/* 5. Experiences Grid */}
      <ExperiencesGrid />

      {/* 6. Brand Story */}
      <BrandStory />

      {/* 7. Parallax Statement */}
      <ParallaxStatement />

      {/* 8. Moments Carousel */}
      <MomentsCarousel />

      {/* 9. Testimonial Slider */}
      <TestimonialSlider />

      {/* 10. Final CTA Banner */}
      <FinalCta />
    </div>
  );
}
