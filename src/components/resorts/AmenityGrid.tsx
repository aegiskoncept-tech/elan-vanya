'use client';

import React from 'react';
import { Waves, Utensils, Sun, Trees, Bath, Phone, ShieldCheck } from 'lucide-react';
import { jawaiAmenities } from '@/data/amenities';

export function AmenityGrid() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return Waves;
      case 'Utensils':
        return Utensils;
      case 'Sun':
        return Sun;
      case 'Trees':
        return Trees;
      case 'Bath':
        return Bath;
      case 'Phone':
        return Phone;
      default:
        return ShieldCheck;
    }
  };

  return (
    <section id="amenities" className="py-16 scroll-mt-24">
      <div className="space-y-2 mb-10 border-b border-[var(--line)] pb-4">
        <span className="label-caps text-[var(--accent)]">
          Property Features
        </span>
        <h2 className="font-serif">Verified Sanctuary Amenities</h2>
        <p className="text-sm text-[var(--muted)]">
          Every amenity listed is verified and active on the Jawai estate.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jawaiAmenities.map((amenity) => {
          const Icon = getIcon(amenity.iconName);
          return (
            <div
              key={amenity.id}
              className="p-5 rounded-lg border border-[var(--line)] bg-[var(--surface)] space-y-3 shadow-xs hover:border-[var(--accent)] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)]">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[var(--heading)]">
                {amenity.name}
              </h3>
              {amenity.description && (
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {amenity.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
