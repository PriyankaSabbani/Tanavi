const express = require('express');
const router = express.Router();
const Poster = require('../models/Poster');
const { protect, adminOnly } = require('../middleware/auth');

// Get active posters for public (no auth required)
router.get('/active', async (req, res) => {
  try {
    const posters = await Poster.getActivePosters();
    res.json(posters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all posters (admin only)
router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const posters = await Poster.find().sort({ createdAt: -1 });
    res.json(posters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single poster
router.get('/:id', async (req, res) => {
  try {
    const poster = await Poster.findById(req.params.id);
    if (!poster) {
      return res.status(404).json({ message: 'Poster not found' });
    }
    res.json(poster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create poster (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const poster = new Poster(req.body);
    const savedPoster = await poster.save();
    res.status(201).json(savedPoster);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update poster (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const poster = await Poster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!poster) {
      return res.status(404).json({ message: 'Poster not found' });
    }
    res.json(poster);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete poster (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const poster = await Poster.findByIdAndDelete(req.params.id);
    if (!poster) {
      return res.status(404).json({ message: 'Poster not found' });
    }
    res.json({ message: 'Poster deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle poster active status (admin only)
router.patch('/:id/toggle', protect, adminOnly, async (req, res) => {
  try {
    const poster = await Poster.findById(req.params.id);
    if (!poster) {
      return res.status(404).json({ message: 'Poster not found' });
    }
    poster.isActive = !poster.isActive;
    await poster.save();
    res.json(poster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
