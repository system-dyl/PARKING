
import React, { useEffect, useState } from 'react';
import { getParkedVehicles } from '../../services/parkingService';
import { Vehicle } from '../../types';

const VehiclesView: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getParkedVehicles().then(setVehicles);
  }, []);

  const calculateDuration = (entryTime: Date): string => {
    const diff = Date.now() - entryTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const filteredVehicles = vehicles.filter(v =>
    v.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-secondary p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Buscar por matrícula..."
          className="bg-primary px-4 py-2 rounded-lg border border-highlight focus:outline-none focus:ring-2 focus:ring-accent"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-400 transition-colors">
          Entrada Manual
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-highlight">
            <tr>
              <th className="p-4 text-text-secondary font-semibold">Matrícula</th>
              <th className="p-4 text-text-secondary font-semibold">Hora de Entrada</th>
              <th className="p-4 text-text-secondary font-semibold">Duración</th>
              <th className="p-4 text-text-secondary font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle, index) => (
              <tr key={index} className="border-b border-highlight hover:bg-highlight/50">
                <td className="p-4 font-mono text-text-primary">{vehicle.plate}</td>
                <td className="p-4 text-text-secondary">{vehicle.entryTime.toLocaleString()}</td>
                <td className="p-4 text-text-secondary">{calculateDuration(vehicle.entryTime)}</td>
                <td className="p-4">
                  <button className="bg-green-600 text-white font-bold py-1 px-3 rounded-lg text-sm hover:bg-green-500 transition-colors">
                    Registrar Salida
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {filteredVehicles.length === 0 && (
          <p className="text-center text-text-secondary mt-8">No se encontraron vehículos.</p>
        )}
    </div>
  );
};

export default VehiclesView;
