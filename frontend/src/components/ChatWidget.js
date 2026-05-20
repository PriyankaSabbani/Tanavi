import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import API_URL from '../utils/api';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [authMode, setAuthMode] = useState('verify'); // 'verify' or 'register'
  const [mobileNumber, setMobileNumber] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('buyer');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const messagesEndRef = useRef(null);
  const pollIntervalRef = useRef(null);
  const availabilityCheckRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      setIsAtBottom(scrollHeight - scrollTop - clientHeight < 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedUserId = localStorage.getItem('chatUserId');
    const savedUsername = localStorage.getItem('chatUsername');
    const savedMobileNumber = localStorage.getItem('chatMobileNumber');
    const savedUserType = localStorage.getItem('chatUserType');
    
    if (savedUserId && savedUsername && savedUserId !== 'undefined') {
      setUserId(savedUserId);
      setUsername(savedUsername);
      setMobileNumber(savedMobileNumber || '');
      setUserType(savedUserType || 'buyer');
      setIsSetup(true);
    } else {
      handleLogout();
    }
  }, []);

  useEffect(() => {
    if (!isSetup || !userId || userId === '') return;
    
    fetchMessages(userId);
    pollIntervalRef.current = setInterval(() => {
      if (userId && userId !== '') {
        fetchMessages(userId);
      }
    }, 3000);
    
    // Check for availability confirmation every hour
    if (userType === 'seller') {
      checkAvailabilityNeeded(userId);
      availabilityCheckRef.current = setInterval(() => {
        checkAvailabilityNeeded(userId);
      }, 3600000); // Check every hour
    }
    
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
      if (availabilityCheckRef.current) {
        clearInterval(availabilityCheckRef.current);
      }
    };
  }, [isSetup, userId, userType]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const checkAvailabilityNeeded = async (uid) => {
    try {
      const res = await fetch(`${API_URL}/api/chat/check-availability/${uid}`);
      if (res.ok) {
        const data = await res.json();
        if (data.needsConfirmation) {
          setShowAvailabilityModal(true);
        }
      }
    } catch (error) {
      console.error('Error checking availability:', error);
    }
  };

  const fetchMessages = async (uid) => {
    if (!uid || uid === '' || uid === 'undefined') return;
    try {
      const res = await fetch(`${API_URL}/api/chat/messages/${uid}`);
      if (!res.ok) {
        if (res.status === 404) {
          console.log('Chat session not found');
        }
        return;
      }
      const data = await res.json();
      setMessages(data.messages || []);
      setError('');
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleVerifyMobile = async () => {
    if (!mobileNumber.trim()) {
      setError('Please enter your mobile number');
      return;
    }
    
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNumber.trim())) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API_URL}/api/chat/verify-mobile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber: mobileNumber.trim() })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        // Mobile not found - show registration option
        setError(data.message || 'Mobile number not found');
        setAuthMode('register');
        setLoading(false);
        return;
      }
      
      // Mobile found - start chat
      await startChatSession(data);
    } catch (error) {
      console.error('Error verifying mobile:', error);
      setError('Failed to verify. Please try again.');
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!username.trim() || !mobileNumber.trim()) {
      setError('Please enter both username and mobile number');
      return;
    }
    
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNumber.trim())) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API_URL}/api/chat/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: username.trim(),
          mobileNumber: mobileNumber.trim() 
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const data = await res.json();
      await startChatSession(data);
    } catch (error) {
      console.error('Error registering:', error);
      setError(error.message || 'Failed to register. Please try again.');
      setLoading(false);
    }
  };

  const startChatSession = async (data) => {
    setUserId(data.userId);
    setUsername(data.username);
    setUserType(data.userType);
    
    localStorage.setItem('chatUserId', data.userId);
    localStorage.setItem('chatUsername', data.username);
    localStorage.setItem('chatMobileNumber', mobileNumber.trim());
    localStorage.setItem('chatUserType', data.userType);
    
    setIsSetup(true);
    setError('');
    setLoading(false);
    
    // Show welcome message
    if (data.userType === 'seller') {
      setTimeout(() => {
        setMessages([{
          sender: 'admin',
          text: 'Welcome! Your property listing is active. How can we help you today?',
          timestamp: new Date()
        }]);
      }, 500);
    } else if (data.userType === 'approval_pending') {
      setTimeout(() => {
        setMessages([{
          sender: 'admin',
          text: 'Your property listing is pending approval. We will notify you once it\'s approved.',
          timestamp: new Date()
        }]);
      }, 500);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('chatUserId');
    localStorage.removeItem('chatUsername');
    localStorage.removeItem('chatMobileNumber');
    localStorage.removeItem('chatUserType');
    
    setUserId('');
    setUsername('');
    setMobileNumber('');
    setUserType('buyer');
    setMessages([]);
    setIsSetup(false);
    setAuthMode('verify');
    setError('');
    
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }
    if (availabilityCheckRef.current) {
      clearInterval(availabilityCheckRef.current);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userId || userId === '') return;

    const messageText = newMessage.trim();
    setNewMessage('');

    try {
      const res = await fetch(`${API_URL}/api/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, sender: 'user', text: messageText })
      });
      
      if (!res.ok) {
        throw new Error('Failed to send message');
      }
      
      await fetchMessages(userId);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
      setNewMessage(messageText);
    }
  };

  const handleAvailabilityConfirmation = async (available) => {
    try {
      const res = await fetch(`${API_URL}/api/chat/confirm-availability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, available })
      });
      
      if (!res.ok) {
        throw new Error('Failed to confirm availability');
      }
      
      setShowAvailabilityModal(false);
      
      // Add confirmation message to chat
      const confirmationText = available 
        ? 'Property is still available' 
        : 'Property has been sold';
      
      await fetch(`${API_URL}/api/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId, 
          sender: 'user', 
          text: `Availability Confirmation: ${confirmationText}` 
        })
      });
      
      await fetchMessages(userId);
    } catch (error) {
      console.error('Error confirming availability:', error);
      setError('Failed to confirm availability. Please try again.');
    }
  };

  const getUserTypeLabel = () => {
    switch(userType) {
      case 'seller':
        return '(Seller)';
      case 'approval_pending':
        return '(Approval Pending)';
      default:
        return '(Buyer)';
    }
  };

  const formatMessageDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset time to compare dates only
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

    if (messageDate.getTime() === todayDate.getTime()) {
      return 'Today';
    } else if (messageDate.getTime() === yesterdayDate.getTime()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    }
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const groupMessagesByDate = (messages) => {
    const grouped = {};
    messages.forEach(msg => {
      const dateKey = formatMessageDate(msg.timestamp);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(msg);
    });
    return grouped;
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed right-4 md:right-6 bg-primary text-white p-3 md:p-4 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-110 z-50 ${isAtBottom ? 'bottom-[220px]' : 'bottom-[140px]'}`}
          aria-label="Open chat"
        >
          <FaComments className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:top-4 md:right-4 md:bottom-auto bg-white md:rounded-lg shadow-2xl flex flex-col z-50 md:w-[450px] md:h-[600px] md:max-h-[calc(100vh-2rem)]">
          {/* Header */}
          <div className="bg-primary text-white p-3 md:p-4 md:rounded-t-lg flex justify-between items-center">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base md:text-lg">Chat with Tanavi Properties</h3>
              {isSetup && (
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs opacity-90 truncate">{username} {getUserTypeLabel()}</p>
                  <button
                    onClick={handleLogout}
                    className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-0.5 rounded transition"
                    title="Logout and start new chat"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="flex-shrink-0 ml-2">
              <FaTimes className="text-lg md:text-xl" />
            </button>
          </div>

          {!isSetup ? (
            <div className="p-4 md:p-6 flex flex-col gap-3 md:gap-4">
              <h4 className="font-bold text-base md:text-lg">Start Chat</h4>
              
              {authMode === 'verify' ? (
                // Verify Mobile Mode
                <>
                  <p className="text-xs md:text-sm text-gray-600">
                    Enter your registered mobile number
                  </p>
                  {error && <p className="text-red-500 text-xs md:text-sm bg-red-50 p-2 rounded">{error}</p>}
                  
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full border p-2 md:p-3 rounded text-sm md:text-base"
                      disabled={loading}
                      maxLength={10}
                    />
                  </div>

                  <button
                    onClick={handleVerifyMobile}
                    disabled={loading || mobileNumber.length !== 10}
                    className="bg-primary text-white py-2 md:py-3 rounded hover:opacity-90 disabled:opacity-50 text-sm md:text-base font-medium"
                  >
                    {loading ? 'Verifying...' : 'Verify & Start Chat'}
                  </button>

                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-2">Don't have an account?</p>
                    <button
                      onClick={() => setAuthMode('register')}
                      className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Create Chat Account
                    </button>
                  </div>
                </>
              ) : (
                // Register Mode
                <>
                  <p className="text-xs md:text-sm text-gray-600">
                    Create your chat account
                  </p>
                  {error && <p className="text-red-500 text-xs md:text-sm bg-red-50 p-2 rounded">{error}</p>}
                  
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full border p-2 md:p-3 rounded text-sm md:text-base"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full border p-2 md:p-3 rounded text-sm md:text-base"
                      disabled={loading}
                      maxLength={10}
                    />
                  </div>

                  <button
                    onClick={handleRegister}
                    disabled={loading || !username.trim() || mobileNumber.length !== 10}
                    className="bg-green-600 text-white py-2 md:py-3 rounded hover:bg-green-700 disabled:opacity-50 text-sm md:text-base font-medium"
                  >
                    {loading ? 'Creating Account...' : 'Create Account & Start Chat'}
                  </button>

                  <div className="text-center">
                    <button
                      onClick={() => {
                        setAuthMode('verify');
                        setError('');
                      }}
                      className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      ← Back to Login
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Messages - WhatsApp style */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 bg-gray-50">
                {error && <p className="text-red-500 text-xs md:text-sm text-center bg-red-50 p-2 rounded">{error}</p>}
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-center mt-4 text-xs md:text-sm">No messages yet. Start the conversation!</p>
                ) : (
                  Object.entries(groupMessagesByDate(messages)).map(([date, msgs]) => (
                    <div key={date}>
                      {/* Date Separator */}
                      <div className="flex justify-center my-3 md:my-4">
                        <div className="bg-white px-2 md:px-3 py-1 rounded-full shadow-sm">
                          <span className="text-[10px] md:text-xs text-gray-600 font-medium">{date}</span>
                        </div>
                      </div>
                      
                      {/* Messages for this date */}
                      {msgs.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                          <div className={`max-w-[85%] md:max-w-[75%] ${msg.sender === 'user' ? 'bg-green-500 text-white rounded-br-none' : 'bg-white rounded-bl-none'} rounded-lg shadow-sm`}>
                            <div className="px-2.5 md:px-3 py-2">
                              <p className={`text-xs md:text-sm ${msg.sender === 'user' ? 'text-white' : 'text-gray-800'} break-words`}>
                                {msg.text}
                              </p>
                              <div className="flex items-center justify-end gap-1 mt-1">
                                <span className={`text-[9px] md:text-[10px] ${msg.sender === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                                  {formatMessageTime(msg.timestamp)}
                                </span>
                                {msg.sender === 'user' && (
                                  <svg className="w-3 h-3 md:w-4 md:h-4 text-green-100" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input - Mobile friendly */}
              <form onSubmit={handleSendMessage} className="p-2 md:p-3 bg-gray-100 border-t flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border-0 bg-white p-2 md:p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-xs md:text-sm"
                />
                <button 
                  type="submit" 
                  className="bg-primary text-white p-2 md:p-3 rounded-full hover:opacity-90 transition-all hover:scale-105 flex-shrink-0 disabled:opacity-50"
                  disabled={!newMessage.trim()}
                >
                  <FaPaperPlane className="text-sm md:text-base" />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Availability Confirmation Modal */}
      {showAvailabilityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 max-w-md w-full mx-4">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Confirm Property Availability</h3>
            <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">
              It's been 90 days since you listed your property. Is your property still available?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                onClick={() => handleAvailabilityConfirmation(true)}
                className="flex-1 bg-green-500 text-white py-2.5 md:py-3 rounded-lg hover:bg-green-600 transition font-medium text-sm md:text-base"
              >
                Yes, Still Available
              </button>
              <button
                onClick={() => handleAvailabilityConfirmation(false)}
                className="flex-1 bg-red-500 text-white py-2.5 md:py-3 rounded-lg hover:bg-red-600 transition font-medium text-sm md:text-base"
              >
                No, Sold
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
