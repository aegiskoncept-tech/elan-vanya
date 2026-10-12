'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, X } from 'lucide-react';
import { Resort } from '@/data/types';
import { Button } from '@/components/ui/Button';
import { formatCurrencyINR } from '@/lib/utils';
import { DraftTag } from '@/components/ui/DraftTag';

interface FloatingBookingBarProps {
  resort: Resort;
}

export function FloatingBookingBar({ resort }: FloatingBookingBarProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Form states locked to this resort
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 3);

  const [checkIn, setCheckIn] = useState(tomorrow.toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(dayAfter.toISOString().split('T')[0]);
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);

  // Show only after scrolling past hero (approx 450px)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      resort: resort.slug,
      checkIn,
      checkOut,
      adults: adults.toString(),
      rooms: rooms.toString(),
    });
    router.push(`/booking?${query.toString()}`);
  };

  if (!visible || resort.status === 'coming-soon') return null;

  const minRate = resort.rooms[0]?.plans[0]?.nightlyRate;

  return (
    <>
      {/* Floating Bottom Bar */}
      <aside
        aria-label="Quick Booking Bar"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface)]/95 backdrop-blur-md border-t border-[var(--line)] shadow-2xl py-3 px-4 sm:px-6 transition-transform duration-300 font-sans"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <div className="font-serif text-lg font-medium text-[var(--heading)] leading-none">
                {resort.name}
              </div>
              {minRate && (
                <div className="flex items-center gap-2 text-xs text-[var(--muted)] mt-1">
                  <span>From {formatCurrencyINR(minRate)} / night</span>
                  <DraftTag variant="demo" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSheetOpen(true)}
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded border border-[var(--line)] bg-[var(--surface-2)] text-[var(--fg)] hover:border-[var(--accent)] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Select Dates</span>
            </button>
            <Button
              onClick={() => setSheetOpen(true)}
              variant="primary"
              size="sm"
            >
              Reserve Cottage
            </Button>
          </div>
        </div>
      </aside>

      {/* Bottom Sheet Modal */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-2xl bg-[var(--surface)] rounded-t-xl border-t border-[var(--line)] p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
              <div>
                <span className="label-caps text-[0.66rem] text-[var(--accent)]">
                  Reserve at {resort.name}
                </span>
                <h3 className="font-serif text-2xl text-[var(--heading)] mt-0.5">
                  Check Cottage Availability
                </h3>
              </div>
              <button
                onClick={() => setSheetOpen(false)}
                className="p-1.5 rounded-full hover:bg-[var(--surface-2)] text-[var(--muted)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="sheet-check-in" className="label-caps text-[0.66rem] text-[var(--muted)]">Check-in</label>
                  <input
                    id="sheet-check-in"
                    type="date"
                    value={checkIn}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[var(--surface-2)] text-[var(--heading)] border border-[var(--line)] rounded p-2.5 text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="sheet-check-out" className="label-caps text-[0.66rem] text-[var(--muted)]">Check-out</label>
                  <input
                    id="sheet-check-out"
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[var(--surface-2)] text-[var(--heading)] border border-[var(--line)] rounded p-2.5 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="sheet-adults" className="label-caps text-[0.66rem] text-[var(--muted)]">Adults</label>
                  <select
                    id="sheet-adults"
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-[var(--surface-2)] text-[var(--heading)] border border-[var(--line)] rounded p-2.5 text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} Adult{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="sheet-rooms" className="label-caps text-[0.66rem] text-[var(--muted)]">Rooms</label>
                  <select
                    id="sheet-rooms"
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full bg-[var(--surface-2)] text-[var(--heading)] border border-[var(--line)] rounded p-2.5 text-sm"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} Room{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="w-1/3 py-3 rounded border border-[var(--line)] text-xs font-bold uppercase tracking-wider text-[var(--fg)] hover:bg-[var(--surface-2)]"
                >
                  Cancel
                </button>
                <Button type="submit" variant="primary" className="w-2/3">
                  Check availability &amp; rates
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
