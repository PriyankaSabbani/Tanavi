import React, { memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBed, FaBath, FaCar, FaRulerCombined } from 'react-icons/fa';
import { getImageUrl } from '../utils/api';

// memo — prevents re-renders from the 60 s silent background refresh in Home
const PropertyCard = memo(({ property, section = 'properties', fromCategory = null }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getAreaUnit = (type) => {
    if (type === 'Agricultural Land' || type === 'Farmhouse') return 'Acres/Guntas';
    if (type === 'Open Plot')   return 'Sq Yards';
    if (type === 'Independent House' || type === 'Apartment' || type === 'Office / Commercial Space') return 'SFT';
    return '';
  };

  const getPropertyDetails = () => {
    const type = property.category || property.type;
    const unit = getAreaUnit(type);

    if (type === 'Agricultural Land' || type === 'Farmhouse' || type === 'Open Plot') {
      return (
        <div className="flex items-center gap-2 text-sm text-textGray">
          <FaRulerCombined />
          <span>{property.area || 'N/A'} {unit}</span>
        </div>
      );
    }

    if (type === 'Office / Commercial Space') {
      return (
        <div className="flex justify-between text-sm text-textGray">
          <div className="flex items-center gap-1"><FaRulerCombined /><span>{property.area || 'N/A'} {unit}</span></div>
          <div className="flex items-center gap-1"><FaCar /><span>{property.parking || 'N/A'}</span></div>
        </div>
      );
    }

    return (
      <div className="flex justify-between text-sm text-textGray">
        {property.bedrooms  && <div className="flex items-center gap-1"><FaBed /><span>{property.bedrooms}</span></div>}
        {property.bathrooms && <div className="flex items-center gap-1"><FaBath /><span>{property.bathrooms}</span></div>}
        {property.area      && <div className="flex items-center gap-1"><FaRulerCombined /><span>{property.area} {unit}</span></div>}
      </div>
    );
  };

  const handleViewDetails = () => {
    const propertyId = property._id || property.id;
    const isCategory = section === 'category';

    // Write to sessionStorage BEFORE navigating — fallback for browser/device
    // back button which discards location.state on navigation.
    try {
      sessionStorage.setItem('lastClickedProperty', JSON.stringify({
        propertyId,
        fromRoute:  location.pathname,
        isCategory,
        timestamp:  Date.now(),
      }));
    } catch (_) {}

    navigate(`/property/${propertyId}`, {
      state: {
        fromRoute:         location.pathname,
        clickedPropertyId: propertyId,
        fromCategory,
        section,
        isCategory,
      },
    });
  };

  return (
    <div className="bg-secondary/10 border-2 border-secondary rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:border-primary transition-all duration-300 h-full flex flex-col">
      <div className="relative">
        <img
          src={getImageUrl(property.images?.[0] || property.image)}
          alt={property.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-textDark">{property.title}</h3>
          {property.propertyCode && (
            <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded">
              {property.propertyCode}
            </span>
          )}
        </div>
        <p className="text-textGray text-sm mb-2">{property.location}</p>
        <p className="text-xl font-bold text-textDark mb-3">₹ {property.price}</p>
        <div className="mb-4 flex-grow">{getPropertyDetails()}</div>
        <button
          onClick={handleViewDetails}
          className="w-full bg-secondary text-white py-2 rounded hover:bg-secondary/80 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
});

PropertyCard.displayName = 'PropertyCard';
export default PropertyCard;
