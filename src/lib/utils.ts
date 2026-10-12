import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateRange(checkIn: string, checkOut: string): string {
  if (!checkIn || !checkOut) return '';
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const opt: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  const d1Str = d1.toLocaleDateString('en-IN', opt);
  const d2Str = d2.toLocaleDateString('en-IN', { ...opt, year: 'numeric' });
  return `${d1Str} – ${d2Str}`;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = d2.getTime() - d1.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, isNaN(diffDays) ? 1 : diffDays);
}
