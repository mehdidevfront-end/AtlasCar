import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, UserPlus } from 'lucide-react';
import { users, reservations } from '../../data/mockData';
import { User } from '../../types';
import Card from '../../components/UI/Card';
import Badge from '../../components/UI/Badge';
import Button from '../../components/UI/Button';

const AdminClients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const clients = users.filter(user => !user.isAdmin);
  
  const filteredClients = clients.filter(client => {
    return client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           client.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleViewDetails = (client: User) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const getClientReservations = (clientId: string) => {
    return reservations.filter(reservation => reservation.userId === clientId);
  };

  const getClientTotalSpent = (clientId: string) => {
    return getClientReservations(clientId).reduce((sum, reservation) => sum + reservation.totalPrice, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des clients</h1>
            <p className="text-gray-600">Gérez vos clients et leurs informations</p>
          </div>
          <Button icon={UserPlus}>
            Ajouter un client
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
                    placeholder="Rechercher un client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="p-6 text-center">
              <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
              <p className="text-sm text-gray-600">Total clients</p>
            </div>
          </Card>
          <Card>
            <div className="p-6 text-center">
              <p className="text-2xl font-bold text-green-600">{clients.filter(c => getClientReservations(c.id).length > 0).length}</p>
              <p className="text-sm text-gray-600">Clients actifs</p>
            </div>
          </Card>
          <Card>
            <div className="p-6 text-center">
              <p className="text-2xl font-bold text-blue-600">{Math.round(clients.reduce((sum, c) => sum + getClientTotalSpent(c.id), 0) / clients.length)}</p>
              <p className="text-sm text-gray-600">Dépense moyenne</p>
            </div>
          </Card>
          <Card>
            <div className="p-6 text-center">
              <p className="text-2xl font-bold text-yellow-600">{clients.filter(c => new Date(c.createdAt).getMonth() === new Date().getMonth()).length}</p>
              <p className="text-sm text-gray-600">Nouveaux ce mois</p>
            </div>
          </Card>
        </div>

        {/* Clients Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Réservations
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total dépensé
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Membre depuis
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => {
                  const clientReservations = getClientReservations(client.id);
                  const totalSpent = getClientTotalSpent(client.id);
                  
                  return (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {client.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{client.name}</p>
                            <p className="text-sm text-gray-600">#{client.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <p className="text-gray-900">{client.email}</p>
                          <p className="text-gray-600">{client.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <p className="text-gray-900 font-medium">{clientReservations.length}</p>
                          <p className="text-gray-600">
                            {clientReservations.filter(r => r.status === 'active').length} actives
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900 font-medium">{totalSpent}€</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900">{new Date(client.createdAt).toLocaleDateString('fr-FR')}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewDetails(client)}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Client Details Modal */}
        {showModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                Détails du client
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Informations personnelles</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Nom:</span> {selectedClient.name}</p>
                      <p><span className="font-medium">Email:</span> {selectedClient.email}</p>
                      <p><span className="font-medium">Téléphone:</span> {selectedClient.phone}</p>
                      <p><span className="font-medium">Permis:</span> {selectedClient.licenseNumber}</p>
                      <p><span className="font-medium">Membre depuis:</span> {new Date(selectedClient.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Statistiques</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Réservations totales:</span> {getClientReservations(selectedClient.id).length}</p>
                      <p><span className="font-medium">Réservations actives:</span> {getClientReservations(selectedClient.id).filter(r => r.status === 'active').length}</p>
                      <p><span className="font-medium">Total dépensé:</span> {getClientTotalSpent(selectedClient.id)}€</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Réservations récentes</h3>
                  <div className="space-y-2">
                    {getClientReservations(selectedClient.id).slice(0, 5).map((reservation) => (
                      <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={reservation.car.image} 
                            alt={reservation.car.name}
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-sm">{reservation.car.name}</p>
                            <p className="text-xs text-gray-600">{new Date(reservation.startDate).toLocaleDateString('fr-FR')}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={reservation.status === 'active' ? 'success' : 'info'}>
                            {reservation.status === 'active' ? 'Active' : 'Terminée'}
                          </Badge>
                          <p className="text-sm text-gray-600">{reservation.totalPrice}€</p>
                        </div>
                      </div>
                    ))}
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

export default AdminClients;