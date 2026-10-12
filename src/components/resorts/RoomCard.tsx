'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Users, Bed, Check, Sparkles } from 'lucide-react';
import { Room } from '@/data/types';
import { formatCurrencyINR } from '@/lib/utils';
import { DraftTag } from '@/components/ui/DraftTag';
import { Button } from '@/components/ui/Button';

interface RoomCardProps {
  room: Room;
  resortSlug: string;
}

export function RoomCard({ room, resortSlug }: RoomCardProps) {
  const router = useRouter();

  const handleSelectPlan = (planId: string) => {
    router.push(`/booking?resort=${resortSlug}&room=${room.id}&plan=${planId}`);
  };

  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Column: Room Photography (Span 5) */}
        <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[260px] lg:min-h-full">
          <Image
            src={room.images[0]}
            alt={room.name}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="text-xs px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white font-medium">
              Freestanding Cottage
            </span>
          </div>
        </div>

        {/* Right Column: Room Details & Rate Plans (Span 7) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
              <h3 className="font-serif text-2xl sm:text-3xl text-[var(--heading)]">
                {room.name}
              </h3>
              <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{room.bed}</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Up to {room.maxOccupancy} Guests</span>
                </span>
              </div>
            </div>

            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {room.description}
            </p>

            {/* Room Amenities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-[var(--fg)]">
              {room.amenities.map((am, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rate Plans List */}
          <div className="space-y-3 pt-4 border-t border-[var(--line)]">
            <span className="label-caps text-[0.66rem] text-[var(--muted)]">
              Available Rate Plans
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {room.plans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-4 rounded-md border border-[var(--line)] bg-[var(--surface-2)] flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-semibold text-[var(--heading)]">
                        {plan.name}
                      </span>
                      {plan.sample && <DraftTag variant="demo" />}
                    </div>
                    <ul className="text-[0.72rem] text-[var(--muted)] space-y-0.5">
                      {plan.includes.map((inc, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <span className="text-[var(--accent)]">&bull;</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-[var(--line)] flex items-end justify-between">
                    <div>
                      <div className="text-[0.68rem] text-[var(--muted)]">Per night from</div>
                      <div className="font-serif text-lg font-bold text-[var(--heading)]">
                        {formatCurrencyINR(plan.nightlyRate)}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleSelectPlan(plan.id)}
                      variant="primary"
                      size="sm"
                    >
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
