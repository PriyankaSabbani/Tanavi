import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id));
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!project) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % project.gallery.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [project]);

  if (!project) {
    return <div className="pt-20 text-center">Project not found</div>;
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Ongoing': return 'bg-blue-100 text-blue-800';
      case 'Upcoming': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 text-primary hover:underline flex items-center gap-2"
        >
          ← Back to Projects
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96 overflow-hidden">
            {project.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${project.name} ${index + 1}`}
                className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {project.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImage ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl font-bold">{project.name}</h1>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-gray-600 mb-2 flex items-center gap-2 text-lg">
              <span>📍</span> {project.location}
            </p>
            <p className="text-2xl text-primary font-bold mb-6">{project.priceRange}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">{project.units}</p>
                <p className="text-gray-600">Total Units</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">{project.type}</p>
                <p className="text-gray-600">Property Type</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">{project.area}</p>
                <p className="text-gray-600">Total Area</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">{project.completionYear}</p>
                <p className="text-gray-600">Completion</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <p className="text-gray-700 leading-relaxed">{project.overview}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Key Highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <span className="text-primary">•</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between border-b pb-2">
                      <span className="font-semibold">{spec.label}:</span>
                      <span className="text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
              Schedule a Site Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
