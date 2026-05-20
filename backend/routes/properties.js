const express = require('express');
const Property = require('../models/Property');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// Admin-only route to get all properties with sensitive data
router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const properties = await Property.find()
      .select('-__v')
      .lean()
      .sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin-only route to get sellers (properties with name, email, phone)
router.get('/sellers', protect, adminOnly, async (req, res) => {
  try {
    const sellers = await Property.find({
      name: { $exists: true, $ne: null, $ne: '' },
      email: { $exists: true, $ne: null, $ne: '' },
      phone: { $exists: true, $ne: null, $ne: '' }
    })
      .select('propertyCode name email phone title createdAt')
      .lean()
      .sort({ createdAt: -1 });
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin-only route to get single property with sensitive data
router.get('/admin/:id', protect, adminOnly, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    res.set('Cache-Control', 'public, max-age=300');
    const properties = await Property.find()
      .select('-__v -phone -email -verificationDocuments') // Hide sensitive data from public
      .lean()
      .sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .select('-phone -email -verificationDocuments'); // Hide sensitive data from public
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { section, ...data } = req.body;
    
    // If propertyCode is provided in the request, remove it to let the model generate a new one
    if (data.propertyCode) {
      delete data.propertyCode;
    }
    
    const property = await Property.create(data);
    res.status(201).json(property);
  } catch (error) {
    console.error('Error creating property:', error);
    if (error.code === 11000 && error.keyPattern?.propertyCode) {
      try {
        const { section, ...data } = req.body;
        
        // Remove propertyCode if provided
        if (data.propertyCode) {
          delete data.propertyCode;
        }
        
        // Generate a new property code and try again
        data.propertyCode = await Property.generateUniquePropertyCode();
        const property = await Property.create(data);
        return res.status(201).json(property);
      } catch (retryError) {
        console.error('Retry error creating property:', retryError);
        return res.status(500).json({ message: retryError.message });
      }
    }
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { section, ...data } = req.body;
    
    // If propertyCode is provided in the request, remove it to let the model generate a new one
    if (data.propertyCode) {
      delete data.propertyCode;
    }
    
    const property = await Property.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    if (error.code === 11000 && error.keyPattern?.propertyCode) {
      try {
        const { section, ...data } = req.body;
        
        // Remove propertyCode if provided
        if (data.propertyCode) {
          delete data.propertyCode;
        }
        
        // Generate a new property code and try again
        data.propertyCode = await Property.generateUniquePropertyCode();
        const property = await Property.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!property) return res.status(404).json({ message: 'Property not found' });
        return res.json(property);
      } catch (retryError) {
        console.error('Retry error updating property:', retryError);
        return res.status(500).json({ message: retryError.message });
      }
    }
    res.status(500).json({ message: error.message });
  }
});

router.post('/user-listing', protect, async (req, res) => {
  try {
    const userListing = {
      ...req.body,
      userId: req.user._id,
      status: 'pending',
      sections: ['user-submitted']
    };
    const property = await Property.create(userListing);
    res.status(201).json({ message: 'Property submitted for review', property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's own listings
router.get('/user-listings', protect, async (req, res) => {
  try {
    const properties = await Property.find({ userId: req.user._id })
      .select('-__v')
      .lean()
      .sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/renew', protect, adminOnly, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    property.expiryDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    property.isActive = true;
    property.renewalCount += 1;
    await property.save();
    res.json({ message: 'Property renewed successfully', property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
