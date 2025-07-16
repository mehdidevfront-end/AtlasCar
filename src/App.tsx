import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Client Pages
import Home from './pages/Client/Home';
import CarList from './pages/Client/CarList';
import CarDetail from './pages/Client/CarDetail';
import Reservation from './pages/Client/Reservation';
import MyReservations from './pages/Client/MyReservations';
import Account from './pages/Client/Account';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import AdminCars from './pages/Admin/AdminCars';
import AdminReservations from './pages/Admin/AdminReservations';
import AdminClients from './pages/Admin/AdminClients';
import AdminPayments from './pages/Admin/AdminPayments';

// Mock user data
import { users } from './data/mockData';

function App() {
  const [currentUser, setCurrentUser] = React.useState(users[0]); // Mock logged in user
  const [isAdmin, setIsAdmin] = React.useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const switchToAdmin = () => {
    setCurrentUser(users.find(u => u.isAdmin) || users[0]);
    setIsAdmin(true);
  };

  const switchToClient = () => {
    setCurrentUser(users.find(u => !u.isAdmin) || users[0]);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header 
          isAdmin={isAdmin} 
          user={currentUser} 
          onLogout={handleLogout}
        />
        
        {/* Quick Switch for Demo */}
        <div className="bg-yellow-50 border-b border-yellow-200 p-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-4 text-sm">
              <span className="text-yellow-800">Mode démo:</span>
              <button
                onClick={switchToClient}
                className={`px-3 py-1 rounded ${!isAdmin ? 'bg-yellow-200 text-yellow-800' : 'text-yellow-700 hover:bg-yellow-100'}`}
              >
                Client
              </button>
              <button
                onClick={switchToAdmin}
                className={`px-3 py-1 rounded ${isAdmin ? 'bg-yellow-200 text-yellow-800' : 'text-yellow-700 hover:bg-yellow-100'}`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <Routes>
            {/* Client Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<CarList />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/reservation/:id" element={<Reservation />} />
            <Route path="/reservations" element={<MyReservations />} />
            <Route path="/account" element={<Account />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/cars" element={<AdminCars />} />
            <Route path="/admin/reservations" element={<AdminReservations />} />
            <Route path="/admin/clients" element={<AdminClients />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;