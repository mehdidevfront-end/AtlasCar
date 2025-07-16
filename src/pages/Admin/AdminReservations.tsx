import React, { useState } from 'react';
import { Calendar, Search, Filter, Eye, Edit, Trash2, Download } from 'lucide-react';
import { reservations } from '../../data/mockData';
import { Reservation } from '../../types';
import Card from '../../components/UI/Card';
import Badge from '../../components/UI/Badge';
import Button from '../../components/UI/Button';

const AdminReservations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleViewDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const totalRevenue = filteredReservations.reduce((sum, reservation) => sum + reservation.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des réservations</h1>
            <p className="text-gray-600">Gérez toutes les réservations clients</p>
          </div>
          <Button icon={Download}>
            Exporter
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
                    placeholder="Rechercher par client ou véhicule..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="confirmed">Confirmée</option>
                <option value="active">En cours</option>
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="p-6 text-center">
              <p className="text-2xl font-bold text-gray-900">{filteredReservations.length}</p>
              <p className="text-sm text-gray-600">Total réservations</p>
            </div>
          </Card>
          <Card>
            <div className="p-6 text-center">
              <p className="text-2xl font-bold text-green-600">{filteredReservations.filter(r => r.status === 'active').length}</p>
              <p className="text-sm text-gray-600">En cours</p>
            </div>
          </Card>
          <Card>
            <div className="p-6 text-center">
              <p className="text-2xl font-bold text-blue-600">{filteredReservations.filter(r => r.status === 'confirmed').length}</p>
              <p className="text-sm text-gray-600">Confirmées</p>
            </div>
          </Card>
          <Card>
            <div className="p-6 text-center">
              <p className="text-2xl font-bold text-yellow-600">{totalRevenue.toLocaleString()}€</p>
              <p className="text-sm text-gray-600">Chiffre d'affaires</p>
            </div>
          </Card>
        </div>

        {/* Reservations Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Véhicule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
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
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-gray-900">{reservation.customerInfo.name}</p>
                        <p className="text-sm text-gray-600">{reservation.customerInfo.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={reservation.car.image} 
                          alt={reservation.car.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{reservation.car.name}</p>
                          <p className="text-sm text-gray-600">{reservation.car.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <p className="text-gray-900">{new Date(reservation.startDate).toLocaleDateString('fr-FR')}</p>
                        <p className="text-gray-600">→ {new Date(reservation.endDate).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900 font-medium">{reservation.totalPrice}€</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(reservation.status)}>
                        {getStatusLabel(reservation.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(reservation)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
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

        {/* Reservation Details Modal */}
        {showModal && selectedReservation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                Détails de la réservation #{selectedReservation.id}
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Informations client</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Nom:</span> {selectedReservation.customerInfo.name}</p>
                      <p><span className="font-medium">Email:</span> {selectedReservation.customerInfo.email}</p>
                      <p><span className="font-medium">Téléphone:</span> {selectedReservation.customerInfo.phone}</p>
                      <p><span className="font-medium">Permis:</span> {selectedReservation.customerInfo.licenseNumber}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Véhicule</h3>
                    <div className="flex items-center space-x-3 mb-3">
                      <img 
                        src={selectedReservation.car.image} 
                        alt={selectedReservation.car.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{selectedReservation.car.name}</p>
                        <p className="text-sm text-gray-600">{selectedReservation.car.brand}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Détails de la réservation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <p><span className="font-medium">Date de début:</span> {new Date(selectedReservation.startDate).toLocaleDateString('fr-FR')}</p>
                    <p><span className="font-medium">Date de fin:</span> {new Date(selectedReservation.endDate).toLocaleDateString('fr-FR')}</p>
                    <p><span className="font-medium">Statut:</span> 
                      <Badge variant={getStatusVariant(selectedReservation.status)} className="ml-2">
                        {getStatusLabel(selectedReservation.status)}
                      </Badge>
                    </p>
                    <p><span className="font-medium">Prix total:</span> {selectedReservation.totalPrice}€</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Fermer
                </Button>
                <Button>
                  Modifier
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReservations;