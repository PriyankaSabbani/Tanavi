import React from 'react';
import { leadership } from '../data/leadership';

const Leadership = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">Our Leadership</h1>
        <p className="text-center text-gray-600 mb-12">Meet the visionaries behind Tanavi Properties</p>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Directors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.directors.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <img src={member.image} alt={member.name} className="w-full h-80 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="text-sm text-gray-500">
                    <p className="font-semibold">Experience: {member.experience}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Board Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.boardMembers.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-semibold mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leadership;
