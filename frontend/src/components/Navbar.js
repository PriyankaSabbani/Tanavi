import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import RegistrationModal from './RegistrationModal';
import API_URL from '../utils/api';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [hasVisibleGallery, setHasVisibleGallery] = useState(false);
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Debug: Log user state
  useEffect(() => {
    console.log('Navbar - User state:', user);
  }, [user]);

  const isActive = (path) => location.pathname === path;

  const handleChoicePropertiesClick = (e) => {
    e.preventDefault();
    setPropertiesDropdownOpen(false);
    
    if (location.pathname === '/') {
      // Already on home page, just scroll
      const element = document.getElementById('choice-properties');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page with scroll target
      navigate('/', { state: { scrollTo: 'choice-properties' } });
    }
  };

  useEffect(() => {
    // Check if gallery section is enabled
    fetch(`${API_URL}/api/settings/gallery.enabled`)
      .then(res => {
        if (!res.ok) {
          // If settings API not available, default to true
          setHasVisibleGallery(true);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) setHasVisibleGallery(data.value !== false);
      })
      .catch(() => setHasVisibleGallery(true));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('nav')) {
        setIsOpen(false);
      }
      if (propertiesDropdownOpen && !e.target.closest('.properties-dropdown-container')) {
        setPropertiesDropdownOpen(false);
      }
      if (userMenuOpen && !e.target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
      if (propertiesDropdownOpen) {
        setPropertiesDropdownOpen(false);
      }
      if (userMenuOpen) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, propertiesDropdownOpen, userMenuOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
    <nav className="bg-white/70 backdrop-blur-lg shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaHome className="text-3xl text-primary" />
            <span className="text-xl font-bold"><span className="text-gray-900">TANAVI</span> <span className="text-gray-600">Properties</span></span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-7 relative">
            <Link to="/" className={`px-4 py-2 font-medium transition ${isActive('/') ? 'bg-primary text-white rounded' : 'text-gray-700 hover:text-primary'}`}>Home</Link>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-gray-700 hover:text-primary font-medium transition"
            >
              List Your Property
            </button>
            {/* Properties Dropdown */}
            <div className="relative properties-dropdown-container">
              <button
                onClick={() => setPropertiesDropdownOpen(!propertiesDropdownOpen)}
                className={`px-4 py-2 font-medium transition flex items-center gap-1 ${
                  isActive('/category/all') || location.pathname.startsWith('/category/') || location.pathname.startsWith('/choice-category/')
                    ? 'bg-primary text-white rounded' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                Properties
                <svg 
                  className={`w-4 h-4 transition-transform ${propertiesDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {propertiesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  <Link 
                    to="/category/all" 
                    onClick={() => setPropertiesDropdownOpen(false)}
                    className="block px-4 py-2.5 text-gray-700 hover:bg-primary hover:text-white transition font-medium"
                  >
                    All Properties
                  </Link>
                  <Link 
                    to="/#choice-properties" 
                    onClick={handleChoicePropertiesClick}
                    className="block px-4 py-2.5 text-gray-700 hover:bg-primary hover:text-white transition font-medium"
                  >
                    Choice Properties
                  </Link>
                </div>
              )}
            </div>
            
            {hasVisibleGallery && (
              <Link to="/blogs" className={`px-4 py-2 font-medium transition ${isActive('/blogs') ? 'bg-primary text-white rounded' : 'text-gray-700 hover:text-primary'}`}>Gallery</Link>
            )}
            <Link to="/buy-sell" className={`px-4 py-2 font-medium transition ${isActive('/buy-sell') ? 'bg-primary text-white rounded' : 'text-gray-700 hover:text-primary'}`}>Buy & Sell</Link>
            <Link to="/guide" className={`px-4 py-2 font-medium transition ${isActive('/guide') ? 'bg-primary text-white rounded' : 'text-gray-700 hover:text-primary'}`}>Guide</Link>
            <Link to="/about" className={`px-4 py-2 font-medium transition ${isActive('/about') ? 'bg-primary text-white rounded' : 'text-gray-700 hover:text-primary'}`}>About</Link>
            
            {user && (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary font-medium transition"
                >
                  <FaUser className="text-lg" />
                  <span>{user.name}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-600">{user.phone}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition font-medium"
                    >
                      <FaUser />
                      <span>My Profile</span>
                    </Link>
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 transition font-medium"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex items-center justify-center w-10 h-10 self-center">
            <div className="relative w-6 h-6">
              <span className={`absolute left-0 w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'top-3 rotate-45' : 'top-1'}`}></span>
              <span className={`absolute left-0 top-3 w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute left-0 w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'top-3 -rotate-45' : 'top-5'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-secondary/20 backdrop-blur-lg shadow-lg rounded-b-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" onClick={handleLinkClick} className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/') ? 'bg-primary text-white' : 'text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white'}`}>Home</Link>
            <button 
              onClick={() => { setIsModalOpen(true); setIsOpen(false); }}
              className="w-full text-left px-4 py-3 text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white rounded-lg font-medium transition"
            >
              List Your Property
            </button>
            
            {/* Mobile Properties Dropdown */}
            <div>
              <button
                onClick={() => setMobilePropertiesOpen(!mobilePropertiesOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition font-medium ${
                  isActive('/category/all') || location.pathname.startsWith('/category/') || location.pathname.startsWith('/choice-category/')
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white'
                }`}
              >
                Properties
                <svg 
                  className={`w-4 h-4 transition-transform ${mobilePropertiesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {mobilePropertiesOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  <Link 
                    to="/category/all" 
                    onClick={handleLinkClick}
                    className="block px-4 py-2.5 rounded-lg text-gray-700 bg-white/50 hover:bg-primary/80 hover:text-white transition font-medium"
                  >
                    All Properties
                  </Link>
                  <Link
                    to="/#choice-properties" 
                    onClick={(e) => { handleChoicePropertiesClick(e); setIsOpen(false); setMobilePropertiesOpen(false); }}
                    className="block px-4 py-2.5 rounded-lg text-gray-700 bg-white/50 hover:bg-primary/80 hover:text-white transition font-medium"
                  >
                    Choice Properties
                  </Link>
                </div>
              )}
            </div>
            
            {hasVisibleGallery && (
              <Link to="/blogs" onClick={handleLinkClick} className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/blogs') ? 'bg-primary text-white' : 'text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white'}`}>Gallery</Link>
            )}
            <Link to="/buy-sell" onClick={handleLinkClick} className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/buy-sell') ? 'bg-primary text-white' : 'text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white'}`}>Buy & Sell</Link>
            <Link to="/guide" onClick={handleLinkClick} className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/guide') ? 'bg-primary text-white' : 'text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white'}`}>Guide</Link>
            <Link to="/about" onClick={handleLinkClick} className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/about') ? 'bg-primary text-white' : 'text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white'}`}>About</Link>
            
            {user && (
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="px-4 py-3 bg-white/50 rounded-lg mb-2">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">{user.phone}</p>
                </div>
                <Link
                  to="/profile"
                  onClick={handleLinkClick}
                  className="w-full flex items-center gap-2 px-4 py-3 text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white rounded-lg font-medium transition mb-2"
                >
                  <FaUser />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-medium transition"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
    <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalType="list" />
    </>
  );
};

export default Navbar;
