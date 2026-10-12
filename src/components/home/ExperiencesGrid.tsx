'use client';

import React from 'react';
import Image from 'next/image';
import { jawaiExperiences } from '@/data/experiences';
import { DraftTag } from '@/components/ui/DraftTag';

export function ExperiencesGrid() {
  return (
    <section id="experiences" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
        <span className="label-caps text-[var(--accent)]">
          Immersive Encounters
        </span>
        <h2 className="font-serif">
          Experiences rooted in a <span className="italic">sense of place</span>.
        </h2>
        <p className="text-base text-[var(--muted)] leading-relaxed">
          From tracking the apex predator across billion-year-old rock faces to tranquil evenings under woven lanterns.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {jawaiExperiences.map((exp) => (
          <div
            key={exp.id}
            className="group relative rounded-lg overflow-hidden border border-[var(--line)] shadow-md aspect-[3/5] bg-stone-900 cursor-pointer flex flex-col justify-end p-6"
          >
            {/* Background Image */}
            <Image
              src={exp.image}
              alt={exp.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

            {/* Content Container (Reveals on hover, always visible on mobile/touch) */}
            <div className="relative z-10 space-y-2">
              {exp.tag && (
                <div className="mb-2">
                  <DraftTag label={exp.tag} />
                </div>
              )}
              <h3 className="font-serif text-2xl text-white drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                {exp.title}
              </h3>
              <p className="text-xs text-stone-200 leading-relaxed font-light transition-all duration-300 opacity-90 sm:opacity-0 sm:max-h-0 sm:group-hover:opacity-100 sm:group-hover:max-h-40 overflow-hidden">
                {exp.shortDesc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
