import { PricingBreakdown } from './types';
import { brandConfig } from '@/data/config';
import { calculateNights } from '@/lib/utils';

export function calculatePricing(
  nightlyRate: number,
  checkIn: string,
  checkOut: string,
  roomsCount: number
): PricingBreakdown {
  const nights = calculateNights(checkIn, checkOut);
  const rooms = Math.max(1, roomsCount);
  const subtotal = nightlyRate * nights * rooms;
  const taxRate = brandConfig.pricing.taxRate;
  const taxAmount = Math.round(subtotal * taxRate);
  const total = subtotal + taxAmount;

  return {
    nightlyRate,
    nights,
    rooms,
    subtotal,
    taxRate,
    taxAmount,
    total,
  };
}
