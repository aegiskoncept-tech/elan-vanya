'use client';

import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { reservationService } from '@/services/reservation';
import { resorts } from '@/data/resorts';
import { formatCurrencyINR, formatDateRange } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { DraftTag } from '@/components/ui/DraftTag';
import { brandConfig } from '@/data/config';
import { Calendar, Users, Bed, User, ShieldAlert, ArrowLeft, Loader2 } from 'lucide-react';

export function StepReview() {
  const { state, dispatch, goToStep } = useBooking();
  const [submitting, setSubmitting] = useState(false);
  const [demoConsent, setDemoConsent] = useState(state.guest.demoAcknowledged);
  const [consentError, setConsentError] = useState(false);

  const resort = resorts.find((r) => r.slug === state.criteria.resortSlug);
  const { criteria, selectedRoom, selectedPlan, guest, pricing } = state;

  if (!selectedRoom || !selectedPlan || !pricing) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm text-[var(--muted)]">Booking details incomplete.</p>
        <Button onClick={() => goToStep(1)} variant="primary">Start over</Button>
      </div>
    );
  }

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoConsent) {
      setConsentError(true);
      return;
    }

    setSubmitting(true);
    setConsentError(false);

    try {
      const result = await reservationService.createReservation({
        criteria,
        room: selectedRoom,
        plan: selectedPlan,
        guest: { ...guest, demoAcknowledged: true },
        pricing,
      });

      dispatch({ type: 'SET_CONFIRMATION', payload: result });
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="label-caps text-[var(--accent)]">Step 4 of 5</span>
        <h2 className="font-serif mt-1">Review Your Reservation</h2>
        <p className="text-sm text-[var(--muted)]">
          Verify all details before generating your demonstration reservation confirmation.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Destination & Dates */}
        <div className="p-5 rounded-lg border border-[var(--line)] bg-[var(--surface)] space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
            <span className="label-caps text-[0.66rem] text-[var(--muted)]">1. Destination &amp; Dates</span>
            <button
              onClick={() => goToStep(1)}
              className="text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              Change
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-[var(--muted)]">Sanctuary:</div>
              <div className="font-bold text-sm text-[var(--heading)]">{resort?.name}</div>
              <div className="text-[var(--muted)]">{resort?.location.area}, {resort?.location.state}</div>
            </div>
            <div>
              <div className="text-[var(--muted)]">Stay Duration:</div>
              <div className="font-bold text-sm text-[var(--heading)]">
                {formatDateRange(criteria.checkIn, criteria.checkOut)}
              </div>
              <div className="text-[var(--muted)]">
                {pricing.nights} Night{pricing.nights > 1 ? 's' : ''} &middot; {criteria.rooms} Room{criteria.rooms > 1 ? 's' : ''} &middot; {criteria.adults} Adults
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Room & Rate Package */}
        <div className="p-5 rounded-lg border border-[var(--line)] bg-[var(--surface)] space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
            <span className="label-caps text-[0.66rem] text-[var(--muted)]">2. Accommodation &amp; Package</span>
            <button
              onClick={() => goToStep(2)}
              className="text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              Change
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-[var(--muted)]">Cottage:</div>
              <div className="font-bold text-sm text-[var(--heading)]">{selectedRoom.name}</div>
              <div className="text-[var(--muted)]">{selectedRoom.bed}</div>
            </div>
            <div>
              <div className="text-[var(--muted)]">Rate Plan:</div>
              <div className="font-bold text-sm text-[var(--heading)] flex items-center gap-2">
                <span>{selectedPlan.name}</span>
                <DraftTag variant="demo" />
              </div>
              <ul className="text-[var(--muted)] list-disc list-inside mt-1">
                {selectedPlan.includes.map((inc, i) => (
                  <li key={i}>{inc}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: Guest Contact */}
        <div className="p-5 rounded-lg border border-[var(--line)] bg-[var(--surface)] space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
            <span className="label-caps text-[0.66rem] text-[var(--muted)]">3. Guest Details</span>
            <button
              onClick={() => goToStep(3)}
              className="text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              Change
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-[var(--muted)]">Primary Guest:</div>
              <div className="font-bold text-sm text-[var(--heading)]">
                {guest.firstName} {guest.lastName}
              </div>
              <div className="text-[var(--muted)]">{guest.email}</div>
            </div>
            <div>
              <div className="text-[var(--muted)]">Telephone:</div>
              <div className="font-bold text-sm text-[var(--heading)]">{guest.phone}</div>
              {guest.specialRequests && (
                <div className="text-[var(--muted)] mt-1 italic">
                  Note: &ldquo;{guest.specialRequests}&rdquo;
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sample Policy Notice */}
        <div className="p-4 rounded-lg bg-[var(--surface-2)] border border-[var(--line)] text-xs text-[var(--muted)] space-y-2">
          <div className="font-bold text-[var(--heading)] flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-[var(--highlight)]" />
            <span>Sample Cancellation &amp; Guarantee Policy</span>
          </div>
          <p>
            Standard demo policy: Free cancellation up to 14 days prior to check-in. This is a prototype presentation flow; real booking guarantees will integrate with AxisRooms/eZee and Razorpay once approved by client.
          </p>
        </div>

        {/* Required Demo Acknowledgment Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 p-4 rounded-lg border border-[var(--line)] bg-[var(--surface)] cursor-pointer">
            <input
              type="checkbox"
              checked={demoConsent}
              onChange={(e) => {
                setDemoConsent(e.target.checked);
                if (e.target.checked) setConsentError(false);
              }}
              className="w-4 h-4 mt-0.5 accent-[var(--accent)] rounded cursor-pointer"
            />
            <div className="text-xs text-[var(--fg)]">
              <span className="font-semibold block text-[var(--heading)]">
                I understand this is a demonstration booking. *
              </span>
              <span className="text-[var(--muted)] leading-relaxed">
                No credit card transaction or live room inventory holds will take place. This booking is for design and workflow evaluation only.
              </span>
            </div>
          </label>
          {consentError && (
            <p className="text-xs text-[var(--danger)] mt-2 font-medium">
              Please check the box to acknowledge this is a demonstration booking.
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="pt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => goToStep(3)}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)] hover:text-[var(--accent)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Guest Details</span>
          </button>

          <Button
            onClick={handleConfirm}
            disabled={submitting}
            variant="primary"
            size="lg"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </span>
            ) : (
              'Confirm Demo Booking'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
