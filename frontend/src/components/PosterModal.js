import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import API_URL, { getImageUrl } from '../utils/api';

const PosterModal = () => {
  const [poster, setPoster] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch active poster
    const fetchPoster = async () => {
      try {
        const res = await fetch(`${API_URL}/api/posters/active`);
        const data = await res.json();
        if (data && data.length > 0) {
          setPoster(data[0]);
          
          // Show modal after 5 seconds
          setTimeout(() => {
            setShowModal(true);
          }, 5000);
        }
      } catch (error) {
        console.error('Error fetching poster:', error);
      }
    };

    fetchPoster();
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  if (!poster || !showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[9999] flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-transparent max-w-4xl w-full max-h-[90vh] animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Close poster"
        >
          <FaTimes size={24} />
        </button>

        {/* Poster Content */}
        <div className="relative w-full h-full">
          <img
            src={getImageUrl(poster.image)}
            alt={poster.title}
            className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PosterModal;
