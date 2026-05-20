import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';
import API_URL from '../utils/api';
import { readCache, writeCache } from '../utils/propertyCache';

// ─── constants ────────────────────────────────────────────────────────────────

const CATEGORY_MAP = {
  'agricultural-lands': 'Agricultural Land',
  'independent-house':  'Independent House',
  'open-plots':         'Open Plot',
  'farmhouses':         'Farmhouse',
  'apartment':          'Apartment',
  'office-space':       'Office / Commercial Space',
  'all':                'All Properties',
};

const CACHE_KEY = 'all_active';

function filterActive(data) {
  return data.filter(p => {
    const notExpired = !p.expiryDate || new Date(p.expiryDate) > new Date();
    return p.status === 'available' && notExpired && p.isActive !== false;
  });
}

function getPriceInLakhs(priceStr) {
  const price = String(priceStr).replace(/,/g, '');
  if (price.includes('Cr'))    return parseFloat(price) * 100;
  if (price.includes('Lakhs')) return parseFloat(price);
  return parseFloat(price) / 100_000;
}

// ─── component ────────────────────────────────────────────────────────────────

const CategoryProperties = () => {
  const { category }   = useParams();
  const [searchParams] = useSearchParams();
  const navigate       = useNavigate();
  const location       = useLocation();

  const locationParam = searchParams.get('location');
  const type          = searchParams.get('type');
  const priceRange    = searchParams.get('price');
  const searchQuery   = searchParams.get('search');

  // Seed from cache — instant render on back-nav, no skeleton flash
  const cachedData = readCache(CACHE_KEY);
  const [properties, setProperties] = useState(cachedData || []);
  const [loading, setLoading]       = useState(!cachedData);

  const propertyRefs   = useRef({});
  const hasRestoredRef = useRef(false);
  const rafRef         = useRef(null);

  // ── ref helper ───────────────────────────────────────────────────────────
  const getPropertyRef = useCallback((id) => {
    if (!propertyRefs.current[id]) propertyRefs.current[id] = React.createRef();
    return propertyRefs.current[id];
  }, []);

  // ── data fetching ────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const fetchProperties = async (silent = false) => {
      try {
        const res  = await fetch(`${API_URL}/api/properties`);
        const data = await res.json();
        if (cancelled) return;
        const active = filterActive(data);
        writeCache(CACHE_KEY, active);
        setProperties(active);
        if (!silent) setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.error('Error fetching properties:', err);
        if (!silent) setLoading(false);
      }
    };

    fetchProperties(!!cachedData);
    const interval = setInterval(() => fetchProperties(true), 60_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── scroll restoration ───────────────────────────────────────────────────
  useEffect(() => {
    if (hasRestoredRef.current) return;
    if (loading || properties.length === 0) return;

    let shouldRestore = location.state?.restoreContext === true;
    let clickedId     = location.state?.clickedPropertyId;

    if (!shouldRestore) {
      try {
        const raw = sessionStorage.getItem('navigationContext');
        if (raw) {
          const ctx = JSON.parse(raw);
          if (Date.now() - ctx.timestamp < 30_000) {
            shouldRestore = ctx.restoreContext;
            clickedId     = ctx.clickedPropertyId;
          }
          sessionStorage.removeItem('navigationContext');
        }
      } catch (_) {}
    }

    if (shouldRestore && clickedId) {
      window.scrollTo(0, 0);
      scrollToCard(clickedId);
    } else {
      window.scrollTo(0, 0);
    }

    hasRestoredRef.current = true;
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [loading, location.state, properties.length]); // eslint-disable-line react-hooks/exhaustive-deps

  function scrollToCard(id, attempts = 0) {
    if (attempts > 30) return;
    const ref = propertyRefs.current[id];
    if (ref?.current) {
      setTimeout(() => {
        rafRef.current = requestAnimationFrame(() => {
          if (!ref.current) return;
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          ref.current.classList.add('card-highlight');
          setTimeout(() => ref.current?.classList.remove('card-highlight'), 2000);
        });
      }, 80);
    } else {
      setTimeout(() => scrollToCard(id, attempts + 1), 50);
    }
  }

  // ── back navigation ──────────────────────────────────────────────────────
  // Writes isCategory:true so Home scrolls to the correct category tile.
  // Uses navigate(-1) — true browser back, no duplicate history entry.
  const writeBackContext = useCallback(() => {
    const slug = location.state?.categorySlug || category;
    try {
      sessionStorage.setItem('navigationContext', JSON.stringify({
        restoreContext:    true,
        clickedPropertyId: slug,
        isCategory:        true,
        timestamp:         Date.now(),
      }));
    } catch (_) {}
  }, [category, location.state]);

  const handleBackClick = () => {
    writeBackContext();
    navigate(-1);
  };

  // popstate fires BEFORE React unmounts on browser/device back — write
  // navigationContext immediately so Home reads it on mount.
  useEffect(() => {
    const onPopState = () => writeBackContext();
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [writeBackContext]);

  // ── filtering ────────────────────────────────────────────────────────────
  const categoryName = CATEGORY_MAP[category] || category;

  let filtered = category === 'all'
    ? properties
    : properties.filter(p => p.category === categoryName || p.type === categoryName);

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      (p.propertyCode && p.propertyCode.toLowerCase().includes(q))
    );
  }
  if (locationParam) filtered = filtered.filter(p => p.location === locationParam);
  if (type)          filtered = filtered.filter(p => p.category === type);
  if (priceRange) {
    filtered = filtered.filter(p => {
      const price = getPriceInLakhs(p.price);
      if (priceRange === '0-50')    return price < 50;
      if (priceRange === '50-100')  return price >= 50  && price < 100;
      if (priceRange === '100-200') return price >= 100 && price < 200;
      if (priceRange === '200-500') return price >= 200 && price < 500;
      if (priceRange === '500+')    return price >= 500;
      return true;
    });
  }

  // ── render ───────────────────────────────────────────────────────────────
  if (loading) return <LoadingSpinner />;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-primary hover:text-secondary transition-colors font-semibold"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>

        {(locationParam || type || priceRange || searchQuery) && (
          <div className="mb-4 flex gap-2 flex-wrap">
            {searchQuery   && <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Search: {searchQuery}</span>}
            {locationParam && <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Location: {locationParam}</span>}
            {type          && <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Type: {type}</span>}
            {priceRange    && (
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                Budget: {priceRange === '500+' ? 'Above 5 Cr' : priceRange.split('-').join('L – ') + 'L'}
              </span>
            )}
          </div>
        )}

        <p className="text-gray-600 mb-8">{filtered.length} properties found</p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(property => {
              const id = property._id || property.id;
              return (
                <div key={id} ref={getPropertyRef(id)}>
                  <PropertyCard property={property} section="category" fromCategory={category} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProperties;
