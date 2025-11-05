
import React from 'react';
import { ViewType } from '../types';
import { DashboardIcon, MapIcon, CarIcon, ReportIcon, SettingsIcon, LogoIcon, DatabaseIcon } from './icons';

interface SidebarProps {
  currentView: ViewType;
}

const NavLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}> = ({ href, icon, label, isActive }) => {
  const activeClasses = 'bg-highlight text-accent';
  const inactiveClasses = 'text-text-secondary hover:bg-highlight hover:text-text-primary';
  return (
    <a
      href={href}
      className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span className="ml-4 font-medium">{label}</span>
    </a>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView }) => {
  const navItems: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Panel de Control', icon: <DashboardIcon className="w-6 h-6" /> },
    { id: 'map', label: 'Mapa de Ocupación', icon: <MapIcon className="w-6 h-6" /> },
    { id: 'vehicles', label: 'Vehículos', icon: <CarIcon className="w-6 h-6" /> },
    { id: 'reports', label: 'Informes', icon: <ReportIcon className="w-6 h-6" /> },
    { id: 'settings', label: 'Configuración', icon: <SettingsIcon className="w-6 h-6" /> },
    { id: 'database', label: 'Base de Datos', icon: <DatabaseIcon className="w-6 h-6" /> },
  ];

  return (
    <nav className="w-64 bg-secondary p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-10 px-2">
          <LogoIcon className="w-10 h-10 text-accent" />
          <h2 className="ml-3 text-xl font-bold text-text-primary">ParkingSys</h2>
        </div>
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.id}>
              <NavLink
                href={`#${item.id}`}
                label={item.label}
                icon={item.icon}
                isActive={currentView === item.id}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center text-xs text-text-secondary p-4">
        <p>&copy; {new Date().getFullYear()} ParkingSys</p>
        <p>Todos los derechos reservados.</p>
      </div>
    </nav>
  );
};

export default Sidebar;
