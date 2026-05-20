const mongoose = require('mongoose');
require('dotenv').config();

const Chat = require('./models/Chat');

async function testChat() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB connected');

    // Test 1: Create a chat
    const testUserId = `user_test_${Date.now()}`;
    const chat = await Chat.create({
      userId: testUserId,
      username: 'Test User',
      messages: [],
      unreadCount: 0
    });
    console.log('✓ Chat created:', chat.userId);

    // Test 2: Add a message
    chat.messages.push({
      sender: 'user',
      text: 'Hello, this is a test message',
      timestamp: new Date()
    });
    chat.unreadCount += 1;
    await chat.save();
    console.log('✓ Message added');

    // Test 3: Fetch chat
    const fetchedChat = await Chat.findOne({ userId: testUserId });
    console.log('✓ Chat fetched:', fetchedChat.messages.length, 'messages');

    // Test 4: Admin reply
    fetchedChat.messages.push({
      sender: 'admin',
      text: 'Hello! How can I help you?',
      timestamp: new Date()
    });
    await fetchedChat.save();
    console.log('✓ Admin reply added');

    // Test 5: Mark as read
    fetchedChat.unreadCount = 0;
    await fetchedChat.save();
    console.log('✓ Marked as read');

    // Test 6: Get all chats
    const allChats = await Chat.find().sort({ lastMessage: -1 });
    console.log('✓ All chats fetched:', allChats.length, 'chats');

    // Cleanup
    await Chat.deleteOne({ userId: testUserId });
    console.log('✓ Test chat deleted');

    console.log('\n✅ All chat tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testChat();
