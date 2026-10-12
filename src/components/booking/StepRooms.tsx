'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useBooking } from '@/context/BookingContext';
import { availabilityService } from '@/services/availability';
import { Room, RatePlan } from '@/data/types';
import { resorts } from '@/data/resorts';
import { formatCurrencyINR, formatDateRange, calculateNights } from '@/lib/utils';
import { DraftTag } from '@/components/ui/DraftTag';
import { Button } from '@/components/ui/Button';
import { Calendar, Users, Bed, Check, Edit3, AlertCircle } from 'lucide-react';
import { calculatePricing } from '@/services/pricing';

export function StepRooms() {
  const { state, dispatch, goToStep } = useBooking();
  const [loading, setLoading] = useState(true);
  const [matchingRooms, setMatchingRooms] = useState<Room[]>([]);

  const resort = resorts.find((r) => r.slug === state.criteria.resortSlug);
  const nights = calculateNights(state.criteria.checkIn, state.criteria.checkOut);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    availabilityService.checkAvailability(state.criteria).then((res) => {
      if (isMounted) {
        setMatchingRooms(res.matchingRooms);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [state.criteria]);

  const handleSelect = (room: Room, plan: RatePlan) => {
    dispatch({
      type: 'SELECT_ROOM_AND_PLAN',
      payload: { room, plan },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="label-caps text-[var(--accent)]">Step 2 of 5</span>
        <h2 className="font-serif mt-1">Available Cottages &amp; Rate Plans</h2>
        <p className="text-sm text-[var(--muted)]">
          Select your cottage configuration and preferred inclusion package.
        </p>
      </div>

      {/* Context Bar */}
      <div className="p-4 rounded-lg border border-[var(--line)] bg-[var(--surface-2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 text-[var(--fg)]">
          <span className="font-bold text-[var(--heading)]">{resort?.name}</span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>{formatDateRange(state.criteria.checkIn, state.criteria.checkOut)} ({nights} night{nights > 1 ? 's' : ''})</span>
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>{state.criteria.adults} Adults{state.criteria.children > 0 ? `, ${state.criteria.children} Children` : ''} &middot; {state.criteria.rooms} Room{state.criteria.rooms > 1 ? 's' : ''}</span>
          </span>
        </div>
        <button
          onClick={() => goToStep(1)}
          type="button"
          className="inline-flex items-center gap-1 text-[var(--accent)] font-semibold hover:underline shrink-0"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Search</span>
        </button>
      </div>

      {/* Loading Skeleton (650ms mock delay) */}
      {loading ? (
        <div className="space-y-6">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 space-y-4 animate-pulse"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 aspect-[16/10] bg-[var(--line)]/50 rounded" />
                <div className="w-full md:w-2/3 space-y-3">
                  <div className="h-6 w-1/2 bg-[var(--line)]/60 rounded" />
                  <div className="h-4 w-3/4 bg-[var(--line)]/40 rounded" />
                  <div className="h-16 w-full bg-[var(--line)]/30 rounded" />
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="h-24 bg-[var(--line)]/30 rounded" />
                    <div className="h-24 bg-[var(--line)]/30 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : matchingRooms.length > 0 ? (
        /* Room Cards */
        <div className="space-y-8">
          {matchingRooms.map((room) => (
            <div
              key={room.id}
              className="rounded-lg border border-[var(--line)] bg-[var(--surface)] overflow-hidden shadow-sm space-y-6"
            >
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="relative aspect-[16/10] w-full md:w-2/5 rounded overflow-hidden border border-[var(--line)] shrink-0">
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-3 w-full">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl text-[var(--heading)]">
                        {room.name}
                      </h3>
                      <span className="text-xs text-[var(--muted)] flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span>{room.bed}</span>
                      </span>
                    </div>

                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {room.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--fg)] pt-1">
                      {room.amenities.map((am, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                          <span>{am}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rate Plans Selection Grid */}
                <div className="pt-6 border-t border-[var(--line)] space-y-4">
                  <span className="label-caps text-[0.66rem] text-[var(--muted)]">
                    Available Rate Packages
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {room.plans.map((plan) => {
                      const planPricing = calculatePricing(
                        plan.nightlyRate,
                        state.criteria.checkIn,
                        state.criteria.checkOut,
                        state.criteria.rooms
                      );

                      return (
                        <div
                          key={plan.id}
                          className="p-5 rounded border border-[var(--line)] bg-[var(--surface-2)] flex flex-col justify-between space-y-4 hover:border-[var(--accent)] transition-colors"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-serif text-lg font-bold text-[var(--heading)]">
                                {plan.name}
                              </h4>
                              {plan.sample && <DraftTag variant="demo" />}
                            </div>

                            <ul className="text-xs text-[var(--muted)] space-y-1">
                              {plan.includes.map((inc, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <span className="text-[var(--accent)] font-bold">&bull;</span>
                                  <span>{inc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-3 border-t border-[var(--line)] flex items-end justify-between">
                            <div>
                              <div className="text-[0.68rem] text-[var(--muted)]">
                                {formatCurrencyINR(plan.nightlyRate)} / night
                              </div>
                              <div className="font-serif text-lg font-bold text-[var(--heading)]">
                                {formatCurrencyINR(planPricing.total)}{' '}
                                <span className="text-xs font-normal text-[var(--muted)]">est. total</span>
                              </div>
                            </div>

                            <Button
                              onClick={() => handleSelect(room, plan)}
                              variant="primary"
                              size="sm"
                            >
                              Select
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-lg border border-dashed border-[var(--line)] bg-[var(--surface)] p-12 text-center max-w-lg mx-auto space-y-4">
          <AlertCircle className="w-10 h-10 text-[var(--highlight)] mx-auto" />
          <h3 className="font-serif text-2xl text-[var(--heading)]">
            Party Exceeds Cottage Capacity
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            The requested number of guests exceeds the occupancy limit for {state.criteria.rooms} room.
          </p>
          <div className="pt-2">
            <Button
              onClick={() => {
                dispatch({
                  type: 'UPDATE_CRITERIA',
                  payload: { rooms: Math.min(5, state.criteria.rooms + 1) },
                });
              }}
              variant="primary"
            >
              Add a room and search again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
