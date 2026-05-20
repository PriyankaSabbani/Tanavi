import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSmartNavigation from '../hooks/useSmartNavigation';

/**
 * Example: Property Detail Page
 * Demonstrates smart back navigation
 */
const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const { navigateBack, hasNavigationContext } = useSmartNavigation();

  useEffect(() => {
    // Fetch property details
    const fetchProperty = async () => {
      const response = await fetch(`/api/properties/${id}`);
      const data = await response.json();
      setProperty(data);
    };

    fetchProperty();
  }, [id]);

  const handleBackClick = () => {
    navigateBack();
  };

  if (!property) return <div>Loading...</div>;

  return (
    <div className="property-detail-page">
      {/* Back Button */}
      <button onClick={handleBackClick} className="back-button">
        ← Back
      </button>

      {/* Property Details */}
      <div className="property-details">
        <h1>{property.title}</h1>
        <img src={property.image} alt={property.title} />
        <p>{property.description}</p>
        <p className="price">₹{property.price}</p>
        
        <div className="property-info">
          <p>Location: {property.location}</p>
          <p>Category: {property.category}</p>
          <p>Area: {property.area}</p>
        </div>

        <button className="contact-button">
          Contact Agent
        </button>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
