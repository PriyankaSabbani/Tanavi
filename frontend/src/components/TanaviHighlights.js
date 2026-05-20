import React, { useState, useEffect } from 'react';
import HighlightCard from './HighlightCard';
import API_URL from '../utils/api';
import { readCache, writeCache } from '../utils/propertyCache';

const CACHE_KEY = 'highlights';

function filterHighlights(data) {
  return data.filter(p => {
    const sections   = p.sections || [p.section];
    const notExpired = !p.expiryDate || new Date(p.expiryDate) > new Date();
    return sections.includes('highlights') && p.status === 'available' && notExpired && p.isActive !== false;
  });
}

/**
 * TanaviHighlights
 *
 * Props:
 *   getPropertyRef(id) — ref factory from Home's propertyRefs map.
 *                        Registering refs here lets Home's scrollToRef find
 *                        Highlights cards by their _id, same as Featured cards.
 */
const TanaviHighlights = ({ getPropertyRef }) => {
  // Seed from cache — cards render instantly on back-nav, no network wait
  const cachedData = readCache(CACHE_KEY);
  const [properties, setProperties] = useState(cachedData || []);

  useEffect(() => {
    let cancelled = false;

    const fetchHighlights = async () => {
      try {
        const res  = await fetch(`${API_URL}/api/properties`);
        const data = await res.json();
        if (cancelled) return;
        const filtered = filterHighlights(data);
        writeCache(CACHE_KEY, filtered);
        setProperties(filtered);
      } catch (err) {
        if (!cancelled) console.error('Error fetching highlights:', err);
      }
    };

    // Always fetch silently — if cache was warm the UI is already showing,
    // this just keeps it fresh. No loading state, no skeleton flash.
    fetchHighlights();

    const interval = setInterval(fetchHighlights, 60_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (properties.length === 0) return null;

  return (
    <section id="tanavi-highlights" className="py-6 md:py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Tanavi Highlights</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {properties.slice(0, 8).map(property => (
            <div
              key={property._id}
              ref={getPropertyRef ? getPropertyRef(property._id, 'tanavi') : null}
              className="flex-shrink-0 w-[calc(50%-8px)] snap-start md:w-auto"
            >
              <HighlightCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TanaviHighlights;
