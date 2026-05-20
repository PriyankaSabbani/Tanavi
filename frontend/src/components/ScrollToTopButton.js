import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrolled / windowHeight) * 100;
      setIsVisible(scrollPercentage > 10);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      setIsAtBottom(scrollHeight - scrollTop - clientHeight < 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className={`fixed right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-110 z-50 ${isAtBottom ? 'bottom-[280px]' : 'bottom-[200px]'}`}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="w-6 h-6" />
    </button>
  ) : null;
};

export default ScrollToTopButton;
