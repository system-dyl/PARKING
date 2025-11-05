
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/views/DashboardView';
import OccupancyMapView from './components/views/OccupancyMapView';
import VehiclesView from './components/views/VehiclesView';
import ReportsView from './components/views/ReportsView';
import SettingsView from './components/views/SettingsView';
import { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ViewType;
      if (['dashboard', 'map', 'vehicles', 'reports', 'settings'].includes(hash)) {
        setCurrentView(hash);
      } else {
        setCurrentView('dashboard');
        window.location.hash = 'dashboard';
      }
    };

    if (!window.location.hash) {
      window.location.hash = 'dashboard';
    }

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'map':
        return <OccupancyMapView />;
      case 'vehicles':
        return <VehiclesView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  const viewTitles: { [key in ViewType]: string } = {
    dashboard: 'Panel de Control',
    map: 'Mapa de Ocupación',
    vehicles: 'Vehículos Estacionados',
    reports: 'Informes y Analíticas',
    settings: 'Configuración del Sistema',
  };

  return (
    <div className="flex h-screen bg-primary font-sans">
      <Sidebar currentView={currentView} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-secondary p-4 shadow-md z-10">
          <h1 className="text-2xl font-bold text-text-primary">{viewTitles[currentView]}</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-6 bg-primary">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
