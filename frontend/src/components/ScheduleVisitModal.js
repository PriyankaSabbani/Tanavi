import React, { useState } from 'react';
import { FaTimes, FaCheckCircle, FaLock } from 'react-icons/fa';
import Modal from './Modal';
import API_URL from '../utils/api';

const ScheduleVisitModal = ({ isOpen, onClose, propertyTitle, propertyId, propertyCode }) => {
  const timeOptions = Array.from({ length: 24 * 2 }, (_, index) => {
    const totalMinutes = index * 30;
    const hours24 = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    return `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  const handleSendOtp = async () => {
    if (!formData.email) {
      setModal({
        isOpen: true,
        type: 'warning',
        title: 'Email Required',
        message: 'Please enter your email address first.'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Invalid Email',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setSendingOtp(true);
    try {
      const res = await fetch(`${API_URL}/api/otp/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setModal({
          isOpen: true,
          type: 'success',
          title: 'OTP Sent!',
          message: `A 6-digit OTP has been sent to ${formData.email}. Please check your inbox.`
        });
      } else {
        setModal({
          isOpen: true,
          type: 'error',
          title: 'Failed to Send OTP',
          message: data.message || 'Could not send OTP. Please try again.'
        });
      }
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to send OTP. Please check your connection and try again.'
      });
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setModal({
        isOpen: true,
        type: 'warning',
        title: 'Invalid OTP',
        message: 'Please enter the 6-digit OTP sent to your email.'
      });
      return;
    }

    setVerifyingOtp(true);
    try {
      const res = await fetch(`${API_URL}/api/otp/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp })
      });

      const data = await res.json();
      if (res.ok) {
        setIsVerified(true);
        setModal({
          isOpen: true,
          type: 'success',
          title: 'Verified!',
          message: 'Your email has been verified successfully. You can now schedule your visit.'
        });
      } else {
        setModal({
          isOpen: true,
          type: 'error',
          title: 'Verification Failed',
          message: data.message || 'Invalid OTP. Please try again.'
        });
      }
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to verify OTP. Please try again.'
      });
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVerified) {
      setModal({
        isOpen: true,
        type: 'warning',
        title: 'Verification Required',
        message: 'Please verify your email with OTP before scheduling a visit.'
      });
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/schedules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, propertyId, propertyTitle, propertyCode })
      });
      if (res.ok) {
        setModal({
          isOpen: true,
          type: 'success',
          title: 'Visit Scheduled!',
          message: 'Your visit has been scheduled successfully! We will contact you soon.'
        });
        setTimeout(() => {
          onClose();
          setFormData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
          setOtpSent(false);
          setOtp('');
          setIsVerified(false);
        }, 2000);
      } else {
        setModal({
          isOpen: true,
          type: 'error',
          title: 'Scheduling Failed',
          message: 'Could not schedule visit. Please try again.'
        });
      }
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Error scheduling visit. Please try again.'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Schedule a Visit</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>
          <div className="mb-6">
            <p className="text-gray-600 capitalize font-medium">{propertyTitle}</p>
            {propertyCode && (
              <div className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                Property ID: {propertyCode}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-2">Reference this Property ID when contacting us</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={isVerified}
                  className={`flex-1 px-4 py-2 border rounded focus:outline-none focus:border-primary ${
                    isVerified ? 'bg-green-50 border-green-500' : ''
                  }`}
                />
                {isVerified && (
                  <div className="flex items-center justify-center w-12 bg-green-500 rounded">
                    <FaCheckCircle className="text-white" size={20} />
                  </div>
                )}
              </div>
              {!isVerified && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={sendingOtp || !formData.email}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-semibold disabled:text-gray-400"
                >
                  {sendingOtp ? 'Sending OTP...' : otpSent ? 'Resend OTP' : 'Send OTP'}
                </button>
              )}
            </div>

            {otpSent && !isVerified && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center gap-2 mb-3">
                  <FaLock className="text-blue-600" />
                  <label className="block text-gray-700 font-semibold">Enter OTP <span className="text-red-500">*</span></label>
                </div>
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 text-center text-2xl tracking-widest font-bold"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp || otp.length !== 6}
                  className="w-full mt-3 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Preferred Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Preferred Time <span className="text-red-500">*</span></label>
              <select
                required
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              >
                <option value="">Select Time</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="3"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
            </div>
            
            <button
              type="submit"
              disabled={!isVerified}
              className="w-full bg-primary text-white py-3 rounded font-semibold hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isVerified ? 'Schedule Visit' : 'Verify Email to Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleVisitModal;
