'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, Feather, Eye, HeartHandshake } from 'lucide-react';

export function WhyElanVanya() {
  const pillars = [
    {
      icon: Compass,
      title: 'Distinctive destinations',
      desc: 'Selected for their ecological drama and cultural stillness—places where granite kopjes meet undisturbed horizons.',
    },
    {
      icon: Feather,
      title: 'Thoughtfully designed stays',
      desc: 'Earth-toned materials, bamboo shade, artisanal four-poster beds, and expansive glass bringing the wilderness indoors.',
    },
    {
      icon: Eye,
      title: 'Experiences with a sense of place',
      desc: 'Quiet tracking drives with local Rabari naturalists, lantern-lit dining, and golden hour vistas over billion-year-old rock formations.',
    },
    {
      icon: HeartHandshake,
      title: 'Personal hospitality',
      desc: 'Unscripted, intuitive attention from our retreat staff that respects your silence as much as your curiosities.',
    },
  ];

  return (
    <section className="py-24 bg-[var(--surface-2)] border-y border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Split Verandah-Room visual */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-lg overflow-hidden border border-[var(--line)] shadow-xl aspect-[4/5]">
              <Image
                src="/images/jawai/verandah-room.jpg"
                alt="Split view of outdoor bamboo verandah and indoor bedroom at Élan Vanya Jawai"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="label-caps text-[0.66rem] text-amber-300">
                  Indoor-Outdoor Harmony
                </span>
                <p className="font-serif text-lg mt-1 text-stone-100">
                  Full-height glass doors uniting private bamboo shade with the inner sanctuary.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Pillars */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div className="space-y-3">
              <span className="label-caps text-[var(--accent)]">
                The Élan Vanya Philosophy
              </span>
              <h2 className="font-serif">
                Crafted for those who crave <span className="italic">tactile</span> luxury.
              </h2>
              <p className="text-base text-[var(--muted)] leading-relaxed">
                We believe the greatest luxury today is not gold embellishment, but uninterrupted silence, handcrafted authenticity, and communion with raw natural landscapes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {pillars.map((p, idx) => {
                const IconComponent = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-lg border border-[var(--line)] bg-[var(--surface)] space-y-3 transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl text-[var(--heading)]">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
