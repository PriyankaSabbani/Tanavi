const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { protect, adminOnly } = require('../middleware/auth');

// Get a specific setting (public)
router.get('/:key', async (req, res) => {
  try {
    const setting = await Settings.findOne({ key: req.params.key });
    if (!setting) {
      // Return default values for known settings
      const defaults = {
        'gallery.enabled': true,
        'map.enabled': true
      };
      return res.json({ key: req.params.key, value: defaults[req.params.key] || null });
    }
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all settings (admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const settings = await Settings.find();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update or create a setting (admin only)
router.put('/:key', protect, adminOnly, async (req, res) => {
  try {
    const { value, description } = req.body;
    const setting = await Settings.findOneAndUpdate(
      { key: req.params.key },
      { key: req.params.key, value, description },
      { new: true, upsert: true }
    );
    res.json(setting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
