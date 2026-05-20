const express = require('express');
const router = express.Router();
const BookInterest = require('../models/BookInterest');
const { protect, adminOnly } = require('../middleware/auth');

// Submit book interest form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, buyerType, propertyType, lookingLocation, budget, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !buyerType || !propertyType || !lookingLocation || !budget) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // Validate phone number format (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Phone number must be 10 digits' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const bookInterest = new BookInterest({
      name,
      email,
      phone,
      buyerType,
      propertyType,
      lookingLocation,
      budget,
      message: message || ''
    });

    await bookInterest.save();

    res.status(201).json({ 
      message: 'Interest recorded successfully',
      data: bookInterest
    });
  } catch (error) {
    console.error('Error submitting book interest:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all book interest submissions (admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }

    const bookInterests = await BookInterest.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await BookInterest.countDocuments(query);

    res.json({
      bookInterests,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Error fetching book interests:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single book interest by ID (admin only)
router.get('/:id', protect, adminOnly, async (req, res) => {
  try {
    const bookInterest = await BookInterest.findById(req.params.id);
    
    if (!bookInterest) {
      return res.status(404).json({ message: 'Book interest not found' });
    }

    res.json(bookInterest);
  } catch (error) {
    console.error('Error fetching book interest:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update book interest status (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['New', 'Contacted', 'In Progress', 'Closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const bookInterest = await BookInterest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!bookInterest) {
      return res.status(404).json({ message: 'Book interest not found' });
    }

    res.json({ 
      message: 'Status updated successfully',
      data: bookInterest
    });
  } catch (error) {
    console.error('Error updating book interest:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete book interest (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const bookInterest = await BookInterest.findByIdAndDelete(req.params.id);

    if (!bookInterest) {
      return res.status(404).json({ message: 'Book interest not found' });
    }

    res.json({ message: 'Book interest deleted successfully' });
  } catch (error) {
    console.error('Error deleting book interest:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
