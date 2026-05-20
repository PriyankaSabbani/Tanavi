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
  sections: [String],
  createdAt: Date
}, { strict: false });

const Property = mongoose.model('Property', propertySchema);

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const properties = await Property.find({});
    console.log(`Found ${properties.length} properties`);

    for (const property of properties) {
      if (property.section && (!property.sections || property.sections.length === 0)) {
        property.sections = [property.section];
        property.section = undefined;
        await property.save();
        console.log(`Migrated: ${property.title}`);
      }
    }

    console.log('Migration complete!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
