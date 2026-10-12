'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, MapPin, Search, Plus, Minus } from 'lucide-react';
import { resorts } from '@/data/resorts';
import { Button } from '@/components/ui/Button';

export function SearchPanel() {
  const router = useRouter();

  // Default dates: tomorrow to +2 days
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 3);

  const defaultCheckIn = tomorrow.toISOString().split('T')[0];
  const defaultCheckOut = dayAfter.toISOString().split('T')[0];

  const [resortSlug, setResortSlug] = useState('jawai');
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [guestPickerOpen, setGuestPickerOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      resort: resortSlug,
      checkIn,
      checkOut,
      adults: adults.toString(),
      children: childrenCount.toString(),
      rooms: rooms.toString(),
    });
    router.push(`/booking?${query.toString()}`);
  };

  return (
    <div id="search-panel" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14">
      <div className="bg-[var(--surface)] text-[var(--fg)] rounded-lg shadow-2xl border border-[var(--line)] p-4 sm:p-6 backdrop-blur-md">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Destination picker */}
          <div className="md:col-span-3 space-y-1.5">
            <label htmlFor="resort-select" className="label-caps text-[0.66rem] text-[var(--muted)] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Resort / Destination</span>
            </label>
            <div className="relative">
              <select
                id="resort-select"
                value={resortSlug}
                onChange={(e) => setResortSlug(e.target.value)}
                className="w-full bg-[var(--surface-2)] text-[var(--heading)] border border-[var(--line)] rounded px-3 py-2.5 text-sm font-medium focus:border-[var(--accent)] focus:outline-hidden appearance-none cursor-pointer"
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
          </div>

          {/* Check-in */}
          <div className="md:col-span-2 space-y-1.5">
            <label htmlFor="check-in-date" className="label-caps text-[0.66rem] text-[var(--muted)] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Check-in</span>
            </label>
            <input
              id="check-in-date"
              type="date"
              value={checkIn}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (e.target.value >= checkOut) {
                  const nextDay = new Date(e.target.value);
                  nextDay.setDate(nextDay.getDate() + 1);
                  setCheckOut(nextDay.toISOString().split('T')[0]);
                }
              }}
              className="w-full bg-[var(--surface-2)] text-[var(--heading)] border border-[var(--line)] rounded px-3 py-2 text-sm font-medium focus:border-[var(--accent)] focus:outline-hidden"
              required
            />
          </div>

          {/* Check-out */}
          <div className="md:col-span-2 space-y-1.5">
            <label htmlFor="check-out-date" className="label-caps text-[0.66rem] text-[var(--muted)] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Check-out</span>
            </label>
            <input
              id="check-out-date"
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-[var(--surface-2)] text-[var(--heading)] border border-[var(--line)] rounded px-3 py-2 text-sm font-medium focus:border-[var(--accent)] focus:outline-hidden"
              required
            />
          </div>

          {/* Guests & Rooms Popover trigger */}
          <div className="md:col-span-3 space-y-1.5 relative">
            <label className="label-caps text-[0.66rem] text-[var(--muted)] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Guests &amp; Rooms</span>
            </label>
            <button
              type="button"
              onClick={() => setGuestPickerOpen(!guestPickerOpen)}
              className="w-full text-left bg-[var(--surface-2)] text-[var(--heading)] border border-[var(--line)] rounded px-3 py-2.5 text-sm font-medium hover:border-[var(--accent)] focus:outline-hidden flex items-center justify-between"
              aria-expanded={guestPickerOpen}
            >
              <span className="truncate">
                {adults + childrenCount} Guests &middot; {rooms} Room{rooms > 1 ? 's' : ''}
              </span>
            </button>

            {/* Steppers Dropdown */}
            {guestPickerOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-[var(--surface)] border border-[var(--line)] rounded-lg shadow-2xl z-30 space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[var(--heading)]">Adults</div>
                    <div className="text-[0.7rem] text-[var(--muted)]">Ages 13+</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={adults <= rooms}
                      onClick={() => setAdults(Math.max(rooms, adults - 1))}
                      className="p-1 rounded border border-[var(--line)] hover:bg-[var(--surface-2)] disabled:opacity-40"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">{adults}</span>
                    <button
                      type="button"
                      disabled={adults >= 10}
                      onClick={() => setAdults(adults + 1)}
                      className="p-1 rounded border border-[var(--line)] hover:bg-[var(--surface-2)] disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[var(--heading)]">Children</div>
                    <div className="text-[0.7rem] text-[var(--muted)]">Ages 0–12</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={childrenCount <= 0}
                      onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                      className="p-1 rounded border border-[var(--line)] hover:bg-[var(--surface-2)] disabled:opacity-40"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">{childrenCount}</span>
                    <button
                      type="button"
                      disabled={childrenCount >= 5}
                      onClick={() => setChildrenCount(childrenCount + 1)}
                      className="p-1 rounded border border-[var(--line)] hover:bg-[var(--surface-2)] disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]">
                  <div>
                    <div className="text-xs font-semibold text-[var(--heading)]">Rooms</div>
                    <div className="text-[0.7rem] text-[var(--muted)]">Max 5 rooms</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={rooms <= 1}
                      onClick={() => {
                        const newR = Math.max(1, rooms - 1);
                        setRooms(newR);
                      }}
                      className="p-1 rounded border border-[var(--line)] hover:bg-[var(--surface-2)] disabled:opacity-40"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">{rooms}</span>
                    <button
                      type="button"
                      disabled={rooms >= 5}
                      onClick={() => {
                        const newR = Math.min(5, rooms + 1);
                        setRooms(newR);
                        if (adults < newR) setAdults(newR);
                      }}
                      className="p-1 rounded border border-[var(--line)] hover:bg-[var(--surface-2)] disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setGuestPickerOpen(false)}
                  className="w-full py-1.5 text-xs font-semibold bg-[var(--surface-2)] hover:bg-[var(--line)] rounded text-[var(--heading)] transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <Button type="submit" variant="primary" className="w-full">
              Check availability
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
