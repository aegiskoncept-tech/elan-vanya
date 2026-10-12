'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Room, RatePlan } from '@/data/types';
import { SearchCriteria, GuestDetails, ReservationResult, PricingBreakdown } from '@/services/types';
import { calculatePricing } from '@/services/pricing';

export type BookingStep = 1 | 2 | 3 | 4 | 5;

export interface BookingState {
  step: BookingStep;
  criteria: SearchCriteria;
  selectedRoom: Room | null;
  selectedPlan: RatePlan | null;
  guest: GuestDetails;
  pricing: PricingBreakdown | null;
  confirmation: ReservationResult | null;
}

type BookingAction =
  | { type: 'SET_STEP'; payload: BookingStep }
  | { type: 'UPDATE_CRITERIA'; payload: Partial<SearchCriteria> }
  | { type: 'SELECT_ROOM_AND_PLAN'; payload: { room: Room; plan: RatePlan } }
  | { type: 'UPDATE_GUEST'; payload: Partial<GuestDetails> }
  | { type: 'SET_CONFIRMATION'; payload: ReservationResult }
  | { type: 'RESET_BOOKING' }
  | { type: 'HYDRATE_STATE'; payload: BookingState };

// Default dates
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfter = new Date();
dayAfter.setDate(dayAfter.getDate() + 3);

const initialCriteria: SearchCriteria = {
  resortSlug: 'jawai',
  checkIn: tomorrow.toISOString().split('T')[0],
  checkOut: dayAfter.toISOString().split('T')[0],
  adults: 2,
  children: 0,
  rooms: 1,
};

const initialGuest: GuestDetails = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  specialRequests: '',
  demoAcknowledged: false,
};

const initialState: BookingState = {
  step: 1,
  criteria: initialCriteria,
  selectedRoom: null,
  selectedPlan: null,
  guest: initialGuest,
  pricing: null,
  confirmation: null,
};

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };

    case 'UPDATE_CRITERIA': {
      const newCriteria = { ...state.criteria, ...action.payload };
      let newPricing = state.pricing;
      if (state.selectedPlan) {
        newPricing = calculatePricing(
          state.selectedPlan.nightlyRate,
          newCriteria.checkIn,
          newCriteria.checkOut,
          newCriteria.rooms
        );
      }
      return {
        ...state,
        criteria: newCriteria,
        pricing: newPricing,
      };
    }

    case 'SELECT_ROOM_AND_PLAN': {
      const pricing = calculatePricing(
        action.payload.plan.nightlyRate,
        state.criteria.checkIn,
        state.criteria.checkOut,
        state.criteria.rooms
      );
      return {
        ...state,
        selectedRoom: action.payload.room,
        selectedPlan: action.payload.plan,
        pricing,
        step: 3,
      };
    }

    case 'UPDATE_GUEST':
      return {
        ...state,
        guest: { ...state.guest, ...action.payload },
      };

    case 'SET_CONFIRMATION':
      return {
        ...state,
        confirmation: action.payload,
        step: 5,
      };

    case 'RESET_BOOKING':
      return {
        ...initialState,
      };

    case 'HYDRATE_STATE':
      return action.payload;

    default:
      return state;
  }
}

interface BookingContextType {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  goToStep: (step: BookingStep) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const STORAGE_KEY = 'elan-vanya-booking-session';

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Restore state from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'HYDRATE_STATE', payload: parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to sessionStorage whenever state changes
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const goToStep = (step: BookingStep) => {
    dispatch({ type: 'SET_STEP', payload: step });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <BookingContext.Provider value={{ state, dispatch, goToStep, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
