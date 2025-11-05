
import React, { useEffect, useState } from 'react';
import { getParkingSpots } from '../../services/parkingService';
import { ParkingSpot, ParkingSpotStatus } from '../../types';

const ParkingSpace: React.FC<{ spot: ParkingSpot }> = ({ spot }) => {
  const getStatusClasses = () => {
    switch (spot.status) {
      case ParkingSpotStatus.Available:
        return 'bg-available/20 border-available text-available hover:bg-available/40';
      case ParkingSpotStatus.Occupied:
        return 'bg-occupied/20 border-occupied text-occupied hover:bg-occupied/40';
      case ParkingSpotStatus.Reserved:
        return 'bg-reserved/20 border-reserved text-reserved hover:bg-reserved/40';
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center h-24 rounded-lg border-2 transition-all duration-200 cursor-pointer shadow-sm ${getStatusClasses()}`}>
      <span className="font-bold text-lg">{spot.id}</span>
      {spot.status === ParkingSpotStatus.Occupied && (
        <span className="text-xs absolute bottom-2">{spot.vehicle?.plate}</span>
      )}
    </div>
  );
};

const OccupancyMapView: React.FC = () => {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);

  useEffect(() => {
    getParkingSpots().then(setSpots);
  }, []);

  return (
    <div className="bg-secondary p-6 rounded-xl shadow-lg">
      <div className="flex justify-end gap-4 mb-6">
        <div className="flex items-center"><div className="w-4 h-4 bg-available rounded-full mr-2"></div><span className="text-text-secondary">Disponible</span></div>
        <div className="flex items-center"><div className="w-4 h-4 bg-occupied rounded-full mr-2"></div><span className="text-text-secondary">Ocupado</span></div>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
        {spots.map(spot => (
          <ParkingSpace key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  );
};

export default OccupancyMapView;
