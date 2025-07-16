import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, User, LogOut, Settings, Calendar } from 'lucide-react';

interface HeaderProps {
  isAdmin?: boolean;
  user?: { name: string; email: string };
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAdmin = false, user, onLogout }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to={isAdmin ? '/admin' : '/'} className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">AtlasCar</span>
            </Link>
            
            {isAdmin && (
              <span className="ml-4 px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                Admin
              </span>
            )}
          </div>

          <nav className="hidden md:flex space-x-8">
            {isAdmin ? (
              <>
                <Link
                  to="/admin"
                  className={`${
                    isActive('/admin') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-2 transition-colors duration-200`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/cars"
                  className={`${
                    isActive('/admin/cars') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-2 transition-colors duration-200`}
                >
                  Véhicules
                </Link>
                <Link
                  to="/admin/reservations"
                  className={`${
                    isActive('/admin/reservations') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-2 transition-colors duration-200`}
                >
                  Réservations
                </Link>
                <Link
                  to="/admin/clients"
                  className={`${
                    isActive('/admin/clients') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-2 transition-colors duration-200`}
                >
                  Clients
                </Link>
                <Link
                  to="/admin/payments"
                  className={`${
                    isActive('/admin/payments') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-2 transition-colors duration-200`}
                >
                  Paiements
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`${
                    isActive('/') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-2 transition-colors duration-200`}
                >
                  Accueil
                </Link>
                <Link
                  to="/cars"
                  className={`${
                    isActive('/cars') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-2 transition-colors duration-200`}
                >
                  Véhicules
                </Link>
                <Link
                  to="/reservations"
                  className={`${
                    isActive('/reservations') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-2 transition-colors duration-200`}
                >
                  Mes Réservations
                </Link>
                <Link
                  to="/account"
                  className={`${
                    isActive('/account') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-2 transition-colors duration-200`}
                >
                  Mon Compte
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;