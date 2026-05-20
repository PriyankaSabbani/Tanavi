import React, { useState, useEffect } from 'react';
import HighlightCard from './HighlightCard';
import API_URL from '../utils/api';

const TanaviHighlights = ({ propertyRefs, getPropertyRef }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/properties`)
      .then(res => res.json())
      .then(data => {
        const highlighted = data.filter(p => {
          const sections = p.sections || [p.section];
          const isNotExpired = !p.expiryDate || new Date(p.expiryDate) > new Date();
          const isActiveProperty = p.isActive !== false;
          return sections.includes('highlights') && p.status === 'available' && isNotExpired && isActiveProperty;
        });
        setProperties(highlighted);
      })
      .catch(err => console.error('Error fetching properties:', err));
  }, []);

  return (
    <section id="tanavi-highlights" className="py-6 md:py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Tanavi Highlights</h2>
        {properties.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No highlighted properties available at the moment.</p>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {properties.slice(0, 8).map((property) => (
              <div 
                key={property._id} 
                ref={getPropertyRef ? getPropertyRef(property._id) : null}
                className="flex-shrink-0 w-[calc(50%-8px)] snap-start md:w-auto"
              >
                <HighlightCard property={property} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TanaviHighlights;
