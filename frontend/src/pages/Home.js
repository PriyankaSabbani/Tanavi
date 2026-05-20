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
        const fresh = Date.now() - ctx.timestamp < 15_000;
        const intendedForHome = !ctx.fromRoute || ctx.fromRoute === '/';
        if (fresh && intendedForHome && ctx.restoreContext === true) return true;
        // Stale entry — remove it so it doesn't pollute future mounts
        if (!fresh) sessionStorage.removeItem('navigationContext');
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
      ? { properties: true, 'tanavi-highlights': true, banner: true, 'agri-banner': true, 'choice-properties': true }
      : {}
  );

  // Separate ref maps — property cards and category tiles must NOT share keys.
  // Featured and Highlights cards use SECTION-PREFIXED keys ("featured-<id>" /
  // "tanavi-<id>") so a property that appears in both sections never collides.
  const propertyRefs   = useRef({});   // keyed as "featured-<id>" or "tanavi-<id>"
  const categoryRefs   = useRef({});   // keyed as category slug
  const choiceRefs     = useRef({});   // keyed as choice slug
  const hasRestoredRef = useRef(false);
  const rafRef         = useRef(null);

  // ── ref helpers ─────────────────────────────────────────────────────────────
  // section = "featured" | "tanavi"
  const getPropertyRef = useCallback((id, section = 'featured') => {
    const key = `${section}-${id}`;
    if (!propertyRefs.current[key]) propertyRefs.current[key] = React.createRef();
    return propertyRefs.current[key];
  }, []);

  const getCategoryRef = useCallback((slug) => {
    if (!categoryRefs.current[slug]) categoryRefs.current[slug] = React.createRef();
    return categoryRefs.current[slug];
  }, []);

  const getChoiceRef = useCallback((slug) => {
    if (!choiceRefs.current[slug]) choiceRefs.current[slug] = React.createRef();
    return choiceRefs.current[slug];
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
    // Exception: category/choice tiles don't need properties to be loaded —
    // they are static and always rendered. Allow restoration for those immediately.
    const needsProperties = !location.state?.isCategory && !location.state?.isChoice;
    const storageCtx = (() => {
      try {
        const raw = sessionStorage.getItem('navigationContext');
        if (raw) return JSON.parse(raw);
      } catch (_) {}
      return null;
    })();
    const storageIsCategory = storageCtx?.isCategory === true;
    const storageIsChoice   = storageCtx?.isChoice   === true;
    const storageNeedsProps = !storageIsCategory && !storageIsChoice;

    if ((needsProperties && storageNeedsProps) && (loading || properties.length === 0)) return;

    // Step 3 — read intent from router state, then sessionStorage fallback
    let shouldRestore = location.state?.restoreContext === true;
    let clickedId     = location.state?.clickedPropertyId;
    let isCategory    = location.state?.isCategory === true;
    let isChoice      = location.state?.isChoice === true;
    let section       = location.state?.section || 'featured'; // "featured" | "tanavi"
    const scrollTo    = location.state?.scrollTo;

    if (!shouldRestore) {
      try {
        const raw = sessionStorage.getItem('navigationContext');
        if (raw) {
          const ctx = JSON.parse(raw);
          if (Date.now() - ctx.timestamp < 15_000) {
            // Only consume this context if it was written for navigation back to Home.
            const intendedForHome = !ctx.fromRoute || ctx.fromRoute === '/';
            if (intendedForHome) {
              shouldRestore = ctx.restoreContext;
              clickedId     = ctx.clickedPropertyId;
              isCategory    = ctx.isCategory === true;
              isChoice      = ctx.isChoice === true;
              section       = ctx.section || 'featured';
              // Consume it — pageshow handler will re-read if it fires after this
              sessionStorage.removeItem('navigationContext');
            }
          } else {
            sessionStorage.removeItem('navigationContext');
          }
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

    // Step 4b — category tile (Property Categories section)
    if (shouldRestore && isCategory && clickedId) {
      hasRestoredRef.current = true;
      scrollToRef(categoryRefs.current[clickedId], false);
      return;
    }

    // Step 4c — choice tile (Choice Properties section)
    if (shouldRestore && isChoice && clickedId) {
      hasRestoredRef.current = true;
      scrollToRef(choiceRefs.current[clickedId], false);
      return;
    }

    // Step 4d — property card (Featured or Highlights) — needs properties loaded.
    // Key is section-prefixed: "featured-<id>" or "tanavi-<id>"
    if (shouldRestore && clickedId) {
      if (loading || properties.length === 0) return; // wait for data
      hasRestoredRef.current = true;
      const refKey = `${section}-${clickedId}`;
      scrollToRef(propertyRefs.current[refKey], true);
      return;
    }

    // Step 5 — fresh load
    hasRestoredRef.current = true;
    window.scrollTo(0, 0);

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [loading, location.state, properties.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── pageshow — browser back button handler ──────────────────────────────────
  // pageshow fires every time the page becomes visible, including browser back.
  // This is the ONLY reliable way to catch browser/device back button.
  // Note: the scroll restoration useEffect above may have already consumed
  // navigationContext. This handler is the safety net for cases where the
  // useEffect ran before refs were attached (e.g. bfcache restore).
  useEffect(() => {
    const handlePageShow = () => {
      // Small delay to let React Router finish its work first
      setTimeout(() => {
        try {
          const raw = sessionStorage.getItem('navigationContext');
          if (!raw) return;
          const ctx = JSON.parse(raw);
          if (Date.now() - ctx.timestamp >= 15_000) {
            sessionStorage.removeItem('navigationContext');
            return;
          }
          const intendedForHome = !ctx.fromRoute || ctx.fromRoute === '/';
          if (!intendedForHome || !ctx.restoreContext) return;

          const { clickedPropertyId, isCategory, isChoice, section = 'featured' } = ctx;
          if (!clickedPropertyId) return;

          // Consume and scroll
          sessionStorage.removeItem('navigationContext');
          hasRestoredRef.current = true;

          // Reset scroll to top first
          window.scrollTo(0, 0);

          const tryScroll = (ref, highlight, attempts = 0) => {
            if (attempts > 20) return;
            if (ref?.current) {
              setTimeout(() => {
                ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (highlight) {
                  ref.current?.classList.add('card-highlight');
                  setTimeout(() => ref.current?.classList.remove('card-highlight'), 2000);
                }
              }, 80);
            } else {
              setTimeout(() => tryScroll(ref, highlight, attempts + 1), 100);
            }
          };

          if (isCategory) {
            tryScroll(categoryRefs.current[clickedPropertyId], false);
          } else if (isChoice) {
            tryScroll(choiceRefs.current[clickedPropertyId], false);
          } else {
            // Section-prefixed key: "featured-<id>" or "tanavi-<id>"
            const refKey = `${section}-${clickedPropertyId}`;
            tryScroll(propertyRefs.current[refKey], true);
          }
        } catch (_) {}
      }, 50);
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                ref={getPropertyRef(property._id, 'featured')}
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
      <ChoiceProperties getChoiceRef={getChoiceRef} />

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
