import React, { useEffect, useRef, useState } from 'react';
import API_URL, { getImageUrl } from '../utils/api';

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_URL}/api/testimonials`);
        const data = await res.json();
        setTestimonials(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || testimonials.length === 0) return;

    const cardWidth = 344;

    const autoScroll = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % testimonials.length;
        scrollContainer.scrollTo({
          left: next * cardWidth,
          behavior: 'smooth'
        });
        return next;
      });
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [testimonials.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    scrollRef.current?.scrollTo({
      left: index * 344,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-6 md:py-12 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">What Our Customers Say</h2>
        <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none md:hidden"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none md:hidden"></div>
        <div ref={scrollRef} className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide px-4 md:px-0">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial._id || index} 
              className="bg-secondary/20 border-2 border-secondary p-8 rounded-lg shadow-lg hover:shadow-2xl flex-shrink-0 w-80 snap-center flex flex-col items-center text-center transition-all duration-500 hover:scale-105"
            >
              <img src={getImageUrl(testimonial.image)} alt={testimonial.name} className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-primary" onError={(e) => e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'} />
              <p className="font-bold text-lg mb-2 text-textDark">{testimonial.name}</p>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-textGray italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition ${
                currentIndex === index ? 'bg-primary w-6' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
