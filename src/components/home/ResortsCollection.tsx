'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { resorts } from '@/data/resorts';
import { Button } from '@/components/ui/Button';

export function ResortsCollection() {
  const jawai = resorts.find((r) => r.slug === 'jawai')!;
  const upcomingResorts = resorts.filter((r) => r.status === 'coming-soon');

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-[var(--line)] pb-6">
        <div className="space-y-3 max-w-2xl">
          <span className="label-caps text-[var(--accent)]">
            Our Sanctuaries
          </span>
          <h2 className="font-serif">
            A thoughtful collection of <span className="italic">singular</span> wilderness retreats.
          </h2>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            href="/resorts"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)] hover:underline"
          >
            <span>View all destinations</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Resorts Grid: Large Featured Jawai + 2 upcoming cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Jawai Flagship Card (Span 8) */}
        <div className="lg:col-span-8 group relative rounded-lg border border-[var(--line)] bg-[var(--surface)] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src="/images/jawai/cottages-twilight.jpg"
              alt="Cottages at Élan Vanya Jawai lit at twilight against conical granite hills"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Flagship Sanctuary</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--highlight)] uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{jawai.location.area}, {jawai.location.state}</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[var(--heading)]">
                {jawai.name}
              </h3>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                {jawai.tagline} {jawai.shortDescription}
              </p>

              {/* Highlights tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {jawai.highlights.slice(0, 3).map((hl, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded bg-[var(--surface-2)] text-[var(--fg)] border border-[var(--line)]"
                  >
                    {hl}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--line)]">
              <Button href={`/resorts/${jawai.slug}`} variant="primary">
                Explore Élan Vanya Jawai
              </Button>
              <Button href={`/booking?resort=${jawai.slug}`} variant="secondary">
                Book Safari Cottage
              </Button>
            </div>
          </div>
        </div>

        {/* Coming Soon Cards Stack (Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {upcomingResorts.map((upcoming) => (
            <div
              key={upcoming.id}
              className="flex-1 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-md"
            >
              <div className="space-y-4">
                {/* Designed Graphic Placeholder Visual (NO stock photos) */}
                <div className="h-32 rounded bg-gradient-to-br from-[var(--surface-2)] via-[var(--line)]/30 to-[var(--surface-2)] border border-[var(--line)] flex flex-col items-center justify-center p-4 text-center">
                  <Sparkles className="w-6 h-6 text-[var(--highlight)] mb-2" />
                  <span className="label-caps text-[0.66rem] text-[var(--muted)]">
                    Sanctuary in Development
                  </span>
                  <span className="font-serif text-base text-[var(--heading)] mt-0.5">
                    {upcoming.location.region}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[var(--highlight)]" />
                    <span>{upcoming.location.area}, {upcoming.location.state}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[var(--heading)]">
                    {upcoming.name}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed mt-2">
                    {upcoming.shortDescription}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
                  Opening 2027
                </span>
                <Link
                  href={`/contact?resort=${upcoming.slug}`}
                  className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Register interest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
