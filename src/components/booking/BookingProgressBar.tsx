'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { useBooking, BookingStep } from '@/context/BookingContext';
import { cn } from '@/lib/utils';

export function BookingProgressBar() {
  const { state, goToStep } = useBooking();

  const steps: { num: BookingStep; label: string }[] = [
    { num: 1, label: 'Search' },
    { num: 2, label: 'Rooms' },
    { num: 3, label: 'Guest Details' },
    { num: 4, label: 'Review' },
    { num: 5, label: 'Confirmation' },
  ];

  return (
    <nav aria-label="Booking Progress" className="w-full py-6 border-b border-[var(--line)] mb-8">
      <ol className="flex items-center justify-between max-w-4xl mx-auto px-4">
        {steps.map((s, idx) => {
          const isCompleted = state.step > s.num;
          const isCurrent = state.step === s.num;
          const isClickable = isCompleted && state.step !== 5;

          return (
            <li key={s.num} className="flex-1 flex items-center">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mx-auto">
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && goToStep(s.num)}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    isCompleted
                      ? 'bg-[var(--accent)] text-[var(--on-accent)] cursor-pointer hover:opacity-90'
                      : isCurrent
                      ? 'border-2 border-[var(--accent)] bg-[var(--surface-2)] text-[var(--accent)] font-extrabold ring-2 ring-[var(--accent)]/20'
                      : 'border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] opacity-60'
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                </button>
                <span
                  className={cn(
                    'label-caps text-[0.66rem] text-center sm:text-left transition-colors',
                    isCurrent
                      ? 'text-[var(--heading)] font-bold'
                      : isCompleted
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--muted)]'
                  )}
                >
                  {s.label}
                </span>
              </div>

              {/* Connecting line between steps */}
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    'hidden md:block flex-1 h-[2px] mx-2 transition-colors',
                    state.step > s.num ? 'bg-[var(--accent)]' : 'bg-[var(--line)]'
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
