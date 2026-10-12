'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'rooms', label: 'Rooms & Rates' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'location', label: 'Location' },
  { id: 'faqs', label: 'FAQs' },
];

export function ScrollSpyNav() {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="sticky top-16 z-30 bg-[var(--surface)]/95 backdrop-blur-md border-y border-[var(--line)] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Resort Section Navigation"
          className="flex space-x-6 sm:space-x-8 overflow-x-auto scrollbar-none py-3"
          style={{ scrollbarWidth: 'none' }}
        >
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                type="button"
                className={cn(
                  'whitespace-nowrap text-xs uppercase font-bold tracking-[0.16em] py-1 transition-colors relative cursor-pointer',
                  isActive
                    ? 'text-[var(--accent)] font-extrabold'
                    : 'text-[var(--muted)] hover:text-[var(--fg)]'
                )}
              >
                {sec.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
