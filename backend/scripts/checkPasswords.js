require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const checkPasswords = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    const admins = await User.find({ role: 'admin' });
    
    console.log(`Found ${admins.length} admin(s):\n`);
    
    for (const admin of admins) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Email:', admin.email);
      console.log('Name:', admin.name);
      console.log('Role:', admin.role);
      console.log('Password Hash:', admin.password.substring(0, 20) + '...');
      console.log('Hash Length:', admin.password.length);
      console.log('Is Verified:', admin.isVerified);
      
      // Test with admin123
      const testPassword = 'admin123';
      const isMatch = await admin.comparePassword(testPassword);
      console.log(`Test password "${testPassword}":`, isMatch ? '✓ MATCHES' : '✗ NO MATCH');
      console.log('');
    }
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

checkPasswords();
