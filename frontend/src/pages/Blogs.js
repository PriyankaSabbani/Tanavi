import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../utils/api';

const Blogs = () => {
  const navigate = useNavigate();
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/gallery`)
      .then(res => res.json())
      .then(data => setGalleryImages(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">Property Gallery</h1>
        <p className="text-center text-gray-600 mb-12">Explore our diverse range of properties</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((item) => (
            <div 
              key={item._id}
              onClick={() => navigate(`/gallery/${item._id}`)}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <span className="text-sm text-primary font-semibold">{item.category}</span>
                <h3 className="text-xl font-bold mt-2">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
