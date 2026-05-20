const mongoose = require('mongoose');

const buySellSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  area: { type: Number, required: true },
  type: { type: String, enum: ['sale', 'buy', 'sold', 'bought'], required: true },
  date: { type: String, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('BuySell', buySellSchema);
