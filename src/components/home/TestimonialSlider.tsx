'use client';

import React, { useState } from 'react';
import { sampleTestimonials } from '@/data/testimonials';
import { DraftTag } from '@/components/ui/DraftTag';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? sampleTestimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === sampleTestimonials.length - 1 ? 0 : prev + 1));
  };

  const t = sampleTestimonials[current];

  return (
    <section className="py-24 bg-[var(--surface-2)] border-y border-[var(--line)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="flex items-center justify-center gap-2">
          <span className="label-caps text-[var(--accent)]">Guest Reflections</span>
          <DraftTag label="Sample reviews" />
        </div>

        <Quote className="w-10 h-10 text-[var(--highlight)] mx-auto opacity-70" />

        <div className="min-h-[140px] flex items-center justify-center">
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-[var(--heading)] italic leading-relaxed font-light">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
        </div>

        <div className="space-y-1">
          <div className="text-sm font-semibold tracking-wider text-[var(--fg)]">
            {t.author}
          </div>
          <div className="text-xs text-[var(--muted)]">
            Stayed in {t.stayDate} &middot; Verified Stay (Demo)
          </div>
        </div>

        {/* Stepper Dots & Arrows */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={prev}
            type="button"
            className="p-2 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors shadow-xs"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {sampleTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  current === idx
                    ? 'bg-[var(--accent)] w-6'
                    : 'bg-[var(--line)] hover:bg-[var(--muted)]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            type="button"
            className="p-2 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors shadow-xs"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
