import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaLock } from 'react-icons/fa';
import API_URL, { getImageUrl } from '../utils/api';
import { compressImage } from '../utils/imageCompressor';
import { useAuth } from '../contexts/AuthContext';

const ListProperty = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '', email: user?.email || '', phone: user?.phone || '', title: '', category: '', price: '', location: '', area: '', 
    bedrooms: '', bathrooms: '', description: '', images: [], video: '', parkingType: '', parkingCount: '',
    // Office Space specific fields
    builtUpArea: '', pricePerSqFt: '', expectedRent: '', depositAmount: '', floor: '',
    plugAndPlay: '', workStations: '', cabins: '', conferenceHall: '', pantry: '', washroomDetails: '',
    // Optional location URL
    locationUrl: ''
  });
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(!!user);
  const [authToken, setAuthToken] = useState(null);
  const [sendingOtp, setSendingOtp] = useState(false);

  const locations = ['Hyderabad', 'Secunderabad', 'Gachibowli', 'Madhapur', 'Kondapur', 'Kukatpally', 'Miyapur', 'Nizampet', 'Bachupally', 'Kompally'];
  const categories = ['Agricultural Land', 'Independent House', 'Open Plot', 'Apartment', 'Farmhouse', 'Office Space'];

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  // Send OTP to email
  const handleSendOtp = async () => {
    if (!formData.email) {
      showToast('Please enter your email', 'error');
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
        showToast('OTP sent to your email!', 'success');
      } else {
        showToast(data.message || 'Failed to send OTP', 'error');
      }
    } catch (error) {
      showToast('Failed to send OTP', 'error');
    } finally {
      setSendingOtp(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      showToast('Please enter valid 6-digit OTP', 'error');
      return;
    }

    if (!formData.name || !formData.phone) {
      showToast('Please fill name and phone number', 'error');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/otp/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp,
          name: formData.name,
          phone: formData.phone
        })
      });

      const data = await res.json();
      if (res.ok) {
        setIsVerified(true);
        setAuthToken(data.token);
        // Update AuthContext with user data
        login(data.user, data.token);
        showToast('Email verified successfully!', 'success');
      } else {
        showToast(data.message || 'Invalid OTP', 'error');
      }
    } catch (error) {
      showToast('Failed to verify OTP', 'error');
    }
  };

  // Format number with Indian comma system
  const formatIndianNumber = (num) => {
    if (!num) return '';
    const numStr = num.toString().replace(/,/g, '');
    const lastThree = numStr.substring(numStr.length - 3);
    const otherNumbers = numStr.substring(0, numStr.length - 3);
    if (otherNumbers !== '') {
      return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
    }
    return lastThree;
  };

  // Handle price input with Indian comma formatting
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormData({ ...formData, [name]: numericValue });
  };

  // Handle numeric input (only numbers allowed)
  const handleNumericChange = (field, value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormData({ ...formData, [field]: numericValue });
  };

  // Calculate expected rent for Office Space
  const calculateExpectedRent = (builtUpArea, pricePerSqFt) => {
    if (builtUpArea && pricePerSqFt) {
      const rent = parseFloat(builtUpArea) * parseFloat(pricePerSqFt);
      return rent.toLocaleString('en-IN');
    }
    return '';
  };

  const handleOfficeSpaceChange = (field, value) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    const newFormData = { ...formData, [field]: numericValue };
    
    if (field === 'builtUpArea' || field === 'pricePerSqFt') {
      const rent = calculateExpectedRent(
        field === 'builtUpArea' ? numericValue : formData.builtUpArea,
        field === 'pricePerSqFt' ? numericValue : formData.pricePerSqFt
      );
      newFormData.expectedRent = rent;
    }
    
    setFormData(newFormData);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      e.target.value = '';
      return;
    }

    setUploading(true);
    let uploadFile = file;
    try {
      uploadFile = await compressImage(file, 2);
    } catch (err) {
      console.log('Compression failed, using original:', err);
    }

    const formDataUpload = new FormData();
    formDataUpload.append('image', uploadFile);

    try {
      const res = await fetch(`${API_URL}/api/upload/public`, {
        method: 'POST',
        body: formDataUpload
      });
      
      const data = await res.json();
      if (res.ok) {
        setFormData({...formData, images: [...formData.images, data.url]});
        showToast('Image uploaded!', 'success');
      } else {
        alert(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = async function() {
      window.URL.revokeObjectURL(video.src);
      if (video.duration > 30) {
        alert('Video must be 30 seconds or less');
        e.target.value = '';
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        alert('Video size must be less than 50MB');
        e.target.value = '';
        return;
      }

      setUploading(true);
      const formDataUpload = new FormData();
      formDataUpload.append('video', file);

      try {
        const res = await fetch(`${API_URL}/api/upload/public/video`, {
          method: 'POST',
          body: formDataUpload
        });
        
        const data = await res.json();
        if (res.ok) {
          setFormData({...formData, video: data.url});
          showToast('Video uploaded!', 'success');
        } else {
          alert(`Upload failed: ${data.message}`);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        setUploading(false);
        e.target.value = '';
      }
    };
    video.src = URL.createObjectURL(file);
  };

  const removeImage = (index) => {
    setFormData({...formData, images: formData.images.filter((_, i) => i !== index)});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVerified) {
      showToast('Please verify your email with OTP first', 'error');
      return;
    }

    try {
      const token = authToken || localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/properties/user-listing`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        showToast('Property submitted successfully! We will review and contact you.', 'success');
        setFormData({ 
          name: '', email: '', phone: '', title: '', category: '', price: '', location: '', area: '', 
          bedrooms: '', bathrooms: '', description: '', images: [], video: '', parkingType: '', parkingCount: '',
          builtUpArea: '', pricePerSqFt: '', expectedRent: '', depositAmount: '', floor: '',
          plugAndPlay: '', workStations: '', cabins: '', conferenceHall: '', pantry: '', washroomDetails: '',
          locationUrl: ''
        });
        setOtpSent(false);
        setOtp('');
        setIsVerified(false);
        setAuthToken(null);
      } else {
        const error = await res.json();
        showToast(error.message || 'Failed to submit', 'error');
      }
    } catch (error) {
      showToast('Failed to submit property', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {toast.show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className={`bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 ${toast.type === 'success' ? 'border-t-4 border-green-500' : 'border-t-4 border-red-500'}`}>
            <div className="flex flex-col items-center text-center">
              {toast.type === 'success' ? (
                <FaCheckCircle className="text-green-500 text-6xl mb-4" />
              ) : (
                <FaTimesCircle className="text-red-500 text-6xl mb-4" />
              )}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {toast.type === 'success' ? 'Success!' : 'Error!'}
              </h3>
              <p className="text-gray-600 text-lg">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">List Your Property</h1>
          <p className="text-gray-600">Fill in the details below to list your property with us</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Your Name *</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                    setFormData({...formData, name: value});
                  }}
                  onKeyPress={(e) => {
                    const char = String.fromCharCode(e.which);
                    if (!/[a-zA-Z\s]/.test(char)) {
                      e.preventDefault();
                    }
                  }}
                  className="w-full border p-3 rounded" 
                  required 
                  placeholder="Enter your full name (alphabets only)"
                  pattern="[a-zA-Z\s]+"
                  title="Only alphabets and spaces are allowed"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    className="flex-1 border p-3 rounded" 
                    required 
                    disabled={isVerified}
                  />
                  {!isVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={sendingOtp || !formData.email}
                      className="bg-primary text-white px-6 py-3 rounded hover:bg-blue-700 transition disabled:bg-gray-400 whitespace-nowrap"
                    >
                      {sendingOtp ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
                    </button>
                  )}
                  {isVerified && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded">
                      <FaCheckCircle />
                      <span className="font-semibold">Verified</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone *</label>
                <input 
                  type="tel" 
                  value={formData.phone} 
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                    setFormData({...formData, phone: value});
                  }}
                  onKeyPress={(e) => {
                    const char = String.fromCharCode(e.which);
                    if (!/[0-9]/.test(char)) {
                      e.preventDefault();
                    }
                  }}
                  className="w-full border p-3 rounded" 
                  required 
                  placeholder="Enter 10-digit phone number"
                  maxLength="10"
                  minLength="10"
                  pattern="[0-9]{10}"
                  title="Please enter exactly 10 digits"
                />
                {formData.phone && formData.phone.length < 10 && (
                  <p className="text-red-500 text-sm mt-1">Phone number must be exactly 10 digits</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Property Title *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full border p-3 rounded" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Category *</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full border p-3 rounded" required>
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Location *</label>
                <select value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full border p-3 rounded" required>
                  <option value="">Select Location</option>
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
              
              {formData.category === 'Office Space' && (
                <>
                  <div>
                    <label className="block text-gray-700 mb-2">Built-up Area *</label>
                    <div className="flex items-center border rounded overflow-hidden">
                      <span className="bg-gray-100 px-3 py-3 text-gray-600 border-r">Sq. Ft</span>
                      <input 
                        type="number" 
                        value={formData.builtUpArea} 
                        onChange={(e) => handleOfficeSpaceChange('builtUpArea', e.target.value)} 
                        className="flex-1 p-3 outline-none" 
                        required 
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Floor *</label>
                    <input 
                      type="text" 
                      value={formData.floor} 
                      onChange={(e) => setFormData({...formData, floor: e.target.value})} 
                      className="w-full border p-3 rounded" 
                      required
                      placeholder="Enter the floor"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Expected Price (Per Sq.Ft) *</label>
                    <input 
                      type="number" 
                      value={formData.pricePerSqFt} 
                      onChange={(e) => handleOfficeSpaceChange('pricePerSqFt', e.target.value)} 
                      className="w-full border p-3 rounded" 
                      required 
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Deposit Amount *</label>
                    <input 
                      type="text" 
                      value={formData.depositAmount} 
                      onChange={(e) => setFormData({...formData, depositAmount: e.target.value})} 
                      className="w-full border p-3 rounded" 
                      required 
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Plug & Play *</label>
                    <select 
                      value={formData.plugAndPlay} 
                      onChange={(e) => setFormData({...formData, plugAndPlay: e.target.value})} 
                      className="w-full border p-3 rounded"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Work Stations *</label>
                    <input 
                      type="text" 
                      value={formData.workStations} 
                      onChange={(e) => handleNumericChange('workStations', e.target.value)} 
                      className="w-full border p-3 rounded" 
                      required
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Cabins *</label>
                    <input 
                      type="text" 
                      value={formData.cabins} 
                      onChange={(e) => handleNumericChange('cabins', e.target.value)} 
                      className="w-full border p-3 rounded" 
                      required
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Conference Hall *</label>
                    <input 
                      type="text" 
                      value={formData.conferenceHall} 
                      onChange={(e) => handleNumericChange('conferenceHall', e.target.value)} 
                      className="w-full border p-3 rounded" 
                      required
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Pantry *</label>
                    <input 
                      type="text" 
                      value={formData.pantry} 
                      onChange={(e) => handleNumericChange('pantry', e.target.value)} 
                      className="w-full border p-3 rounded" 
                      required
                      placeholder="0"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Washroom Details *</label>
                    <input 
                      type="text" 
                      value={formData.washroomDetails} 
                      onChange={(e) => setFormData({...formData, washroomDetails: e.target.value})} 
                      className="w-full border p-3 rounded" 
                      required
                      placeholder="Total-0, Inside-0, Outside-0"
                    />
                  </div>
                </>
              )}
              
              {formData.category !== 'Office Space' && (
                <>
                  <div>
                    <label className="block text-gray-700 mb-2">Price (INR) *</label>
                    <input 
                      type="text" 
                      name="price"
                      placeholder="₹ 0,00,000" 
                      value={formData.price ? formatIndianNumber(formData.price) : ''} 
                      onChange={handlePriceChange} 
                      className="w-full border p-3 rounded" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Area (sq.ft) *</label>
                    <input type="text" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} className="w-full border p-3 rounded" required />
                  </div>
                </>
              )}
              
              {formData.category && !['Agricultural Land', 'Open Plot', 'Office Space'].includes(formData.category) && (
                <>
                  <div>
                    <label className="block text-gray-700 mb-2">Bedrooms *</label>
                    <input 
                      type="text" 
                      value={formData.bedrooms} 
                      onChange={(e) => handleNumericChange('bedrooms', e.target.value)} 
                      className="w-full border p-3 rounded" 
                      required
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Bathrooms *</label>
                    <input 
                      type="text" 
                      value={formData.bathrooms} 
                      onChange={(e) => handleNumericChange('bathrooms', e.target.value)} 
                      className="w-full border p-3 rounded" 
                      required
                      placeholder="0"
                    />
                  </div>
                </>
              )}
              {formData.category && ['Apartment', 'Office Space', 'Independent House'].includes(formData.category) && (
                <>
                  <div>
                    <label className="block text-gray-700 mb-2">Parking Type *</label>
                    <select value={formData.parkingType} onChange={(e) => setFormData({...formData, parkingType: e.target.value})} className="w-full border p-3 rounded" required>
                      <option value="">Select Parking Type</option>
                      <option value="Public">Public</option>
                      <option value="Reserved">Reserved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Number of Car Parkings *</label>
                    <input 
                      type="text" 
                      min="0" 
                      value={formData.parkingCount} 
                      onChange={(e) => handleNumericChange('parkingCount', e.target.value)} 
                      className="w-full border p-3 rounded" 
                      required
                      placeholder="0" 
                    />
                  </div>
                </>
              )}
            </div>

            {/* OTP Verification Section */}
            {otpSent && !isVerified && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaLock className="text-blue-600 text-xl" />
                  <h3 className="text-lg font-semibold text-gray-800">Verify Your Email</h3>
                </div>
                <p className="text-gray-600 mb-4">We've sent a 6-digit OTP to {formData.email}</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                      setOtp(value);
                    }}
                    placeholder="Enter 6-digit OTP"
                    className="flex-1 border-2 border-blue-300 p-3 rounded text-center text-2xl font-bold tracking-widest"
                    maxLength="6"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 6}
                    className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 transition disabled:bg-gray-400 font-semibold"
                  >
                    Verify
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-3">Didn't receive OTP? 
                  <button 
                    type="button" 
                    onClick={handleSendOtp} 
                    className="text-blue-600 hover:underline ml-1 font-semibold"
                  >
                    Resend
                  </button>
                </p>
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2">Description *</label>
              <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border p-3 rounded" rows="4" required />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Property Images (Max 8 images) *</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border p-3 rounded" disabled={uploading || formData.images.length >= 8} required={formData.images.length === 0} />
              {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
              {formData.images.length >= 8 && <p className="text-sm text-red-600 mt-1">Maximum 8 images allowed</p>}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img src={getImageUrl(img)} alt="Property" className="w-full h-20 object-cover rounded" />
                      <button type="button" onClick={() => removeImage(idx)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs">×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Property Video (Max 30 seconds)</label>
              <input type="file" accept="video/*" onChange={handleVideoUpload} className="w-full border p-3 rounded" disabled={uploading} />
              {uploading && <p className="text-sm text-blue-600 mt-1">Uploading video...</p>}
              {formData.video && (
                <div className="mt-3 relative">
                  <video src={getImageUrl(formData.video)} controls className="w-full max-h-60 rounded" />
                  <button type="button" onClick={() => setFormData({...formData, video: ''})} className="absolute top-2 right-2 bg-red-600 text-white rounded px-3 py-1 text-sm">Remove</button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Property Location URL (Optional)</label>
              <input 
                type="url" 
                value={formData.locationUrl} 
                onChange={(e) => setFormData({...formData, locationUrl: e.target.value})} 
                className="w-full border p-3 rounded" 
                placeholder="https://maps.google.com/..." 
              />
              <p className="text-sm text-gray-500 mt-1">Add Google Maps link or any location URL for this property</p>
            </div>

            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Submit Property
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
