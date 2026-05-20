require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('../models/Property');

async function generatePropertyCodes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const properties = await Property.find({ propertyCode: { $exists: false } }).sort({ createdAt: 1 });
    console.log(`Found ${properties.length} properties without property codes`);

    const prefix = 'TP';
    const year = new Date().getFullYear().toString().slice(-2);
    let counter = await Property.countDocuments({ propertyCode: { $exists: true } });

    for (const property of properties) {
      counter++;
      property.propertyCode = `${prefix}${year}${String(counter).padStart(4, '0')}`;
      await property.save();
      console.log(`✓ Generated ${property.propertyCode} for: ${property.title}`);
    }

    console.log(`\n✓ Generated ${properties.length} property codes!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

generatePropertyCodes();
