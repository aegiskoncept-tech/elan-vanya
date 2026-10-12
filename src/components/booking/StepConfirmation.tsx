'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Copy, ArrowRight, RotateCcw } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { formatCurrencyINR, formatDateRange } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { resorts } from '@/data/resorts';

export function StepConfirmation() {
  const { state, resetBooking } = useBooking();
  const confirmation = state.confirmation;

  if (!confirmation) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm text-[var(--muted)]">No confirmation record found.</p>
        <Link href="/booking" className="text-xs uppercase font-bold text-[var(--accent)]">
          Start a new booking
        </Link>
      </div>
    );
  }

  const { referenceId, reservation, notice } = confirmation;
  const resort = resorts.find((r) => r.slug === reservation.criteria.resortSlug);

  const copyReference = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referenceId);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      {/* Animated Success Badge */}
      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 flex items-center justify-center mx-auto"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>

        <span className="label-caps text-emerald-600 tracking-[0.2em]">
          Demo Booking Generated
        </span>
        <h2 className="font-serif">
          Reservation Request Confirmed
        </h2>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Thank you, {reservation.guest.firstName}. Your sample itinerary reference has been recorded.
        </p>
      </div>

      {/* Demo Reference Pill */}
      <div className="p-4 rounded-lg bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between">
        <div>
          <span className="text-[0.66rem] uppercase tracking-wider text-[var(--muted)] block">
            Booking Reference ID
          </span>
          <span className="font-mono font-bold text-lg text-[var(--heading)]">
            {referenceId}
          </span>
        </div>
        <button
          onClick={copyReference}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--line)] bg-[var(--surface)] text-xs font-semibold hover:border-[var(--accent)] transition-colors"
          title="Copy Reference"
        >
          <Copy className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Copy</span>
        </button>
      </div>

      {/* Summary Breakdown Box */}
      <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 space-y-4 text-xs">
        <h3 className="font-serif text-lg text-[var(--heading)] border-b border-[var(--line)] pb-2">
          Itinerary Summary
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[var(--muted)]">Destination:</span>
            <div className="font-bold text-sm text-[var(--heading)]">{resort?.name}</div>
            <div className="text-[var(--muted)]">{resort?.location.area}, {resort?.location.state}</div>
          </div>
          <div>
            <span className="text-[var(--muted)]">Dates &amp; Nights:</span>
            <div className="font-bold text-sm text-[var(--heading)]">
              {formatDateRange(reservation.criteria.checkIn, reservation.criteria.checkOut)}
            </div>
            <div className="text-[var(--muted)]">
              {reservation.pricing.nights} Night{reservation.pricing.nights > 1 ? 's' : ''} &middot; {reservation.criteria.rooms} Cottage{reservation.criteria.rooms > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[var(--line)]">
          <div>
            <span className="text-[var(--muted)]">Suite &amp; Plan:</span>
            <div className="font-bold text-[var(--heading)]">{reservation.room.name}</div>
            <div className="text-[var(--muted)]">{reservation.plan.name}</div>
          </div>
          <div>
            <span className="text-[var(--muted)]">Total (Demo):</span>
            <div className="font-serif text-lg font-bold text-[var(--heading)]">
              {formatCurrencyINR(reservation.pricing.total)}
            </div>
            <div className="text-[var(--muted)]">Includes 18% demo tax</div>
          </div>
        </div>

        <div className="pt-3 border-t border-[var(--line)]">
          <span className="text-[var(--muted)]">Guest Contact:</span>
          <div className="font-semibold text-[var(--heading)]">
            {reservation.guest.firstName} {reservation.guest.lastName} ({reservation.guest.email}, {reservation.guest.phone})
          </div>
        </div>
      </div>

      {/* Prototype Disclaimer Banner */}
      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block">Prototype Demonstration Notice</span>
          <p className="leading-relaxed opacity-90">{notice}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button href="/" variant="primary" size="md">
          <span>Return to Homepage</span>
        </Button>
        <button
          onClick={resetBooking}
          type="button"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)] hover:text-[var(--accent)] py-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start a new booking</span>
        </button>
      </div>
    </div>
  );
}
