import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import PropertyCategories from '../components/PropertyCategories';
import TanaviHighlights from '../components/TanaviHighlights';
import WhyChoose from '../components/WhyChoose';
import ChoiceProperties from '../components/ChoiceProperties';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Essentials from '../components/Essentials';
import RegisterCTA from '../components/RegisterCTA';
import LoadingSpinner from '../components/LoadingSpinner';
import AnnouncementMarquee from '../components/AnnouncementMarquee';
import API_URL, { fetchWithTimeout } from '../utils/api';

const Home = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const propertyRefs = useRef({});
  const hasRestoredRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Get ref for a specific property card
  const getPropertyRef = useCallback((propertyId) => {
    if (!propertyRefs.current[propertyId]) {
      propertyRefs.current[propertyId] = React.createRef();
    }
    return propertyRefs.current[propertyId];
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  // Restore scroll and highlight card when returning from category page
  useEffect(() => {
    if (hasRestoredRef.current || loading || properties.length === 0) return;

    let shouldRestore = location.state?.restoreContext === true;
    let clickedPropertyId = location.state?.clickedPropertyId;
    const scrollTo = location.state?.scrollTo;

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

    if (scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        hasRestoredRef.current = true;
      }, 300);
    } else if (shouldRestore && clickedPropertyId) {
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

  useEffect(() => {
    const fetchProperties = () => {
      fetchWithTimeout(`${API_URL}/api/properties?t=${Date.now()}`, { cache: 'no-store' }, 30000)
        .then(res => res.json())
        .then(data => {
          setProperties(data.filter(p => {
            const sections = p.sections || [p.section];
            const isNotExpired = !p.expiryDate || new Date(p.expiryDate) > new Date();
            const isActiveProperty = p.isActive !== false;
            return sections.includes('featured') && p.status === 'available' && isNotExpired && isActiveProperty;
          }));
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching properties:', err);
          setLoading(false);
        });
    };

    fetchProperties();
    const interval = setInterval(fetchProperties, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div>
      <div className="pt-16 min-h-[500px] bg-gray-200 animate-pulse" />
      <section className="py-6 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 bg-gray-200 rounded w-64 mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 animate-pulse">
                <div className="w-full h-48 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-6 bg-gray-200 rounded w-1/3" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div>
      <AnnouncementMarquee />
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <section id="properties" data-animate className={`py-6 md:py-8 bg-background transition-all duration-1000 ${visibleSections.properties ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 animate-fade-in">Featured Properties</h2>

          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {properties.filter(p => 
              p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
              p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (p.propertyCode && p.propertyCode.toLowerCase().includes(searchQuery.toLowerCase()))
            ).slice(0, 8).map((property, index) => (
              <div 
                key={property._id} 
                ref={getPropertyRef(property._id)}
                className="flex-shrink-0 w-[calc(50%-8px)] snap-start md:w-auto animate-slide-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PropertyCard property={property} section="properties" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <PropertyCategories categoryRefs={propertyRefs} getCategoryRef={getPropertyRef} />
      <TanaviHighlights propertyRefs={propertyRefs} getPropertyRef={getPropertyRef} />
      <ChoiceProperties />
      
      <section id="banner" data-animate className={`py-6 md:py-8 bg-background transition-all duration-1000 ${visibleSections.banner ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200" 
              alt="Tanavi Properties Banner" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 flex items-center justify-center">
              <div className="text-center text-white px-4 animate-fade-in">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-slide-down">Building Your Dreams</h2>
                <p className="text-lg md:text-xl animate-slide-up" style={{ animationDelay: '200ms' }}>Experience luxury living with Tanavi Properties</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChoose />
      
      <section id="agri-banner" data-animate className={`py-6 md:py-8 bg-background transition-all duration-1000 ${visibleSections['agri-banner'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
            <img 
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200" 
              alt="Agriculture Land" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-700/90 flex items-center justify-center">
              <div className="text-center text-white px-4 md:px-8 animate-fade-in">
                <h2 className="text-2xl md:text-4xl font-bold italic animate-slide-down">"Agriculture land sustains life — it feeds the world, nurtures generations, and grows in value forever."</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Testimonials />
      <FAQ />
      <Essentials />
      <RegisterCTA />
    </div>
  );
};

export default Home;
