import React, { useState, useEffect, useRef } from 'react';

const Stats = () => {
  const [counts, setCounts] = useState({ years: 0, delivered: 0, construction: 0, clients: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  const stats = [
    { label: 'Years of Experience', value: 15, key: 'years', suffix: '+' },
    { label: 'Projects Delivered', value: 50, key: 'delivered', suffix: '+' },
    { label: 'Under Construction', value: 12, key: 'construction', suffix: '' },
    { label: 'Happy Clients', value: 500, key: 'clients', suffix: '+' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          stats.forEach((stat) => {
            let start = 0;
            const end = stat.value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCounts(prev => ({ ...prev, [stat.key]: end }));
                clearInterval(timer);
              } else {
                setCounts(prev => ({ ...prev, [stat.key]: Math.floor(start) }));
              }
            }, 16);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={statsRef} className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.key} className="text-center">
              <div className="text-5xl font-bold mb-2">
                {counts[stat.key]}{stat.suffix}
              </div>
              <div className="text-lg text-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
