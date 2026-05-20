const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const OTP = require('../models/OTP');
const router = express.Router();

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Admin Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Create admin user (password will be hashed by User model pre-save hook)
    const admin = await User.create({
      name,
      email,
      password, // Don't hash here - let the model do it
      role: 'admin',
      isVerified: true
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'Admin registered successfully',
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt for:', email);

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find admin user
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) {
      console.log('Admin not found for email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Admin found:', admin.email, 'Role:', admin.role);

    // Check password using the model method
    const isPasswordValid = await admin.comparePassword(password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('Invalid password for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    console.log('Login successful for:', email);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

// Send Password Reset OTP
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Find admin user
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(404).json({ message: 'No admin account found with this email' });
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete any existing OTPs for this email
    await OTP.deleteMany({ email });

    // Save new OTP
    await OTP.create({ email, otp: otpCode });

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset OTP - Tanavi Properties Admin',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Password Reset Request</h2>
          <p>Hello ${admin.name},</p>
          <p>You requested to reset your admin password. Use the OTP below to proceed:</p>
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #2563eb; font-size: 36px; letter-spacing: 8px; margin: 0;">${otpCode}</h1>
          </div>
          <p style="color: #ef4444; font-weight: bold;">This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">Tanavi Properties Admin Portal</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'OTP sent to your email successfully' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Verify OTP and Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate input
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Find admin user
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(404).json({ message: 'No admin account found with this email' });
    }

    // Verify OTP
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Update password (will be hashed by User model pre-save hook)
    admin.password = newPassword;
    await admin.save();

    // Delete used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    res.json({ message: 'Password reset successfully. You can now login with your new password.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error. Please try again.', error: error.message });
  }
});

// Verify OTP (for password reset flow)
router.post('/verify-reset-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Find admin user
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(404).json({ message: 'No admin account found with this email' });
    }

    // Verify OTP
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.json({ message: 'OTP verified successfully', verified: true });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Server error. Please try again.', error: error.message });
  }
});

module.exports = router;
