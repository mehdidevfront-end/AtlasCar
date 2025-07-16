import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { cars } from '../../data/mockData';
import { Car } from '../../types';
import CarCard from '../../components/Cars/CarCard';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';
import Badge from '../../components/UI/Badge';

const AdminCars: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || car.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setShowModal(true);
  };

  const handleDelete = (car: Car) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${car.name} ?`)) {
      console.log('Deleting car:', car.id);
      // In a real app, this would make an API call
    }
  };

  const handleAddNew = () => {
    setEditingCar(null);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des véhicules</h1>
            <p className="text-gray-600">Gérez votre flotte de véhicules</p>
          </div>
          <Button onClick={handleAddNew} icon={Plus}>
            Ajouter un véhicule
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un véhicule..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les types</option>
                <option value="compact">Compacte</option>
                <option value="sedan">Berline</option>
                <option value="suv">SUV</option>
                <option value="luxury">Luxe</option>
                <option value="sports">Sport</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="p-6 text-center">
              <p className="text-2xl font-bold text-gray-900">{cars.length}</p>
              <p className="text-sm text-gray-600">Total véhicules</p>
            </div>
          </Card>
          <Card>
            <div className="p-6 text-center">
              <p className="text-2xl font-bold text-green-600">{cars.filter(c => c.available).length}</p>
              <p className="text-sm text-gray-600">Disponibles</p>
            </div>
          </Card>
          <Card>
            <div className="p-6 text-center">
              <p className="text-2xl font-bold text-red-600">{cars.filter(c => !c.available).length}</p>
              <p className="text-sm text-gray-600">En location</p>
            </div>
          </Card>
          <Card>
            <div className="p-6 text-center">
              <p className="text-2xl font-bold text-blue-600">{Math.round(cars.reduce((sum, car) => sum + car.pricePerDay, 0) / cars.length)}€</p>
              <p className="text-sm text-gray-600">Prix moyen/jour</p>
            </div>
          </Card>
        </div>

        {/* Cars Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Véhicule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix/jour
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={car.image} 
                          alt={car.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{car.name}</p>
                          <p className="text-sm text-gray-600">{car.brand} • {car.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="capitalize text-gray-900">{car.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">{car.pricePerDay}€</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={car.available ? 'success' : 'error'}>
                        {car.available ? 'Disponible' : 'En location'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(car)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(car)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Car Modal (placeholder) */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <h2 className="text-xl font-bold mb-4">
                {editingCar ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
              </h2>
              <p className="text-gray-600 mb-4">
                Interface de gestion des véhicules (à implémenter)
              </p>
              <div className="flex space-x-4">
                <Button onClick={() => setShowModal(false)}>
                  Fermer
                </Button>
                <Button variant="outline">
                  Sauvegarder
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCars;