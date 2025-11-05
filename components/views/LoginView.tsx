
import React, { useState } from 'react';
import { LogoIcon } from '../icons';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would have authentication logic here.
    // For this demo, any non-empty username/password will work.
    if (username && password) {
      onLoginSuccess();
    } else {
      alert('Por favor, introduzca un usuario y contraseña.');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-primary p-4">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1543356983-36d7b4d6b5e1?q=80&w=2070&auto=format&fit=crop)', filter: 'blur(4px) brightness(0.4)' }}
      ></div>

      <div className="relative z-10 w-full max-w-md bg-secondary/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-highlight">
        <div className="flex flex-col items-center mb-6">
          <LogoIcon className="w-16 h-16 text-accent" />
          <h1 className="text-3xl font-bold text-text-primary mt-4">ParkingSys</h1>
          <p className="text-text-secondary">Gestión Inteligente de Estacionamiento</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text-secondary mb-2">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-primary px-4 py-2 rounded-lg border border-highlight focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="admin"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-primary px-4 py-2 rounded-lg border border-highlight focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-400 transition-colors duration-300"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
