'use client';

import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { resorts } from '@/data/resorts';
import { Button } from '@/components/ui/Button';
import { MapPin, Calendar, Users, AlertCircle, Plus, Minus } from 'lucide-react';

export function StepSearch() {
  const { state, dispatch, goToStep } = useBooking();
  const [criteria, setCriteria] = useState(state.criteria);
  const [error, setError] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (criteria.checkIn < todayStr) {
      setError('Check-in date cannot be in the past.');
      return;
    }
    if (criteria.checkOut <= criteria.checkIn) {
      setError('Check-out date must be after check-in date.');
      return;
    }
    if (criteria.adults < 1) {
      setError('At least 1 adult is required.');
      return;
    }
    if (criteria.adults < criteria.rooms) {
      setError('Each booked room requires at least 1 adult.');
      return;
    }
    if (criteria.rooms < 1 || criteria.rooms > 5) {
      setError('You may reserve between 1 and 5 rooms per booking.');
      return;
    }

    const selectedResort = resorts.find((r) => r.slug === criteria.resortSlug);
    if (!selectedResort || selectedResort.status !== 'open') {
      setError('The selected destination is not currently open for reservations.');
      return;
    }

    setError(null);
    dispatch({ type: 'UPDATE_CRITERIA', payload: criteria });
    goToStep(2);
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="label-caps text-[var(--accent)]">Step 1 of 5</span>
        <h2 className="font-serif mt-1">Select Dates &amp; Sanctuary</h2>
        <p className="text-sm text-[var(--muted)]">
          Configure your stay parameters to check cottage availability and demo rate plans.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded border border-[var(--danger)]/30 bg-[var(--danger)]/10 text-[var(--danger)] text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination Selection */}
        <div className="space-y-2">
          <label htmlFor="booking-resort-select" className="label-caps text-[0.66rem] text-[var(--muted)] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Destination Property</span>
          </label>
          <select
            id="booking-resort-select"
            value={criteria.resortSlug}
            onChange={(e) => setCriteria({ ...criteria, resortSlug: e.target.value })}
            className="w-full bg-[var(--surface-2)] text-[var(--heading)] border border-[var(--line)] rounded-md px-3.5 py-3 text-sm font-medium focus:border-[var(--accent)] focus:outline-hidden cursor-pointer"
          >
            {resorts.map((r) => (
              <option
                key={r.id}
                value={r.slug}
                disabled={r.status === 'coming-soon'}
              >
                {r.name} {r.status === 'coming-soon' ? '(Coming Soon)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="booking-check-in" className="label-caps text-[0.66rem] text-[var(--muted)] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Check-in Date</span>
            </label>
            <input
              id="booking-check-in"
              type="date"
              min={todayStr}
              value={criteria.checkIn}
              onChange={(e) => {
                const newIn = e.target.value;
                let newOut = criteria.checkOut;
                if (newIn >= newOut) {
                  const d = new Date(newIn);
                  d.setDate(d.getDate() + 1);
                  newOut = d.toISOString().split('T')[0];
                }
                setCriteria({ ...criteria, checkIn: newIn, checkOut: newOut });
              }}
              className="w-full bg-[var(--surface-2)] text-[var(--heading)] border border-[var(--line)] rounded-md px-3.5 py-2.5 text-sm font-medium focus:border-[var(--accent)] focus:outline-hidden"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="booking-check-out" className="label-caps text-[0.66rem] text-[var(--muted)] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Check-out Date</span>
            </label>
            <input
              id="booking-check-out"
              type="date"
              min={criteria.checkIn}
              value={criteria.checkOut}
              onChange={(e) => setCriteria({ ...criteria, checkOut: e.target.value })}
              className="w-full bg-[var(--surface-2)] text-[var(--heading)] border border-[var(--line)] rounded-md px-3.5 py-2.5 text-sm font-medium focus:border-[var(--accent)] focus:outline-hidden"
              required
            />
          </div>
        </div>

        {/* Steppers for Adults, Children, and Rooms */}
        <div className="p-4 sm:p-6 rounded-lg border border-[var(--line)] bg-[var(--surface)] space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-[var(--accent)]" />
            <span className="label-caps text-[0.66rem] text-[var(--muted)]">Party Size &amp; Rooms</span>
          </div>

          {/* Adults */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <div>
              <div className="text-sm font-semibold text-[var(--heading)]">Adults</div>
              <div className="text-xs text-[var(--muted)]">Age 13 and above</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={criteria.adults <= criteria.rooms}
                onClick={() => setCriteria({ ...criteria, adults: criteria.adults - 1 })}
                className="w-8 h-8 rounded border border-[var(--line)] flex items-center justify-center hover:bg-[var(--surface-2)] disabled:opacity-40"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-bold text-sm">{criteria.adults}</span>
              <button
                type="button"
                disabled={criteria.adults >= 10}
                onClick={() => setCriteria({ ...criteria, adults: criteria.adults + 1 })}
                className="w-8 h-8 rounded border border-[var(--line)] flex items-center justify-center hover:bg-[var(--surface-2)] disabled:opacity-40"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <div>
              <div className="text-sm font-semibold text-[var(--heading)]">Children</div>
              <div className="text-xs text-[var(--muted)]">Ages 0 to 12</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={criteria.children <= 0}
                onClick={() => setCriteria({ ...criteria, children: criteria.children - 1 })}
                className="w-8 h-8 rounded border border-[var(--line)] flex items-center justify-center hover:bg-[var(--surface-2)] disabled:opacity-40"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-bold text-sm">{criteria.children}</span>
              <button
                type="button"
                disabled={criteria.children >= 5}
                onClick={() => setCriteria({ ...criteria, children: criteria.children + 1 })}
                className="w-8 h-8 rounded border border-[var(--line)] flex items-center justify-center hover:bg-[var(--surface-2)] disabled:opacity-40"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rooms */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-[var(--heading)]">Rooms</div>
              <div className="text-xs text-[var(--muted)]">Between 1 and 5 rooms</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={criteria.rooms <= 1}
                onClick={() => setCriteria({ ...criteria, rooms: criteria.rooms - 1 })}
                className="w-8 h-8 rounded border border-[var(--line)] flex items-center justify-center hover:bg-[var(--surface-2)] disabled:opacity-40"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-bold text-sm">{criteria.rooms}</span>
              <button
                type="button"
                disabled={criteria.rooms >= 5}
                onClick={() => {
                  const newRooms = criteria.rooms + 1;
                  setCriteria({
                    ...criteria,
                    rooms: newRooms,
                    adults: Math.max(criteria.adults, newRooms),
                  });
                }}
                className="w-8 h-8 rounded border border-[var(--line)] flex items-center justify-center hover:bg-[var(--surface-2)] disabled:opacity-40"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" variant="primary" size="lg" className="w-full">
            Find Available Cottages
          </Button>
        </div>
      </form>
    </div>
  );
}
