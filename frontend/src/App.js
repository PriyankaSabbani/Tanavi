import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CallButton from './components/CallButton';
import ScrollToTopButton from './components/ScrollToTopButton';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import About from './pages/About';
import PropertyDetails from './pages/PropertyDetails';
import CategoryProperties from './pages/CategoryProperties';
import Blogs from './pages/Blogs';
import BuySell from './pages/BuySell';
import GalleryDetail from './pages/GalleryDetail';
import Leadership from './pages/Leadership';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import CallLog from './pages/CallLog';
import ChoiceCategoryProperties from './pages/ChoiceCategoryProperties';
import ListProperty from './pages/ListProperty';
import Guide from './pages/Guide';

import Profile from './pages/Profile';

const scrollPositions = {};

function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);
  
  useEffect(() => {
    const savedPosition = scrollPositions[location.key];
    if (savedPosition !== undefined) {
      setTimeout(() => window.scrollTo(0, savedPosition), 0);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      scrollPositions[location.key] = window.scrollY;
    };
  }, [location]);
  
  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/category/:category" element={<CategoryProperties />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/buy-sell" element={<BuySell />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/gallery/:id" element={<GalleryDetail />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/call-log" element={<CallLog />} />
            <Route path="/choice-category/:category" element={<ChoiceCategoryProperties />} />
            <Route path="/list-property" element={<ListProperty />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
          <CallButton />
          <ScrollToTopButton />
          <ChatWidget />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
