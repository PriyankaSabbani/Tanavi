require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('../models/Property');
const cloudinary = require('../config/cloudinary');

async function addWatermarkToExistingImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const properties = await Property.find({ images: { $exists: true, $ne: [] } });
    console.log(`Found ${properties.length} properties with images`);

    for (const property of properties) {
      console.log(`\nProcessing: ${property.title} (${property.propertyCode})`);
      const watermarkText = `Tanavi Properties - ${property.propertyCode}`;
      const watermarkedImages = [];

      for (const imageUrl of property.images) {
        try {
          // Extract public_id from Cloudinary URL
          const urlParts = imageUrl.split('/');
          const filename = urlParts[urlParts.length - 1].split('.')[0];
          const folder = urlParts.slice(urlParts.indexOf('tanavi_properties'), -1).join('/');
          const publicId = `${folder}/${filename}`;

          // Generate watermarked URL using Cloudinary transformations
          const watermarkedUrl = cloudinary.url(publicId, {
            transformation: [
              { width: 1200, height: 800, crop: 'fill', gravity: 'auto' },
              {
                overlay: {
                  font_family: 'Arial',
                  font_size: 80,
                  font_weight: 'bold',
                  text: watermarkText
                },
                gravity: 'center',
                angle: -30,
                opacity: 50,
                color: 'white'
              }
            ]
          });

          watermarkedImages.push(watermarkedUrl);
          console.log(`  ✓ Watermarked image: ${filename}`);
        } catch (err) {
          console.log(`  ✗ Failed to watermark: ${imageUrl}`);
          watermarkedImages.push(imageUrl); // Keep original if watermarking fails
        }
      }

      // Update property with watermarked images
      property.images = watermarkedImages;
      await property.save();
      console.log(`  Updated property with ${watermarkedImages.length} watermarked images`);
    }

    console.log('\n✓ Watermarking complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addWatermarkToExistingImages();
