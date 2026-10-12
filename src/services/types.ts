import { Room, RatePlan } from '@/data/types';

export interface SearchCriteria {
  resortSlug: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}

export interface PricingBreakdown {
  nightlyRate: number;
  nights: number;
  rooms: number;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  demoAcknowledged: boolean;
}

export interface ReservationPayload {
  criteria: SearchCriteria;
  room: Room;
  plan: RatePlan;
  guest: GuestDetails;
  pricing: PricingBreakdown;
}

export interface ReservationResult {
  live: false;
  success: boolean;
  referenceId: string;
  reservation: ReservationPayload;
  timestamp: string;
  notice: string;
}

export interface AvailabilityService {
  checkAvailability(criteria: SearchCriteria): Promise<{
    available: boolean;
    matchingRooms: Room[];
    totalRoomsCount: number;
  }>;
}

export interface ReservationService {
  createReservation(payload: ReservationPayload): Promise<ReservationResult>;
}
