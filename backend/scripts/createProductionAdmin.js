require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    const email = 'admin@tanavi.com';
    const password = 'admin123'; // CHANGE THIS IN PRODUCTION!

    // Check if admin exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('⚠ Admin already exists with email:', email);
      console.log('Admin details:', {
        name: existingAdmin.name,
        email: existingAdmin.email,
        role: existingAdmin.role,
        isVerified: existingAdmin.isVerified
      });
      await mongoose.connection.close();
      process.exit(0);
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    console.log('Creating admin user...');
    const admin = await User.create({
      name: 'Admin',
      email: email,
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    });

    console.log('\n✓ Admin created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('👤 Name:', admin.name);
    console.log('🎭 Role:', admin.role);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();
