
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../Card';
import { CarIcon } from '../icons';
import { getDashboardStats, getHourlyActivity } from '../../services/parkingService';

const COLORS = ['#22c55e', '#ef4444'];

const DashboardView: React.FC = () => {
    const [stats, setStats] = useState({ totalSpots: 0, occupied: 0, available: 0, occupancyRate: 0, dailyEntries: 0, estimatedRevenue: 0 });
    const [activity, setActivity] = useState<any[]>([]);

    useEffect(() => {
        getDashboardStats().then(setStats);
        getHourlyActivity().then(setActivity);
    }, []);

    const pieData = [
        { name: 'Disponibles', value: stats.available },
        { name: 'Ocupados', value: stats.occupied },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card 
                    title="Ocupación Actual" 
                    value={`${stats.occupied} / ${stats.totalSpots}`} 
                    icon={<CarIcon className="w-8 h-8 text-white"/>}
                    colorClass="bg-red-500"
                />
                <Card 
                    title="Plazas Disponibles" 
                    value={stats.available} 
                    icon={<CarIcon className="w-8 h-8 text-white"/>}
                    colorClass="bg-green-500"
                />
                <Card 
                    title="Ingresos Estimados Hoy" 
                    value={`$${stats.estimatedRevenue.toFixed(2)}`}
                    icon={<span className="text-3xl font-bold text-white">$</span>}
                    colorClass="bg-blue-500"
                />
                 <Card 
                    title="Tasa de Ocupación" 
                    value={`${stats.occupancyRate.toFixed(1)}%`}
                    icon={<span className="text-3xl font-bold text-white">%</span>}
                    colorClass="bg-yellow-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-secondary p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-text-primary">Distribución de Plazas</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [value, name]}/>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-secondary p-6 rounded-xl shadow-lg">
                     <h3 className="text-xl font-semibold mb-4 text-text-primary">Actividad por Hora</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={activity} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#f8fafc' }} />
                            <Legend />
                            <Bar dataKey="entradas" fill="#38bdf8" name="Entradas"/>
                            <Bar dataKey="salidas" fill="#818cf8" name="Salidas" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
