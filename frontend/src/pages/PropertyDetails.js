import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  FaArrowLeft, FaShareAlt, FaBed, FaBath, FaRulerCombined, FaCar,
  FaBuilding, FaCheckCircle, FaChevronLeft, FaChevronRight,
  FaMapMarkerAlt, FaTag, FaCalendarAlt, FaExpand, FaPlay
} from 'react-icons/fa';
import ScheduleVisitModal from '../components/ScheduleVisitModal';
import LoadingSpinner from '../components/LoadingSpinner';
import API_URL, { getImageUrl } from '../utils/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const fromRoute = location.state?.fromRoute;
    const clickedPropertyId = location.state?.clickedPropertyId;
    if (fromRoute && clickedPropertyId) {
      sessionStorage.setItem('propertyDetailsContext', JSON.stringify({ fromRoute, clickedPropertyId, timestamp: Date.now() }));
    } else {
      const lastClicked = sessionStorage.getItem('lastClickedProperty');
      if (lastClicked) {
        try {
          const context = JSON.parse(lastClicked);
          if (Date.now() - context.timestamp < 30000) {
            sessionStorage.setItem('propertyDetailsContext', JSON.stringify({ fromRoute: context.fromRoute, clickedPropertyId: context.propertyId, timestamp: Date.now() }));
          }
        } catch (e) { console.error('Error parsing last clicked property:', e); }
      }
    }
    return () => {
      const storedContext = sessionStorage.getItem('propertyDetailsContext');
      if (storedContext) {
        try {
          const context = JSON.parse(storedContext);
          sessionStorage.setItem('navigationContext', JSON.stringify({ restoreContext: true, clickedPropertyId: context.clickedPropertyId, timestamp: Date.now() }));
        } catch (e) { console.error('Error preparing navigation context:', e); }
      }
    };
  }, [location.state]);

  const getAreaUnit = (type) => {
    if (type === 'Agricultural Land' || type === 'Farmhouse') return 'Acres/Guntas';
    if (type === 'Open Plot') return 'Sq Yards';
    if (type === 'Independent House' || type === 'Apartment' || type === 'Office / Commercial Space') return 'SFT';
    return '';
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/properties/${id}`)
      .then(res => res.json())
      .then(data => {
        setProperty(data);
        setLoading(false);
        if (data) {
          const imageUrl = data.images?.[0] ? getImageUrl(data.images[0]) : '';
          const propertyId = data.propertyCode ? `[${data.propertyCode}]` : '';
          document.title = `${propertyId} ${data.title} - Tanavi Properties`;
          updateMetaTag('og:title', `${propertyId} ${data.title}`);
          updateMetaTag('og:description', `${data.title} - ₹${data.price} at ${data.location}`);
          updateMetaTag('og:image', imageUrl);
          updateMetaTag('og:url', window.location.href);
          updateMetaTag('twitter:card', 'summary_large_image');
          updateMetaTag('twitter:image', imageUrl);
        }
      })
      .catch(err => { console.error('Error fetching property:', err); setLoading(false); });
  }, [id]);

  const updateMetaTag = (property, content) => {
    let element = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
    if (!element) {
      element = document.createElement('meta');
      if (property.startsWith('og:') || property.startsWith('twitter:')) { element.setAttribute('property', property); }
      else { element.setAttribute('name', property); }
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  const handleShare = async () => {
    const shareUrl = `${API_URL}/api/share/${property._id}`;
    const propertyId = property.propertyCode ? `[${property.propertyCode}]` : '';
    const text = `${propertyId} ${property.title} - ₹${property.price} at ${property.location}. Your trusted partner in finding the perfect property!`;
    if (navigator.share) {
      try { await navigator.share({ title: `${propertyId} ${property.title}`, text, url: shareUrl }); }
      catch (err) { if (err.name !== 'AbortError') { navigator.clipboard.writeText(shareUrl); alert('Link copied to clipboard!'); } }
    } else { navigator.clipboard.writeText(shareUrl); alert('Link copied to clipboard!'); }
  };

  useEffect(() => {
    if (!property || !property.images || property.images.length === 0 || !autoPlay || lightboxOpen) return;
    const interval = setInterval(() => { setCurrentImage(prev => (prev + 1) % property.images.length); }, 4000);
    return () => clearInterval(interval);
  }, [property, autoPlay, lightboxOpen]);

  const handleBackClick = () => {
    let fromRoute = location.state?.fromRoute;
    let clickedPropertyId = location.state?.clickedPropertyId;
    if (!fromRoute || !clickedPropertyId) {
      const storedContext = sessionStorage.getItem('propertyDetailsContext');
      if (storedContext) {
        try {
          const context = JSON.parse(storedContext);
          if (Date.now() - context.timestamp < 30000) { fromRoute = context.fromRoute; clickedPropertyId = context.clickedPropertyId; }
        } catch (e) { console.error('Error parsing property details context:', e); }
      }
    }
    if (fromRoute && clickedPropertyId) {
      sessionStorage.setItem('navigationContext', JSON.stringify({ restoreContext: true, clickedPropertyId, timestamp: Date.now() }));
      sessionStorage.removeItem('propertyDetailsContext');
      sessionStorage.removeItem('lastClickedProperty');
      navigate(fromRoute, { state: { restoreContext: true, clickedPropertyId }, replace: false });
    } else { navigate(-1); }
  };

  const prevImage = () => { setAutoPlay(false); setCurrentImage(prev => (prev - 1 + property.images.length) % property.images.length); };
  const nextImage = () => { setAutoPlay(false); setCurrentImage(prev => (prev + 1) % property.images.length); };

  if (loading) return <LoadingSpinner />;
  if (!property) return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">🏠</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Property Not Found</h2>
        <p className="text-gray-500 mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate(-1)} className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition">Go Back</button>
      </div>
    </div>
  );

  const images = property.images || [];
  const propertyType = property.category || property.type;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">

      {/* Lightbox */}
      {lightboxOpen && images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
          <button onClick={e => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition z-10">
            <FaChevronLeft size={20} />
          </button>
          <img src={getImageUrl(images[currentImage], property.propertyCode)} alt={property.title} className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
          <button onClick={e => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition z-10">
            <FaChevronRight size={20} />
          </button>
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 text-white bg-white bg-opacity-20 hover:bg-opacity-40 p-2 rounded-full transition text-xl font-bold w-10 h-10 flex items-center justify-center">✕</button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-1 rounded-full">{currentImage + 1} / {images.length}</div>
        </div>
      )}

      {/* Top Nav Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <button onClick={handleBackClick} className="flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition-colors group">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-3">
            {property.propertyCode && (
              <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-sm font-semibold">
                ID: {property.propertyCode}
              </span>
            )}
            <button onClick={handleShare} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition font-medium text-sm shadow-sm">
              <FaShareAlt size={14} />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Full-Width Image Gallery */}
{/* Updated Property Image Gallery */}
<div className="w-full py-6 bg-gray-50">
  <div className="w-[95%] mx-auto">

    {images.length > 0 ? (
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200">

        {/* Main Image */}
        <div className="relative w-full h-[260px] sm:h-[400px] lg:h-[550px] overflow-hidden">

          {images.map((img, index) => (
            <img
              key={index}
              src={getImageUrl(img, property.propertyCode)}
              alt={`${property.title} ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              onClick={() => setLightboxOpen(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 cursor-pointer
              ${index === currentImage ? "opacity-100" : "opacity-0"}`}
            />
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

          {/* Expand Button */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition"
          >
            <FaExpand size={15} />
          </button>

          {/* Left Arrow */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition"
            >
              <FaChevronLeft size={20} />
            </button>
          )}

          {/* Right Arrow */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition"
            >
              <FaChevronRight size={20} />
            </button>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-4 py-1 rounded-full">
            {currentImage + 1} / {images.length}
          </div>

          {/* Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoPlay(false);
                    setCurrentImage(index);
                  }}
                  className={`rounded-full transition-all duration-300
                  ${
                    index === currentImage
                      ? "bg-white w-8 h-2"
                      : "bg-white/60 w-2 h-2"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Images */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto px-4 py-4 bg-white scrollbar-hide">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrentImage(index);
                }}
                className={`flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300
                ${
                  index === currentImage
                    ? "border-primary scale-105 shadow-md"
                    : "border-gray-200 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={getImageUrl(img, property.propertyCode)}
                  alt={`thumb ${index + 1}`}
                  className="w-24 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    ) : (
      <div className="h-[400px] bg-white rounded-3xl shadow-lg border border-gray-200 flex items-center justify-center">
        <div className="text-center">
          <FaBuilding size={55} className="mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500 text-lg">
            No Property Images Available
          </p>
        </div>
      </div>
    )}
  </div>
</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">

          {/* LEFT / MAIN COLUMN */}
          <div className="lg:col-span-2 space-y-6">

            {/* Title & Price Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight flex-1">{property.title}</h1>
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-sm font-semibold px-3 py-1.5 rounded-full border border-primary/20 whitespace-nowrap">
                  <FaBuilding size={12} />{propertyType}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <p className="text-3xl font-extrabold text-primary">₹{property.price}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FaMapMarkerAlt className="text-primary flex-shrink-0" size={14} />
                <span className="text-sm">{property.location}</span>
              </div>
            </div>

            {/* Stats Grid */}
            {(property.bedrooms > 0 || property.area || property.bathrooms > 0 || property.builtUpArea || property.parkingType || property.parkingCount > 0) && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full inline-block"></span>
                  Property Overview
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaBed className="text-primary" size={18} />
                      </div>
                      <div><p className="text-xl font-bold text-gray-900">{property.bedrooms}</p><p className="text-xs text-gray-500 font-medium">Bedrooms</p></div>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaBath className="text-primary" size={18} />
                      </div>
                      <div><p className="text-xl font-bold text-gray-900">{property.bathrooms}</p><p className="text-xs text-gray-500 font-medium">Bathrooms</p></div>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center gap-3 bg-orange-50 rounded-xl p-4 border border-orange-100">
                      <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaRulerCombined className="text-orange-500" size={18} />
                      </div>
                      <div><p className="text-xl font-bold text-gray-900">{property.area}</p><p className="text-xs text-gray-500 font-medium">{getAreaUnit(propertyType)}</p></div>
                    </div>
                  )}
                  {property.builtUpArea && (
                    <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaExpand className="text-primary" size={18} />
                      </div>
                      <div><p className="text-xl font-bold text-gray-900">{property.builtUpArea}</p><p className="text-xs text-gray-500 font-medium">Built-up (Sq.Ft)</p></div>
                    </div>
                  )}
                  {property.parkingType && (
                    <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaCar className="text-primary" size={18} />
                      </div>
                      <div><p className="text-base font-bold text-gray-900 leading-tight">{property.parkingType}</p><p className="text-xs text-gray-500 font-medium">Parking</p></div>
                    </div>
                  )}
                  {property.parkingCount > 0 && (
                    <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaCar className="text-primary" size={18} />
                      </div>
                      <div><p className="text-xl font-bold text-gray-900">{property.parkingCount}</p><p className="text-xs text-gray-500 font-medium">Car Parking{property.parkingCount > 1 ? 's' : ''}</p></div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Office Space Specific Details */}
            {property.category === 'Office Space' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span>
                  Office Space Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { key: 'pricePerSqFt', label: 'Price Per Sq.Ft', prefix: '₹' },
                    { key: 'expectedRent', label: 'Expected Rent', prefix: '₹' },
                    { key: 'depositAmount', label: 'Deposit Amount', prefix: '₹' },
                    { key: 'floor', label: 'Floor' },
                    { key: 'plugAndPlay', label: 'Plug & Play' },
                    { key: 'workStations', label: 'Work Stations' },
                    { key: 'cabins', label: 'Cabins' },
                    { key: 'conferenceHall', label: 'Conference Hall' },
                    { key: 'pantry', label: 'Pantry' },
                  ].filter(item => property[item.key]).map(item => (
                    <div key={item.key} className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                      <p className="text-xs font-semibold text-purple-500 uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="text-gray-900 font-bold text-lg">{item.prefix || ''}{property[item.key]}</p>
                    </div>
                  ))}
                  {property.washroomDetails && (
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 sm:col-span-2 md:col-span-3">
                      <p className="text-xs font-semibold text-purple-500 uppercase tracking-wide mb-1">Washroom Details</p>
                      <p className="text-gray-900 font-medium">{property.washroomDetails}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Property Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full inline-block"></span>
                Property Description
              </h2>
              {(() => {
                try {
                  if (property.description && property.description.trim().startsWith('{')) {
                    const data = JSON.parse(property.description);
                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(data).map(([key, value], idx) => {
                          if (!value || value === '' || value === '0') return null;
                          const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
                          let formattedValue = value;
                          if (key === 'road' && !String(value).includes('Feet')) formattedValue = `${value} Feet Road`;
                          return (
                            <div key={idx} className="flex flex-col bg-gray-50 rounded-xl p-4 border border-gray-100">
                              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{formattedKey}</span>
                              <span className="text-gray-800 font-semibold">{formattedValue}</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  } else {
                    return <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm">{property.description}</p>;
                  }
                } catch (e) {
                  return <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm">{property.description}</p>;
                }
              })()}
            </div>

            {/* Key Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-green-500 rounded-full inline-block"></span>
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 bg-green-50 rounded-xl p-3 border border-green-100">
                      <FaCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-gray-700 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dimensions */}
            {property.dimensions && property.dimensions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span>
                  Room Dimensions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.dimensions.map((dim, index) => (
                    <div key={index} className="flex items-center justify-between bg-orange-50 rounded-xl px-4 py-3 border border-orange-100">
                      <span className="font-semibold text-gray-700 text-sm">{dim.room}</span>
                      <span className="text-primary font-bold text-sm bg-white px-3 py-1 rounded-lg border border-orange-200">{dim.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property Video */}
            {property.video && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-red-500 rounded-full inline-block"></span>
                  <FaPlay className="text-red-500" size={14} />
                  Property Video
                </h2>
                <video src={getImageUrl(property.video)} controls className="w-full rounded-xl border border-gray-200 shadow-sm" />
              </div>
            )}

            {/* Mobile CTA */}
            <div className="lg:hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <button onClick={() => setIsModalOpen(true)}
                className="w-full bg-primary text-white py-4 rounded-xl text-base font-bold hover:bg-primary/90 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2">
                <FaCalendarAlt size={16} />
                Schedule a Visit
              </button>
              <button onClick={handleShare}
                className="w-full mt-3 border-2 border-primary text-primary py-3 rounded-xl text-base font-semibold hover:bg-primary/5 transition flex items-center justify-center gap-2">
                <FaShareAlt size={14} />
                Share Property
              </button>
            </div>

          </div>{/* end left column */}

          {/* RIGHT SIDEBAR */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32 space-y-4">

              {/* Price Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-br from-primary to-secondary p-5 text-white">
                  <p className="text-sm font-medium opacity-80 mb-1">Listed Price</p>
                  <p className="text-3xl font-extrabold">₹{property.price}</p>
                  {property.propertyCode && (
                    <div className="mt-3 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                      <FaTag size={10} />
                      ID: {property.propertyCode}
                    </div>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <FaMapMarkerAlt className="text-primary flex-shrink-0" size={13} />
                    <span className="leading-snug">{property.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <FaBuilding className="text-primary flex-shrink-0" size={13} />
                    <span>{propertyType}</span>
                  </div>
                </div>
                <div className="px-5 pb-5 space-y-3">
                  <button onClick={() => setIsModalOpen(true)}
                    className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2">
                    <FaCalendarAlt size={15} />
                    Schedule a Visit
                  </button>
                  <button onClick={handleShare}
                    className="w-full border-2 border-primary text-primary py-3 rounded-xl font-semibold hover:bg-primary/5 transition flex items-center justify-center gap-2 text-sm">
                    <FaShareAlt size={13} />
                    Share Property
                  </button>
                </div>
              </div>


            </div>
          </div>{/* end sidebar */}

        </div>{/* end grid */}
      </div>{/* end container */}

      <ScheduleVisitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyTitle={property?.title}
        propertyId={property?._id}
        propertyCode={property?.propertyCode}
      />
    </div>
  );
};

export default PropertyDetails;