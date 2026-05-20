const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true, enum: ['user', 'admin'] },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, index: true },
  username: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  userType: { type: String, enum: ['buyer', 'seller', 'approval_pending'], default: 'buyer' },
  propertyId: { type: String, default: null },
  sellerName: { type: String, default: null },
  messages: [messageSchema],
  unreadCount: { type: Number, default: 0 },
  lastMessage: { type: Date, default: Date.now, index: true },
  availabilityConfirmed: { type: Boolean, default: null },
  availabilityConfirmedAt: { type: Date, default: null },
  chatStartedAt: { type: Date, default: Date.now }
}, { timestamps: true });

chatSchema.index({ lastMessage: -1 });
chatSchema.index({ mobileNumber: 1 });
chatSchema.index({ userType: 1 });

module.exports = mongoose.model('Chat', chatSchema);
