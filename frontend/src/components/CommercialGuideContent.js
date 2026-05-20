import React from 'react';
import { FaCheckCircle, FaBook, FaInfoCircle, FaClipboardList, FaBuilding, FaStore, FaWarehouse, FaMapMarkedAlt, FaShieldAlt, FaExclamationTriangle, FaFileAlt, FaUsers, FaKey, FaRoad, FaBolt, FaChartLine, FaEye, FaCalendarCheck, FaFileContract, FaFileSignature, FaTrophy, FaDollarSign, FaIndustry, FaLaptop, FaParking, FaFire, FaLightbulb, FaListUl, FaUserTie, FaUserCheck, FaStar, FaCamera } from 'react-icons/fa';

const CommercialGuideContent = () => (
  <div className="prose max-w-none">
    <div className="flex items-center gap-3 mb-6">
      <FaStore className="text-3xl text-primary" />
      <h2 className="text-3xl font-bold text-primary mb-0">COMPLETE USER GUIDE — OFFICE / COMMERCIAL SPACE & COMMERCIAL OPEN LAND</h2>
    </div>
    
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaBook className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Introduction</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Commercial real estate refers to properties used for business, trade, professional services, or 
        income-generating activities.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        Unlike residential property, commercial assets are primarily evaluated based on:
      </p>
      <div className="bg-blue-50 p-6 rounded-lg mt-4">
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Business usability</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Rental income potential</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Location economics</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Legal compliance</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Long-term return on investment</li>
        </ul>
      </div>
      <p className="text-gray-700 leading-relaxed mt-4">
        This Tanavi Guide provides a complete end-to-end understanding of commercial properties — helping buyers, 
        sellers, landlords, tenants, and investors make confident decisions.
      </p>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">1. What is Commercial Property?</h3>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        Commercial property is real estate legally approved for business or income-generating activities.
      </p>
      
      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">It includes:</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Office spaces</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Retail shops</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Showrooms</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Commercial buildings</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Co-working spaces</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Warehouses</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Commercial open land</li>
        </ul>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Ownership or Usage Types</h4>
        <p className="text-gray-700 mb-3">Commercial property transactions happen through:</p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Sale (Ownership Transfer)</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Lease (Long-term usage rights)</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Rent (Short-term occupancy)</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">2. Types of Commercial Properties</h3>
      </div>
      
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 bg-blue-50 p-5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-blue-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Office Space</h4>
          </div>
          <p className="text-gray-700 mb-2">Used for professional and corporate activities.</p>
          <p className="text-gray-600 text-sm font-medium">Examples:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm ml-2">
            <li>IT offices</li>
            <li>Consulting firms</li>
            <li>Corporate headquarters</li>
            <li>Startup offices</li>
          </ul>
        </div>

        <div className="border-l-4 border-green-500 bg-green-50 p-5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaStore className="text-green-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Retail / Shop Space</h4>
          </div>
          <p className="text-gray-700 mb-2">Business-facing locations.</p>
          <p className="text-gray-600 text-sm font-medium">Examples:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm ml-2">
            <li>Shops</li>
            <li>Boutiques</li>
            <li>Restaurants</li>
            <li>Clinics</li>
          </ul>
        </div>

        <div className="border-l-4 border-purple-500 bg-purple-50 p-5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-purple-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Commercial Building Floors</h4>
          </div>
          <p className="text-gray-700 mb-2">Entire floors or buildings used commercially.</p>
          <p className="text-gray-600 text-sm font-medium">Ideal for:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm ml-2">
            <li>Enterprises</li>
            <li>Institutions</li>
            <li>Co-working operators</li>
          </ul>
        </div>

        <div className="border-l-4 border-orange-500 bg-orange-50 p-5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaWarehouse className="text-orange-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Industrial / Warehouse Space</h4>
          </div>
          <p className="text-gray-700">Used for logistics or storage.</p>
        </div>

        <div className="border-l-4 border-teal-500 bg-teal-50 p-5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaLaptop className="text-teal-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Co-Working Space</h4>
          </div>
          <p className="text-gray-700">Shared office environments.</p>
        </div>

        <div className="border-l-4 border-yellow-500 bg-yellow-50 p-5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaMapMarkedAlt className="text-yellow-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Commercial Open Land (Commercial Open Place)</h4>
          </div>
          <p className="text-gray-700 mb-2">Vacant land approved for commercial activity.</p>
          <p className="text-gray-600 text-sm font-medium">Used for:</p>
          <ul className="space-y-1 text-gray-600 text-sm ml-2">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-yellow-500 text-xs" /> Showrooms</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-yellow-500 text-xs" /> Fuel stations</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-yellow-500 text-xs" /> Storage yards</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-yellow-500 text-xs" /> Event spaces</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-yellow-500 text-xs" /> Commercial development projects</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaMapMarkedAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">3. Commercial Zoning & Land Use (Very Important)</h3>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        Zoning determines legal business usage.
      </p>

      <div className="space-y-4">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <FaBuilding className="text-blue-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Commercial Zone</h4>
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Shops & offices allowed</li>
            <li>Business construction permitted</li>
          </ul>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <FaBuilding className="text-orange-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Mixed-Use Zone</h4>
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Residential + commercial allowed</li>
          </ul>
        </div>

        <div className="bg-gray-50 border-l-4 border-gray-500 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <FaIndustry className="text-gray-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Industrial Zone</h4>
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Manufacturing & warehouses permitted</li>
          </ul>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <FaExclamationTriangle className="text-green-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Agricultural Zone</h4>
          </div>
          <p className="text-gray-700">Commercial use NOT allowed without conversion.</p>
        </div>
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mt-4">
        <p className="text-red-700 font-semibold flex items-center gap-2">
          <FaExclamationTriangle className="text-red-600" />
          Always verify zoning before lease or purchase.
        </p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">4. Sale vs Lease vs Rent — Understanding Clearly</h3>
      </div>
      
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Type</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Meaning</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Suitable For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Sale</td>
              <td className="border border-gray-300 px-4 py-2">Full ownership transfer</td>
              <td className="border border-gray-300 px-4 py-2">Investors</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Lease</td>
              <td className="border border-gray-300 px-4 py-2">Long-term contractual usage</td>
              <td className="border border-gray-300 px-4 py-2">Businesses</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Rent</td>
              <td className="border border-gray-300 px-4 py-2">Short-term occupancy</td>
              <td className="border border-gray-300 px-4 py-2">Startups & SMEs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-4">Lease vs Rent (Key Difference)</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold mb-3 text-blue-700">Lease</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>3–15 years</li>
              <li>Fixed contractual terms</li>
              <li>Custom interiors allowed</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold mb-3 text-green-700">Rent</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>Flexible duration</li>
              <li>Easier exit</li>
              <li>Lower commitment</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaUsers className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">5. Who Should Use Commercial Properties?</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
          <h4 className="font-semibold text-lg mb-3 text-blue-800">Buyers / Investors</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Rental income seekers</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Portfolio investors</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Business owners</li>
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
          <h4 className="font-semibold text-lg mb-3 text-green-800">Tenants</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Companies</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Retail brands</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Professionals</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Startups</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
          <h4 className="font-semibold text-lg mb-3 text-purple-800">Sellers / Landlords</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Property owners seeking income or exit</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">6. Commercial Property Buyer Decision Flow (Tanavi Framework)</h3>
      </div>
      
      <div className="space-y-6">
        <div className="bg-primary text-white p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 1 — Define Business Objective</h4>
          <div className="bg-white bg-opacity-20 p-4 rounded">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-2 pr-4 font-semibold">Goal</th>
                  <th className="text-left py-2 font-semibold">Property Type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-1 pr-4">Corporate office</td><td className="py-1">Office space</td></tr>
                <tr><td className="py-1 pr-4">Retail business</td><td className="py-1">Shop/showroom</td></tr>
                <tr><td className="py-1 pr-4">Logistics</td><td className="py-1">Warehouse</td></tr>
                <tr><td className="py-1 pr-4">Investment income</td><td className="py-1">Leased office</td></tr>
                <tr><td className="py-1 pr-4">Development project</td><td className="py-1">Commercial land</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 2 — Location Evaluation</h4>
          <p className="text-gray-700 mb-3">Check:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Business visibility</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Footfall potential</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Parking availability</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Road connectivity</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Commercial demand zone</li>
          </ul>
          <p className="text-gray-600 mt-3 italic font-medium">Commercial value = Location + Business activity.</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 3 — Legal Verification</h4>
          <p className="text-gray-700 mb-3">Mandatory checks:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Ownership title</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Zoning approval</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Occupancy Certificate (OC)</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Building approvals</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Encumbrance Certificate (EC)</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Trade usage permission</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 4 — Physical Evaluation</h4>
          <p className="text-gray-700 mb-3">Inspect:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Floor efficiency</li>
            <li>Parking space</li>
            <li>Lift access</li>
            <li>Power supply</li>
            <li>Fire safety systems</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 5 — Income Potential Analysis</h4>
          <p className="text-gray-700 mb-3">Evaluate:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Rental yield</li>
            <li>Tenant demand</li>
            <li>Lease stability</li>
            <li>Area growth</li>
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 6 — Tanavi Risk Rating Review</h4>
          <p className="text-gray-700">Check investment safety.</p>
        </div>

        <div className="bg-teal-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 7 — Site Visit via Tanavi Platform</h4>
          <p className="text-gray-700">Ensures verified interaction.</p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 8 — Agreement Execution</h4>
          <p className="text-gray-700 mb-3">Includes:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Sale agreement OR</li>
            <li>Lease agreement OR</li>
            <li>Rental agreement</li>
          </ul>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 9 — Registration / Occupancy</h4>
          <p className="text-gray-700">Ownership or tenancy legally finalized.</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaMapMarkedAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">7. Commercial Open Land (Special Guide)</h3>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        Commercial open land is highly strategic.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">Key Uses</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Commercial complexes</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Warehousing yards</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Automobile showrooms</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Logistics hubs</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Fuel stations</li>
        </ul>
      </div>

      <div className="bg-green-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Important Checks</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Commercial zoning confirmed</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Road frontage width</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Access for heavy vehicles</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Conversion approval (if required)</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">8. RERA Applicability for Commercial Properties</h3>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">What is RERA?</h4>
        <p className="text-gray-700">
          RERA (Real Estate Regulatory Authority) protects buyers and regulates real estate projects.
        </p>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">When RERA Applies</h4>
        <p className="text-gray-700 mb-3">RERA registration required when:</p>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Commercial project developed by builder</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Multiple units sold commercially</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Project exceeds defined land/project size</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Under-construction commercial complexes</li>
        </ul>
        <p className="text-gray-700 font-medium mb-2">Examples:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Office towers</li>
          <li>Commercial malls</li>
          <li>Business parks</li>
        </ul>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">When RERA May NOT Apply</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Ready resale property</li>
          <li>Individual office resale</li>
          <li>Independent landlord leasing property</li>
        </ul>
      </div>

      <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">RERA Benefits for Commercial Buyers</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Project transparency</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Construction timeline accountability</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Verified approvals</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Legal complaint mechanism</li>
        </ul>
      </div>

      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">Information Developers Must Disclose Under RERA</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-orange-500" /> Land ownership details</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-orange-500" /> Project approvals</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-orange-500" /> Completion timelines</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-orange-500" /> Layout plans</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-orange-500" /> Amenities promised</li>
        </ul>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">How Users Verify RERA</h4>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Ask RERA Registration Number.</li>
          <li>Verify on official RERA website.</li>
          <li>Check project details.</li>
        </ol>
        <p className="text-gray-700 mt-3 font-medium">Tanavi assists buyers in verification.</p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">9. Commercial Investment Scenarios</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-blue-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Owner-operated business space</h4>
          </div>
          <p className="text-gray-700 text-sm">Direct business operations</p>
        </div>
        <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaChartLine className="text-green-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Rental income investment</h4>
          </div>
          <p className="text-gray-700 text-sm">Steady monthly returns</p>
        </div>
        <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-purple-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Pre-leased office purchase</h4>
          </div>
          <p className="text-gray-700 text-sm">Immediate rental income</p>
        </div>
        <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaMapMarkedAlt className="text-yellow-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Commercial land development</h4>
          </div>
          <p className="text-gray-700 text-sm">Long-term development</p>
        </div>
        <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaStore className="text-orange-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Retail appreciation strategy</h4>
          </div>
          <p className="text-gray-700 text-sm">Value growth focus</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaTrophy className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">10. Factors Affecting Commercial Property Value</h3>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg">
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <FaMapMarkedAlt className="text-red-500 text-xl" />
            <span className="text-gray-700"><strong>Business district location</strong> — Prime commercial areas</span>
          </li>
          <li className="flex items-center gap-3">
            <FaUsers className="text-blue-500 text-xl" />
            <span className="text-gray-700"><strong>Footfall</strong> — Customer traffic volume</span>
          </li>
          <li className="flex items-center gap-3">
            <FaParking className="text-gray-600 text-xl" />
            <span className="text-gray-700"><strong>Parking availability</strong> — Essential for businesses</span>
          </li>
          <li className="flex items-center gap-3">
            <FaStore className="text-purple-500 text-xl" />
            <span className="text-gray-700"><strong>Brand presence nearby</strong> — Commercial ecosystem</span>
          </li>
          <li className="flex items-center gap-3">
            <FaEye className="text-orange-500 text-xl" />
            <span className="text-gray-700"><strong>Road visibility</strong> — Business exposure</span>
          </li>
          <li className="flex items-center gap-3">
            <FaRoad className="text-green-600 text-xl" />
            <span className="text-gray-700"><strong>Infrastructure growth</strong> — Area development</span>
          </li>
          <li className="flex items-center gap-3">
            <FaChartLine className="text-teal-500 text-xl" />
            <span className="text-gray-700"><strong>Metro/highway connectivity</strong> — Accessibility</span>
          </li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">11. Commercial vs Residential Investment</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Factor</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Commercial</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Residential</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Rental Yield</td>
              <td className="border border-gray-300 px-4 py-2"><span className="text-green-600 font-semibold">Higher</span></td>
              <td className="border border-gray-300 px-4 py-2">Moderate</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Risk</td>
              <td className="border border-gray-300 px-4 py-2">Medium</td>
              <td className="border border-gray-300 px-4 py-2"><span className="text-green-600 font-semibold">Lower</span></td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Lease Duration</td>
              <td className="border border-gray-300 px-4 py-2"><span className="text-green-600 font-semibold">Long</span></td>
              <td className="border border-gray-300 px-4 py-2">Short</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Maintenance</td>
              <td className="border border-gray-300 px-4 py-2">Tenant-driven</td>
              <td className="border border-gray-300 px-4 py-2">Owner-driven</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Appreciation</td>
              <td className="border border-gray-300 px-4 py-2">Location-driven</td>
              <td className="border border-gray-300 px-4 py-2">Demand-driven</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">12. Tanavi Commercial Risk Rating System™ (TCRS)</h3>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-4">Risk Category Evaluation</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaFileAlt className="text-blue-500" />
              <h5 className="font-semibold">Legal Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Title & approvals</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaMapMarkedAlt className="text-green-500" />
              <h5 className="font-semibold">Zoning Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Business legality</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaUsers className="text-orange-500" />
              <h5 className="font-semibold">Tenant Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Income stability</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaChartLine className="text-purple-500" />
              <h5 className="font-semibold">Market Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Demand strength</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaRoad className="text-teal-500" />
              <h5 className="font-semibold">Infrastructure Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Growth certainty</p>
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
                  <FaTrophy className="text-green-600" /> Premium Investment
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-6 py-3 font-medium">75–90</td>
              <td className="px-6 py-3">
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <FaCheckCircle className="text-blue-600" /> Safe Opportunity
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-6 py-3 font-medium">60–75</td>
              <td className="px-6 py-3">
                <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  <FaEye className="text-yellow-600" /> Moderate Review
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
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">13. Buyer / Tenant Checklist</h3>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">Zoning verified</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">Building approvals checked</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">EC verified</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">Parking confirmed</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">Lease terms reviewed</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">RERA checked (if project-based)</span>
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
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">14. Seller / Landlord Guide — Listing on Tanavi</h3>
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
              <span className="text-gray-700">Ownership proof ready</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600" />
              <span className="text-gray-700">Commercial approval documents</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600" />
              <span className="text-gray-700">Floor area details shared</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600" />
              <span className="text-gray-700">Rental expectations defined</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600" />
              <span className="text-gray-700">Property photos uploaded</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaTrophy className="text-green-600" />
            Seller / Landlord Benefits
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Verified business enquiries</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Structured visits</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Professional negotiations</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Faster occupancy or sale</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaExclamationTriangle className="text-2xl text-red-600" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">15. Common Risks to Understand</h3>
      </div>
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">Residential property used illegally for business</span>
          </li>
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">Non-approved commercial construction</span>
          </li>
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">Parking disputes</span>
          </li>
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">Zoning violations</span>
          </li>
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">Unregistered lease agreements</span>
          </li>
        </ul>
        <p className="text-gray-700 font-semibold mt-4 pt-4 border-t border-red-200">
          Verification prevents most issues.
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
            For Buyers & Tenants
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600 text-xl" />
              <span className="text-gray-700">Verified commercial listings</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600 text-xl" />
              <span className="text-gray-700">Legal clarity guidance</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600 text-xl" />
              <span className="text-gray-700">Business suitability evaluation</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600 text-xl" />
              <span className="text-gray-700">Visit scheduling system</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600 text-xl" />
              <span className="text-gray-700">Documentation support</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaUserTie className="text-green-600 text-xl" />
            For Sellers & Landlords
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Qualified business leads</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Transparent listing exposure</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Structured leasing support</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Faster transactions</span>
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
              Area + Price only.
            </p>
          </div>
        </div>

        <div>
          <p className="text-gray-700 font-semibold mb-3 text-lg">Tanavi provides:</p>
          <div className="bg-white bg-opacity-70 p-4 rounded">
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Business suitability guidance</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Legal education</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Investment intelligence</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Risk transparency</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">End-to-end transaction clarity</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-gray-700 font-semibold mt-4 text-center text-lg">
          Users make informed commercial decisions.
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
          Commercial properties and commercial open land offer powerful opportunities for business growth, stable 
          income generation, and long-term investment returns when selected with proper legal and market understanding.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg">
          Through structured guidance, verified listings, regulatory awareness, and transparent processes, 
          <span className="font-semibold text-primary"> Tanavi Properties enables safe and confident commercial real estate transactions for buyers, sellers, landlords, and tenants.</span>
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

export default CommercialGuideContent;
