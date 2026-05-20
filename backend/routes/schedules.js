const express = require('express');
const Schedule = require('../models/Schedule');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const Property = require('../models/Property');
    const property = await Property.findById(req.body.propertyId);
    const scheduleData = {
      ...req.body,
      propertyCode: property?.propertyCode || req.body.propertyCode
    };
    const schedule = await Schedule.create(scheduleData);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('propertyId').sort({ createdAt: -1 });
    const Property = require('../models/Property');
    
    // Populate propertyCode if missing
    const updatedSchedules = await Promise.all(schedules.map(async (schedule) => {
      if (!schedule.propertyCode && schedule.propertyId) {
        const property = await Property.findById(schedule.propertyId);
        if (property?.propertyCode) {
          schedule.propertyCode = property.propertyCode;
          await schedule.save();
        }
      }
      return schedule;
    }));
    
    res.json(updatedSchedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json({ message: 'Schedule deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
