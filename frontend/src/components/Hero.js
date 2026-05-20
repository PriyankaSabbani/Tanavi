import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaExclamationCircle, FaSearch } from 'react-icons/fa';
import API_URL from '../utils/api';

const Hero = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [locations, setLocations] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/properties`)
      .then(res => res.json())
      .then(data => {
        const uniqueLocations = [...new Set(data.map(p => p.location).filter(Boolean))];
        setLocations(uniqueLocations.sort());
      })
      .catch(err => console.error('Error fetching locations:', err));
  }, []);

  const handleSearch = () => {
    if (!location && !propertyType && !priceRange && !searchQuery) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    // Store scroll position for return navigation
    sessionStorage.setItem('returnSection', 'home');
    sessionStorage.setItem('scrollPosition', window.scrollY);
    
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (propertyType) params.append('type', propertyType);
    if (priceRange) params.append('price', priceRange);
    if (searchQuery) params.append('search', searchQuery);
    navigate(`/category/all?${params.toString()}`);
  };



  return (
    <section id="home" className="pt-16 min-h-[500px] flex items-center relative" style={{
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {showAlert && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
            <FaExclamationCircle className="text-2xl" />
            <span className="font-medium">Please select at least one filter to search properties</span>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-down">
            Find Your Dream Property<br />with Tanavi Properties
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
            Trusted platform for Agricultural Lands, Homes,<br />Open Plots, Flats & Farmhouses.
          </p>
          
          <div className="space-y-4 max-w-4xl">
            <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl z-10" />
                <input
                  type="text"
                  placeholder="Search by property name, location or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-2xl text-gray-700 transition-all duration-300"
                />
              </div>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '500ms' }}>
              <div className="flex flex-col gap-4">
              <div className="relative">
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-2xl appearance-none transition-all duration-300"
                >
                  <option value="">Location</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <select 
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-2xl appearance-none transition-all duration-300"
                  >
                    <option value="">Property Type</option>
                    <option value="Agricultural Land">Agricultural Land</option>
                    <option value="Independent House">Independent House</option>
                    <option value="Open Plot">Open Plot</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Farmhouse">Farmhouse</option>
                    <option value="Office / Commercial Space">Office / Commercial Space</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
                <div className="relative">
                  <select 
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-2xl appearance-none transition-all duration-300"
                  >
                    <option value="">Budget Range</option>
                    <option value="0-50">Under 50 Lakhs</option>
                    <option value="50-100">50L - 1 Cr</option>
                    <option value="100-200">1 Cr - 2 Cr</option>
                    <option value="200-500">2 Cr - 5 Cr</option>
                    <option value="500+">Above 5 Cr</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <button 
                onClick={handleSearch}
                className="w-full bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 hover:shadow-2xl transition-all duration-300 font-medium"
              >
                Search
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
