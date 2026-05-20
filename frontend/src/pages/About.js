import React, { useEffect, useState } from 'react';
import { FaBullseye, FaEye, FaStar, FaHome, FaUser, FaChartLine, FaSmile, FaShieldAlt, FaHandshake } from 'react-icons/fa';
import imagePng from '../assets/image.png';
import tanaviDeals from '../assets/tanavideals.jpg';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    document.body.classList.add('allow-screenshot');
    return () => document.body.classList.remove('allow-screenshot');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);
  const values = [
    { icon: FaBullseye, title: "Our Mission", description: "To deliver exceptional real estate projects that exceed customer expectations and create lasting value." },
    { icon: FaEye, title: "Our Vision", description: "To be the most trusted and preferred real estate developer in Hyderabad, known for quality and innovation." },
    { icon: FaStar, title: "Our Values", description: "Integrity, Excellence, Customer Focus, Innovation, and Sustainability guide everything we do." }
  ];

  const milestones = [
    { 
      year: "", 
      title: "Company Establishment",
      icon: FaHome,
      points: [
        "Foundation of Trust & Transparency",
        "Started with a clear vision to provide genuine real estate guidance",
        "Focused on ethical transactions and customer-first service"
      ]
    },
    { 
      year: "", 
      title: "Customer-Centric Approach",
      icon: FaUser,
      points: [
        "Understanding Needs & Delivering Value",
        "Personalized assistance for every buyer",
        "Clear communication, proper documentation guidance",
        "Steady brand growth powered by customer referrals"
      ]
    },
    { 
      year: "", 
      title: "Growth in the Right Direction",
      icon: FaChartLine,
      points: [
        "Strengthening due diligence and property verification",
        "Implemented digital support and improved responsiveness",
        "Increased customer trust through reliable project offerings"
      ]
    },
    { 
      year: "", 
      title: "Thousands of Happy Customers",
      icon: FaSmile,
      points: [
        "Converting Dreams into Smiles",
        "Delivered safe, secure, and profitable property options",
        "Built strong credibility through honesty and clarity",
        "Helped thousands of families achieve ownership with confidence"
      ]
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="relative h-[346px] bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in">About Tanavi Properties</h1>
          <p className="text-xl">Building Dreams, Creating Landmarks</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800" 
              alt="Tanavi Properties" 
              className="rounded-lg shadow-2xl w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">
              WHO WE ARE
              <div className="w-24 h-1 bg-primary mt-2"></div>
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Founded by <strong>Mr. Balraj Sinthigari</strong>, a visionary entrepreneur driven by a passion for excellence, Tanavi Properties has evolved into a trusted real estate platform that seamlessly and transparently connects people to their dream properties with integrity.
              </p>
              <p>
                <strong>We specialize in Agriculture Lands, Open Plots, Independent Houses, Farmhouses, Apartments, and Commercial Spaces, helping buyers and sellers make confident and informed real estate decisions across diverse locations.</strong>
              </p>
              <p>
                Beyond property listings, we deliver end-to-end real estate solutions — including <strong>farmhouse development, civil engineering, interior design, precast structures, and fencing services.</strong> Every project is managed by experienced professionals dedicated to quality, precision, and customer satisfaction.
              </p>
              <p>
                With the support of trusted legal and financial partners and a network of skilled technical experts, Tanavi Properties ensures that every transaction is secure, transparent, and rewarding. Our commitment to eco-friendly development further reflects our responsibility toward sustainable growth.
              </p>
              <p>
                <strong>Driven by trust, transparency, and innovation,</strong> Tanavi Properties advances with the strategic vision of Mr. Balraj Sinthigari, Founder & Managing Director, <strong>turning real-estate aspirations into long-term success.</strong> We enable customers and investors to unlock opportunities that shape their future with confidence.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <IconComponent className="text-6xl mb-4 text-primary mx-auto" />
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* TANAVI DEALS & SERVICES Carousel */}
        <div className="mb-16">
          <div className="relative overflow-hidden">
            {/* TANAVI DEALS Slide */}
            <div className={`transition-all duration-700 ${currentSlide === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute inset-0'}`}>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-3">TANAVI DEALS</h2>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-1 w-20 bg-gradient-to-r from-transparent to-primary"></div>
                  <p className="text-lg text-gray-600 font-medium">Diverse Properties, Endless Possibilities</p>
                  <div className="h-1 w-20 bg-gradient-to-l from-transparent to-primary"></div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="max-w-6xl w-full">
                  <img 
                    src={tanaviDeals} 
                    alt="TANAVI DEALS - Property Types" 
                    className="w-full max-h-[65vh] object-contain mx-auto"
                  />
                </div>
              </div>
            </div>

            {/* TANAVI SERVICES Slide */}
            <div className={`transition-all duration-700 ${currentSlide === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute inset-0'}`}>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-3">TANAVI SERVICES</h2>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-1 w-20 bg-gradient-to-r from-transparent to-secondary"></div>
                  <p className="text-lg text-gray-600 font-medium">Complete Real Estate Solutions Under One Roof</p>
                  <div className="h-1 w-20 bg-gradient-to-l from-transparent to-secondary"></div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="max-w-6xl w-full">
                  <img 
                    src={imagePng} 
                    alt="TANAVI SERVICES - Real Estate Solutions" 
                    className="w-full max-h-[65vh] object-contain mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentSlide(0)}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === 0 ? 'bg-primary w-8' : 'bg-gray-300'}`}
              aria-label="Show TANAVI DEALS"
            />
            <button
              onClick={() => setCurrentSlide(1)}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === 1 ? 'bg-secondary w-8' : 'bg-gray-300'}`}
              aria-label="Show TANAVI SERVICES"
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                return (
                <div key={index} className="relative pl-20">
                  <div className="absolute left-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <IconComponent className="text-white text-2xl" />
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    {milestone.year && <h3 className="text-2xl font-bold text-gray-800 mb-2">{milestone.year}</h3>}
                    <h4 className="text-xl font-bold text-gray-800 mb-3">{milestone.title}</h4>
                    <ul className="space-y-2">
                      {milestone.points.map((point, i) => (
                        <li key={i} className="text-gray-700 flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div>
            <h2 className="text-4xl font-bold text-center mb-3">How Tanavi Properties Helps You Succeed</h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-16 bg-amber-400"></div>
              <p className="text-gray-600 text-lg">A Simple, Trusted Property Journey</p>
              <div className="h-px w-16 bg-amber-400"></div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-100 via-emerald-50 to-amber-50 rounded-3xl p-8 border border-emerald-100 shadow-[0_20px_50px_rgba(16,185,129,0.15)]">
              <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-3">
                {/* Step 1 */}
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-r from-emerald-700 to-green-600 text-white text-xs font-bold px-5 py-1.5 rounded-full inline-block mb-3 shadow-md">STEP 1</div>
                  <div className="bg-gradient-to-b from-white to-emerald-50/40 border border-emerald-100 rounded-xl p-4 shadow-lg w-56 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gradient-to-br from-emerald-100 to-green-200 p-3 rounded-full mb-2 shadow-sm">
                        <FaShieldAlt className="text-emerald-700 text-3xl" />
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm mb-3 leading-tight">Identify a Trusted Platform</h3>
                      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-500 text-white py-2 px-3 rounded-lg w-full shadow-[0_8px_16px_rgba(217,119,6,0.4)] hover:shadow-[0_12px_24px_rgba(217,119,6,0.5)] transition-all duration-300 border border-amber-400/30">
                        <p className="text-xs font-semibold tracking-wide">Start with Confidence</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center flex-shrink-0">
                  <div className="text-gray-400 text-2xl">»</div>
                </div>

                {/* Step 2 */}
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-r from-emerald-700 to-green-600 text-white text-xs font-bold px-5 py-1.5 rounded-full inline-block mb-3 shadow-md">STEP 2</div>
                  <div className="bg-gradient-to-b from-white to-emerald-50/40 border border-emerald-100 rounded-xl p-4 shadow-lg w-56 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gradient-to-br from-emerald-100 to-green-200 p-3 rounded-full mb-2 shadow-sm">
                        <FaHome className="text-emerald-700 text-3xl" />
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm mb-3 leading-tight">Select the Right Property</h3>
                      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-500 text-white py-2 px-3 rounded-lg w-full shadow-[0_8px_16px_rgba(217,119,6,0.4)] hover:shadow-[0_12px_24px_rgba(217,119,6,0.5)] transition-all duration-300 border border-amber-400/30">
                        <p className="text-xs font-semibold tracking-wide">Choose What Truly Fits You</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center flex-shrink-0">
                  <div className="text-gray-400 text-2xl">»</div>
                </div>

                {/* Step 3 */}
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-r from-emerald-700 to-green-600 text-white text-xs font-bold px-5 py-1.5 rounded-full inline-block mb-3 shadow-md">STEP 3</div>
                  <div className="bg-gradient-to-b from-white to-emerald-50/40 border border-emerald-100 rounded-xl p-4 shadow-lg w-56 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gradient-to-br from-emerald-100 to-green-200 p-3 rounded-full mb-2 shadow-sm">
                        <FaHandshake className="text-emerald-700 text-3xl" />
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm mb-3 leading-tight">Close the Deal Successfully</h3>
                      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-500 text-white py-2 px-3 rounded-lg w-full shadow-[0_8px_16px_rgba(217,119,6,0.4)] hover:shadow-[0_12px_24px_rgba(217,119,6,0.5)] transition-all duration-300 border border-amber-400/30">
                        <p className="text-xs font-semibold tracking-wide">Smooth, Transparent & Secure</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center flex-shrink-0">
                  <div className="text-gray-400 text-2xl">»</div>
                </div>

                {/* Step 4 */}
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-r from-emerald-700 to-green-600 text-white text-xs font-bold px-5 py-1.5 rounded-full inline-block mb-3 shadow-md">STEP 4</div>
                  <div className="bg-gradient-to-b from-white to-emerald-50/40 border border-emerald-100 rounded-xl p-4 shadow-lg w-56 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gradient-to-br from-emerald-100 to-green-200 p-3 rounded-full mb-2 shadow-sm">
                        <FaSmile className="text-emerald-700 text-3xl" />
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm mb-3 leading-tight">A Happy Family, A Confident Decision</h3>
                      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-500 text-white py-2 px-3 rounded-lg w-full shadow-[0_8px_16px_rgba(217,119,6,0.4)] hover:shadow-[0_12px_24px_rgba(217,119,6,0.5)] transition-all duration-300 border border-amber-400/30">
                        <p className="text-xs font-semibold tracking-wide">Because Trust Creates Happiness</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
