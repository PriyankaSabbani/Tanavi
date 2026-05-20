import React, { useEffect, useState } from 'react';
import API_URL from '../utils/api';

const AnnouncementMarquee = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch(`${API_URL}/api/posters/active`);
        const data = await res.json();
        const activeItem = Array.isArray(data) && data.length > 0 ? data[0] : null;

        if (!activeItem) {
          setMessage('');
          return;
        }

        // Safety check in client as well: hide if closing date has passed.
        if (activeItem.endDate && new Date(activeItem.endDate) < new Date()) {
          setMessage('');
          return;
        }

        const text = typeof activeItem.title === 'string' ? activeItem.title.trim() : '';
        setMessage(text);
      } catch (error) {
        console.error('Error fetching announcement:', error);
        setMessage('');
      }
    };

    fetchAnnouncement();
    const interval = setInterval(fetchAnnouncement, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!message) return null;

  return (
    <div className="announcement-marquee-wrap text-white border-t border-white/20">
      <div className="announcement-marquee-track">
        <span className="announcement-message">{message}</span>
        <span className="announcement-message">{message}</span>
        <span className="announcement-message">{message}</span>
      </div>
    </div>
  );
};

export default AnnouncementMarquee;
