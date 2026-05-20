const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function fixPropertyCodes() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const propertiesCollection = db.collection('properties');
    const countersCollection = db.collection('property_code_counters');

    // Get the current count of properties
    const propertyCount = await propertiesCollection.countDocuments();
    console.log(`Total properties: ${propertyCount}`);

    // Get the current counter value
    const counterDoc = await countersCollection.findOne({ _id: 'TP26' });
    console.log(`Current counter value: ${counterDoc ? counterDoc.seq : 'Not found'}`);

    // Update the counter to match the property count
    await countersCollection.updateOne(
      { _id: 'TP26' },
      { $set: { seq: propertyCount } },
      { upsert: true }
    );

    console.log(`Counter updated to: ${propertyCount}`);

    // Verify
    const updatedCounter = await countersCollection.findOne({ _id: 'TP26' });
    console.log(`Updated counter value: ${updatedCounter.seq}`);

    await mongoose.disconnect();
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixPropertyCodes();
