require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('../models/Property');

async function testPropertyCodes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    const allProperties = await Property.find();
    console.log(`Total Properties: ${allProperties.length}\n`);

    const withCodes = allProperties.filter(p => p.propertyCode);
    const withoutCodes = allProperties.filter(p => !p.propertyCode);

    console.log('Properties WITH codes:', withCodes.length);
    withCodes.forEach(p => {
      console.log(`  ✓ ${p.propertyCode} - ${p.title}`);
    });

    console.log('\nProperties WITHOUT codes:', withoutCodes.length);
    withoutCodes.forEach(p => {
      console.log(`  ✗ ${p.title} (ID: ${p._id})`);
    });

    if (withoutCodes.length > 0) {
      console.log('\n⚠️  Run: node scripts/generatePropertyCodes.js');
    } else {
      console.log('\n✓ All properties have codes!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testPropertyCodes();
