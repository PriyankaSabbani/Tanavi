import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaCalendar, FaClock, FaUser } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import API_URL from '../utils/api';

const CallLog = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await fetch(`${API_URL}/api/schedules`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setSchedules(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Call Log</h1>
        
        {schedules.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No call logs available</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {schedules.map((schedule) => (
              <div key={schedule._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FaUser className="text-primary" />
                      <h3 className="text-xl font-semibold text-gray-800">{schedule.name}</h3>
                    </div>
                    
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-green-600" />
                        <span className="font-medium">{schedule.phone}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-blue-600" />
                        <span>{schedule.email}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FaCalendar className="text-purple-600" />
                        <span>{schedule.date}</span>
                        <FaClock className="text-orange-600 ml-2" />
                        <span>{schedule.time}</span>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Property: {schedule.propertyTitle}</p>
                        {schedule.message && (
                          <p className="text-sm text-gray-600 mt-1">Message: {schedule.message}</p>
                        )}
                      </div>
                      
                      <div className="mt-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          schedule.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          schedule.status === 'approved' ? 'bg-green-100 text-green-800' :
                          schedule.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {schedule.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      onClick={() => handleCall(schedule.phone)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors shadow-lg hover:shadow-xl"
                    >
                      <FaPhone className="animate-pulse" />
                      <span className="font-semibold">Call Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CallLog;
