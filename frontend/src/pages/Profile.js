import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_URL, { getImageUrl } from '../utils/api';
import { FaUser, FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const { user, token, loading } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && token) {
      fetchUserProperties();
    }
  }, [user, token]);

  const fetchUserProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/api/properties/user-listings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProperties(data);
      }
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoadingProperties(false);
    }
  };

  if (loading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600">User Profile</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FaEnvelope className="text-primary text-xl" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-800">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FaPhone className="text-primary text-xl" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-800">{user.phone || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaHome className="text-primary" />
              My Listed Properties
            </h2>
            <button
              onClick={() => navigate('/list-property')}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              List New Property
            </button>
          </div>

          {loadingProperties ? (
            <LoadingSpinner />
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <FaHome className="text-gray-300 text-6xl mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">You haven't listed any properties yet</p>
              <button
                onClick={() => navigate('/list-property')}
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                List Your First Property
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                  {property.images && property.images.length > 0 && (
                    <img
                      src={getImageUrl(property.images[0])}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{property.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                    <p className="text-primary font-bold text-xl mb-2">
                      ₹{property.price ? Number(property.price).toLocaleString('en-IN') : 'N/A'}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{property.category}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        property.status === 'approved' ? 'bg-green-100 text-green-700' :
                        property.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {property.status || 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
