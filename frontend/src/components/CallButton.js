import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

const CallButton = () => {
  const [isAtBottom, setIsAtBottom] = React.useState(false);

  React.useEffect(() => {
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

  return (
    <a
      href="tel:+919063907346"
      className={`fixed right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${isAtBottom ? 'bottom-[160px]' : 'bottom-[80px]'}`}
      aria-label="Call Owner"
    >
      <FaPhoneAlt className="w-6 h-6" />
    </a>
  );
};

export default CallButton;
