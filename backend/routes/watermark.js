const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const Property = require('../models/Property');
const cloudinary = require('../config/cloudinary');
const router = express.Router();

// Check if other models exist
let Gallery, Testimonial, BuySell;
try {
  Gallery = require('../models/Gallery');
} catch (e) { Gallery = null; }
try {
  Testimonial = require('../models/Testimonial');
} catch (e) { Testimonial = null; }
try {
  BuySell = require('../models/BuySell');
} catch (e) { BuySell = null; }

const updateImageWatermark = (imageUrl, watermarkText = 'Tanavi Properties') => {
  try {
    const urlParts = imageUrl.split('/');
    const filename = urlParts[urlParts.length - 1].split('.')[0];
    const folder = urlParts.slice(urlParts.indexOf('tanavi_properties'), -1).join('/');
    const publicId = `${folder}/${filename}`;

    return cloudinary.url(publicId, {
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
  } catch (err) {
    return imageUrl; // Return original if watermarking fails
  }
};

router.post('/update-all-watermarks', protect, adminOnly, async (req, res) => {
  try {
    let totalUpdated = 0;
    const results = {};

    // Update Properties
    console.log('Updating Properties...');
    const properties = await Property.find({ images: { $exists: true, $ne: [] } });
    let propertyCount = 0;
    
    for (const property of properties) {
      const watermarkText = `Tanavi Properties - ${property.propertyCode}`;
      const watermarkedImages = [];

      for (const imageUrl of property.images) {
        const watermarkedUrl = updateImageWatermark(imageUrl, watermarkText);
        watermarkedImages.push(watermarkedUrl);
      }

      property.images = watermarkedImages;
      await property.save();
      propertyCount++;
    }
    results.properties = propertyCount;
    totalUpdated += propertyCount;

    // Update Gallery if exists
    if (Gallery) {
      console.log('Updating Gallery...');
      const galleries = await Gallery.find({ 
        $or: [
          { images: { $exists: true, $ne: [] } },
          { image: { $exists: true, $ne: null } }
        ]
      });
      let galleryCount = 0;

      for (const gallery of galleries) {
        let updated = false;
        
        // Update images array
        if (gallery.images && gallery.images.length > 0) {
          const watermarkedImages = gallery.images.map(img => 
            updateImageWatermark(img, 'Tanavi Properties')
          );
          gallery.images = watermarkedImages;
          updated = true;
        }
        
        // Update single image field
        if (gallery.image) {
          gallery.image = updateImageWatermark(gallery.image, 'Tanavi Properties');
          updated = true;
        }
        
        if (updated) {
          await gallery.save();
          galleryCount++;
        }
      }
      results.gallery = galleryCount;
      totalUpdated += galleryCount;
    }

    // Update Testimonials if exists
    if (Testimonial) {
      console.log('Updating Testimonials...');
      const testimonials = await Testimonial.find({ 
        $or: [
          { image: { $exists: true, $ne: null } },
          { avatar: { $exists: true, $ne: null } }
        ]
      });
      let testimonialCount = 0;

      for (const testimonial of testimonials) {
        let updated = false;
        
        if (testimonial.image) {
          testimonial.image = updateImageWatermark(testimonial.image, 'Tanavi Properties');
          updated = true;
        }
        
        if (testimonial.avatar) {
          testimonial.avatar = updateImageWatermark(testimonial.avatar, 'Tanavi Properties');
          updated = true;
        }
        
        if (updated) {
          await testimonial.save();
          testimonialCount++;
        }
      }
      results.testimonials = testimonialCount;
      totalUpdated += testimonialCount;
    }

    // Update BuySell if exists
    if (BuySell) {
      console.log('Updating BuySell...');
      const buysells = await BuySell.find({ 
        $or: [
          { images: { $exists: true, $ne: [] } },
          { image: { $exists: true, $ne: null } }
        ]
      });
      let buysellCount = 0;

      for (const buysell of buysells) {
        let updated = false;
        
        if (buysell.images && buysell.images.length > 0) {
          const watermarkedImages = buysell.images.map(img => 
            updateImageWatermark(img, 'Tanavi Properties')
          );
          buysell.images = watermarkedImages;
          updated = true;
        }
        
        if (buysell.image) {
          buysell.image = updateImageWatermark(buysell.image, 'Tanavi Properties');
          updated = true;
        }
        
        if (updated) {
          await buysell.save();
          buysellCount++;
        }
      }
      results.buysell = buysellCount;
      totalUpdated += buysellCount;
    }

    res.json({ 
      message: `Successfully updated watermarks across all sections`,
      totalUpdated,
      breakdown: results
    });
  } catch (error) {
    console.error('Watermark update error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Keep the original endpoint for properties only
router.post('/update-watermarks', protect, adminOnly, async (req, res) => {
  try {
    const properties = await Property.find({ images: { $exists: true, $ne: [] } });
    let updatedCount = 0;

    for (const property of properties) {
      const watermarkText = `Tanavi Properties - ${property.propertyCode}`;
      const watermarkedImages = [];

      for (const imageUrl of property.images) {
        const watermarkedUrl = updateImageWatermark(imageUrl, watermarkText);
        watermarkedImages.push(watermarkedUrl);
      }

      property.images = watermarkedImages;
      await property.save();
      updatedCount++;
    }

    res.json({ 
      message: `Successfully updated watermarks for ${updatedCount} properties`,
      updatedCount 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;