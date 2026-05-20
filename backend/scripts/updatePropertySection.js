const mongoose = require('mongoose');
require('dotenv').config();

const propertySchema = new mongoose.Schema({
  title: String,
  category: String,
  price: String,
  location: String,
  area: String,
  bedrooms: Number,
  bathrooms: Number,
  description: String,
  features: [String],
  images: [String],
  status: String,
  section: String,
  createdAt: Date
});

const Property = mongoose.model('Property', propertySchema);

async function updateProperties() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tanavi_properties');
    console.log('Connected to MongoDB');

    const result = await Property.updateMany(
      { section: { $exists: false } },
      { $set: { section: 'featured' } }
    );

    console.log(`Updated ${result.modifiedCount} properties with default section 'featured'`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateProperties();
