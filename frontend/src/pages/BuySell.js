import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import API_URL, { getImageUrl } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const BuySell = () => {
  const [activeTab, setActiveTab] = useState('sale');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/buysell`)
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const displayProperties = properties.filter(p => p.type === activeTab || (activeTab === 'sale' && p.type === 'sold') || (activeTab === 'buy' && p.type === 'bought'));

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Buy & Sell Properties</h1>
          <p className="text-gray-600">View all successful property transactions</p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('sale')}
            className={`px-8 py-3 rounded-lg font-semibold transition border-2 ${
              activeTab === 'sale'
                ? 'bg-primary text-white border-primary'
                : 'bg-primary/20 text-primary border-primary hover:bg-primary hover:text-white'
            }`}
          >
            Sale Properties
          </button>
          <button
            onClick={() => setActiveTab('buy')}
            className={`px-8 py-3 rounded-lg font-semibold transition border-2 ${
              activeTab === 'buy'
                ? 'bg-primary text-white border-primary'
                : 'bg-primary/20 text-primary border-primary hover:bg-primary hover:text-white'
            }`}
          >
            Buy Properties
          </button>
        </div>

        {displayProperties.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No properties to display</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProperties.map((property) => (
              <div key={property._id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="relative">
                  <img 
                    src={getImageUrl(property.image)} 
                    alt={property.title} 
                    className="w-full h-48 object-cover" 
                    onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'} 
                  />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                    <FaCheckCircle />
                    <span>{(property.type === 'sold' || property.type === 'sale') ? 'Sale' : 'Buy'}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{property.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                  <p className="text-xl font-bold text-gray-900 mb-2">₹ {property.price}</p>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{property.area} sq.ft</span>
                    <span>{property.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuySell;
