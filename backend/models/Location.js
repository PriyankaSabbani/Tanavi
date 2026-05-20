const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  coordinates: { 
    type: String, 
    required: true,
    trim: true
  },
  latitude: { type: Number },
  longitude: { type: Number },
  propertyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Property'
  },
  description: String
}, { timestamps: true });

// Parse coordinates before saving
locationSchema.pre('save', function(next) {
  if (this.coordinates) {
    // Parse coordinates like "16°54'38.2"N 78°08'05.9"E" or "16.5438, 78.0809"
    const coordStr = this.coordinates.replace(/[°'"]/g, ' ').trim();
    const parts = coordStr.split(/[\s,]+/);
    
    if (parts.length >= 2) {
      // Try to extract latitude and longitude
      let lat = parseFloat(parts[0]);
      let lng = parseFloat(parts[parts.length - 1]);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        this.latitude = lat;
        this.longitude = lng;
      }
    }
  }
  next();
});

module.exports = mongoose.model('Location', locationSchema);
