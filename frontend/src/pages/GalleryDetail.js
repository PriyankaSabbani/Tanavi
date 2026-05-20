import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../utils/api';

const GalleryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/gallery/${id}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!item) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [item]);

  if (loading) {
    return <div className="pt-20 text-center">Loading...</div>;
  }

  if (!item) {
    return <div className="pt-20 text-center">Gallery item not found</div>;
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 text-primary hover:underline flex items-center gap-2"
        >
          ← Back to Gallery
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <span className="text-sm text-primary font-semibold">{item.category}</span>
            <h1 className="text-4xl font-bold mt-2 mb-6">{item.title}</h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{item.description}</p>



            <button 
              onClick={() => navigate('/category/all')}
              className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition"
            >
              View Available Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryDetail;
