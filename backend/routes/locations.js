const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const { protect, adminOnly } = require('../middleware/auth');

// Get all locations (public)
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find().populate('propertyId', 'title').sort({ createdAt: -1 });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single location by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate('propertyId', 'title');
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create location (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update location (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete location (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json({ message: 'Location deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
