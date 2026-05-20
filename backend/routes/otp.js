const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const OTP = require('../models/OTP');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
});

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP to email
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Generate OTP
    const otp = generateOTP();

    // Delete any existing OTP for this email
    await OTP.deleteMany({ email });

    // Save new OTP
    await OTP.create({ email, otp });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Your OTP for Tanavi Properties',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Tanavi Properties</h2>
          <p>Your OTP for listing your property is:</p>
          <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">Tanavi Properties - Your Trusted Real Estate Partner</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'OTP sent successfully to your email' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Verify OTP and create/login user
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp, name, phone } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Find OTP
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Delete used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      if (!name || !phone) {
        return res.status(400).json({ message: 'Name and phone are required for new users' });
      }

      user = await User.create({
        name,
        email,
        phone,
        role: 'user',
        isVerified: true
      });
    } else {
      // Update existing user verification
      user.isVerified = true;
      if (name) user.name = name;
      if (phone) user.phone = phone;
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'OTP verified successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
});

// Get current user from token
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
