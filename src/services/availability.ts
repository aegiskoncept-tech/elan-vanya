import { AvailabilityService, SearchCriteria } from './types';
import { resorts } from '@/data/resorts';
import { Room } from '@/data/types';

export class MockAvailabilityService implements AvailabilityService {
  public readonly live = false;

  async checkAvailability(criteria: SearchCriteria): Promise<{
    available: boolean;
    matchingRooms: Room[];
    totalRoomsCount: number;
  }> {
    // 650ms mock delay for realistic loading skeleton demo
    await new Promise((resolve) => setTimeout(resolve, 650));

    const resort = resorts.find((r) => r.slug === criteria.resortSlug);
    if (!resort || resort.status !== 'open') {
      return {
        available: false,
        matchingRooms: [],
        totalRoomsCount: 0,
      };
    }

    const { adults, children, rooms } = criteria;

    // Filter rooms by capacity logic:
    // adults <= maxAdults * rooms
    // adults + children <= maxOccupancy * rooms
    // children <= maxChildren * rooms
    const matchingRooms = resort.rooms.filter((room) => {
      const adultCap = room.maxAdults * rooms;
      const totalCap = room.maxOccupancy * rooms;
      const childCap = room.maxChildren * rooms;

      return (
        adults <= adultCap &&
        adults + children <= totalCap &&
        children <= childCap
      );
    });

    return {
      available: matchingRooms.length > 0,
      matchingRooms,
      totalRoomsCount: resort.rooms.length,
    };
  }
}

export const availabilityService = new MockAvailabilityService();
