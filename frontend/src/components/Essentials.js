import React, { useState } from 'react';
import { FaFileContract, FaShieldAlt } from 'react-icons/fa';
import TermsModal from './TermsModal';
import PrivacyModal from './PrivacyModal';

const Essentials = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Essentials</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <button
              onClick={() => setShowTerms(true)}
              className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <FaFileContract className="text-4xl" />
              <span className="text-xl font-semibold">TERMS & CONDITIONS</span>
            </button>

            <button
              onClick={() => setShowPrivacy(true)}
              className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-secondary to-primary text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <FaShieldAlt className="text-4xl" />
              <span className="text-xl font-semibold">PRIVACY POLICY</span>
            </button>
          </div>
        </div>
      </section>

      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </>
  );
};

export default Essentials;
