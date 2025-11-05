
export enum ParkingSpotStatus {
  Available = 'available',
  Occupied = 'occupied',
  Reserved = 'reserved',
}

export interface ParkingSpot {
  id: string;
  status: ParkingSpotStatus;
  vehicle?: Vehicle;
}

export interface Vehicle {
  plate: string;
  entryTime: Date;
}

export type ViewType = 'dashboard' | 'map' | 'vehicles' | 'reports' | 'settings';
