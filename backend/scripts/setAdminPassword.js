require('dotenv').config();
const mongoose = require('mongoose');
const readline = require('readline');
const User = require('../models/User');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const setAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    const email = await question('Enter admin email: ');
    const admin = await User.findOne({ email, role: 'admin' });
    
    if (!admin) {
      console.log('\n❌ No admin found with that email.');
      rl.close();
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log(`\nFound admin: ${admin.name} (${admin.email})`);
    const newPassword = await question('Enter new password (min 6 characters): ');
    
    if (newPassword.length < 6) {
      console.log('\n❌ Password must be at least 6 characters.');
      rl.close();
      await mongoose.connection.close();
      process.exit(1);
    }

    admin.password = newPassword;
    await admin.save();
    
    console.log('\n✓ Password updated successfully!');
    console.log(`\nYou can now login with:`);
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${newPassword}`);
    
    rl.close();
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    rl.close();
    await mongoose.connection.close();
    process.exit(1);
  }
};

setAdminPassword();
