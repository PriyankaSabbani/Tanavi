const mongoose = require('mongoose');
require('dotenv').config();

const resetPropertyCounter = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const Property = require('./models/Property');
    
    // Get the current year
    const year = new Date().getFullYear().toString().slice(-2);
    const prefix = 'TP';
    const key = `${prefix}${year}`;
    
    // Find the highest property code for this year
    const latestProperty = await Property.findOne(
      { propertyCode: { $regex: `^${prefix}${year}` } },
      { propertyCode: 1 }
    ).sort({ propertyCode: -1 }).lean();
    
    let nextCounter = 1;
    if (latestProperty && latestProperty.propertyCode) {
      const codeNumber = parseInt(latestProperty.propertyCode.slice(-4));
      if (!isNaN(codeNumber)) {
        nextCounter = codeNumber + 1;
      }
    }
    
    console.log(`Latest property code: ${latestProperty?.propertyCode || 'None'}`);
    console.log(`Setting counter to: ${nextCounter}`);
    
    // Reset the counter collection
    const coll = mongoose.connection.collection('property_code_counters');
    await coll.deleteOne({ _id: key });
    await coll.insertOne({ _id: key, seq: nextCounter });
    
    console.log('Property counter reset successfully!');
    console.log(`Next property code will be: ${prefix}${year}${String(nextCounter).padStart(4, '0')}`);
    
  } catch (error) {
    console.error('Error resetting property counter:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

resetPropertyCounter();