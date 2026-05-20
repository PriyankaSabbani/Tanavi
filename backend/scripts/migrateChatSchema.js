require('dotenv').config();
const mongoose = require('mongoose');
const Chat = require('../models/Chat');

const migrateChats = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    const chats = await Chat.find({});
    console.log(`\nFound ${chats.length} chat(s) to check`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    let updatedCount = 0;

    for (const chat of chats) {
      let updated = false;
      const updates = [];

      // Ensure messages array exists
      if (!chat.messages) {
        chat.messages = [];
        updated = true;
        updates.push('messages array');
      }

      // Ensure unreadCount exists
      if (chat.unreadCount === undefined || chat.unreadCount === null) {
        chat.unreadCount = 0;
        updated = true;
        updates.push('unreadCount');
      }

      // Ensure chatStartedAt exists
      if (!chat.chatStartedAt) {
        chat.chatStartedAt = chat.createdAt || new Date();
        updated = true;
        updates.push('chatStartedAt');
      }

      // Ensure lastMessage exists
      if (!chat.lastMessage) {
        chat.lastMessage = chat.createdAt || new Date();
        updated = true;
        updates.push('lastMessage');
      }

      // Ensure userType exists
      if (!chat.userType) {
        chat.userType = 'buyer';
        updated = true;
        updates.push('userType');
      }

      if (updated) {
        await chat.save();
        updatedCount++;
        console.log(`✓ Updated chat: ${chat.userId}`);
        console.log(`  Mobile: ${chat.mobileNumber}`);
        console.log(`  Fields: ${updates.join(', ')}`);
        console.log('');
      }
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n✓ Migration completed!`);
    console.log(`  Total chats: ${chats.length}`);
    console.log(`  Updated: ${updatedCount}`);
    console.log(`  Unchanged: ${chats.length - updatedCount}`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error.message);
    console.error(error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

migrateChats();
