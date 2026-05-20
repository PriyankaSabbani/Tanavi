import React, { useState, useRef, useEffect, useCallback } from 'react';
import useSmartNavigation from '../hooks/useSmartNavigation';
import useNavigationRestore from '../hooks/useNavigationRestore';
import SmartLink from '../components/SmartLink';

/**
 * Example: Property List Page with Filters
 * Demonstrates full state restoration
 */
const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    location: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('featured');

  const { updateUIState } = useSmartNavigation();
  const propertyRefs = useRef({});

  const getPropertyRef = useCallback((propertyId) => {
    if (!propertyRefs.current[propertyId]) {
      propertyRefs.current[propertyId] = React.createRef();
    }
    return propertyRefs.current[propertyId];
  }, []);

  const handleRestoreUIState = useCallback((uiState) => {
    if (uiState.filters) setFilters(uiState.filters);
    if (uiState.searchQuery !== undefined) setSearchQuery(uiState.searchQuery);
    if (uiState.activeTab) setActiveTab(uiState.activeTab);
  }, []);

  useNavigationRestore({
    onRestoreUIState: handleRestoreUIState,
    getItemRef: getPropertyRef,
    scrollDelay: 150,
    highlightDuration: 2000,
  });

  useEffect(() => {
    updateUIState({ filters, searchQuery, activeTab });
  }, [filters, searchQuery, activeTab, updateUIState]);

  return (
    <div className="property-list-page">
      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="property-grid">
        {properties.map((property) => (
          <div key={property.id} ref={getPropertyRef(property.id)}>
            <h3>{property.title}</h3>
            <SmartLink
              to={`/property/${property.id}`}
              itemId={property.id}
            >
              View Details
            </SmartLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyListPage;
