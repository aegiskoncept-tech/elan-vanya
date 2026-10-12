'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookingProvider, useBooking } from '@/context/BookingContext';
import { BookingProgressBar } from '@/components/booking/BookingProgressBar';
import { BookingSidebar } from '@/components/booking/BookingSidebar';
import { StepSearch } from '@/components/booking/StepSearch';
import { StepRooms } from '@/components/booking/StepRooms';
import { StepGuests } from '@/components/booking/StepGuests';
import { StepReview } from '@/components/booking/StepReview';
import { StepConfirmation } from '@/components/booking/StepConfirmation';

function BookingFlowInner() {
  const { state, dispatch } = useBooking();
  const searchParams = useSearchParams();

  // Read URL query parameters on initial load
  useEffect(() => {
    const resortParam = searchParams.get('resort');
    const checkInParam = searchParams.get('checkIn');
    const checkOutParam = searchParams.get('checkOut');
    const adultsParam = searchParams.get('adults');
    const roomsParam = searchParams.get('rooms');
    const childrenParam = searchParams.get('children');

    const updates: any = {};
    if (resortParam) updates.resortSlug = resortParam;
    if (checkInParam) updates.checkIn = checkInParam;
    if (checkOutParam) updates.checkOut = checkOutParam;
    if (adultsParam) updates.adults = parseInt(adultsParam, 10);
    if (roomsParam) updates.rooms = parseInt(roomsParam, 10);
    if (childrenParam) updates.children = parseInt(childrenParam, 10);

    if (Object.keys(updates).length > 0) {
      dispatch({ type: 'UPDATE_CRITERIA', payload: updates });
    }
  }, [searchParams, dispatch]);

  const renderCurrentStep = () => {
    switch (state.step) {
      case 1:
        return <StepSearch />;
      case 2:
        return <StepRooms />;
      case 3:
        return <StepGuests />;
      case 4:
        return <StepReview />;
      case 5:
        return <StepConfirmation />;
      default:
        return <StepSearch />;
    }
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 5-Step Progress Bar */}
      <BookingProgressBar />

      {/* Main Container: Steps on Left, Sticky Summary on Right */}
      {state.step === 5 ? (
        // Confirmation is full-width centered
        <div className="w-full">
          {renderCurrentStep()}
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="flex-1 w-full bg-[var(--surface)] border border-[var(--line)] rounded-lg p-6 sm:p-8 shadow-xs">
            {renderCurrentStep()}
          </div>
          <BookingSidebar />
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <BookingProvider>
      <Suspense fallback={<div className="pt-32 text-center text-xs text-[var(--muted)]">Loading booking desk...</div>}>
        <BookingFlowInner />
      </Suspense>
    </BookingProvider>
  );
}
