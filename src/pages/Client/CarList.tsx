import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { cars } from '../../data/mockData';
import { Car } from '../../types';
import CarCard from '../../components/Cars/CarCard';
import Button from '../../components/UI/Button';

const CarList: React.FC = () => {
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all',
    transmission: 'all',
    fuelType: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const applyFilters = () => {
    let filtered = cars;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(car => car.type === filters.type);
    }

    // Price filter
    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'low':
          filtered = filtered.filter(car => car.pricePerDay < 60);
          break;
        case 'medium':
          filtered = filtered.filter(car => car.pricePerDay >= 60 && car.pricePerDay < 120);
          break;
        case 'high':
          filtered = filtered.filter(car => car.pricePerDay >= 120);
          break;
      }
    }

    // Transmission filter
    if (filters.transmission !== 'all') {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }

    // Fuel type filter
    if (filters.fuelType !== 'all') {
      filtered = filtered.filter(car => car.fuelType === filters.fuelType);
    }

    setFilteredCars(filtered);
  };

  React.useEffect(() => {
    applyFilters();
  }, [searchTerm, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Nos véhicules
          </h1>
          <p className="text-gray-600">
            Découvrez notre flotte de {cars.length} véhicules premium
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par marque ou modèle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              icon={SlidersHorizontal}
            >
              Filtres
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de véhicule
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tous</option>
                    <option value="compact">Compacte</option>
                    <option value="sedan">Berline</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxe</option>
                    <option value="sports">Sport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix par jour
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tous</option>
                    <option value="low">Moins de 60€</option>
                    <option value="medium">60€ - 120€</option>
                    <option value="high">Plus de 120€</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transmission
                  </label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => setFilters({...filters, transmission: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Toutes</option>
                    <option value="manual">Manuelle</option>
                    <option value="automatic">Automatique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Carburant
                  </label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) => setFilters({...filters, fuelType: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tous</option>
                    <option value="gasoline">Essence</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Électrique</option>
                    <option value="hybrid">Hybride</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredCars.length} véhicule{filteredCars.length > 1 ? 's' : ''} trouvé{filteredCars.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* No Results */}
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun véhicule trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;