'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function FinalCta() {
  return (
    <section className="relative w-full py-32 overflow-hidden bg-stone-950 text-white">
      {/* Background Image: cottages-twilight.jpg */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/jawai/cottages-twilight.jpg"
          alt="Cottages illuminated at dusk against granite backdrop"
          fill
          sizes="100vw"
          className="object-cover object-[center_60%]"
        />
        <div className="absolute inset-0 bg-stone-950/75 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
        <span className="label-caps text-amber-300 tracking-[0.25em]">
          Begin Your Journey
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light">
          Your next escape <span className="italic font-normal text-amber-200">starts here.</span>
        </h2>
        <p className="text-base sm:text-lg text-stone-200/90 max-w-xl mx-auto font-light leading-relaxed">
          Reserve your cottage in Jawai or register early interest for our upcoming sanctuaries in the Aravalis and Chambal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            href="/booking?resort=jawai"
            variant="primary"
            size="lg"
            className="bg-white text-stone-900 hover:bg-stone-100 hover:text-stone-950 border-none shadow-xl"
          >
            Book your stay
          </Button>
          <Button
            href="/contact"
            variant="secondary"
            size="lg"
            className="bg-black/40 backdrop-blur-md text-white border-white/25 hover:bg-black/60"
          >
            Contact reservations
          </Button>
        </div>
      </div>
    </section>
  );
}
