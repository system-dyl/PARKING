
import { ParkingSpot, ParkingSpotStatus, Vehicle, VehicleType } from '../types';

const TOTAL_SPOTS = 80;
let parkingSpots: ParkingSpot[] = [];
let parkedVehicles: Vehicle[] = [];

const generatePlate = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let plate = '';
  for (let i = 0; i < 3; i++) {
    plate += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  plate += ' ';
  for (let i = 0; i < 3; i++) {
    plate += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return plate;
};

const getRandomVehicleType = (): VehicleType => {
    const types = [VehicleType.Car, VehicleType.Car, VehicleType.Car, VehicleType.Motorcycle, VehicleType.Van]; // Higher chance for cars
    return types[Math.floor(Math.random() * types.length)];
}

const initializeData = () => {
  if (parkingSpots.length > 0) return;

  const spots: ParkingSpot[] = [];
  for (let i = 1; i <= TOTAL_SPOTS; i++) {
    const status = Math.random() > 0.4 ? ParkingSpotStatus.Occupied : ParkingSpotStatus.Available;
    let vehicle: Vehicle | undefined = undefined;
    if (status === ParkingSpotStatus.Occupied) {
      const entryTime = new Date(Date.now() - Math.floor(Math.random() * 8 * 60 * 60 * 1000)); // up to 8 hours ago
      vehicle = { plate: generatePlate(), entryTime, type: getRandomVehicleType() };
      parkedVehicles.push(vehicle);
    }
    spots.push({ id: `A-${i.toString().padStart(2, '0')}`, status, vehicle });
  }
  parkingSpots = spots;
};

initializeData();

export const getParkingSpots = (): Promise<ParkingSpot[]> => {
  return Promise.resolve(parkingSpots);
};

export const getParkedVehicles = (): Promise<Vehicle[]> => {
  return Promise.resolve(parkedVehicles.sort((a, b) => b.entryTime.getTime() - a.entryTime.getTime()));
};

export const getDashboardStats = (): Promise<{
  totalSpots: number;
  occupied: number;
  available: number;
  occupancyRate: number;
  dailyEntries: number;
  estimatedRevenue: number;
}> => {
  const occupied = parkingSpots.filter(s => s.status === ParkingSpotStatus.Occupied).length;
  const totalSpots = parkingSpots.length;
  const available = totalSpots - occupied;
  const occupancyRate = (occupied / totalSpots) * 100;
  
  // Mock stats
  const dailyEntries = Math.floor(Math.random() * 150) + 50;
  const estimatedRevenue = occupied * 3.5 + Math.random() * 500;

  return Promise.resolve({
    totalSpots,
    occupied,
    available,
    occupancyRate,
    dailyEntries,
    estimatedRevenue,
  });
};

export const getHourlyActivity = (): Promise<{ name: string; entradas: number; salidas: number; }[]> => {
    const data = [];
    for (let i = 8; i <= 20; i++) {
        data.push({
            name: `${i}:00`,
            entradas: Math.floor(Math.random() * 20) + 5,
            salidas: Math.floor(Math.random() * 15) + 5,
        });
    }
    return Promise.resolve(data);
}

export const generateReport = (): Promise<Vehicle[]> => {
    const reportVehicles: Vehicle[] = [];
    const count = Math.floor(Math.random() * 100) + 50;
    for (let i = 0; i < count; i++) {
        const entryTime = new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000));
        reportVehicles.push({ plate: generatePlate(), entryTime, type: getRandomVehicleType() });
    }
    return Promise.resolve(reportVehicles.sort((a, b) => b.entryTime.getTime() - a.entryTime.getTime()));
};
