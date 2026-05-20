const mongoose = require('mongoose');

const bookInterestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  buyerType: {
    type: String,
    required: true,
    enum: ['Buyer', 'Investor', 'End User']
  },
  propertyType: {
    type: String,
    required: true
  },
  lookingLocation: {
    type: String,
    required: true,
    trim: true
  },
  budget: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'In Progress', 'Closed'],
    default: 'New'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BookInterest', bookInterestSchema);
