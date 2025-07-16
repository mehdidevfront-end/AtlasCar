import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Award, Star } from 'lucide-react';
import { cars } from '../../data/mockData';
import CarCard from '../../components/Cars/CarCard';
import Button from '../../components/UI/Button';

const Home: React.FC = () => {
  const featuredCars = cars.filter(car => car.available).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Louez votre voiture idéale en quelques clics
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Découvrez notre flotte moderne de véhicules premium et réservez 
                instantanément pour vos voyages d'affaires ou de plaisir.
              </p>
              <div className="flex space-x-4">
                <Link to="/cars">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                    Voir les véhicules
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  En savoir plus
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Voiture de luxe"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9/5</span>
                </div>
                <p className="text-sm text-gray-600">+2000 clients satisfaits</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir AtlasCar ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nous offrons une expérience de location exceptionnelle avec des services premium
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Assurance complète</h3>
              <p className="text-gray-600">
                Tous nos véhicules sont couverts par une assurance premium pour votre tranquillité d'esprit.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Disponible 24/7</h3>
              <p className="text-gray-600">
                Service client disponible 24h/24 et 7j/7 pour répondre à tous vos besoins.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualité premium</h3>
              <p className="text-gray-600">
                Flotte moderne et entretenue régulièrement pour garantir sécurité et confort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Véhicules populaires
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez nos véhicules les plus appréciés par nos clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/cars">
              <Button size="lg">
                Voir tous les véhicules
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Prêt à partir à l'aventure ?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Réservez maintenant et profitez de nos offres exceptionnelles
          </p>
          <Link to="/cars">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Réserver maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;