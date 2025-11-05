
import React from 'react';

const SettingsView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-2xl">
      <div className="bg-secondary p-8 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6 text-text-primary border-b border-highlight pb-4">
          Tarifas de Estacionamiento
        </h3>
        <form className="space-y-6">
          <div>
            <label htmlFor="carRate" className="block text-sm font-medium text-text-secondary mb-2">
              Tarifa Coche (€/hora)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">€</span>
              <input
                type="number"
                id="carRate"
                name="carRate"
                className="w-full bg-primary pl-7 pr-4 py-2 rounded-lg border border-highlight focus:outline-none focus:ring-2 focus:ring-accent"
                defaultValue="2.50"
                step="0.01"
              />
            </div>
          </div>
          <div>
            <label htmlFor="motorcycleRate" className="block text-sm font-medium text-text-secondary mb-2">
              Tarifa Moto (€/hora)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">€</span>
              <input
                type="number"
                id="motorcycleRate"
                name="motorcycleRate"
                className="w-full bg-primary pl-7 pr-4 py-2 rounded-lg border border-highlight focus:outline-none focus:ring-2 focus:ring-accent"
                defaultValue="1.50"
                step="0.01"
              />
            </div>
          </div>
          <div>
            <label htmlFor="vanRate" className="block text-sm font-medium text-text-secondary mb-2">
              Tarifa Furgoneta (€/hora)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">€</span>
              <input
                type="number"
                id="vanRate"
                name="vanRate"
                className="w-full bg-primary pl-7 pr-4 py-2 rounded-lg border border-highlight focus:outline-none focus:ring-2 focus:ring-accent"
                defaultValue="3.50"
                step="0.01"
              />
            </div>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              onClick={(e) => e.preventDefault()}
              className="w-full bg-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-400 transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>

      <div className="bg-secondary p-8 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6 text-text-primary border-b border-highlight pb-4">
          Configuración del Sistema
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Habilitar entrada automática con LPR</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Enviar notificaciones de capacidad</span>
             <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
