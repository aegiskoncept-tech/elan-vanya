import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Compass, Feather, Sparkles } from 'lucide-react';
import { DraftTag } from '@/components/ui/DraftTag';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About Us | Élan Vanya Resorts & Retreats',
  description:
    'A collection, not a chain. Discover the story, ethos, and tactile luxury philosophy behind Élan Vanya.',
};

export default function AboutPage() {
  const principles = [
    {
      num: '01',
      title: 'Geological Harmony',
      desc: 'Architecture that respects the land. In Jawai, our low-slung, earth-toned cottages emerge organically from billion-year-old granite kopjes.',
    },
    {
      num: '02',
      title: 'Tactile, Unhurried Luxury',
      desc: 'We replace ostentatious glamour with sensorial richness: cool stone floors, hand-block prints, quiet reading verandas, and desert breeze.',
    },
    {
      num: '03',
      title: 'Custodians of Place',
      desc: 'Deep collaboration with local communities and trackers. We foster respect for the wild, ensuring leopards and pastoral heritage thrive undisturbed.',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Header */}
      <section className="relative w-full min-h-[65vh] flex flex-col justify-end overflow-hidden bg-stone-950 text-white pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/jawai/aerial-landscape.jpg"
            alt="Aerial landscape of Élan Vanya scrubland and fields"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-stone-950/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="label-caps text-amber-300">Brand Ethos</span>
            <DraftTag variant="proposed" />
          </div>
          <h1 className="text-white drop-shadow-md">
            A collection, <span className="italic font-normal text-amber-200">not a chain.</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-200 max-w-2xl font-light leading-relaxed">
            Élan Vanya curates singular sanctuaries across India’s most compelling landscapes—sanctuaries shaped by ecology, silence, and thoughtful hospitality.
          </p>
        </div>
      </section>

      {/* Philosophy Split Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="label-caps text-[var(--accent)]">Our Genesis</span>
              <DraftTag variant="proposed" />
            </div>
            <h2 className="font-serif">
              Conceived in the stillness of Rajasthan’s <span className="italic">wild frontiers</span>.
            </h2>
            <div className="space-y-4 text-base text-[var(--muted)] leading-relaxed">
              <p>
                Élan Vanya began with a singular premise: that modern travel too often creates barriers between guests and the natural world. Our goal is the inverse—to dissolve the boundary between guest and landscape.
              </p>
              <p>
                Our flagship retreat in Jawai stands at the heart of granite kopjes where wild leopards roam freely past ancient villages. Here, luxury is defined by the quality of light at dawn, the rustle of dry leaves in the afternoon heat, and the quiet dignity of four-poster cottage living.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-lg overflow-hidden border border-[var(--line)] shadow-xl">
            <Image
              src="/images/jawai/sitting-nook.jpg"
              alt="Artisanal sitting nook by the verandah at Élan Vanya"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3 Hospitality Principles */}
      <section className="py-24 bg-[var(--surface-2)] border-y border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="label-caps text-[var(--accent)]">Guiding Tenets</span>
            <h2 className="font-serif">Three Principles of Élan Vanya</h2>
            <p className="text-sm text-[var(--muted)]">
              The fundamental convictions that guide our architecture, cuisine, and guest encounters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((pr) => (
              <div
                key={pr.num}
                className="p-8 rounded-lg border border-[var(--line)] bg-[var(--surface)] space-y-4 shadow-xs"
              >
                <div className="font-serif text-3xl font-light text-[var(--highlight)]">
                  {pr.num}
                </div>
                <h3 className="font-serif text-2xl text-[var(--heading)]">
                  {pr.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {pr.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Mosaic */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-14">
          <span className="label-caps text-[var(--accent)]">Sanctuary Mosaic</span>
          <h2 className="font-serif">Life at the Retreat</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-[var(--line)] shadow-sm">
            <Image
              src="/images/jawai/bedroom-portrait.jpg"
              alt="Four-poster bed with architectural gallery wall"
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-[var(--line)] shadow-sm sm:-translate-y-4">
            <Image
              src="/images/jawai/dining-side.jpg"
              alt="Dining hall side view with wildlife framed prints"
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-[var(--line)] shadow-sm">
            <Image
              src="/images/jawai/bath-vanity.jpg"
              alt="Granite bathroom vanity with black-framed mirror"
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Properties Callout & Final Action */}
      <section className="py-20 bg-[var(--surface-2)] border-t border-[var(--line)]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="label-caps text-[var(--accent)]">Begin The Journey</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[var(--heading)]">
            Explore Élan Vanya Jawai
          </h2>
          <p className="text-base text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
            Our inaugural sanctuary is now receiving guests. Step into earth-toned tranquility at the edge of leopard country.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Button href="/resorts/jawai" variant="primary">
              View Jawai Property
            </Button>
            <Button href="/booking?resort=jawai" variant="secondary">
              Book Safari Cottage
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
