import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../../types';
import { Users, Fuel, Settings, Star } from 'lucide-react';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';

interface CarCardProps {
  car: Car;
  showActions?: boolean;
  onEdit?: (car: Car) => void;
  onDelete?: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, showActions = false, onEdit, onDelete }) => {
  return (
    <Card hover className="overflow-hidden">
      <div className="relative">
        <img 
          src={car.image} 
          alt={car.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={car.available ? 'success' : 'error'}>
            {car.available ? 'Disponible' : 'Indisponible'}
          </Badge>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{car.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{car.brand} • {car.year}</p>
        
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{car.seats} places</span>
          </div>
          <div className="flex items-center space-x-1">
            <Settings className="h-4 w-4" />
            <span className="capitalize">{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Fuel className="h-4 w-4" />
            <span className="capitalize">{car.fuelType}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">{car.pricePerDay}€</span>
            <span className="text-gray-600">/jour</span>
          </div>
          
          {showActions ? (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit?.(car)}>
                Modifier
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete?.(car)}>
                Supprimer
              </Button>
            </div>
          ) : (
            <Link to={`/cars/${car.id}`}>
              <Button disabled={!car.available}>
                {car.available ? 'Réserver' : 'Indisponible'}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CarCard;