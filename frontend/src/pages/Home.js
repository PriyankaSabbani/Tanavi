import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
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
import AnnouncementMarquee from '../components/AnnouncementMarquee';
import API_URL, { fetchWithTimeout } from '../utils/api';
import { readCache, writeCache } from '../utils/propertyCache';

// ─── cache key ────────────────────────────────────────────────────────────────
const CACHE_KEY = 'featured';

function filterFeatured(data) {
  return data.filter(p => {
    const sections = p.sections || [p.section];
    const notExpired = !p.expiryDate || new Date(p.expiryDate) > new Date();
    return sections.includes('featured') && p.status === 'available' && notExpired && p.isActive !== false;
  });
}

// ─── component ────────────────────────────────────────────────────────────────
const Home = () => {
  const location = useLocation();

  // Detect back-nav synchronously (before first render) so visibleSections and
  // loading are correct from the very first paint — no flash of opacity-0 or skeleton.
  const cachedData = readCache(CACHE_KEY);

  const isBackNavOnMount = (() => {
    if (location.state?.restoreContext === true) return true;
    try {
      const raw = sessionStorage.getItem('navigationContext');
      if (raw) {
        const ctx = JSON.parse(raw);
        if (ctx.restoreContext === true && Date.now() - ctx.timestamp < 15_000) return true;
      }
    } catch (_) {}
    return false;
  })();

  // Seed from cache — cards render instantly on back-nav, no skeleton shown.
  const [properties, setProperties] = useState(cachedData || []);
  const [loading, setLoading]       = useState(!cachedData);
  const [searchQuery, setSearchQuery] = useState('');

  // Pre-mark all animated sections visible on back-nav so entrance animations
  // (opacity-0 → opacity-100) don't hide cards while scrollIntoView fires.
  const [visibleSections, setVisibleSections] = useState(
    isBackNavOnMount
      ? { properties: true, 'tanavi-highlights': true, banner: true, 'agri-banner': true }
      : {}
  );

  // Separate ref maps — property cards and category tiles must NOT share keys
  const propertyRefs   = useRef({});
  const categoryRefs   = useRef({});
  const hasRestoredRef = useRef(false);
  const rafRef         = useRef(null);

  // ── ref helpers ─────────────────────────────────────────────────────────────
  const getPropertyRef = useCallback((id) => {
    if (!propertyRefs.current[id]) propertyRefs.current[id] = React.createRef();
    return propertyRefs.current[id];
  }, []);

  const getCategoryRef = useCallback((slug) => {
    if (!categoryRefs.current[slug]) categoryRefs.current[slug] = React.createRef();
    return categoryRefs.current[slug];
  }, []);

  // ── data fetching ────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const fetchProperties = async (silent = false) => {
      try {
        const res  = await fetchWithTimeout(`${API_URL}/api/properties`, {}, 30000);
        const data = await res.json();
        if (cancelled) return;
        const filtered = filterFeatured(data);
        writeCache(CACHE_KEY, filtered);
        setProperties(filtered);
        if (!silent) setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.error('Error fetching properties:', err);
        if (!silent) setLoading(false);
      }
    };

    // If cache is warm, do a silent background refresh — no loading flash.
    fetchProperties(!!cachedData);

    // Refresh every 60 s silently
    const interval = setInterval(() => fetchProperties(true), 60_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── intersection observer for section entrance animations ────────────────────
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisibleSections(prev => ({ ...prev, [e.target.id]: true }));
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  // ── scroll restoration ───────────────────────────────────────────────────────
  useEffect(() => {
    // Step 1 — already done this mount
    if (hasRestoredRef.current) return;
    // Step 2 — data not ready; retry on next render (do NOT mark as restored)
    if (loading || properties.length === 0) return;

    // Step 3 — read intent from router state, then sessionStorage fallback
    let shouldRestore = location.state?.restoreContext === true;
    let clickedId     = location.state?.clickedPropertyId;
    let isCategory    = location.state?.isCategory === true;
    const scrollTo    = location.state?.scrollTo;

    if (!shouldRestore) {
      try {
        const raw = sessionStorage.getItem('navigationContext');
        if (raw) {
          const ctx = JSON.parse(raw);
          if (Date.now() - ctx.timestamp < 15_000) {
            shouldRestore = ctx.restoreContext;
            clickedId     = ctx.clickedPropertyId;
            isCategory    = ctx.isCategory === true;
          }
          sessionStorage.removeItem('navigationContext');
        }
      } catch (_) {}
    }

    // Step 4a — named section
    if (shouldRestore && scrollTo) {
      hasRestoredRef.current = true;
      rafRef.current = requestAnimationFrame(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }

    // Step 4b — category tile
    if (shouldRestore && isCategory && clickedId) {
      hasRestoredRef.current = true;
      scrollToRef(categoryRefs.current[clickedId], false);
      return;
    }

    // Step 4c — property card (Featured or Highlights)
    if (shouldRestore && clickedId) {
      hasRestoredRef.current = true;
      scrollToRef(propertyRefs.current[clickedId], true);
      return;
    }

    // Step 5 — fresh load
    hasRestoredRef.current = true;
    window.scrollTo(0, 0);

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [loading, location.state, properties.length]); // eslint-disable-line react-hooks/exhaustive-deps

  function scrollToRef(ref, highlight = false, attempts = 0) {
    if (attempts > 30) return;
    if (ref?.current) {
      // 80 ms lets the mobile browser finish its layout pass before scrolling
      setTimeout(() => {
        rafRef.current = requestAnimationFrame(() => {
          if (!ref.current) return;
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (highlight) {
            ref.current.classList.add('card-highlight');
            setTimeout(() => ref.current?.classList.remove('card-highlight'), 2000);
          }
        });
      }, 80);
    } else {
      setTimeout(() => scrollToRef(ref, highlight, attempts + 1), 50);
    }
  }

  // ── filtered list ────────────────────────────────────────────────────────────
  const filteredProperties = properties
    .filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.propertyCode && p.propertyCode.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .slice(0, 8);

  // ── skeleton — only on very first load, never on back-nav ───────────────────
  if (loading) return (
    <div>
      <div className="pt-16 min-h-[500px] bg-gray-200 animate-pulse" />
      <section className="py-6 md:py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 bg-gray-200 rounded w-64 mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
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

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <div>
      <AnnouncementMarquee />
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Featured Properties */}
      <section
        id="properties"
        data-animate
        className={`py-6 md:py-8 bg-background transition-all duration-700
          ${visibleSections.properties ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Featured Properties</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {filteredProperties.map(property => (
              <div
                key={property._id}
                ref={getPropertyRef(property._id)}
                className="flex-shrink-0 w-[calc(50%-8px)] snap-start md:w-auto"
              >
                <PropertyCard property={property} section="properties" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories — uses its own separate ref map, NOT propertyRefs */}
      <PropertyCategories getCategoryRef={getCategoryRef} />

      <TanaviHighlights getPropertyRef={getPropertyRef} />
      <ChoiceProperties />

      {/* Banner */}
      <section
        id="banner"
        data-animate
        className={`py-6 md:py-8 bg-background transition-all duration-700
          ${visibleSections.banner ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200"
              alt="Tanavi Properties Banner"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Building Your Dreams</h2>
                <p className="text-lg md:text-xl">Experience luxury living with Tanavi Properties</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChoose />

      {/* Agri Banner */}
      <section
        id="agri-banner"
        data-animate
        className={`py-6 md:py-8 bg-background transition-all duration-700
          ${visibleSections['agri-banner'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200"
              alt="Agriculture Land"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-700/90 flex items-center justify-center">
              <div className="text-center text-white px-4 md:px-8">
                <h2 className="text-2xl md:text-4xl font-bold italic">
                  "Agriculture land sustains life — it feeds the world, nurtures generations, and grows in value forever."
                </h2>
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
