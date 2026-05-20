import React, { useState } from 'react';
import { FaTimes, FaCheckCircle, FaLock } from 'react-icons/fa';
import API_URL, { getImageUrl } from '../utils/api';
import { compressImage } from '../utils/imageCompressor';
import Modal from './Modal';

const RegistrationModal = ({ isOpen, onClose, modalType = 'register' }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPTWarning, setShowPTWarning] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: '',
    propertyType: '',
    // Agricultural Land
    acres: '',
    guntas: '',
    // Independent House/Villa
    plotArea: '',
    totalFloors: '',
    portions: '',
    bedrooms: '',
    washrooms: '',
    furnishingStatus: '',
    buildingAge: '',
    parkingType: '',
    numberOfParkings: '',
    // Open Plot
    plotAreaYards: '',
    // Apartment
    flatType: '',
    buildupArea: '',
    floorDetails: '',
    propertyAge: '',
    washroomDetails: '',
    washroomInside: '',
    washroomOutside: '',
    washroomTotal: '',
    // Farmhouse
    farmhouseArea: '',
    farmhouseGuntas: '',
    swimmingPool: '',
    anyConstruction: '',
    garden: '',
    // Commercial
    commercialPropertyType: '',
    transactionType: '',
    builtupAreaCommercial: '',
    pricePerSqFt: '',
    expectedRent: '',
    depositAmount: '',
    floor: '',
    plugPlay: '',
    workStations: '',
    cabins: '',
    conferenceHall: '',
    pantry: '',
    landArea: '',
    landAreaUnit: '',
    // Common fields
    expectedPrice: '',
    propertyFacing: '',
    roadType: '',
    road: '',
    propertyUnder: '',
    boundaryType: '',
    bore: '',
    anyPTCase: '',
    propertyLocation: '',
    revenueRegistration: '',
    propertyCity: '',
    district: '',
    state: '',
    images: [],
    video: '',
    locationUrl: ''
  });
  const [uploading, setUploading] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  // Send OTP to email
  const handleSendOtp = async () => {
    if (!formData.email) {
      setModalState({ isOpen: true, type: 'error', title: 'Error', message: 'Please enter your email' });
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
        setModalState({ isOpen: true, type: 'success', title: 'OTP Sent!', message: 'OTP has been sent to your email successfully!' });
      } else {
        setModalState({ isOpen: true, type: 'error', title: 'Failed', message: data.message || 'Failed to send OTP' });
      }
    } catch (error) {
      setModalState({ isOpen: true, type: 'error', title: 'Error', message: 'Failed to send OTP. Please try again.' });
    } finally {
      setSendingOtp(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setModalState({ isOpen: true, type: 'error', title: 'Invalid OTP', message: 'Please enter a valid 6-digit OTP' });
      return;
    }

    if (!formData.name || !formData.phone) {
      setModalState({ isOpen: true, type: 'error', title: 'Missing Information', message: 'Please fill in your name and phone number' });
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
        setModalState({ isOpen: true, type: 'success', title: 'Verified!', message: 'Your email has been verified successfully!' });
      } else {
        setModalState({ isOpen: true, type: 'error', title: 'Verification Failed', message: data.message || 'Invalid OTP. Please try again.' });
      }
    } catch (error) {
      setModalState({ isOpen: true, type: 'error', title: 'Error', message: 'Failed to verify OTP. Please try again.' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if PT Case is selected as "Yes" for Agricultural Land or Farmhouse
    if (name === 'anyPTCase' && value === 'Yes' && 
        (formData.propertyType === 'Agricultural Land' || formData.propertyType === 'Farmhouse')) {
      setShowPTWarning(true);
      return;
    }
    
    setFormData({ ...formData, [name]: value });
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

  // Handle Guntas input with zero padding for single digits only
  const handleGuntasChange = (e) => {
    const { name, value } = e.target;
    // Allow only numbers and normalize (remove unnecessary leading zeros)
    const numericValue = value.replace(/\D/g, '');
    const normalizedValue = numericValue === '' ? '' : String(parseInt(numericValue, 10));
    setFormData({ ...formData, [name]: normalizedValue });
  };

  // Format Guntas display value (add leading zero for single digits)
  const formatGuntasDisplay = (value) => {
    if (!value) return '';
    const num = parseInt(value, 10);
    if (num >= 1 && num <= 9) {
      return '0' + num;
    }
    return String(num);
  };

  // Handle price input with Indian comma formatting
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    // Remove all non-numeric characters (including commas)
    const numericValue = value.replace(/[^0-9]/g, '');
    
    setFormData({ ...formData, [name]: numericValue });
  };

  // Handle Road input - only numbers, display with "Feet Road"
  const handleRoadChange = (e) => {
    const { name, value } = e.target;
    // Only allow numbers
    const numericValue = value.replace(/\D/g, '');
    setFormData({ ...formData, [name]: numericValue });
  };

  // Handle numeric input (only numbers allowed)
  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    // Only allow numbers
    const numericValue = value.replace(/\D/g, '');
    setFormData({ ...formData, [name]: numericValue });
  };

  // Handle Office Space rent calculation
  const handleOfficeSpaceChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    const newFormData = { ...formData, [name]: numericValue };
    
    // Auto-calculate expected rent for Rent/Lease
    if ((name === 'builtupAreaCommercial' || name === 'pricePerSqFt') && 
        (formData.transactionType === 'Rent' || formData.transactionType === 'Lease')) {
      const area = name === 'builtupAreaCommercial' ? numericValue : formData.builtupAreaCommercial;
      const price = name === 'pricePerSqFt' ? numericValue : formData.pricePerSqFt;
      
      if (area && price) {
        newFormData.expectedRent = (parseInt(area) * parseInt(price)).toString();
      } else {
        newFormData.expectedRent = '';
      }
    }
    
    setFormData(newFormData);
  };

  const handleWashroomChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    
    let newFormData = { ...formData, [name]: value };
    
    // Auto-calculate total
    if (name === 'washroomInside' || name === 'washroomOutside') {
      const inside = name === 'washroomInside' ? numValue : (parseInt(formData.washroomInside) || 0);
      const outside = name === 'washroomOutside' ? numValue : (parseInt(formData.washroomOutside) || 0);
      newFormData.washroomTotal = (inside + outside).toString();
    }
    
    setFormData(newFormData);
  };

  const renderPropertyTypeFields = () => {
    switch (formData.propertyType) {
      case 'Agricultural Land':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Acres <span className="text-red-500">*</span></label>
                <input type="text" name="acres" value={formData.acres} onChange={handleNumericChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Guntas</label>
                <input 
                  type="text" 
                  name="guntas" 
                  value={formatGuntasDisplay(formData.guntas)} 
                  onChange={handleGuntasChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                  placeholder="00" 
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Expected Price <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="expectedPrice" 
                value={formData.expectedPrice ? formatIndianNumber(formData.expectedPrice) : ''} 
                onChange={handlePriceChange} 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                placeholder="₹ 0,00,000" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Facing <span className="text-red-500">*</span></label>
                <select name="propertyFacing" value={formData.propertyFacing} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="Corner">Corner</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road Type <span className="text-red-500">*</span></label>
                <select name="roadType" value={formData.roadType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Highway">Highway</option>
                  <option value="BT Road">BT Road</option>
                  <option value="Matti Road">Matti Road</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="road" 
                    value={formData.road} 
                    onChange={handleRoadChange} 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                    placeholder="0" 
                  />
                  <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500 font-medium pointer-events-none" style={{ left: `calc(4rem + ${formData.road ? formData.road.length * 9 : 0}px)` }}>Feet Road</span>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Under <span className="text-red-500">*</span></label>
                <select name="propertyUnder" value={formData.propertyUnder} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="GHMC">GHMC</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Municipality">Municipality</option>
                  <option value="Gram Panchayat">Gram Panchayat</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Boundary Type <span className="text-red-500">*</span></label>
                <select name="boundaryType" value={formData.boundaryType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Compound Wall">Compound Wall</option>
                  <option value="Precast Compound">Precast Compound</option>
                  <option value="Fencing">Fencing</option>
                  <option value="Open">Open</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Bore <span className="text-red-500">*</span></label>
                <input type="text" name="bore" value={formData.bore} onChange={handleNumericChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Any PT Case <span className="text-red-500">*</span></label>
              <select name="anyPTCase" value={formData.anyPTCase} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {renderLocationFields()}
          </>
        );
      
      case 'Independent House':
        return (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Villa / House Details <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Plot Area (Sq Yards) <span className="text-red-500">*</span></label>
                  <input type="text" name="plotArea" value={formData.plotArea} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Total Floors <span className="text-red-500">*</span></label>
                  <input type="text" name="totalFloors" value={formData.totalFloors} onChange={handleNumericChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Portions <span className="text-red-500">*</span></label>
                  <input type="text" name="portions" value={formData.portions} onChange={handleNumericChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Bedrooms <span className="text-red-500">*</span></label>
                  <input type="text" name="bedrooms" value={formData.bedrooms} onChange={handleNumericChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Washrooms <span className="text-red-500">*</span></label>
                  <input type="text" name="washrooms" value={formData.washrooms} onChange={handleNumericChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Furnishing Status <span className="text-red-500">*</span></label>
                <select name="furnishingStatus" value={formData.furnishingStatus} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Building Age <span className="text-red-500">*</span></label>
                <input type="text" name="buildingAge" value={formData.buildingAge} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="New or Number of Years old" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Parking Details <span className="text-red-500">*</span></label>
                <select name="parkingType" value={formData.parkingType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Public">Public</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Number of Car Parkings <span className="text-red-500">*</span></label>
                <input type="text" name="numberOfParkings" value={formData.numberOfParkings} onChange={handleNumericChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Expected Price <span className="text-red-500">*</span></label>
              <input type="text" name="expectedPrice" value={formData.expectedPrice ? formatIndianNumber(formData.expectedPrice) : ''} onChange={handlePriceChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="₹ 0,00,000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Bore</label>
                <input type="text" name="bore" value={formData.bore} onChange={handleNumericChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road Type</label>
                <select name="roadType" value={formData.roadType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Highway - Commercial">Highway - Commercial</option>
                  <option value="Semi Commercial">Semi Commercial</option>
                  <option value="Residential">Residential</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="road" 
                    value={formData.road} 
                    onChange={handleRoadChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                    placeholder="0" 
                  />
                  <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500 font-medium pointer-events-none" style={{ left: `calc(4rem + ${formData.road ? formData.road.length * 9 : 0}px)` }}>Feet Road</span>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Under</label>
                <select name="propertyUnder" value={formData.propertyUnder} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="GHMC">GHMC</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Municipality">Municipality</option>
                  <option value="Gram Panchayat">Gram Panchayat</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Property Facing</label>
              <select name="propertyFacing" value={formData.propertyFacing} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                <option value="">Select</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="Corner">Corner</option>
              </select>
            </div>
            {renderLocationFields()}
          </>
        );
      
      case 'Open Plot':
        return (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Plot Area <span className="text-red-500">*</span></label>
              <input type="text" name="plotAreaYards" value={formData.plotAreaYards} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0 Sq Yards" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Expected Price <span className="text-red-500">*</span></label>
              <input type="text" name="expectedPrice" value={formData.expectedPrice ? formatIndianNumber(formData.expectedPrice) : ''} onChange={handlePriceChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="₹ 0,00,000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Bore</label>
                <input type="text" name="bore" value={formData.bore} onChange={handleNumericChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road Type</label>
                <select name="roadType" value={formData.roadType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Highway">Highway</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Semi Commercial">Semi Commercial</option>
                  <option value="Residential">Residential</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="road" 
                    value={formData.road} 
                    onChange={handleRoadChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                    placeholder="0" 
                  />
                  <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500 font-medium pointer-events-none" style={{ left: `calc(4rem + ${formData.road ? formData.road.length * 9 : 0}px)` }}>Feet Road</span>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Under</label>
                <select name="propertyUnder" value={formData.propertyUnder} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="GHMC">GHMC</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Municipality">Municipality</option>
                  <option value="Gram Panchayat">Gram Panchayat</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Property Facing</label>
              <select name="propertyFacing" value={formData.propertyFacing} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                <option value="">Select</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="Corner">Corner</option>
              </select>
            </div>
            {renderLocationFields()}
          </>
        );
      
      case 'Apartment':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Flat Type <span className="text-red-500">*</span></label>
                <select name="flatType" value={formData.flatType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Single Bed Room">Single Bed Room</option>
                  <option value="Double Bed Room">Double Bed Room</option>
                  <option value="Triple Bed Room">Triple Bed Room</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Buildup Area <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="buildupArea" 
                    value={formData.buildupArea} 
                    onChange={handleNumericChange} 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                    placeholder="0" 
                    style={{ paddingRight: '60px' }}
                  />
                  <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500 font-medium pointer-events-none" style={{ left: `calc(4rem + ${formData.buildupArea ? formData.buildupArea.length * 9 : 0}px)` }}>SFT</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Expected Price <span className="text-red-500">*</span></label>
              <input type="text" name="expectedPrice" value={formData.expectedPrice ? formatIndianNumber(formData.expectedPrice) : ''} onChange={handlePriceChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="₹ 0,00,000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Floor Details <span className="text-red-500">*</span></label>
                <input type="text" name="floorDetails" value={formData.floorDetails} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Age <span className="text-red-500">*</span></label>
                <input type="text" name="propertyAge" value={formData.propertyAge} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="New / 6 years" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Furnishing Status <span className="text-red-500">*</span></label>
                <select name="furnishingStatus" value={formData.furnishingStatus} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Washroom Details <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input type="number" name="washroomInside" value={formData.washroomInside} onChange={handleWashroomChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Inside: 0" />
                </div>
                <div>
                  <input type="number" name="washroomOutside" value={formData.washroomOutside} onChange={handleWashroomChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Outside: 0" />
                </div>
                <div>
                  <input type="number" name="washroomTotal" value={formData.washroomTotal} readOnly className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none bg-gray-100" placeholder="Total: 0" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Parking Details <span className="text-red-500">*</span></label>
                <select name="parkingType" value={formData.parkingType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Public">Public</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Number of Car Parkings <span className="text-red-500">*</span></label>
                <input type="text" name="numberOfParkings" value={formData.numberOfParkings} onChange={handleNumericChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road Type</label>
                <select name="roadType" value={formData.roadType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Highway">Highway</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Semi Commercial">Semi Commercial</option>
                  <option value="Residential">Residential</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="road" 
                    value={formData.road} 
                    onChange={handleRoadChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                    placeholder="0" 
                  />
                  <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500 font-medium pointer-events-none" style={{ left: `calc(4rem + ${formData.road ? formData.road.length * 9 : 0}px)` }}>Feet Road</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Under</label>
                <select name="propertyUnder" value={formData.propertyUnder} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="GHMC">GHMC</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Municipality">Municipality</option>
                  <option value="Gram Panchayat">Gram Panchayat</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Facing</label>
                <select name="propertyFacing" value={formData.propertyFacing} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="Corner">Corner</option>
                </select>
              </div>
            </div>
            {renderLocationFields()}
          </>
        );
      
      case 'Farmhouse':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Farmhouse Area (Acres) <span className="text-red-500">*</span></label>
                <input type="text" name="farmhouseArea" value={formData.farmhouseArea} onChange={handleNumericChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Guntas</label>
                <input 
                  type="text" 
                  name="farmhouseGuntas" 
                  value={formatGuntasDisplay(formData.farmhouseGuntas)} 
                  onChange={handleGuntasChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                  placeholder="00" 
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Expected Price <span className="text-red-500">*</span></label>
              <input type="text" name="expectedPrice" value={formData.expectedPrice ? formatIndianNumber(formData.expectedPrice) : ''} onChange={handlePriceChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="₹ 0,00,000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road Type</label>
                <select name="roadType" value={formData.roadType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Highway">Highway</option>
                  <option value="BT Road">BT Road</option>
                  <option value="Matti Road">Matti Road</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="road" 
                    value={formData.road} 
                    onChange={handleRoadChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                    placeholder="0" 
                  />
                  <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500 font-medium pointer-events-none" style={{ left: `calc(4rem + ${formData.road ? formData.road.length * 9 : 0}px)` }}>Feet Road</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Under</label>
                <select name="propertyUnder" value={formData.propertyUnder} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="GHMC">GHMC</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Municipality">Municipality</option>
                  <option value="Gram Panchayat">Gram Panchayat</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Facing</label>
                <select name="propertyFacing" value={formData.propertyFacing} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="Corner">Corner</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Boundary Type</label>
                <select name="boundaryType" value={formData.boundaryType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Compound Wall">Compound Wall</option>
                  <option value="Precast Compound">Precast Compound</option>
                  <option value="Fencing">Fencing</option>
                  <option value="Open">Open</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Any PT Case</label>
                <select name="anyPTCase" value={formData.anyPTCase} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Bore</label>
                <input type="text" name="bore" value={formData.bore} onChange={handleNumericChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="0" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Swimming Pool</label>
                <select name="swimmingPool" value={formData.swimmingPool} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Any Construction</label>
                <select name="anyConstruction" value={formData.anyConstruction} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Washroom Details</label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input type="number" name="washroomInside" value={formData.washroomInside} onChange={handleWashroomChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Inside: 0" />
                </div>
                <div>
                  <input type="number" name="washroomOutside" value={formData.washroomOutside} onChange={handleWashroomChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Outside: 0" />
                </div>
                <div>
                  <input type="number" name="washroomTotal" value={formData.washroomTotal} readOnly className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none bg-gray-100" placeholder="Total: 0" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Garden</label>
              <input type="text" name="garden" value={formData.garden} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Yes" />
            </div>
            {renderLocationFields()}
          </>
        );
      
      case 'Commercial Space':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Commercial Property Type <span className="text-red-500">*</span></label>
                <select name="commercialPropertyType" value={formData.commercialPropertyType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Office / Commercial Space">Office / Commercial Space</option>
                  <option value="Commercial Open Space">Commercial Open Space</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Transaction Type <span className="text-red-500">*</span></label>
                <select name="transactionType" value={formData.transactionType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Rent">Rent</option>
                  <option value="Lease">Lease</option>
                  <option value="Sale">Sale</option>
                </select>
              </div>
            </div>
            {formData.commercialPropertyType === 'Office / Commercial Space' && (
              <>
                {/* For Rent/Lease - Show Built-up Area, Price per Sq.Ft, and Expected Rent in 3 columns */}
                {(formData.transactionType === 'Rent' || formData.transactionType === 'Lease') ? (
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Built-up Area <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">Sq. Ft</span>
                          <input 
                            type="text" 
                            name="builtupAreaCommercial" 
                            value={formData.builtupAreaCommercial} 
                            onChange={handleOfficeSpaceChange} 
                            required 
                            className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                            placeholder="0" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Expected Price (Per Sq.Ft) <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          name="pricePerSqFt" 
                          value={formData.pricePerSqFt} 
                          onChange={handleOfficeSpaceChange} 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                          placeholder="₹ 0" 
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Expected Rent (Auto)</label>
                        <input 
                          type="text" 
                          name="expectedRent" 
                          value={formData.expectedRent ? formatIndianNumber(formData.expectedRent) : ''} 
                          readOnly 
                          className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-100 focus:outline-none" 
                          placeholder="₹ 0" 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Deposit Amount <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          name="depositAmount" 
                          value={formData.depositAmount ? formatIndianNumber(formData.depositAmount) : ''} 
                          onChange={handlePriceChange} 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                          placeholder="₹ 0,00,000" 
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Floor</label>
                        <input 
                          type="text" 
                          name="floor" 
                          value={formData.floor} 
                          onChange={handleNumericChange} 
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                          placeholder="2nd Floor (of 5 Floors)" 
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  /* For Sale - Show Built-up Area and Floor side by side */
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Built-up Area <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">Sq. Ft</span>
                        <input 
                          type="text" 
                          name="builtupAreaCommercial" 
                          value={formData.builtupAreaCommercial} 
                          onChange={handleNumericChange} 
                          required 
                          className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                          placeholder="0" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Floor</label>
                      <input 
                        type="text" 
                        name="floor" 
                        value={formData.floor} 
                        onChange={handleNumericChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                        placeholder="2nd Floor (of 5 Floors)" 
                      />
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Plug & Play</label>
                    <select name="plugPlay" value={formData.plugPlay} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Work Stations</label>
                    <input 
                      type="text" 
                      name="workStations" 
                      value={formData.workStations} 
                      onChange={handleNumericChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                      placeholder="0" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Cabins</label>
                    <input 
                      type="text" 
                      name="cabins" 
                      value={formData.cabins} 
                      onChange={handleNumericChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                      placeholder="0" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Conference Hall</label>
                    <input 
                      type="text" 
                      name="conferenceHall" 
                      value={formData.conferenceHall} 
                      onChange={handleNumericChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                      placeholder="0" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Pantry</label>
                    <input 
                      type="text" 
                      name="pantry" 
                      value={formData.pantry} 
                      onChange={handleNumericChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                      placeholder="0" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Washroom Details</label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <input type="number" name="washroomInside" value={formData.washroomInside} onChange={handleWashroomChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Inside: 0" />
                    </div>
                    <div>
                      <input type="number" name="washroomOutside" value={formData.washroomOutside} onChange={handleWashroomChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Outside: 0" />
                    </div>
                    <div>
                      <input type="number" name="washroomTotal" value={formData.washroomTotal} readOnly className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none bg-gray-100" placeholder="Total: 0" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Parking Details</label>
                    <select name="parkingType" value={formData.parkingType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                      <option value="">Select</option>
                      <option value="Public">Public</option>
                      <option value="Reserved">Reserved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Number of Car Parkings</label>
                    <input 
                      type="text" 
                      name="numberOfParkings" 
                      value={formData.numberOfParkings} 
                      onChange={handleNumericChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                      placeholder="0" 
                    />
                  </div>
                </div>
              </>
            )}
            {formData.commercialPropertyType === 'Commercial Open Space' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Land Area <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="landArea" 
                      value={formData.landArea} 
                      onChange={handleNumericChange} 
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                      placeholder="0" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Unit</label>
                    <select name="landAreaUnit" value={formData.landAreaUnit} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                      <option value="">Select</option>
                      <option value="Sq. Ft">Sq. Ft</option>
                      <option value="Sq. Yards">Sq. Yards</option>
                      <option value="Acres">Acres</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Bore</label>
                    <input 
                      type="text" 
                      name="bore" 
                      value={formData.bore} 
                      onChange={handleNumericChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                      placeholder="0" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Boundary Type</label>
                    <select name="boundaryType" value={formData.boundaryType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                      <option value="">Select</option>
                      <option value="Compound Wall">Compound Wall</option>
                      <option value="Precast Compound">Precast Compound</option>
                      <option value="Fencing">Fencing</option>
                      <option value="Open">Open</option>
                    </select>
                  </div>
                </div>
              </>
            )}
            {/* Only show Expected Price for Sale transaction or Commercial Open Space */}
            {(formData.transactionType === 'Sale' || formData.commercialPropertyType === 'Commercial Open Space') && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Expected Price <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="expectedPrice" 
                  value={formData.expectedPrice ? formatIndianNumber(formData.expectedPrice) : ''} 
                  onChange={handlePriceChange} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                  placeholder="₹ 0,00,000"
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road Type</label>
                <select name="roadType" value={formData.roadType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="Highway">Highway</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Semi Commercial">Semi Commercial</option>
                  <option value="Residential">Residential</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Road</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="road" 
                    value={formData.road} 
                    onChange={handleRoadChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" 
                    placeholder="0" 
                  />
                  <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500 font-medium pointer-events-none" style={{ left: `calc(4rem + ${formData.road ? formData.road.length * 9 : 0}px)` }}>Feet Road</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Under</label>
                <select name="propertyUnder" value={formData.propertyUnder} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="GHMC">GHMC</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Municipality">Municipality</option>
                  <option value="Gram Panchayat">Gram Panchayat</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Facing</label>
                <select name="propertyFacing" value={formData.propertyFacing} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary">
                  <option value="">Select</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="Corner">Corner</option>
                </select>
              </div>
            </div>
            {renderLocationFields()}
          </>
        );
      
      default:
        return null;
    }
  };

  const renderLocationFields = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Property Location <span className="text-red-500">*</span></label>
          <input type="text" name="propertyLocation" value={formData.propertyLocation} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Enter locality / area name" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Revenue Registration / Sub-Registrar <span className="text-red-500">*</span></label>
          <input type="text" name="revenueRegistration" value={formData.revenueRegistration} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Select or enter Sub-Registrar office" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Property City <span className="text-red-500">*</span></label>
          <input type="text" name="propertyCity" value={formData.propertyCity} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Enter city / town name" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">District <span className="text-red-500">*</span></label>
          <input type="text" name="district" value={formData.district} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Enter district name" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">State <span className="text-red-500">*</span></label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary" placeholder="Select state" />
        </div>
      </div>
    </>
  );

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (formData.images.length >= 8) {
      alert('Maximum 8 images allowed');
      return;
    }

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

  const handleVideoChange = async (e) => {
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
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isVerified) {
      setModalState({ isOpen: true, type: 'warning', title: 'Verification Required', message: 'Please verify your email with OTP before submitting' });
      return;
    }
    
    if (formData.userType === 'Agent') {
      setModalState({ isOpen: true, type: 'warning', title: 'Not Allowed', message: 'Only property owners can submit listings.' });
      return;
    }
    
    const submitData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      userType: formData.userType,
      propertyType: formData.propertyType,
      title: `${formData.propertyType} in ${formData.propertyLocation}`,
      category: formData.propertyType,
      location: `${formData.propertyLocation}, ${formData.propertyCity}, ${formData.district}, ${formData.state}`,
      price: formData.expectedPrice,
      description: JSON.stringify({
        acres: formData.acres,
        guntas: formData.guntas,
        plotArea: formData.plotArea,
        totalFloors: formData.totalFloors,
        portions: formData.portions,
        bedrooms: formData.bedrooms,
        washrooms: formData.washrooms,
        furnishingStatus: formData.furnishingStatus,
        buildingAge: formData.buildingAge,
        plotAreaYards: formData.plotAreaYards,
        flatType: formData.flatType,
        buildupArea: formData.buildupArea,
        floorDetails: formData.floorDetails,
        propertyAge: formData.propertyAge,
        washroomDetails: formData.washroomDetails,
        farmhouseArea: formData.farmhouseArea,
        farmhouseGuntas: formData.farmhouseGuntas,
        swimmingPool: formData.swimmingPool,
        anyConstruction: formData.anyConstruction,
        garden: formData.garden,
        commercialPropertyType: formData.commercialPropertyType,
        transactionType: formData.transactionType,
        builtupAreaCommercial: formData.builtupAreaCommercial,
        floor: formData.floor,
        plugPlay: formData.plugPlay,
        workStations: formData.workStations,
        cabins: formData.cabins,
        conferenceHall: formData.conferenceHall,
        pantry: formData.pantry,
        landArea: formData.landArea,
        landAreaUnit: formData.landAreaUnit,
        propertyFacing: formData.propertyFacing,
        roadType: formData.roadType,
        road: formData.road ? formData.road + ' Feet Road' : '',
        propertyUnder: formData.propertyUnder,
        boundaryType: formData.boundaryType,
        bore: formData.bore,
        anyPTCase: formData.anyPTCase,
        revenueRegistration: formData.revenueRegistration
      }),
      images: formData.images,
      video: formData.video
    };

    try {
      const res = await fetch(`${API_URL}/api/properties/user-listing`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(submitData)
      });
      
      if (res.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          userType: '',
          propertyType: '',
          acres: '',
          guntas: '',
          plotArea: '',
          totalFloors: '',
          portions: '',
          bedrooms: '',
          washrooms: '',
          furnishingStatus: '',
          buildingAge: '',
          plotAreaYards: '',
          flatType: '',
          buildupArea: '',
          floorDetails: '',
          propertyAge: '',
          washroomDetails: '',
          farmhouseArea: '',
          farmhouseGuntas: '',
          swimmingPool: '',
          anyConstruction: '',
          garden: '',
          commercialPropertyType: '',
          transactionType: '',
          builtupAreaCommercial: '',
          pricePerSqFt: '',
          expectedRent: '',
          depositAmount: '',
          floor: '',
          plugPlay: '',
          workStations: '',
          cabins: '',
          conferenceHall: '',
          pantry: '',
          landArea: '',
          landAreaUnit: '',
          expectedPrice: '',
          propertyFacing: '',
          roadType: '',
          road: '',
          propertyUnder: '',
          boundaryType: '',
          bore: '',
          anyPTCase: '',
          propertyLocation: '',
          revenueRegistration: '',
          propertyCity: '',
          district: '',
          state: '',
          images: [],
          video: '',
          locationUrl: ''
        });
      } else {
        const error = await res.json();
        setModalState({ isOpen: true, type: 'error', title: 'Submission Failed', message: error.message || 'Failed to submit property. Please try again.' });
      }
    } catch (error) {
      setModalState({ isOpen: true, type: 'error', title: 'Error', message: 'Failed to submit property. Please check your connection and try again.' });
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  // PT Case Warning Modal
  if (showPTWarning) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full p-8 text-center animate-scale-in shadow-2xl">
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">PT Case Detected</h2>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Thank you for your transparency. This property has a Protected Tenant (PT) case. 
            Please proceed with listing only after PT clearance from the Revenue Department.
          </p>
          <button
            onClick={() => {
              setShowPTWarning(false);
              onClose();
              window.location.href = '/';
            }}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold text-lg"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center animate-scale-in">
          <div className="mb-6">
            <FaCheckCircle className="text-green-500 text-7xl mx-auto animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Success!</h2>
          <p className="text-gray-600 text-lg mb-6">
            Registration submitted successfully! We will contact you soon.
          </p>
          <button
            onClick={handleSuccessClose}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition font-medium text-lg"
          >
            Got it!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Register Your Property</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => {
                // Only allow alphabets and spaces
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                setFormData({ ...formData, name: value });
              }}
              onKeyPress={(e) => {
                // Block any non-alphabet keys (except space)
                const char = String.fromCharCode(e.which);
                if (!/[a-zA-Z\s]/.test(char)) {
                  e.preventDefault();
                }
              }}
              required
              pattern="[A-Za-z\s]+"
              title="Name should only contain letters"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
              placeholder="Enter your full name (alphabets only)"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isVerified}
                pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
                title="Email must be a valid Gmail address (e.g., example@gmail.com)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary disabled:bg-gray-100"
                placeholder="Enter your email"
              />
              {!isVerified && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={sendingOtp || !formData.email}
                  className="bg-primary text-white px-6 py-3 rounded hover:bg-blue-700 transition disabled:bg-gray-400 whitespace-nowrap font-medium"
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
            <label className="block text-gray-700 font-medium mb-2">Phone Number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                // Only allow numbers and limit to 10 digits
                const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                setFormData({ ...formData, phone: value });
              }}
              onKeyPress={(e) => {
                // Block any non-numeric keys
                const char = String.fromCharCode(e.which);
                if (!/[0-9]/.test(char)) {
                  e.preventDefault();
                }
              }}
              required
              disabled={isVerified}
              pattern="[0-9]{10}"
              minLength="10"
              maxLength="10"
              title="Phone number must be exactly 10 digits"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary disabled:bg-gray-100"
              placeholder="Enter 10-digit phone number"
            />
            {formData.phone && formData.phone.length < 10 && (
              <p className="text-red-500 text-sm mt-1">Phone number must be exactly 10 digits</p>
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
            <label className="block text-gray-700 font-medium mb-2">You are <span className="text-red-500">*</span></label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
            >
              <option value="">Select</option>
              <option value="Owner">Owner</option>
              <option value="Agent">Agent</option>
            </select>
            {formData.userType === 'Agent' && (
              <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-700 font-medium">Currently, Tanavi Properties accepts property listings only from direct owners. If you are an agent or broker, please contact Tanavi Properties.</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Property Type <span className="text-red-500">*</span></label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
              disabled={formData.userType === 'Agent'}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary disabled:bg-gray-100"
            >
              <option value="">Select Property Type</option>
              <option value="Agricultural Land">Agricultural Land</option>
              <option value="Independent House">Independent House</option>
              <option value="Apartment">Apartment</option>
              <option value="Open Plot">Open Plot</option>
              <option value="Farmhouse">Farmhouse</option>
              <option value="Commercial Space">Commercial Space</option>
            </select>
          </div>

          {/* Dynamic Property Type Fields */}
          {formData.propertyType && formData.userType === 'Owner' && (
            <div className="space-y-4">
              {renderPropertyTypeFields()}
            </div>
          )}

          {modalType === 'list' && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Images (Max 8)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={formData.images.length >= 8 || uploading}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                />
                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img src={getImageUrl(img)} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Video (Max 30 seconds)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  disabled={uploading || formData.video}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                />
                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading video...</p>}
                {formData.video && (
                  <div className="mt-3 relative">
                    <video src={getImageUrl(formData.video)} controls className="w-full max-h-40 rounded" />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, video: ''})}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded px-3 py-1 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Location URL (Optional)</label>
                <input
                  type="url"
                  name="locationUrl"
                  value={formData.locationUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                  placeholder="https://maps.google.com/..."
                />
                <p className="text-sm text-gray-500 mt-1">Add Google Maps link or any location URL for this property</p>
              </div>
            </>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded hover:bg-opacity-90 transition font-medium"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
      />
    </div>
  );
};

export default RegistrationModal;




