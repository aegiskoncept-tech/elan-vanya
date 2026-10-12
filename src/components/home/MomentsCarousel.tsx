'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function MomentsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const moments = [
    {
      src: '/images/jawai/cottages-twilight.jpg',
      title: 'Twilight over Cottages',
      subtitle: 'Conical granite hill framing the evening row',
    },
    {
      src: '/images/jawai/bedroom-wide.jpg',
      title: 'Artisanal Four-Poster Suite',
      subtitle: 'Earth-toned lime walls and handcrafted woodwork',
    },
    {
      src: '/images/jawai/dining-hall.jpg',
      title: 'Lantern Dining Pavilion',
      subtitle: 'Communal dining under emerald ring pendants',
    },
    {
      src: '/images/jawai/verandah-day.jpg',
      title: 'Sunlit Verandahs',
      subtitle: 'Morning tea overlooking open lawns',
    },
    {
      src: '/images/jawai/window-seat.jpg',
      title: 'Quiet Reading Nooks',
      subtitle: 'Full-height glass framing the wilderness',
    },
    {
      src: '/images/jawai/bath-shower.jpg',
      title: 'Stone Ensuite Bathrooms',
      subtitle: 'Screened walk-in shower and granite vanities',
    },
  ];

  const scrollBy = (offset: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      scrollBy(-340);
    } else if (e.key === 'ArrowRight') {
      scrollBy(340);
    }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div className="space-y-2">
          <span className="label-caps text-[var(--accent)]">
            Visual Journal
          </span>
          <h2 className="font-serif">
            Moments from <span className="italic">Jawai</span>.
          </h2>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy(-360)}
            type="button"
            className="w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center justify-center transition-colors shadow-xs"
            aria-label="Previous moments slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollBy(360)}
            type="button"
            className="w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center justify-center transition-colors shadow-xs"
            aria-label="Next moments slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scroll-Snap Carousel */}
      <div
        ref={carouselRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-2 focus:outline-hidden scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {moments.map((m, idx) => (
          <div
            key={idx}
            className="shrink-0 w-[280px] sm:w-[340px] snap-start rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--surface)] group shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={m.src}
                alt={m.title}
                fill
                sizes="(max-width: 640px) 280px, 340px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-serif text-lg text-[var(--heading)]">
                {m.title}
              </h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                {m.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
