'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Users, ChevronDown, ChevronUp, Bed, ShieldCheck } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { resorts } from '@/data/resorts';
import { formatCurrencyINR, formatDateRange } from '@/lib/utils';
import { DraftTag } from '@/components/ui/DraftTag';
import { brandConfig } from '@/data/config';

export function BookingSidebar() {
  const { state, goToStep } = useBooking();
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const resort = resorts.find((r) => r.slug === state.criteria.resortSlug);
  const { selectedRoom, selectedPlan, pricing, criteria } = state;

  return (
    <aside className="w-full lg:w-80 shrink-0 font-sans">
      {/* Mobile Sticky Bar */}
      <div className="lg:hidden mb-6 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-[var(--muted)]">Total Estimated</span>
            <div className="font-serif text-xl font-bold text-[var(--heading)]">
              {pricing ? formatCurrencyINR(pricing.total) : 'Select a room'}
            </div>
          </div>
          <button
            onClick={() => setMobileExpanded(!mobileExpanded)}
            type="button"
            className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]"
          >
            <span>{mobileExpanded ? 'Hide breakdown' : 'View breakdown'}</span>
            {mobileExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {mobileExpanded && (
          <div className="pt-4 mt-4 border-t border-[var(--line)] space-y-4">
            <SidebarContent resort={resort} state={state} goToStep={goToStep} />
          </div>
        )}
      </div>

      {/* Desktop Sticky Panel */}
      <div className="hidden lg:block sticky top-24 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 shadow-md space-y-6">
        <SidebarContent resort={resort} state={state} goToStep={goToStep} />
      </div>
    </aside>
  );
}

function SidebarContent({
  resort,
  state,
  goToStep,
}: {
  resort?: any;
  state: any;
  goToStep: (s: any) => void;
}) {
  const { criteria, selectedRoom, selectedPlan, pricing, step } = state;

  return (
    <div className="space-y-5">
      {/* Resort Header */}
      {resort && (
        <div className="space-y-3">
          <div className="relative aspect-[16/10] w-full rounded overflow-hidden border border-[var(--line)]">
            <Image
              src={resort.heroImage || '/images/jawai/aerial-dusk.jpg'}
              alt={resort.name}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-[0.66rem] uppercase tracking-wider text-[var(--highlight)] font-semibold">
              {resort.location.area}, {resort.location.state}
            </div>
            <h4 className="font-serif text-xl text-[var(--heading)]">
              {resort.name}
            </h4>
          </div>
        </div>
      )}

      {/* Stay Details */}
      <div className="space-y-2.5 pt-3 border-t border-[var(--line)] text-xs text-[var(--fg)]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <div>
              <div className="font-semibold">{formatDateRange(criteria.checkIn, criteria.checkOut)}</div>
              <div className="text-[0.7rem] text-[var(--muted)]">
                {pricing ? `${pricing.nights} Night${pricing.nights > 1 ? 's' : ''}` : 'Dates'}
              </div>
            </div>
          </div>
          {step > 1 && step < 5 && (
            <button
              onClick={() => goToStep(1)}
              className="text-[var(--accent)] font-semibold hover:underline"
            >
              Change
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span>
              {criteria.adults} Adults
              {criteria.children > 0 ? `, ${criteria.children} Children` : ''} &middot; {criteria.rooms} Room{criteria.rooms > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Selected Room & Plan */}
      {selectedRoom && selectedPlan ? (
        <div className="pt-3 border-t border-[var(--line)] space-y-2 text-xs">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <div>
                <div className="font-semibold text-[var(--heading)]">{selectedRoom.name}</div>
                <div className="text-[0.7rem] text-[var(--muted)]">{selectedPlan.name}</div>
              </div>
            </div>
            {step > 2 && step < 5 && (
              <button
                onClick={() => goToStep(2)}
                className="text-[var(--accent)] font-semibold hover:underline"
              >
                Change
              </button>
            )}
          </div>
          <div className="pt-1">
            <DraftTag variant="demo" />
          </div>
        </div>
      ) : (
        <div className="p-3 rounded bg-[var(--surface-2)] text-xs text-[var(--muted)] text-center">
          No cottage suite selected yet
        </div>
      )}

      {/* Pricing Breakdown */}
      {pricing && (
        <div className="pt-3 border-t border-[var(--line)] space-y-2 text-xs">
          <div className="flex justify-between text-[var(--muted)]">
            <span>
              {formatCurrencyINR(pricing.nightlyRate)} &times; {pricing.nights} night{pricing.nights > 1 ? 's' : ''}
              {pricing.rooms > 1 ? ` &times; ${pricing.rooms} rooms` : ''}
            </span>
            <span className="font-medium text-[var(--fg)]">
              {formatCurrencyINR(pricing.subtotal)}
            </span>
          </div>

          <div className="flex justify-between text-[var(--muted)]">
            <span>{brandConfig.pricing.taxLabel}</span>
            <span className="font-medium text-[var(--fg)]">
              {formatCurrencyINR(pricing.taxAmount)}
            </span>
          </div>

          <div className="pt-3 border-t border-[var(--line)] flex justify-between items-baseline text-sm">
            <span className="font-serif text-base font-bold text-[var(--heading)]">
              Estimated Total
            </span>
            <span className="font-serif text-xl font-extrabold text-[var(--heading)]">
              {formatCurrencyINR(pricing.total)}
            </span>
          </div>
        </div>
      )}

      {/* Demo Security Note */}
      <div className="pt-2 text-[0.68rem] text-[var(--muted)] leading-relaxed flex items-start gap-1.5">
        <ShieldCheck className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
        <span>Prototype preview: zero charges or real bookings are executed.</span>
      </div>
    </div>
  );
}
