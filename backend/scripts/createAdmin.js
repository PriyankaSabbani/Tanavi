const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✓ MongoDB connected');
    
    const email = 'admin@tanavi.com';
    const password = 'admin123';
    
    const adminExists = await User.findOne({ email });
    if (adminExists) {
      console.log('\n⚠️  Admin already exists. Testing password...');
      const isValid = await adminExists.comparePassword(password);
      if (isValid) {
        console.log('✓ Password is correct!');
      } else {
        console.log('✗ Password mismatch. Updating...');
        adminExists.password = password;
        await adminExists.save();
        console.log('✓ Password updated!');
      }
      console.log('\n📧 Email:', email);
      console.log('🔑 Password:', password);
      process.exit(0);
    }

    await User.create({
      name: 'Admin',
      email,
      password,
      role: 'admin',
      phone: '1234567890',
      isVerified: true
    });

    console.log('\n✓ Admin user created successfully!');
    console.log('\n📧 Email:', email);
    console.log('🔑 Password:', password);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
