import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';
import API_URL from '../utils/api';

const ChoiceCategoryProperties = () => {
  const { category: categorySlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const propertyRefs = useRef({});
  const hasRestoredRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Map slugs to actual category names
  const categoryMap = {
    'agricultural-land': 'Agricultural Land',
    'independent-house': 'Independent House',
    'open-plot': 'Open Plot',
    'apartment': 'Apartment',
    'farmhouse': 'Farmhouse',
    'office-commercial-space': 'Office / Commercial Space'
  };

  const category = categoryMap[categorySlug] || categorySlug;

  console.log('ChoiceCategoryProperties rendered, slug:', categorySlug, 'category:', category);

  // Get ref for a specific property card
  const getPropertyRef = useCallback((propertyId) => {
    if (!propertyRefs.current[propertyId]) {
      propertyRefs.current[propertyId] = React.createRef();
    }
    return propertyRefs.current[propertyId];
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [categorySlug]);

  // Restore scroll and highlight card when returning from detail page
  useEffect(() => {
    if (hasRestoredRef.current || loading || properties.length === 0) return;

    let shouldRestore = location.state?.restoreContext === true;
    let clickedPropertyId = location.state?.clickedPropertyId;

    // Check sessionStorage as backup for browser back button
    if (!shouldRestore) {
      const storedContext = sessionStorage.getItem('navigationContext');
      if (storedContext) {
        try {
          const context = JSON.parse(storedContext);
          if (Date.now() - context.timestamp < 10000) {
            shouldRestore = context.restoreContext;
            clickedPropertyId = context.clickedPropertyId;
          }
          sessionStorage.removeItem('navigationContext');
        } catch (e) {
          console.error('Error parsing navigation context:', e);
        }
      }
    }

    if (shouldRestore && clickedPropertyId) {
      window.scrollTo(0, 0);
      
      const attemptRestore = (attempts = 0) => {
        if (attempts > 20) {
          hasRestoredRef.current = true;
          return;
        }

        const cardRef = propertyRefs.current[clickedPropertyId];
        if (cardRef?.current) {
          scrollTimeoutRef.current = setTimeout(() => {
            cardRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });

            cardRef.current.classList.add('card-highlight');
            setTimeout(() => {
              cardRef.current?.classList.remove('card-highlight');
            }, 2000);
          }, 100);

          hasRestoredRef.current = true;
          sessionStorage.removeItem('lastClickedProperty');
        } else {
          setTimeout(() => attemptRestore(attempts + 1), 50);
        }
      };

      attemptRestore();
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [loading, location.state, properties.length]);

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/api/properties`);
      const data = await res.json();
      console.log('All properties:', data);
      console.log('Looking for category:', category);
      const filtered = data.filter(p => {
        const sections = p.sections || [p.section];
        console.log(`Property: ${p.title}, sections:`, sections, 'category:', p.category, 'match:', p.category === category);
        return p.category === category && p.status === 'available' && sections.includes('choice');
      });
      console.log('Filtered choice properties:', filtered);
      setProperties(filtered);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    sessionStorage.setItem('navigationContext', JSON.stringify({
      restoreContext: true,
      clickedPropertyId: categorySlug,
      timestamp: Date.now()
    }));

    navigate('/', {
      state: {
        restoreContext: true,
        clickedPropertyId: categorySlug,
      },
      replace: false
    });
  };

  if (loading) {
    console.log('Still loading...');
    return <LoadingSpinner />;
  }

  console.log('Rendering page, properties count:', properties.length);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12" style={{ minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-primary hover:text-secondary transition-colors font-semibold"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">{category}</h1>
        
        {properties.length === 0 ? (
          <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-12 text-center">
              <div className="text-primary mb-6">
                <svg className="w-32 h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-gray-800 text-2xl font-bold mb-3">No Properties Available</h2>
              <p className="text-gray-600 text-base mb-6">
                We currently don't have any properties in this category. Please check back later or explore other categories.
              </p>
              <button
                onClick={handleBackClick}
                className="bg-primary text-white px-8 py-3 rounded-lg hover:opacity-90 transition font-semibold"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property._id}
                ref={getPropertyRef(property._id)}
              >
                <PropertyCard 
                  property={property} 
                  section="choice"
                  fromCategory={category}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChoiceCategoryProperties;
