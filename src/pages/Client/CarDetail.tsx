import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Fuel, Settings, Star, Check, Calendar, Shield } from 'lucide-react';
import { cars } from '../../data/mockData';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';
import Badge from '../../components/UI/Badge';

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const car = cars.find(c => c.id === id);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Véhicule non trouvé</h2>
          <p className="text-gray-600 mb-4">Le véhicule que vous recherchez n'existe pas.</p>
          <Link to="/cars">
            <Button>Retour aux véhicules</Button>
          </Link>
        </div>
      </div>
    );
  }

  const calculateDays = () => {
    if (!selectedStartDate || !selectedEndDate) return 0;
    const start = new Date(selectedStartDate);
    const end = new Date(selectedEndDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const totalPrice = calculateDays() * car.pricePerDay;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <Link to="/cars" className="flex items-center text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour aux véhicules
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Details */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={car.available ? 'success' : 'error'}>
                    {car.available ? 'Disponible' : 'Indisponible'}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.name}</h1>
                    <p className="text-gray-600">{car.brand} • {car.year}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold">4.8</span>
                    <span className="text-gray-600">(124 avis)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Places</p>
                    <p className="font-semibold">{car.seats}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Settings className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Transmission</p>
                    <p className="font-semibold capitalize">{car.transmission}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Fuel className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Carburant</p>
                    <p className="font-semibold capitalize">{car.fuelType}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Shield className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Assurance</p>
                    <p className="font-semibold">Incluse</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{car.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Équipements inclus</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Reservation Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-bold text-blue-600">{car.pricePerDay}€</span>
                    <span className="text-gray-600">/jour</span>
                  </div>
                  <p className="text-sm text-gray-600">Assurance et taxes incluses</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de début
                    </label>
                    <input
                      type="date"
                      value={selectedStartDate}
                      onChange={(e) => setSelectedStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de fin
                    </label>
                    <input
                      type="date"
                      value={selectedEndDate}
                      onChange={(e) => setSelectedEndDate(e.target.value)}
                      min={selectedStartDate || new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {selectedStartDate && selectedEndDate && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium mb-2">Résumé de la réservation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Durée:</span>
                        <span>{calculateDays()} jour{calculateDays() > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Prix par jour:</span>
                        <span>{car.pricePerDay}€</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>{totalPrice}€</span>
                      </div>
                    </div>
                  </div>
                )}

                <Link to={`/reservation/${car.id}`} state={{ startDate: selectedStartDate, endDate: selectedEndDate, totalPrice }}>
                  <Button 
                    className="w-full" 
                    size="lg"
                    disabled={!car.available || !selectedStartDate || !selectedEndDate}
                  >
                    {car.available ? 'Réserver maintenant' : 'Indisponible'}
                  </Button>
                </Link>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Réservation gratuite • Annulation flexible
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;