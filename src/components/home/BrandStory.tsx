'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function BrandStory() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial Copy */}
        <div className="lg:col-span-6 space-y-6">
          <span className="label-caps text-[var(--accent)]">
            The Élan Vanya Story
          </span>
          <h2 className="font-serif">
            More than a stay. <span className="italic">A change of pace.</span>
          </h2>
          <div className="space-y-4 text-base text-[var(--muted)] leading-relaxed">
            <p>
              In an age of constant connectivity, Élan Vanya was born from a desire to retreat into landscapes of stillness. We build our properties not to dominate the land, but to emerge naturally from its geological contours.
            </p>
            <p>
              In Jawai, this translates into earth-toned lime cottages that mirror the granite hills, private verandahs shaded by rustic bamboo, and an unhurried cadence where days are dictated by the sunrise over the kopjes and the stars over the campfire.
            </p>
          </div>
          <div className="pt-2">
            <Button href="/about" variant="outline">
              Read our full story
            </Button>
          </div>
        </div>

        {/* Right Column: Two Offset Images */}
        <div className="lg:col-span-6 relative pt-8 pb-12 sm:pb-16 flex justify-center">
          {/* Primary Main Image (verandah-lantern.jpg) */}
          <div className="relative w-3/4 aspect-[4/5] rounded-lg overflow-hidden border border-[var(--line)] shadow-2xl z-10">
            <Image
              src="/images/jawai/verandah-lantern.jpg"
              alt="Two woven armchairs under bamboo pergola with lantern at dusk"
              fill
              sizes="(max-width: 1024px) 70vw, 35vw"
              className="object-cover"
            />
          </div>

          {/* Secondary Offset Image (bed-detail.jpg) */}
          <div className="absolute -bottom-4 left-0 sm:left-4 w-1/2 aspect-square rounded-lg overflow-hidden border-4 border-[var(--surface)] shadow-2xl z-20">
            <Image
              src="/images/jawai/bed-detail.jpg"
              alt="Close-up of four-poster bedding with leopard-print cushions"
              fill
              sizes="(max-width: 1024px) 40vw, 20vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
