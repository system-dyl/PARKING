
export enum ParkingSpotStatus {
  Available = 'available',
  Occupied = 'occupied',
  Reserved = 'reserved',
}

export enum VehicleType {
    Car = 'Coche',
    Motorcycle = 'Moto',
    Van = 'Furgoneta',
}

export interface ParkingSpot {
  id: string;
  status: ParkingSpotStatus;
  vehicle?: Vehicle;
}

export interface Vehicle {
  plate: string;
  entryTime: Date;
  type: VehicleType;
}

export type ViewType = 'dashboard' | 'map' | 'vehicles' | 'reports' | 'settings' | 'database';
