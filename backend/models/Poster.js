const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Method to check if poster is still valid
posterSchema.methods.isValid = function() {
  const now = new Date();
  return this.isActive && now >= this.startDate && now <= this.endDate;
};

// Static method to get active posters
posterSchema.statics.getActivePosters = async function() {
  const now = new Date();
  const query = {
    isActive: true,
    startDate: { $lte: now },
    endDate: { $gte: now }
  };
  
  return this.find(query).sort({ createdAt: -1 }).limit(1); // Only return the most recent active poster
};

module.exports = mongoose.model('Poster', posterSchema);
