'use client';

import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { Button } from '@/components/ui/Button';
import { User, Mail, Phone, MessageSquare, ArrowLeft } from 'lucide-react';

export function StepGuests() {
  const { state, dispatch, goToStep } = useBooking();
  const [guest, setGuest] = useState(state.guest);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!guest.firstName.trim()) {
      errs.firstName = 'First name is required.';
    }
    if (!guest.lastName.trim()) {
      errs.lastName = 'Last name is required.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!guest.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(guest.email)) {
      errs.email = 'Please provide a valid email address.';
    }

    // Phone validation (10 to 15 digits, optional leading +)
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    const cleanPhone = guest.phone.replace(/[\s-]/g, '');
    if (!guest.phone.trim()) {
      errs.phone = 'Contact telephone is required.';
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.phone = 'Phone number must be between 10 and 15 digits (optional +).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch({ type: 'UPDATE_GUEST', payload: guest });
    goToStep(4);
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="label-caps text-[var(--accent)]">Step 3 of 5</span>
        <h2 className="font-serif mt-1">Guest Details</h2>
        <p className="text-sm text-[var(--muted)]">
          Please enter the primary guest information for this reservation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="space-y-1.5">
            <label htmlFor="guest-first-name" className="label-caps text-[0.66rem] text-[var(--muted)] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>First Name *</span>
            </label>
            <input
              id="guest-first-name"
              type="text"
              placeholder="e.g. Siddharth"
              value={guest.firstName}
              onChange={(e) => {
                setGuest({ ...guest, firstName: e.target.value });
                if (errors.firstName) setErrors({ ...errors, firstName: '' });
              }}
              className={`w-full bg-[var(--surface-2)] text-[var(--heading)] border rounded-md px-3.5 py-2.5 text-sm focus:outline-hidden ${
                errors.firstName
                  ? 'border-[var(--danger)] focus:border-[var(--danger)]'
                  : 'border-[var(--line)] focus:border-[var(--accent)]'
              }`}
            />
            {errors.firstName && (
              <p className="text-xs text-[var(--danger)] mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1.5">
            <label htmlFor="guest-last-name" className="label-caps text-[0.66rem] text-[var(--muted)] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Last Name *</span>
            </label>
            <input
              id="guest-last-name"
              type="text"
              placeholder="e.g. Rathore"
              value={guest.lastName}
              onChange={(e) => {
                setGuest({ ...guest, lastName: e.target.value });
                if (errors.lastName) setErrors({ ...errors, lastName: '' });
              }}
              className={`w-full bg-[var(--surface-2)] text-[var(--heading)] border rounded-md px-3.5 py-2.5 text-sm focus:outline-hidden ${
                errors.lastName
                  ? 'border-[var(--danger)] focus:border-[var(--danger)]'
                  : 'border-[var(--line)] focus:border-[var(--accent)]'
              }`}
            />
            {errors.lastName && (
              <p className="text-xs text-[var(--danger)] mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="guest-email" className="label-caps text-[0.66rem] text-[var(--muted)] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Email Address *</span>
            </label>
            <input
              id="guest-email"
              type="email"
              placeholder="siddharth@example.com"
              value={guest.email}
              onChange={(e) => {
                setGuest({ ...guest, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className={`w-full bg-[var(--surface-2)] text-[var(--heading)] border rounded-md px-3.5 py-2.5 text-sm focus:outline-hidden ${
                errors.email
                  ? 'border-[var(--danger)] focus:border-[var(--danger)]'
                  : 'border-[var(--line)] focus:border-[var(--accent)]'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-[var(--danger)] mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="guest-phone" className="label-caps text-[0.66rem] text-[var(--muted)] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Telephone / WhatsApp *</span>
            </label>
            <input
              id="guest-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={guest.phone}
              onChange={(e) => {
                setGuest({ ...guest, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              className={`w-full bg-[var(--surface-2)] text-[var(--heading)] border rounded-md px-3.5 py-2.5 text-sm focus:outline-hidden ${
                errors.phone
                  ? 'border-[var(--danger)] focus:border-[var(--danger)]'
                  : 'border-[var(--line)] focus:border-[var(--accent)]'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-[var(--danger)] mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Special Requests */}
        <div className="space-y-1.5">
          <label htmlFor="guest-special-requests" className="label-caps text-[0.66rem] text-[var(--muted)] flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Special Requests / Dietary Notes (Optional)</span>
          </label>
          <textarea
            id="guest-special-requests"
            rows={3}
            placeholder="e.g. Vegetarian meals requested, arrival around 3:00 PM..."
            value={guest.specialRequests}
            onChange={(e) => setGuest({ ...guest, specialRequests: e.target.value })}
            className="w-full bg-[var(--surface-2)] text-[var(--heading)] border border-[var(--line)] rounded-md px-3.5 py-2.5 text-sm focus:border-[var(--accent)] focus:outline-hidden resize-none"
          />
        </div>

        {/* Actions */}
        <div className="pt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => goToStep(2)}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)] hover:text-[var(--accent)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Rooms</span>
          </button>

          <Button type="submit" variant="primary" size="lg">
            Continue to Review
          </Button>
        </div>
      </form>
    </div>
  );
}
