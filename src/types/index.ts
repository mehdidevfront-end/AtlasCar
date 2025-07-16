export interface Car {
  id: string;
  name: string;
  brand: string;
  type: 'compact' | 'sedan' | 'suv' | 'luxury' | 'sports';
  pricePerDay: number;
  image: string;
  features: string[];
  available: boolean;
  transmission: 'manual' | 'automatic';
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  year: number;
  description: string;
}

export interface Reservation {
  id: string;
  carId: string;
  car: Car;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'confirmed' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    licenseNumber: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Payment {
  id: string;
  reservationId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method: 'credit_card' | 'debit_card' | 'paypal';
  createdAt: string;
}

export interface DashboardStats {
  totalReservations: number;
  activeReservations: number;
  totalRevenue: number;
  availableCars: number;
  monthlyGrowth: number;
}