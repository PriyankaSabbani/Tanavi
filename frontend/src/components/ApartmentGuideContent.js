import React from 'react';
import { FaCheckCircle, FaBook, FaInfoCircle, FaClipboardList, FaChartLine, FaFileAlt, FaShieldAlt, FaUsers, FaExclamationTriangle, FaEye, FaWind, FaHammer, FaTint, FaArrowsAltV, FaBell, FaCalendarCheck, FaFileContract, FaUniversity, FaKey, FaHome, FaDollarSign, FaTrophy, FaExchangeAlt, FaMapMarkerAlt, FaAward, FaBuilding, FaWifi, FaRoad, FaTools, FaUserCheck, FaCamera, FaListUl, FaUserTie, FaRocket, FaFileSignature, FaStar, FaLightbulb } from 'react-icons/fa';

const ApartmentGuideContent = () => (
  <div className="prose max-w-none">
    <div className="flex items-center gap-3 mb-6">
      <FaBuilding className="text-3xl text-primary" />
      <h2 className="text-3xl font-bold text-primary mb-0">COMPLETE USER GUIDE — APARTMENT / FLAT</h2>
    </div>
    
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaBook className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Introduction</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        An Apartment (Flat) is one of the most preferred urban real estate assets, combining home ownership, 
        shared infrastructure, security, and lifestyle amenities within a planned residential building.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        Unlike land investments, apartments provide immediate usability, structured community living, and potential rental income.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        This Tanavi Guide explains the complete apartment journey — from project selection and legal verification 
        to ownership transfer and long-term investment understanding.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4 font-semibold">
        Tanavi Properties ensures users make safe, informed, and confident decisions.
      </p>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">1. What is an Apartment / Flat?</h3>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        An Apartment (Flat) is a residential unit inside a multi-storey building where:
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
        <li>Individual owners own their unit.</li>
        <li>Common areas are shared among residents.</li>
      </ul>
      
      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">Ownership Includes</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Registered apartment unit</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Undivided Share (UDS) of land</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Access to common amenities</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Association membership rights</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Utility infrastructure usage</li>
        </ul>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Understanding UDS (Undivided Share of Land)</h4>
        <p className="text-gray-700 mb-3">
          UDS represents your proportional ownership in the land on which the building stands.
        </p>
        <p className="text-gray-700 mb-3">
          👉 <strong>Higher UDS = Better long-term asset value.</strong>
        </p>
        <p className="text-gray-700">
          Even if the building redevelops in future, land ownership remains valuable.
        </p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">2. Types of Apartments</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-blue-500" />
            <h4 className="font-semibold text-lg mb-0">Builder Apartment</h4>
          </div>
          <p className="text-gray-700">Constructed and sold by a real estate developer.</p>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-green-500" />
            <h4 className="font-semibold text-lg mb-0">Gated Community Apartment</h4>
          </div>
          <p className="text-gray-700">Large projects with amenities and security.</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-purple-500" />
            <h4 className="font-semibold text-lg mb-0">Luxury Apartment</h4>
          </div>
          <p className="text-gray-700">Premium location, high-end specifications.</p>
        </div>
        <div className="border-l-4 border-orange-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-orange-500" />
            <h4 className="font-semibold text-lg mb-0">Affordable Housing Apartment</h4>
          </div>
          <p className="text-gray-700">Budget-friendly units under government or private schemes.</p>
        </div>
        <div className="border-l-4 border-teal-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-teal-500" />
            <h4 className="font-semibold text-lg mb-0">Ready-to-Move Apartment</h4>
          </div>
          <p className="text-gray-700">Construction completed; immediate possession.</p>
        </div>
        <div className="border-l-4 border-yellow-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-yellow-500" />
            <h4 className="font-semibold text-lg mb-0">Under-Construction Apartment</h4>
          </div>
          <p className="text-gray-700">Purchased during construction phase.</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">3. Apartment Classifications (Configuration Types)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Suitable For</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-300 px-4 py-2">1 BHK</td><td className="border border-gray-300 px-4 py-2">Individuals / small families</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">2 BHK</td><td className="border border-gray-300 px-4 py-2">Nuclear families</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">3 BHK</td><td className="border border-gray-300 px-4 py-2">Growing families</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">4+ BHK</td><td className="border border-gray-300 px-4 py-2">Premium living</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Studio</td><td className="border border-gray-300 px-4 py-2">Investment / rental use</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Penthouse</td><td className="border border-gray-300 px-4 py-2">Luxury buyers</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaFileAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">4. Apartment Zoning & Building Permissions</h3>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        Apartments must comply with city planning regulations.
      </p>
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Required Permissions</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Residential zoning approval</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Building plan approval</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Height clearance (if applicable)</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Fire safety clearance</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Environmental clearance (large projects)</li>
        </ul>
        <div className="bg-red-50 p-4 rounded-lg mt-4">
          <p className="text-red-700 font-medium">
            <FaExclamationTriangle className="inline mr-2" />
            Without approvals, resale and financing may become difficult.
          </p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">5. RERA — Mandatory Protection for Apartment Buyers</h3>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">What is RERA?</h4>
        <p className="text-gray-700">
          RERA (Real Estate Regulatory Authority) protects buyers by regulating real estate developers and projects 
          under the Real Estate (Regulation and Development) Act, 2016.
        </p>
      </div>

      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">When RERA Applies (Very Important)</h4>
        <p className="text-gray-700 mb-3">RERA registration is mandatory when:</p>
        <ul className="space-y-2 text-gray-700 mb-3">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Project land exceeds defined size limits</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Multiple units are sold as a project</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Builder markets under-construction apartments</li>
        </ul>
        <p className="text-gray-700 font-semibold">
          👉 Most apartment projects fall under RERA.
        </p>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">What RERA Ensures</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Project registration before sale</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Transparent project details</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Defined delivery timelines</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Financial discipline by builder</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Legal accountability</li>
        </ul>
      </div>

      <div className="bg-orange-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">Information Available Under RERA</h4>
        <p className="text-gray-700 mb-3">Developers must disclose:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Land ownership documents</li>
          <li>Approved plans</li>
          <li>Construction status</li>
          <li>Completion timeline</li>
          <li>Amenities promised</li>
          <li>Litigation details</li>
        </ul>
      </div>

      <div className="bg-teal-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">Buyer Protection Under RERA</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Protection from project delays</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> No misleading advertisements</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Compensation rights</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Complaint resolution mechanism</li>
        </ul>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">How Buyers Verify RERA</h4>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Ask for RERA Registration Number</li>
          <li>Check official state RERA portal</li>
          <li>Verify approvals and timelines</li>
        </ol>
        <p className="text-gray-700 mt-3 font-medium">Tanavi helps users understand RERA status clearly.</p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">6. Ready-to-Move vs Under-Construction</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Factor</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Ready</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Under Construction</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-300 px-4 py-2">Possession</td><td className="border border-gray-300 px-4 py-2">Immediate</td><td className="border border-gray-300 px-4 py-2">Future</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Risk</td><td className="border border-gray-300 px-4 py-2">Low</td><td className="border border-gray-300 px-4 py-2">Moderate</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Price</td><td className="border border-gray-300 px-4 py-2">Higher</td><td className="border border-gray-300 px-4 py-2">Lower</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Rental Income</td><td className="border border-gray-300 px-4 py-2">Immediate</td><td className="border border-gray-300 px-4 py-2">Delayed</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">RERA Importance</td><td className="border border-gray-300 px-4 py-2">Moderate</td><td className="border border-gray-300 px-4 py-2">Very High</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaUsers className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">7. Who Should Buy Apartments?</h3>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Ideal for:</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> End users</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> First-time homeowners</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Rental income investors</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Urban professionals</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Lifestyle-focused families</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">8. Tanavi Apartment Buyer Decision Flow</h3>
      </div>
      
      <div className="space-y-6">
        <div className="bg-primary text-white p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 1 — Define Purpose</h4>
          <div className="bg-white bg-opacity-20 p-4 rounded">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-2 pr-4 font-semibold">Goal</th>
                  <th className="text-left py-2 font-semibold">Apartment Type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-1 pr-4">Self-living</td><td className="py-1">Ready-to-move</td></tr>
                <tr><td className="py-1 pr-4">Investment</td><td className="py-1">Growth corridor project</td></tr>
                <tr><td className="py-1 pr-4">Rental income</td><td className="py-1">Near IT/business zones</td></tr>
                <tr><td className="py-1 pr-4">Premium lifestyle</td><td className="py-1">Gated community</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 2 — Location Evaluation</h4>
          <p className="text-gray-700 mb-3">Check:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Work location connectivity</li>
            <li>Schools & hospitals</li>
            <li>Metro/highway access</li>
            <li>Commercial hubs</li>
            <li>Future infrastructure</li>
          </ul>
          <p className="text-gray-600 mt-3 italic">Location impacts resale and rental demand.</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 3 — Builder Verification</h4>
          <p className="text-gray-700 mb-3">Verify:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Builder reputation</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Past project delivery</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Construction quality</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> RERA compliance</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 4 — Legal Verification</h4>
          <p className="text-gray-700 mb-3">Check:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Title documents</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Approved building plan</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> RERA registration</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Occupancy Certificate (OC)</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Completion Certificate (CC)</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 5 — Financial Evaluation</h4>
          <p className="text-gray-700 mb-3">Understand:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Total cost (not just base price)</li>
            <li>Maintenance charges</li>
            <li>Parking charges</li>
            <li>Registration costs</li>
            <li>GST (if applicable)</li>
          </ul>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 6 — Physical Inspection</h4>
          <p className="text-gray-700 mb-3">Inspect:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaWind className="text-blue-500" /> Ventilation</li>
            <li className="flex items-center gap-2"><FaHammer className="text-gray-600" /> Construction quality</li>
            <li className="flex items-center gap-2"><FaTint className="text-blue-600" /> Water supply</li>
            <li className="flex items-center gap-2"><FaArrowsAltV className="text-gray-700" /> Lift facilities</li>
            <li className="flex items-center gap-2"><FaBell className="text-red-500" /> Safety systems</li>
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 7 — Tanavi Risk Rating Review</h4>
          <p className="text-gray-700">Evaluate safety before purchase.</p>
        </div>

        <div className="bg-teal-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 8 — Schedule Visit via Tanavi</h4>
          <p className="text-gray-700">Structured visits ensure verified interaction.</p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 9 — Booking → Agreement → Registration</h4>
          <p className="text-gray-700 mb-3">Includes:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCalendarCheck className="text-green-500" /> Booking confirmation</li>
            <li className="flex items-center gap-2"><FaFileContract className="text-blue-500" /> Sale agreement</li>
            <li className="flex items-center gap-2"><FaUniversity className="text-purple-500" /> Bank loan processing</li>
            <li className="flex items-center gap-2"><FaFileAlt className="text-orange-500" /> Registration</li>
            <li className="flex items-center gap-2"><FaKey className="text-yellow-600" /> Possession handover</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">9. Tanavi Apartment Risk Rating System™ (TARS)</h3>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-4">Risk Category Evaluation</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaFileAlt className="text-blue-500" />
              <h5 className="font-semibold">Legal Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Approvals & documentation</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaBuilding className="text-green-500" />
              <h5 className="font-semibold">Builder Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Delivery history</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaHammer className="text-orange-500" />
              <h5 className="font-semibold">Construction Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Quality standards</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaChartLine className="text-purple-500" />
              <h5 className="font-semibold">Market Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Demand & resale</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaDollarSign className="text-yellow-600" />
              <h5 className="font-semibold">Financial Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Pricing realism</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        <h4 className="font-semibold text-lg bg-gray-100 px-6 py-3">Rating Scale</h4>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left font-semibold">Score</th>
              <th className="px-6 py-3 text-left font-semibold">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-6 py-3 font-medium">90–100</td>
              <td className="px-6 py-3">
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  <FaTrophy className="text-green-600" /> Premium Safe
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-6 py-3 font-medium">75–90</td>
              <td className="px-6 py-3">
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <FaCheckCircle className="text-blue-600" /> Safe
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-6 py-3 font-medium">60–75</td>
              <td className="px-6 py-3">
                <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  <FaEye className="text-yellow-600" /> Review Needed
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-6 py-3 font-medium">40–60</td>
              <td className="px-6 py-3">
                <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  <FaExclamationTriangle className="text-orange-600" /> Risky
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-6 py-3 font-medium">Below 40</td>
              <td className="px-6 py-3">
                <span className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-full">
                  <FaExclamationTriangle className="text-red-600" /> Avoid
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">10. Investment Scenarios</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaHome className="text-blue-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Self-occupation</h4>
          </div>
          <p className="text-gray-700 text-sm">Primary residence for personal use</p>
        </div>
        <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaDollarSign className="text-green-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Rental income investment</h4>
          </div>
          <p className="text-gray-700 text-sm">Generate monthly rental returns</p>
        </div>
        <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaChartLine className="text-purple-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Appreciation resale</h4>
          </div>
          <p className="text-gray-700 text-sm">Long-term value growth strategy</p>
        </div>
        <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaExchangeAlt className="text-orange-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Upgrade strategy</h4>
          </div>
          <p className="text-gray-700 text-sm">Sell and move to better property</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaAward className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">11. Factors Affecting Apartment Value</h3>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg">
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-red-500 text-xl" />
            <span className="text-gray-700"><strong>Location demand</strong> — Proximity to key areas</span>
          </li>
          <li className="flex items-center gap-3">
            <FaAward className="text-yellow-600 text-xl" />
            <span className="text-gray-700"><strong>Builder reputation</strong> — Track record matters</span>
          </li>
          <li className="flex items-center gap-3">
            <FaBuilding className="text-blue-500 text-xl" />
            <span className="text-gray-700"><strong>Floor level</strong> — Higher floors often premium</span>
          </li>
          <li className="flex items-center gap-3">
            <FaWifi className="text-purple-500 text-xl" />
            <span className="text-gray-700"><strong>Amenities</strong> — Gym, pool, clubhouse</span>
          </li>
          <li className="flex items-center gap-3">
            <FaRoad className="text-gray-600 text-xl" />
            <span className="text-gray-700"><strong>Connectivity</strong> — Transport access</span>
          </li>
          <li className="flex items-center gap-3">
            <FaFileAlt className="text-green-500 text-xl" />
            <span className="text-gray-700"><strong>UDS proportion</strong> — Land share value</span>
          </li>
          <li className="flex items-center gap-3">
            <FaTools className="text-orange-500 text-xl" />
            <span className="text-gray-700"><strong>Maintenance quality</strong> — Upkeep standards</span>
          </li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaExchangeAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">12. Apartment vs Open Plot Comparison</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Factor</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Apartment</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Open Plot</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Rental Income</td>
              <td className="border border-gray-300 px-4 py-2"><span className="text-green-600 font-semibold">Yes</span></td>
              <td className="border border-gray-300 px-4 py-2"><span className="text-red-600 font-semibold">No</span></td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Maintenance</td>
              <td className="border border-gray-300 px-4 py-2">Moderate</td>
              <td className="border border-gray-300 px-4 py-2">Very Low</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Appreciation</td>
              <td className="border border-gray-300 px-4 py-2">Moderate</td>
              <td className="border border-gray-300 px-4 py-2">High (long-term)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Usage</td>
              <td className="border border-gray-300 px-4 py-2"><span className="text-green-600 font-semibold">Immediate</span></td>
              <td className="border border-gray-300 px-4 py-2">Future</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Liquidity</td>
              <td className="border border-gray-300 px-4 py-2"><span className="text-green-600 font-semibold">High</span></td>
              <td className="border border-gray-300 px-4 py-2">Medium</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">13. Buyer Checklist</h3>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">RERA verified</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">Builder credibility checked</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">Approved plans verified</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">OC & CC confirmed</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">Loan eligibility checked</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">Maintenance understood</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">Risk score reviewed</span>
          </li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaUserTie className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">14. Seller Guide — Listing Apartment on Tanavi</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaListUl className="text-blue-600" />
            Before Listing
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600" />
              <span className="text-gray-700">Ownership documents ready</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600" />
              <span className="text-gray-700">Accurate carpet & built-up area</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600" />
              <span className="text-gray-700">Maintenance details shared</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600" />
              <span className="text-gray-700">Amenity list uploaded</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600" />
              <span className="text-gray-700">Clear photos provided</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaTrophy className="text-green-600" />
            Seller Benefits
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Verified buyer leads</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Structured visit scheduling</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Serious enquiries only</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Faster conversion support</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaExclamationTriangle className="text-2xl text-red-600" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">15. Common Risks Buyers Must Understand</h3>
      </div>
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">Non-RERA projects</span>
          </li>
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">Project delays</span>
          </li>
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">Hidden charges</span>
          </li>
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">Poor construction quality</span>
          </li>
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">Low resale locations</span>
          </li>
        </ul>
        <p className="text-gray-700 font-semibold mt-4 pt-4 border-t border-red-200">
          Verification reduces most risks.
        </p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-primary" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">16. How Tanavi Properties Supports Users</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaUserCheck className="text-blue-600 text-xl" />
            For Buyers
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600 text-xl" />
              <span className="text-gray-700">Verified listings</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600 text-xl" />
              <span className="text-gray-700">RERA awareness</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600 text-xl" />
              <span className="text-gray-700">Risk transparency</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600 text-xl" />
              <span className="text-gray-700">Visit scheduling</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600 text-xl" />
              <span className="text-gray-700">Documentation guidance</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaUserTie className="text-green-600 text-xl" />
            For Sellers
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Trusted exposure</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Qualified buyers</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Transparent listing process</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Faster deal closure</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaStar className="text-2xl text-yellow-500" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Why Tanavi Guide is Different</h3>
      </div>
      
      <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 p-6 rounded-lg border-2 border-yellow-300">
        <div className="mb-6">
          <p className="text-gray-700 font-medium mb-3">Most platforms show:</p>
          <div className="bg-white bg-opacity-70 p-4 rounded">
            <p className="text-gray-600 flex items-center gap-2">
              <FaCamera className="text-gray-500" />
              Photos + Price only.
            </p>
          </div>
        </div>

        <div>
          <p className="text-gray-700 font-semibold mb-3 text-lg">Tanavi provides:</p>
          <div className="bg-white bg-opacity-70 p-4 rounded">
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Legal understanding</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">RERA education</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Risk intelligence</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Investment clarity</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Decision framework</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-gray-700 font-semibold mt-4 text-center text-lg">
          Users feel guided and protected.
        </p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaCheckCircle className="text-2xl text-green-600" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Conclusion</h3>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-8 rounded-lg border-2 border-green-300">
        <p className="text-gray-700 leading-relaxed text-lg mb-4">
          Apartments provide immediate living comfort, rental opportunities, and structured urban investment 
          when chosen with proper verification and planning.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg">
          Through verified listings, RERA transparency, structured decision systems, and end-to-end guidance, 
          <span className="font-semibold text-primary"> Tanavi Properties enables confident apartment ownership for every buyer and seller.</span>
        </p>
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <FaShieldAlt className="text-primary text-xl" />
            <span className="font-semibold text-gray-800">Safe • Informed • Confident</span>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default ApartmentGuideContent;
