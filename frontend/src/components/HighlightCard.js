import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaArrowRight, FaCheck } from 'react-icons/fa';
import { getImageUrl } from '../utils/api';
import API_URL from '../utils/api';

const HighlightCard = ({ property }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareUrl = `${API_URL}/api/share/${property._id}`;
    const propertyId = property.propertyCode ? `[${property.propertyCode}]` : '';
    const text = `${propertyId} ${property.title} - ₹${property.price} at ${property.location}. Your trusted partner in finding the perfect property!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${propertyId} ${property.title}`,
          text: text,
          url: shareUrl
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          setShowShareMenu(true);
        }
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const shareToWhatsApp = (e) => {
    e.stopPropagation();
    const shareUrl = `${API_URL}/api/share/${property._id}`;
    const propertyId = property.propertyCode ? `[${property.propertyCode}]` : '';
    const text = `${propertyId} ${property.title} - ₹${property.price} at ${property.location}. Your trusted partner in finding the perfect property!\n\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    setShowShareMenu(false);
  };

  const shareToFacebook = (e) => {
    e.stopPropagation();
    const shareUrl = `${API_URL}/api/share/${property._id}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    setShowShareMenu(false);
  };

  const copyLink = (e) => {
    e.stopPropagation();
    const shareUrl = `${API_URL}/api/share/${property._id}`;
    navigator.clipboard.writeText(shareUrl);
    setShowCopyNotification(true);
    setShowShareMenu(false);
    setTimeout(() => setShowCopyNotification(false), 3000);
  };

  return (
    <>
      {/* Copy Notification */}
      {showCopyNotification && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3">
            <div className="bg-white rounded-full p-1">
              <FaCheck className="text-green-500 text-sm" />
            </div>
            <span className="font-medium">Link copied to clipboard!</span>
          </div>
        </div>
      )}

      <div className="group relative bg-secondary/10 border-2 border-secondary rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:border-primary transition-all duration-500 h-full">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={getImageUrl(property.images?.[0] || property.image)} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          loading="lazy" 
        />
        <div className="absolute top-4 right-4 bg-white/50 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          ₹ {property.price}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-textDark group-hover:text-primary transition-colors">{property.title}</h3>
        <div className="flex items-center text-textGray mb-4">
          <FaMapMarkerAlt className="mr-2 text-primary" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between gap-2">
          <button 
            onClick={() => {
              const propertyId = property._id || property.id;
              const currentScrollPosition = window.scrollY;

              // Navigate with restoration context
              navigate(`/property/${propertyId}`, {
                state: {
                  fromRoute: location.pathname,
                  clickedPropertyId: propertyId,
                  scrollPosition: currentScrollPosition,
                  section: 'highlights',
                }
              });
            }}
            className="flex items-center gap-2 text-primary font-semibold group-hover:text-secondary transition-colors"
          >
            <span>View Details</span>
            <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </button>
          <div className="relative">
            <button 
              onClick={handleShare}
              className="p-2 text-primary hover:bg-primary hover:text-white rounded-full transition"
              title="Share"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl z-10 py-2">
                <button onClick={shareToWhatsApp} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                  📱 WhatsApp
                </button>
                <button onClick={shareToFacebook} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                  📘 Facebook
                </button>
                <button onClick={copyLink} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                  🔗 Copy Link
                </button>
                <button onClick={(e) => { e.stopPropagation(); setShowShareMenu(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 text-sm">
                  ✕ Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HighlightCard;
