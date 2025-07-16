import { Car, Reservation, User, Payment, DashboardStats } from '../types';

export const cars: Car[] = [
  {
    id: '1',
    name: 'BMW 320i',
    brand: 'BMW',
    type: 'sedan',
    pricePerDay: 89,
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Climatisation', 'GPS', 'Bluetooth', 'Sièges cuir'],
    available: true,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    year: 2023,
    description: 'Berline de luxe parfaite pour les déplacements d\'affaires et les voyages en famille.'
  },
  {
    id: '2',
    name: 'Audi Q7',
    brand: 'Audi',
    type: 'suv',
    pricePerDay: 129,
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['7 places', 'Toit ouvrant', 'GPS', 'Caméra de recul'],
    available: true,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 7,
    year: 2023,
    description: 'SUV spacieux et confortable pour les grandes familles et les aventures.'
  },
  {
    id: '3',
    name: 'Mercedes-Benz C-Class',
    brand: 'Mercedes-Benz',
    type: 'luxury',
    pricePerDay: 149,
    image: 'https://images.pexels.com/photos/3862619/pexels-photo-3862619.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Sièges massants', 'Système audio premium', 'Conduite autonome', 'Éclairage ambiant'],
    available: true,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    year: 2024,
    description: 'Luxe et technologie de pointe pour une expérience de conduite exceptionnelle.'
  },
  {
    id: '4',
    name: 'Renault Clio',
    brand: 'Renault',
    type: 'compact',
    pricePerDay: 35,
    image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Économique', 'Facile à garer', 'Bluetooth', 'Climatisation'],
    available: true,
    transmission: 'manual',
    fuelType: 'gasoline',
    seats: 5,
    year: 2022,
    description: 'Voiture compacte idéale pour la ville et les courts trajets.'
  },
  {
    id: '5',
    name: 'Porsche 911',
    brand: 'Porsche',
    type: 'sports',
    pricePerDay: 299,
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Moteur turbo', 'Suspension sport', 'Intérieur sport', 'Performances élevées'],
    available: false,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 2,
    year: 2024,
    description: 'Voiture de sport emblématique pour les amateurs de sensations fortes.'
  },
  {
    id: '6',
    name: 'Tesla Model 3',
    brand: 'Tesla',
    type: 'luxury',
    pricePerDay: 119,
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['100% électrique', 'Autopilot', 'Écran tactile 15"', 'Superchargeur'],
    available: true,
    transmission: 'automatic',
    fuelType: 'electric',
    seats: 5,
    year: 2023,
    description: 'Véhicule électrique révolutionnaire avec technologies avancées.'
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    phone: '+33 1 23 45 67 89',
    licenseNumber: 'AB123456789',
    isAdmin: false,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie.martin@email.com',
    phone: '+33 6 98 76 54 32',
    licenseNumber: 'CD987654321',
    isAdmin: false,
    createdAt: '2024-02-20T14:15:00Z'
  },
  {
    id: 'admin1',
    name: 'Admin AtlasCar',
    email: 'admin@atlascar.com',
    phone: '+33 1 00 00 00 00',
    licenseNumber: 'ADMIN001',
    isAdmin: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const reservations: Reservation[] = [
  {
    id: '1',
    carId: '1',
    car: cars[0],
    userId: '1',
    startDate: '2024-03-15',
    endDate: '2024-03-20',
    totalPrice: 445,
    status: 'confirmed',
    createdAt: '2024-03-10T09:00:00Z',
    customerInfo: {
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '+33 1 23 45 67 89',
      licenseNumber: 'AB123456789'
    }
  },
  {
    id: '2',
    carId: '2',
    car: cars[1],
    userId: '2',
    startDate: '2024-03-10',
    endDate: '2024-03-17',
    totalPrice: 903,
    status: 'active',
    createdAt: '2024-03-05T16:20:00Z',
    customerInfo: {
      name: 'Marie Martin',
      email: 'marie.martin@email.com',
      phone: '+33 6 98 76 54 32',
      licenseNumber: 'CD987654321'
    }
  }
];

export const payments: Payment[] = [
  {
    id: '1',
    reservationId: '1',
    amount: 445,
    status: 'completed',
    method: 'credit_card',
    createdAt: '2024-03-10T09:05:00Z'
  },
  {
    id: '2',
    reservationId: '2',
    amount: 903,
    status: 'completed',
    method: 'debit_card',
    createdAt: '2024-03-05T16:25:00Z'
  }
];

export const dashboardStats: DashboardStats = {
  totalReservations: 45,
  activeReservations: 12,
  totalRevenue: 18750,
  availableCars: 24,
  monthlyGrowth: 15.3
};