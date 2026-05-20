import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaLeaf, FaHome, FaMapMarkedAlt, FaBuilding, FaWarehouse, FaStore } from 'react-icons/fa';

const CHOICE_ITEMS = [
  { icon: FaLeaf,         title: 'Agricultural Land',        slug: 'agricultural-land',      description: 'Fertile lands for farming and cultivation',  color: 'from-green-500 to-green-600'  },
  { icon: FaHome,         title: 'Independent House',         slug: 'independent-house',       description: 'Spacious homes with privacy and comfort',    color: 'from-blue-500 to-blue-600'    },
  { icon: FaMapMarkedAlt, title: 'Open Plot',                 slug: 'open-plot',               description: 'Ready-to-build plots in prime locations',    color: 'from-orange-500 to-orange-600'},
  { icon: FaBuilding,     title: 'Apartment',                 slug: 'apartment',               description: 'Modern flats with world-class amenities',    color: 'from-purple-500 to-purple-600'},
  { icon: FaWarehouse,    title: 'Farmhouse',                 slug: 'farmhouse',               description: 'Luxury farmhouses for weekend getaways',     color: 'from-teal-500 to-teal-600'   },
  { icon: FaStore,        title: 'Office / Commercial Space', slug: 'office-commercial-space', description: 'Prime locations for your business',          color: 'from-red-500 to-red-600'     },
];

/**
 * ChoiceProperties
 *
 * Props:
 *   getChoiceRef(slug) — ref factory from Home's choiceRefs map.
 *                        Lets Home scroll back to the exact tile on back-nav.
 */
const ChoiceProperties = ({ getChoiceRef }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTileClick = (slug) => {
    // Write to sessionStorage BEFORE navigating — fallback for browser/device
    // back button which discards location.state on navigation.
    try {
      sessionStorage.setItem('navigationContext', JSON.stringify({
        restoreContext:    true,
        clickedPropertyId: slug,
        fromRoute:         location.pathname,
        isCategory:        false,
        isChoice:          true,
        timestamp:         Date.now(),
      }));
    } catch (_) {}

    navigate(`/choice-category/${slug}`, {
      state: {
        fromRoute:    location.pathname,
        categorySlug: slug,
        isChoice:     true,   // tells Home to look in choiceRefs
        section:      'choice-properties',
        restoreContext: true,
      },
    });
  };

  return (
    <section id="choice-properties" className="py-12 md:py-16 bg-gradient-to-b from-background to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choice Properties</h2>
          <p className="text-gray-600 text-lg">Explore our diverse range of premium properties</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHOICE_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.slug}
                ref={getChoiceRef ? getChoiceRef(item.slug) : null}
                onClick={() => handleTileClick(item.slug)}
                className="group relative bg-secondary/10 border-2 border-secondary rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#EF8E0D'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#76C2BE'}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="p-8 relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <IconComponent className="text-3xl text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-textDark group-hover:text-primary transition-all duration-300">
                    {item.title}
                  </h3>

                  <p className="text-textGray leading-relaxed">{item.description}</p>

                  <div className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${item.color} transition-all duration-500 rounded-full`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChoiceProperties;
