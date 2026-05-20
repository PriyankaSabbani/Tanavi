import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

const Projects = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.status === filter);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">Our Projects</h1>
        <p className="text-center text-gray-600 mb-8">Building dreams across Hyderabad</p>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['All', 'Completed', 'Ongoing', 'Upcoming'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                filter === status
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => navigate(`/project/${project.id}`)}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative">
                <img src={project.image} alt={project.name} className="w-full h-56 object-cover" />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-2 flex items-center gap-2">
                  <span>📍</span> {project.location}
                </p>
                <p className="text-gray-700 mb-3">{project.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold">{project.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Units:</span>
                    <span className="font-semibold">{project.units}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completion:</span>
                    <span className="font-semibold">{project.completionYear}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No projects found for this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
