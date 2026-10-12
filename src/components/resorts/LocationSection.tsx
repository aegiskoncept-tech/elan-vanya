'use client';

import React from 'react';
import { MapPin, Navigation, ExternalLink, Mountain, Plane, Train } from 'lucide-react';
import { Resort } from '@/data/types';
import { DraftTag } from '@/components/ui/DraftTag';

interface LocationSectionProps {
  resort: Resort;
}

export function LocationSection({ resort }: LocationSectionProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=Jawai+Bandh+Pali+Rajasthan`;

  return (
    <section id="location" className="py-16 scroll-mt-24">
      <div className="space-y-2 mb-8 border-b border-[var(--line)] pb-4">
        <span className="label-caps text-[var(--accent)]">
          Geographic Setting
        </span>
        <h2 className="font-serif">Wilderness Location</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Details & Transit (Span 5) */}
        <div className="lg:col-span-5 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="label-caps text-[0.66rem] text-[var(--muted)]">Destination Region</span>
                <DraftTag label="Address to be confirmed" />
              </div>
              <h3 className="font-serif text-2xl text-[var(--heading)]">
                {resort.location.area}, {resort.location.district}
              </h3>
              <p className="text-sm text-[var(--muted)] mt-1">
                Rajasthan, India &middot; Western Aravalli Kopjes
              </p>
            </div>

            {/* Address placeholder */}
            <div className="p-3.5 rounded bg-[var(--surface-2)] border border-[var(--line)] text-xs text-[var(--muted)] space-y-1">
              <div className="font-semibold text-[var(--heading)]">Property Address:</div>
              <p className="italic">
                Detailed coordinates and driving instructions provided upon confirmed reservation. [Full survey address to be supplied by client].
              </p>
            </div>

            {/* Travel Connections */}
            <div className="space-y-3 pt-2">
              <span className="label-caps text-[0.66rem] text-[var(--muted)]">Transit Access</span>
              <ul className="text-xs text-[var(--fg)] space-y-2.5">
                <li className="flex items-center gap-2.5">
                  <Plane className="w-4 h-4 text-[var(--highlight)] shrink-0" />
                  <span>Nearest Airport: Udaipur (UDR) ~2.5 hrs / Jodhpur (JDH) ~2.5 hrs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Train className="w-4 h-4 text-[var(--highlight)] shrink-0" />
                  <span>Nearest Railhead: Jawai Bandh Railway Station (JWB) ~20 mins</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mountain className="w-4 h-4 text-[var(--highlight)] shrink-0" />
                  <span>Setting: Private granite kopje wilderness border</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--line)]">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded border border-[var(--accent)] bg-[var(--surface-2)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--on-accent)] text-xs font-bold uppercase tracking-wider transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>

        {/* Right Column: Styled Map Graphic Placeholder (Span 7, NO iframe) */}
        <div className="lg:col-span-7 rounded-lg border border-[var(--line)] bg-[var(--surface-2)] overflow-hidden relative min-h-[340px] flex flex-col items-center justify-center p-8 text-center">
          {/* Topographic Contours Illustration Graphic */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="contour-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 0 30 Q 15 10 30 30 T 60 30" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M 0 50 Q 30 20 60 50" fill="none" stroke="currentColor" strokeWidth="0.75" />
                  <circle cx="30" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#contour-pattern)" />
            </svg>
          </div>

          {/* Center Pin & Graphic */}
          <div className="relative z-10 max-w-sm space-y-4">
            <div className="w-14 h-14 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] shadow-xl flex items-center justify-center mx-auto text-[var(--accent)] animate-bounce">
              <MapPin className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="label-caps text-[0.66rem] text-[var(--accent)]">
                Interactive Topographic Map
              </span>
              <h4 className="font-serif text-2xl text-[var(--heading)]">
                Jawai Kopjes &amp; Dam Region
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Nestled amidst granite formations in Pali District, Rajasthan. Real-time GPS coordinates and route map will be enabled on production rollout.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
              >
                <span>View Jawai region satellite pins</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
