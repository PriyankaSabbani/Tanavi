import React, { useState } from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import API_URL from '../utils/api';

const BookInterestModal = ({ isOpen, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    buyerType: 'Buyer',
    propertyType: '',
    lookingLocation: '',
    budget: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/book-interest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          buyerType: 'Buyer',
          propertyType: '',
          lookingLocation: '',
          budget: '',
          message: ''
        });
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 3000);
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Book Your Interest</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>

        {showSuccess ? (
          <div className="p-8 text-center">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-600">Your interest has been recorded successfully. We'll contact you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                placeholder="Enter 10-digit phone number"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Buyer Type <span className="text-red-500">*</span>
              </label>
              <select
                name="buyerType"
                value={formData.buyerType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
              >
                <option value="Buyer">Buyer - Only for buyers</option>
                <option value="Investor">Investor</option>
                <option value="End User">End User</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Property Type <span className="text-red-500">*</span>
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
              >
                <option value="">Select Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Independent House">Independent House</option>
                <option value="Villa">Villa</option>
                <option value="Open Plot">Open Plot</option>
                <option value="Agricultural Land">Agricultural Land</option>
                <option value="Commercial">Commercial</option>
                <option value="Farmhouse">Farmhouse</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Looking Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lookingLocation"
                value={formData.lookingLocation}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                placeholder="Enter preferred location"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Budget <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                placeholder="Enter your budget (e.g., 50 Lakhs, 1 Cr)"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                placeholder="Any additional requirements or comments..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-primary text-white rounded hover:opacity-90 transition font-medium disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Interest'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookInterestModal;
