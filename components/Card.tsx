
import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, colorClass }) => {
  return (
    <div className="bg-secondary p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div>
        <p className="text-sm font-medium text-text-secondary">{title}</p>
        <p className="text-3xl font-bold text-text-primary">{value}</p>
      </div>
      <div className={`p-4 rounded-full ${colorClass}`}>
        {icon}
      </div>
    </div>
  );
};

export default Card;
