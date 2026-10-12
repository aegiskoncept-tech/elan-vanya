import { ReservationService, ReservationPayload, ReservationResult } from './types';

export class MockReservationService implements ReservationService {
  public readonly live = false;

  async createReservation(payload: ReservationPayload): Promise<ReservationResult> {
    // Artificial 500ms processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate reference EV-DEMO-XXXXXX
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const referenceId = `EV-DEMO-${randomHex}`;

    return {
      live: false,
      success: true,
      referenceId,
      reservation: payload,
      timestamp: new Date().toISOString(),
      notice:
        'This is a demonstration booking for client review. No real room block, payment charge, or email notification was executed.',
    };
  }
}

export const reservationService = new MockReservationService();
