'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { Resort } from '@/data/types';
import { Button } from '@/components/ui/Button';

interface ResortCardProps {
  resort: Resort;
  featured?: boolean;
}

export function ResortCard({ resort, featured }: ResortCardProps) {
  const isJawai = resort.slug === 'jawai';

  if (!isJawai || resort.status === 'coming-soon') {
    return (
      <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
        <div className="space-y-5">
          <div className="h-44 rounded bg-gradient-to-br from-[var(--surface-2)] via-[var(--line)]/25 to-[var(--surface-2)] border border-[var(--line)] flex flex-col items-center justify-center p-6 text-center">
            <Sparkles className="w-8 h-8 text-[var(--highlight)] mb-2" />
            <span className="label-caps text-[0.66rem] text-[var(--muted)]">
              Sanctuary Under Development
            </span>
            <span className="font-serif text-lg text-[var(--heading)] mt-1">
              {resort.location.region}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] mb-1">
              <MapPin className="w-3.5 h-3.5 text-[var(--highlight)]" />
              <span>{resort.location.area}, {resort.location.state}</span>
            </div>
            <h3 className="font-serif text-2xl text-[var(--heading)]">
              {resort.name}
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed mt-2">
              {resort.shortDescription}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between">
          <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
            Coming 2027
          </span>
          <Link
            href={`/contact?resort=${resort.slug}`}
            className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] hover:underline inline-flex items-center gap-1"
          >
            <span>Register interest</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  // Jawai Card
  return (
    <div className={`rounded-lg border border-[var(--line)] bg-[var(--surface)] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${featured ? 'lg:col-span-2' : ''}`}>
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={resort.heroImage || '/images/jawai/aerial-dusk.jpg'}
          alt={resort.name}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Open for bookings</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--highlight)] uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>{resort.location.area}, {resort.location.district}, {resort.location.state}</span>
          </div>
          <h3 className="font-serif text-3xl text-[var(--heading)]">
            {resort.name}
          </h3>
          <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            {resort.tagline} {resort.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {resort.highlights.map((hl, i) => (
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
          <Button href={`/resorts/${resort.slug}`} variant="primary">
            View resort &amp; gallery
          </Button>
          <Button href={`/booking?resort=${resort.slug}`} variant="secondary">
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
}
