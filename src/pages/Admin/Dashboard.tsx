import React from 'react';
import { Car, Users, CreditCard, TrendingUp, Calendar, DollarSign, Activity } from 'lucide-react';
import { dashboardStats, reservations, cars } from '../../data/mockData';
import Card from '../../components/UI/Card';
import Badge from '../../components/UI/Badge';

const Dashboard: React.FC = () => {
  const recentReservations = reservations.slice(0, 5);
  const availableCars = cars.filter(car => car.available);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Vue d'ensemble de votre activité AtlasCar</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Réservations totales</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalReservations}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{dashboardStats.monthlyGrowth}%</span>
                <span className="text-sm text-gray-500 ml-2">ce mois</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Réservations actives</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.activeReservations}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-500">En cours maintenant</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Chiffre d'affaires</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalRevenue.toLocaleString()}€</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-500">Ce mois</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Véhicules disponibles</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.availableCars}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Car className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-500">Sur {cars.length} véhicules</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Reservations */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-6">Réservations récentes</h2>
              <div className="space-y-4">
                {recentReservations.map((reservation) => (
                  <div key={reservation.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={reservation.car.image} 
                        alt={reservation.car.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{reservation.car.name}</p>
                        <p className="text-sm text-gray-600">{reservation.customerInfo.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={reservation.status === 'confirmed' ? 'info' : 'success'}>
                        {reservation.status === 'confirmed' ? 'Confirmée' : 'Active'}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">{reservation.totalPrice}€</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Available Cars */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-6">Véhicules disponibles</h2>
              <div className="space-y-4">
                {availableCars.slice(0, 5).map((car) => (
                  <div key={car.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={car.image} 
                        alt={car.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{car.name}</p>
                        <p className="text-sm text-gray-600">{car.brand}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{car.pricePerDay}€/jour</p>
                      <Badge variant="success">Disponible</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <Car className="h-6 w-6 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Ajouter un véhicule</p>
                    <p className="text-sm text-gray-600">Nouveau véhicule à la flotte</p>
                  </div>
                </button>
                
                <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <Calendar className="h-6 w-6 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Voir les réservations</p>
                    <p className="text-sm text-gray-600">Gérer les réservations</p>
                  </div>
                </button>
                
                <button className="flex items-center space-x-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                  <CreditCard className="h-6 w-6 text-yellow-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Paiements</p>
                    <p className="text-sm text-gray-600">Gérer les paiements</p>
                  </div>
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;