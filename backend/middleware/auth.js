const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      console.log('User not found for token');
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

exports.adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    console.log('Admin access denied for user:', req.user?.email);
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
