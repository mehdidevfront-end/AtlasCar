import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, MapPin, Car, CheckCircle } from 'lucide-react';
import { reservations } from '../../data/mockData';
import Card from '../../components/UI/Card';
import Badge from '../../components/UI/Badge';
import Button from '../../components/UI/Button';

const MyReservations: React.FC = () => {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(location.state?.success || false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'info';
      case 'active': return 'success';
      case 'completed': return 'default';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmée';
      case 'active': return 'En cours';
      case 'completed': return 'Terminée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  React.useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes réservations</h1>
          <p className="text-gray-600">Gérez vos réservations passées et à venir</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-green-800">Réservation confirmée !</h3>
                <p className="text-sm text-green-700">
                  Votre réservation a été enregistrée avec succès. Un email de confirmation vous a été envoyé.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Reservations List */}
        <div className="space-y-6">
          {reservations.map((reservation) => (
            <Card key={reservation.id} hover>
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={reservation.car.image} 
                      alt={reservation.car.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{reservation.car.name}</h3>
                      <p className="text-gray-600">{reservation.car.brand}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={getStatusVariant(reservation.status)}>
                          {getStatusLabel(reservation.status)}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Réservation #{reservation.id}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right mt-4 lg:mt-0">
                    <p className="text-2xl font-bold text-blue-600">{reservation.totalPrice}€</p>
                    <p className="text-sm text-gray-600">Total</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Début</p>
                      <p className="font-medium">{new Date(reservation.startDate).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Fin</p>
                      <p className="font-medium">{new Date(reservation.endDate).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Durée</p>
                      <p className="font-medium">
                        {Math.ceil((new Date(reservation.endDate).getTime() - new Date(reservation.startDate).getTime()) / (1000 * 60 * 60 * 24))} jours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4 sm:mb-0">
                    <MapPin className="h-4 w-4" />
                    <span>123 Rue de la Paix, 75001 Paris</span>
                  </div>
                  <div className="flex space-x-2">
                    {reservation.status === 'confirmed' && (
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    )}
                    {(reservation.status === 'confirmed' || reservation.status === 'active') && (
                      <Button variant="outline" size="sm">
                        Annuler
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Détails
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {reservations.length === 0 && (
          <div className="text-center py-12">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune réservation
            </h3>
            <p className="text-gray-600 mb-4">
              Vous n'avez pas encore de réservations. Découvrez nos véhicules !
            </p>
            <Button>
              Voir les véhicules
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservations;