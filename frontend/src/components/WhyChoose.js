import React, { useState, useEffect } from 'react';
import { FaShieldAlt, FaHome, FaHandshake, FaSmile } from 'react-icons/fa';

const WhyChoose = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('why-choose');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const steps = [
    { step: 'STEP 1', icon: FaShieldAlt, title: 'Identify a Trusted Platform', subtitle: 'Start with Confidence' },
    { step: 'STEP 2', icon: FaHome, title: 'Select the Right Property', subtitle: 'Choose What Truly Fits You' },
    { step: 'STEP 3', icon: FaHandshake, title: 'Close the Deal Successfully', subtitle: 'Smooth, Transparent & Secure' },
    { step: 'STEP 4', icon: FaSmile, title: 'A Happy Family, A Confident Decision', subtitle: 'Because Trust Creates Happiness' }
  ];

  return (
    <section id="why-choose" className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">How Tanavi Properties Helps You Succeed</h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px w-16 bg-amber-400"></div>
            <p className="text-gray-600 text-lg">A Simple, Trusted Property Journey</p>
            <div className="h-px w-16 bg-amber-400"></div>
          </div>
          
          <div className="bg-gradient-to-b from-gray-100 to-white rounded-2xl p-8 shadow-inner">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={index}>
                    <div className="flex-shrink-0">
                      <div className="bg-primary text-white text-xs font-bold px-5 py-1.5 rounded-full inline-block mb-3">{step.step}</div>
                      <div className="bg-secondary/20 border border-secondary rounded-lg p-4 shadow-sm w-56">
                        <div className="flex flex-col items-center text-center">
                          <div className="bg-secondary/30 p-3 rounded-full mb-2">
                            <Icon className="text-primary text-3xl" />
                          </div>
                          <h3 className="font-bold text-textDark text-sm mb-3 leading-tight">{step.title}</h3>
                          <div className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-3 rounded w-full">
                            <p className="text-xs font-medium">{step.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:flex items-center justify-center flex-shrink-0">
                        <div className="text-gray-400 text-2xl">»</div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
