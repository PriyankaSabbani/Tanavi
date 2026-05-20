    import React, { useState } from 'react';
import { 
  FaLeaf, 
  FaHome, 
  FaMapMarkedAlt, 
  FaBuilding, 
  FaTree, 
  FaStore,
  FaBook,
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaClipboardList,
  FaChartLine,
  FaShieldAlt,
  FaFileAlt,
  FaUsers,
  FaLightbulb
} from 'react-icons/fa';
import ApartmentGuideContent from '../components/ApartmentGuideContent';
import FarmhouseGuideContent from '../components/FarmhouseGuideContent';
import CommercialGuideContent from '../components/CommercialGuideContent';

const Guide = () => {
  const [activeSection, setActiveSection] = useState('agricultural');

  const sections = [
    { id: 'agricultural', name: 'Agricultural Land', icon: FaLeaf },
    { id: 'independent', name: 'Independent House', icon: FaHome },
    { id: 'plot', name: 'Open Plot', icon: FaMapMarkedAlt },
    { id: 'apartment', name: 'Apartment', icon: FaBuilding },
    { id: 'farmhouse', name: 'Farmhouse', icon: FaTree },
    { id: 'commercial', name: 'Commercial', icon: FaStore }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaLeaf className="text-4xl text-primary" />
            <h1 className="text-4xl font-bold text-gray-900">TANAVI GUIDE</h1>
          </div>
          <p className="text-xl text-gray-600">Professional • Structured • Easy for Any User to Understand</p>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition border-2 ${
                  activeSection === section.id
                    ? 'bg-primary text-white shadow-lg border-primary'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300 hover:border-primary'
                }`}
              >
                <Icon className="text-xl" />
                {section.name}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {activeSection === 'agricultural' && <AgriculturalLandGuide />}
          {activeSection === 'independent' && <IndependentHouseGuide />}
          {activeSection === 'plot' && <OpenPlotGuide />}
          {activeSection === 'apartment' && <ApartmentGuideContent />}
          {activeSection === 'farmhouse' && <FarmhouseGuideContent />}
          {activeSection === 'commercial' && <CommercialGuideContent />}
        </div>
      </div>
    </div>
  );
};
// Agricultural Land Guide Component
const AgriculturalLandGuide = () => (
  <div className="prose max-w-none">
    <div className="flex items-center gap-3 mb-6">
      <FaLeaf className="text-3xl text-primary" />
      <h2 className="text-3xl font-bold text-primary mb-0">USER GUIDE — AGRICULTURAL LAND</h2>
    </div>
    
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaBook className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Introduction</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Agricultural land is one of the most traditional, secure, and long-term forms of real estate investment. 
        Unlike residential plots or commercial properties, agricultural land involves specific legal classifications, 
        zoning regulations, permitted usage rules, and future development considerations.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        Buying or selling agricultural land without proper understanding may lead to legal or financial risks. 
        Therefore, Tanavi Properties has created this complete guide to help users make safe, informed, and confident decisions.
      </p>
      <div className="bg-blue-50 p-6 rounded-lg mt-4">
        <h4 className="font-semibold text-lg mb-3">This guide explains:</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>What agricultural land is</li>
          <li>Types of agricultural land</li>
          <li>Zoning and permitted uses</li>
          <li>Legal verification process</li>
          <li>Investment decision framework</li>
          <li>Conversion possibilities</li>
          <li>Risk evaluation system</li>
          <li>Buyer & seller checklists</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">What is Agricultural Land?</h3>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        Agricultural land refers to land legally designated for farming and allied agricultural activities under 
        government revenue and planning regulations.
      </p>
      <div className="bg-green-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Primary Uses</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Crop cultivation</li>
          <li>Horticulture & plantations</li>
          <li>Dairy and livestock farming</li>
          <li>Organic agriculture</li>
          <li>Agro-based activities</li>
          <li>Farmhouses (subject to approvals)</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Types of Agricultural Land</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border-l-4 border-green-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-green-500" />
            <h4 className="font-semibold text-lg mb-0">Wet Land (Irrigated Land)</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Continuous water availability</li>
            <li>• Suitable for paddy, vegetables, sugarcane</li>
            <li>• High productivity</li>
            <li>• Higher resale value</li>
            <li>• Ideal for: Active farming investors</li>
          </ul>
        </div>
        <div className="border-l-4 border-yellow-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-yellow-500" />
            <h4 className="font-semibold text-lg mb-0">Dry Land (Rain-fed Land)</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Depends on rainfall</li>
            <li>• Lower purchase cost</li>
            <li>• Suitable for cotton, millets, pulses</li>
            <li>• Ideal for: Long-term investment or land banking</li>
          </ul>
        </div>
        <div className="border-l-4 border-orange-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-orange-500" />
            <h4 className="font-semibold text-lg mb-0">Garden / Horticulture Land</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Used for fruit and plantation crops</li>
            <li>• Mango, Coconut, Flowers, Palm plantations</li>
            <li>• Provides recurring agricultural income</li>
          </ul>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-purple-500" />
            <h4 className="font-semibold text-lg mb-0">Plantation Land</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Commercial agricultural usage</li>
            <li>• Coffee, Tea, Rubber, Cashew, Oil palm</li>
          </ul>
        </div>
        <div className="border-l-4 border-gray-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-gray-500" />
            <h4 className="font-semibold text-lg mb-0">Fallow Land</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Temporarily unused land</li>
            <li>• Can be cultivated again</li>
            <li>• Often available at attractive prices</li>
          </ul>
        </div>
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-blue-500" />
            <h4 className="font-semibold text-lg mb-0">Livestock & Agro-Allied Land</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Dairy farms</li>
            <li>• Poultry units</li>
            <li>• Fisheries</li>
            <li>• Goat & sheep farming</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaMapMarkedAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Land Zoning Explained</h3>
      </div>
      <p className="text-gray-700 mb-4">Zoning determines what activities are legally allowed on land.</p>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FaLeaf className="text-green-600" />
          <h4 className="font-semibold text-lg mb-0">Agricultural Zone (AG Zone)</h4>
        </div>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Farming permitted</li>
          <li>Limited construction allowed</li>
          <li>Layout development not allowed without conversion</li>
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <FaHome className="text-blue-600" />
          Residential Use Zones
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-left">Zone</th>
                <th className="px-4 py-2 border text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-4 py-2 border font-semibold">R1 Zone</td><td className="px-4 py-2 border">Urban areas near growth corridors (low density)</td></tr>
              <tr><td className="px-4 py-2 border font-semibold">R2 Zone</td><td className="px-4 py-2 border">Urban nodes & expanding residential areas</td></tr>
              <tr><td className="px-4 py-2 border font-semibold">R3 Zone</td><td className="px-4 py-2 border">Urban centers with higher development</td></tr>
              <tr><td className="px-4 py-2 border font-semibold">R4 Zone</td><td className="px-4 py-2 border">Rural settlements & village expansion areas</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 mt-2 text-sm italic">Agricultural land must be converted before residential construction.</p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <FaTree className="text-green-600" />
          Agricultural & Conservation Zones
        </h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Conservation (Agriculture) Zone — farming priority areas</li>
          <li>Forest Zone — protected forests</li>
          <li>Bio-Conservation Zone (S3) — ecological protection</li>
        </ul>
        <p className="text-gray-600 mt-2 text-sm italic">Development restrictions apply.</p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <FaBuilding className="text-gray-600" />
          Other Development Zones
        </h4>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-gray-50 p-3 rounded">• Peri-Urban Zone — future expansion areas</div>
          <div className="bg-gray-50 p-3 rounded">• Commercial Zone — business activities</div>
          <div className="bg-gray-50 p-3 rounded">• Industrial Zone — manufacturing & logistics</div>
          <div className="bg-gray-50 p-3 rounded">• Mixed Use Zone — combined development</div>
          <div className="bg-gray-50 p-3 rounded">• Public & Utility Zone — schools, hospitals</div>
          <div className="bg-gray-50 p-3 rounded">• Recreation/Open Space Zone — parks & buffers</div>
          <div className="bg-gray-50 p-3 rounded">• Water Bodies Zone — lakes & rivers (protected)</div>
          <div className="bg-gray-50 p-3 rounded">• Transportation Zone — roads & railways</div>
          <div className="bg-gray-50 p-3 rounded">• Special Reservation Zones — heritage/defense areas</div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Key Zoning Takeaways</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Conversion depends on zone regulations</li>
          <li>Protected zones usually restrict land use change</li>
          <li>R4 zones allow natural village expansion</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Agricultural Land Buyer Decision Flow</h3>
        <span className="text-sm text-gray-500">(Tanavi Smart Decision System)</span>
      </div>
      <div className="space-y-4">
        <div className="bg-primary text-white p-4 rounded-lg">
          <h4 className="font-semibold text-lg mb-2">STEP 1 — Define Buyer Objective</h4>
          <p className="mb-3">Goal decides location — not price alone.</p>
          <div className="bg-white bg-opacity-20 p-3 rounded">
            <table className="w-full text-sm">
              <tbody>
                <tr><td className="py-1 pr-4 font-semibold">Farming income</td><td className="py-1">→ Irrigated land</td></tr>
                <tr><td className="py-1 pr-4 font-semibold">Long-term investment</td><td className="py-1">→ Growth corridor land</td></tr>
                <tr><td className="py-1 pr-4 font-semibold">Future plotting</td><td className="py-1">→ Conversion-potential land</td></tr>
                <tr><td className="py-1 pr-4 font-semibold">Farmhouse lifestyle</td><td className="py-1">→ Scenic accessible land</td></tr>
                <tr><td className="py-1 pr-4 font-semibold">Agro business</td><td className="py-1">→ Highway-connected land</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-lg mb-2">STEP 2 — Location Evaluation</h4>
          <p className="text-gray-700 mb-2">Check:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Distance from city</li>
            <li>Highway connectivity</li>
            <li>Nearby markets</li>
            <li>Industrial or infrastructure projects</li>
          </ul>
          <p className="text-gray-600 mt-2 italic">Land near expansion zones appreciates faster.</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-lg mb-2">STEP 3 — Legal Verification</h4>
          <p className="text-gray-700 mb-2">Mandatory checks:</p>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Ownership clarity</div>
            <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Encumbrance Certificate</div>
            <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Survey boundaries</div>
            <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Legal road access</div>
            <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Zoning classification</div>
          </div>
          <p className="text-red-600 mt-2 font-semibold">If any check fails → clarify before proceeding.</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-lg mb-2">STEP 4 — Land Quality Assessment</h4>
          <p className="text-gray-700 mb-2">Evaluate:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Soil fertility</li>
            <li>Water availability</li>
            <li>Electricity access</li>
            <li>Flood/rocky terrain risks</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-lg mb-2">STEP 5 — Future Potential Analysis</h4>
          <p className="text-gray-700 mb-2">Ask:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Is development moving toward this area?</li>
            <li>Are new roads planned?</li>
            <li>Can conversion happen later?</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold text-lg mb-2">STEP 6 — Investment Decision</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border mt-2">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border text-left">Condition</th>
                  <th className="px-4 py-2 border text-left">Decision</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="px-4 py-2 border">Strong farming + water</td><td className="px-4 py-2 border text-green-600 font-semibold">Agriculture investment</td></tr>
                <tr><td className="px-4 py-2 border">Growth indicators</td><td className="px-4 py-2 border text-blue-600 font-semibold">Appreciation investment</td></tr>
                <tr><td className="px-4 py-2 border">High conversion chance</td><td className="px-4 py-2 border text-purple-600 font-semibold">Premium investment</td></tr>
                <tr><td className="px-4 py-2 border">Legal uncertainty</td><td className="px-4 py-2 border text-red-600 font-semibold">Avoid</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaLightbulb className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Conversion Probability Guide</h3>
      </div>
      <p className="text-gray-700 mb-4">Conversion (NA Conversion) changes agricultural land into residential or commercial use.</p>
      
      <div className="bg-green-50 p-6 rounded-lg mb-4">
        <h4 className="font-semibold text-lg mb-3">High Conversion Probability When:</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Near city expansion</li>
          <li>Adjacent layouts exist</li>
          <li>Highway frontage available</li>
          <li>Included in master plans</li>
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-lg mb-3">Conversion Scale</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">80-100%</div>
            <span className="text-gray-700">Very High</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">60-80%</div>
            <span className="text-gray-700">High</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">40-60%</div>
            <span className="text-gray-700">Medium</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">20-40%</div>
            <span className="text-gray-700">Low</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">0-20%</div>
            <span className="text-gray-700">Restricted</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Early Signs of Conversion</h4>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> New highways</div>
          <div className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> Industrial parks</div>
          <div className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> Government projects</div>
          <div className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> Rapid registrations nearby</div>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Tanavi Land Risk Rating System (TLRS)</h3>
      </div>
      <p className="text-gray-700 mb-4">Every land evaluated across 5 pillars:</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary mb-1">1</div>
          <div className="text-gray-700">Legal Risk</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary mb-1">2</div>
          <div className="text-gray-700">Zoning Risk</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary mb-1">3</div>
          <div className="text-gray-700">Access Risk</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary mb-1">4</div>
          <div className="text-gray-700">Environmental Risk</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary mb-1">5</div>
          <div className="text-gray-700">Market Demand Risk</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-100 via-yellow-100 via-blue-100 to-green-100 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Risk Scale</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">90-100</div>
            <span className="text-gray-700 font-semibold">Very Safe</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">75-90</div>
            <span className="text-gray-700 font-semibold">Safe</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">60-75</div>
            <span className="text-gray-700 font-semibold">Moderate</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">40-60</div>
            <span className="text-gray-700 font-semibold">Risky</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">Below 40</div>
            <span className="text-gray-700 font-semibold">High Risk</span>
          </div>
        </div>
        <p className="text-gray-600 mt-4 italic">Transparent risk ratings build buyer confidence.</p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaFileAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Important Land Records (Must Verify)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Document</th>
              <th className="px-4 py-2 border text-left">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-4 py-2 border font-semibold">Patta / Passbook</td><td className="px-4 py-2 border">Ownership proof</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Adangal / Pahani</td><td className="px-4 py-2 border">Cultivation history</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">1B Extract</td><td className="px-4 py-2 border">Owner details</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Survey Number</td><td className="px-4 py-2 border">Land identity</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">FMB Sketch</td><td className="px-4 py-2 border">Boundary map</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Encumbrance Certificate</td><td className="px-4 py-2 border">Legal status</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaUsers className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Who Can Buy Agricultural Land?</h3>
      </div>
      <div className="bg-yellow-50 p-6 rounded-lg">
        <p className="text-gray-700 mb-3">Rules vary by state:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Farmers — generally permitted</li>
          <li>Non-agriculturists — may require permission</li>
          <li>Companies — approval required</li>
          <li>NRIs — restrictions may apply</li>
        </ul>
        <p className="text-gray-700 mt-4 font-semibold">Always verify eligibility before purchase.</p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Permitted Uses</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3 text-green-700">Allowed</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Farming</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Horticulture</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Livestock activities</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Organic agriculture</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Farm storage structures</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Farmhouse (subject to rules)</li>
          </ul>
        </div>
        <div className="bg-red-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3 text-red-700">Not Allowed Without Conversion</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaExclamationTriangle className="text-red-600" /> Residential layouts</li>
            <li className="flex items-center gap-2"><FaExclamationTriangle className="text-red-600" /> Commercial buildings</li>
            <li className="flex items-center gap-2"><FaExclamationTriangle className="text-red-600" /> Industrial construction</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Buyer Checklist</h3>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold mb-3 text-blue-700">Legal</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Clear title</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> EC verification</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Zoning confirmation</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Road access</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-green-700">Physical</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Soil quality</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Water source</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Boundary clarity</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Flood risk</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-purple-700">Investment</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Growth indicators</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Infrastructure projects</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Development trends</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Seller Checklist</h3>
      </div>
      <div className="bg-orange-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Before listing:</h4>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2"><FaCheckCircle className="text-orange-600" /> Update records</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-orange-600" /> Clear disputes</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-orange-600" /> Mark boundaries</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-orange-600" /> Share irrigation details</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-orange-600" /> Provide accurate measurements</div>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Factors Affecting Land Value</h3>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          'Highway connectivity',
          'Water availability',
          'Soil fertility',
          'Urban expansion',
          'Government infrastructure',
          'Industrial growth',
          'Residential demand'
        ].map((factor, idx) => (
          <div key={idx} className="bg-blue-50 p-4 rounded-lg flex items-center gap-2">
            <span className="text-primary font-bold text-xl">•</span>
            <span className="text-gray-700">{factor}</span>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaLightbulb className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Common Investment Scenarios</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="font-semibold text-lg mb-2">1. Farming Purpose</div>
          <p className="text-gray-600 text-sm">Active agricultural income generation</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="font-semibold text-lg mb-2">2. Long-Term Land Banking</div>
          <p className="text-gray-600 text-sm">Hold for future appreciation</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="font-semibold text-lg mb-2">3. Future Conversion Investment</div>
          <p className="text-gray-600 text-sm">Buy in growth corridors for conversion</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="font-semibold text-lg mb-2">4. Farmhouse Lifestyle</div>
          <p className="text-gray-600 text-sm">Weekend retreat and nature living</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="font-semibold text-lg mb-2">5. Agro-Business Development</div>
          <p className="text-gray-600 text-sm">Commercial farming operations</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaFileAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Agriculture vs Plot Investment</h3>
      </div>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Factor</th>
              <th className="px-4 py-2 border text-left">Agriculture</th>
              <th className="px-4 py-2 border text-left">Plot</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-4 py-2 border font-semibold">Entry Cost</td><td className="px-4 py-2 border">Low</td><td className="px-4 py-2 border">Higher</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Appreciation</td><td className="px-4 py-2 border text-green-600 font-semibold">High</td><td className="px-4 py-2 border">Moderate</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Liquidity</td><td className="px-4 py-2 border">Medium</td><td className="px-4 py-2 border text-green-600 font-semibold">High</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Conversion Upside</td><td className="px-4 py-2 border text-green-600 font-semibold">Very High</td><td className="px-4 py-2 border">Limited</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Risk</td><td className="px-4 py-2 border">Medium</td><td className="px-4 py-2 border text-green-600 font-semibold">Low</td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-primary text-white p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-2">Tanavi Smart Strategy</h4>
        <p className="text-lg">70% Agricultural Land + 30% Plots</p>
        <p className="text-sm mt-2 opacity-90">Balances growth and liquidity.</p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaExclamationTriangle className="text-2xl text-red-600" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Risks Buyers Should Understand</h3>
      </div>
      <div className="bg-red-50 p-6 rounded-lg">
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <FaExclamationTriangle className="text-red-600 mt-1" />
            <div>
              <span className="font-semibold">Zoning restrictions</span>
              <p className="text-sm text-gray-600">Land use may be limited by government regulations</p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <FaExclamationTriangle className="text-red-600 mt-1" />
            <div>
              <span className="font-semibold">Conversion uncertainty</span>
              <p className="text-sm text-gray-600">Future conversion approval not guaranteed</p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <FaExclamationTriangle className="text-red-600 mt-1" />
            <div>
              <span className="font-semibold">Water dependency</span>
              <p className="text-sm text-gray-600">Agricultural productivity depends on water availability</p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <FaExclamationTriangle className="text-red-600 mt-1" />
            <div>
              <span className="font-semibold">Access disputes</span>
              <p className="text-sm text-gray-600">Road access rights must be legally verified</p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <FaExclamationTriangle className="text-red-600 mt-1" />
            <div>
              <span className="font-semibold">Title clarity issues</span>
              <p className="text-sm text-gray-600">Ownership disputes can delay transactions</p>
            </div>
          </li>
        </ul>
        <p className="text-gray-700 mt-4 font-semibold">Proper verification minimizes risks.</p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaLeaf className="text-2xl text-primary" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">How Tanavi Properties Supports You</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3 text-blue-700">For Buyers</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Verified listings</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Growth insights</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Risk awareness guidance</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Structured site visits</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Documentation assistance</li>
          </ul>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3 text-green-700">For Sellers</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Qualified buyer reach</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Market positioning</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Transparent listing system</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Faster visibility</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="bg-green-100 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaCheckCircle className="text-2xl text-green-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Conclusion</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Agricultural land is not just farmland — it is a strategic long-term asset when selected with proper knowledge, 
        verification, and planning. Tanavi Properties aims to provide transparency, education, risk awareness, and 
        professional guidance so every user can make safe and confident agricultural land decisions.
      </p>
    </section>
  </div>
);

// Independent House Guide Component
const IndependentHouseGuide = () => (
  <div className="prose max-w-none">
    <div className="flex items-center gap-3 mb-6">
      <FaHome className="text-3xl text-primary" />
      <h2 className="text-3xl font-bold text-primary mb-0">COMPLETE USER GUIDE — INDEPENDENT HOUSE & VILLA</h2>
    </div>
    
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaBook className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Introduction</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        An Independent House or Villa represents one of the most secure and prestigious forms of real estate ownership. 
        Unlike apartments, buyers own both the land and the constructed building, making it a powerful long-term asset 
        for living, investment, and generational wealth creation.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        This guide is created by Tanavi Properties to help buyers and sellers make safe, informed, and confident decisions 
        through a structured, transparent process.
      </p>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">What is an Independent House / Villa?</h3>
      </div>
      <p className="text-gray-700 mb-4">
        An <strong>Independent House</strong> is a standalone residential property built on an individually owned plot with exclusive ownership rights.
      </p>
      <p className="text-gray-700 mb-4">
        A <strong>Villa</strong> is typically an independent house located within a planned or gated community offering lifestyle amenities.
      </p>
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Ownership Includes:</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Land ownership</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Building ownership</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Modification rights</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Redevelopment rights</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Types of Independent Houses & Villas</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-blue-500" />
            <h4 className="font-semibold text-lg mb-0">Fully Independent House</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Individual plot</li>
            <li>• Separate compound wall</li>
            <li>• No shared structures</li>
          </ul>
          <p className="text-gray-600 mt-2 italic">Ideal for: Families & long-term living.</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-purple-500" />
            <h4 className="font-semibold text-lg mb-0">Gated Community Villa</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Independent structure inside planned layout</li>
            <li>• Security & amenities included</li>
          </ul>
          <p className="text-gray-600 mt-2 italic">Ideal for: Premium lifestyle buyers.</p>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-green-500" />
            <h4 className="font-semibold text-lg mb-0">Duplex House</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Two floors connected internally</li>
            <li>• Single-family residence</li>
          </ul>
        </div>
        <div className="border-l-4 border-indigo-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-indigo-500" />
            <h4 className="font-semibold text-lg mb-0">Triplex House</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Three-level residential structure</li>
            <li>• Premium segment property</li>
          </ul>
        </div>
        <div className="border-l-4 border-orange-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-orange-500" />
            <h4 className="font-semibold text-lg mb-0">Rental Portion House</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Multiple portions designed for rental income</li>
          </ul>
          <p className="text-gray-600 mt-2 italic">Ideal for: Investors seeking monthly returns.</p>
        </div>
        <div className="border-l-4 border-gray-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-gray-500" />
            <h4 className="font-semibold text-lg mb-0">Old House (Redevelopment Property)</h4>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Land value higher than building value</li>
            <li>• Purchased mainly for reconstruction</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaMapMarkedAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Zoning & Land Use Understanding</h3>
      </div>
      <p className="text-gray-700 mb-4">Zoning determines whether construction and residential usage are legally permitted.</p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaHome className="text-green-600" />
            <h4 className="font-semibold mb-0">R1 Zone — Low Density Residential</h4>
          </div>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• Independent houses preferred</li>
            <li>• Peaceful residential environment</li>
          </ul>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-yellow-600" />
            <h4 className="font-semibold mb-0">R2 Zone — Medium Density Residential</h4>
          </div>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• Houses + apartments allowed</li>
            <li>• Growing urban areas</li>
          </ul>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaStore className="text-orange-600" />
            <h4 className="font-semibold mb-0">Mixed Residential Zone</h4>
          </div>
          <p className="text-gray-700 text-sm">• Residential with limited commercial activity</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-blue-600" />
            <h4 className="font-semibold mb-0">Approved Residential Layout</h4>
          </div>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• Government-approved planning</li>
            <li>• Easier loans and resale</li>
          </ul>
        </div>
      </div>

      <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
        <div className="flex items-start gap-2">
          <FaExclamationTriangle className="text-red-600 mt-1" />
          <p className="text-gray-700">
            Houses built on agricultural or restricted land without conversion may create legal risks.
          </p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaUsers className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Who Should Buy an Independent House?</h3>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Suitable for:</h4>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> End-use families</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Long-term investors</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Rental income seekers</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Buyers wanting privacy</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Buyers planning future redevelopment</div>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Independent House Buyer Decision Flow</h3>
        <span className="text-sm text-gray-500">(Tanavi Smart Framework)</span>
      </div>
      
      <div className="space-y-4">
        <div className="bg-primary text-white p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
            <h4 className="font-semibold text-lg mb-0">STEP 1 — Define Buyer Objective</h4>
          </div>
          <p className="mb-3">Purpose should decide property selection.</p>
          <div className="bg-white bg-opacity-20 p-3 rounded">
            <table className="w-full text-sm">
              <tbody>
                <tr><td className="py-1 pr-4 font-semibold">Family living</td><td className="py-1">→ Ready-to-move house</td></tr>
                <tr><td className="py-1 pr-4 font-semibold">Rental income</td><td className="py-1">→ Portion house</td></tr>
                <tr><td className="py-1 pr-4 font-semibold">Investment</td><td className="py-1">→ Growth location house</td></tr>
                <tr><td className="py-1 pr-4 font-semibold">Future rebuild</td><td className="py-1">→ Old structure property</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
            <h4 className="font-semibold text-lg mb-0">STEP 2 — Location Evaluation</h4>
          </div>
          <p className="text-gray-700 mb-2">Check:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Road width & access</li>
            <li>Nearby schools & hospitals</li>
            <li>Connectivity to highways</li>
            <li>Future infrastructure projects</li>
            <li>Neighborhood development quality</li>
          </ul>
          <p className="text-gray-600 mt-2 italic">Good locations appreciate faster than expensive properties in weak locations.</p>
        </div>

        <div className="bg-green-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
            <h4 className="font-semibold text-lg mb-0">STEP 3 — Legal Verification (Mandatory)</h4>
          </div>
          <p className="text-gray-700 mb-2">Verify:</p>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Clear ownership title</div>
            <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Registered sale deed chain</div>
            <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Encumbrance Certificate (EC)</div>
            <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Approved building plan</div>
            <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Property tax records</div>
            <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> No legal disputes</div>
          </div>
          <p className="text-red-600 mt-3 font-semibold">If any document is unclear → Pause transaction.</p>
        </div>

        <div className="bg-yellow-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</div>
            <h4 className="font-semibold text-lg mb-0">STEP 4 — Building Approval & Compliance</h4>
          </div>
          <p className="text-gray-700 mb-2">Confirm:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Municipal approval</li>
            <li>Setback rules followed</li>
            <li>No unauthorized floors</li>
            <li>Occupancy Certificate (OC)</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">5</div>
            <h4 className="font-semibold text-lg mb-0">STEP 5 — Physical & Structural Inspection</h4>
          </div>
          <p className="text-gray-700 mb-2">Evaluate:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Construction quality</li>
            <li>Foundation strength</li>
            <li>Water seepage</li>
            <li>Electrical & plumbing condition</li>
            <li>Building age</li>
          </ul>
        </div>

        <div className="bg-orange-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">6</div>
            <h4 className="font-semibold text-lg mb-0">STEP 6 — Market Value Analysis</h4>
          </div>
          <p className="text-gray-700 mb-2">Understand pricing components:</p>
          <div className="bg-white p-3 rounded border-2 border-orange-300">
            <p className="text-gray-800 font-semibold">Property Value = Land Value + Building Value</p>
            <p className="text-gray-600 text-sm mt-1">Land drives long-term appreciation.</p>
          </div>
        </div>

        <div className="bg-indigo-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">7</div>
            <h4 className="font-semibold text-lg mb-0">STEP 7 — Tanavi Risk Rating Review</h4>
          </div>
          <p className="text-gray-700">Tanavi evaluates properties using structured risk analysis before buyer decisions.</p>
        </div>

        <div className="bg-teal-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">8</div>
            <h4 className="font-semibold text-lg mb-0">STEP 8 — Schedule Visit via Tanavi Platform</h4>
          </div>
          <p className="text-gray-700 mb-2">Buyers must:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Request visit through listing</li>
            <li>Confirm availability</li>
            <li>Attend guided visit</li>
          </ul>
          <p className="text-gray-600 mt-2 italic">This ensures transparency and verified interaction.</p>
        </div>

        <div className="bg-pink-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">9</div>
            <h4 className="font-semibold text-lg mb-0">STEP 9 — Negotiation & Documentation Support</h4>
          </div>
          <p className="text-gray-700 mb-2">Tanavi assists with:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Price alignment</li>
            <li>Documentation coordination</li>
            <li>Transaction clarity</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-gray-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">10</div>
            <h4 className="font-semibold text-lg mb-0">STEP 10 — Registration & Ownership Transfer</h4>
          </div>
          <p className="text-gray-700 mb-2">Final steps include:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Agreement of Sale</li>
            <li>Payment verification</li>
            <li>Property registration</li>
            <li>Ownership transfer update</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Tanavi Land & Property Risk Rating System™</h3>
      </div>
      <p className="text-gray-700 mb-4">Every Independent House is evaluated on 5 pillars:</p>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Risk Category</th>
              <th className="px-4 py-2 border text-left">Evaluation</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-4 py-2 border font-semibold">Legal Risk</td><td className="px-4 py-2 border">Title & documentation</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Zoning Risk</td><td className="px-4 py-2 border">Land use legality</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Structural Risk</td><td className="px-4 py-2 border">Building condition</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Access Risk</td><td className="px-4 py-2 border">Road & connectivity</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Market Risk</td><td className="px-4 py-2 border">Demand & future growth</td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gradient-to-r from-red-100 via-yellow-100 via-blue-100 to-green-100 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Rating Scale</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">90-100</div>
            <span className="text-gray-700 font-semibold">Very Safe Investment</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">75-90</div>
            <span className="text-gray-700 font-semibold">Safe Property</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">60-75</div>
            <span className="text-gray-700 font-semibold">Moderate Review Needed</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">40-60</div>
            <span className="text-gray-700 font-semibold">Risky</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white px-4 py-2 rounded font-semibold w-32 text-center">Below 40</div>
            <span className="text-gray-700 font-semibold">Avoid</span>
          </div>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaLightbulb className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Investment Scenarios</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaHome className="text-blue-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Self-Living Property</h4>
          </div>
          <p className="text-gray-600">Stable appreciation + lifestyle comfort.</p>
        </div>
        <div className="bg-green-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaChartLine className="text-green-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Rental Income Model</h4>
          </div>
          <p className="text-gray-600">Monthly rental yield through portions.</p>
        </div>
        <div className="bg-purple-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-purple-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Redevelopment Opportunity</h4>
          </div>
          <p className="text-gray-600">Old houses rebuilt into modern homes or apartments.</p>
        </div>
        <div className="bg-orange-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaMapMarkedAlt className="text-orange-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Growth Corridor Investment</h4>
          </div>
          <p className="text-gray-600">Purchased near expanding city limits.</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaFileAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Independent House vs Apartment Comparison</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Factor</th>
              <th className="px-4 py-2 border text-left">Independent House</th>
              <th className="px-4 py-2 border text-left">Apartment</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-4 py-2 border font-semibold">Land Ownership</td><td className="px-4 py-2 border text-green-600 font-semibold">Full</td><td className="px-4 py-2 border">Shared</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Privacy</td><td className="px-4 py-2 border text-green-600 font-semibold">High</td><td className="px-4 py-2 border">Medium</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Appreciation</td><td className="px-4 py-2 border text-green-600 font-semibold">High</td><td className="px-4 py-2 border">Moderate</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Maintenance</td><td className="px-4 py-2 border">Owner managed</td><td className="px-4 py-2 border text-green-600 font-semibold">Society managed</td></tr>
            <tr><td className="px-4 py-2 border font-semibold">Customization</td><td className="px-4 py-2 border text-green-600 font-semibold">Full freedom</td><td className="px-4 py-2 border">Limited</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Buyer Checklist (Quick Verification)</h3>
      </div>
      <div className="bg-green-50 p-6 rounded-lg">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Title verified</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> EC checked</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Building approval confirmed</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Property tax clear</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Access road verified</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Physical inspection completed</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Risk score reviewed</div>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Seller Guide — Listing Independent House on Tanavi</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-orange-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">Before listing:</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2"><FaCheckCircle className="text-orange-600" /> Update ownership records</div>
            <div className="flex items-center gap-2"><FaCheckCircle className="text-orange-600" /> Clear dues & taxes</div>
            <div className="flex items-center gap-2"><FaCheckCircle className="text-orange-600" /> Provide accurate measurements</div>
            <div className="flex items-center gap-2"><FaCheckCircle className="text-orange-600" /> Share building approvals</div>
            <div className="flex items-center gap-2"><FaCheckCircle className="text-orange-600" /> Upload real property photos</div>
          </div>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">Seller Benefits:</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Qualified buyer exposure</li>
            <li>Verified inquiries</li>
            <li>Structured visit management</li>
            <li>Faster serious negotiations</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Factors Affecting Independent House Value</h3>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          'Location growth',
          'Road width',
          'Plot size',
          'Corner property advantage',
          'Construction quality',
          'Infrastructure development nearby'
        ].map((factor, idx) => (
          <div key={idx} className="bg-blue-50 p-4 rounded-lg flex items-center gap-2">
            <span className="text-primary font-bold text-xl">•</span>
            <span className="text-gray-700">{factor}</span>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaExclamationTriangle className="text-2xl text-red-600" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Common Risks Buyers Must Know</h3>
      </div>
      <div className="bg-red-50 p-6 rounded-lg">
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <FaExclamationTriangle className="text-red-600 mt-1" />
            <span>Illegal construction</span>
          </li>
          <li className="flex items-start gap-2">
            <FaExclamationTriangle className="text-red-600 mt-1" />
            <span>Title disputes</span>
          </li>
          <li className="flex items-start gap-2">
            <FaExclamationTriangle className="text-red-600 mt-1" />
            <span>Encroachment issues</span>
          </li>
          <li className="flex items-start gap-2">
            <FaExclamationTriangle className="text-red-600 mt-1" />
            <span>Non-approved layouts</span>
          </li>
          <li className="flex items-start gap-2">
            <FaExclamationTriangle className="text-red-600 mt-1" />
            <span>Poor structural condition</span>
          </li>
        </ul>
        <p className="text-gray-700 mt-4 font-semibold">Proper verification eliminates most risks.</p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaHome className="text-2xl text-primary" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">How Tanavi Properties Supports Users</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3 text-blue-700">For Buyers</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Verified listings</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Guided decision framework</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Risk transparency</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Visit scheduling system</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Documentation assistance</li>
          </ul>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3 text-green-700">For Sellers</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Trusted marketplace visibility</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Serious buyer connection</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Transparent listing process</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Faster transaction cycle</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="bg-primary text-white p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <FaLightbulb className="text-2xl" />
          <h3 className="text-2xl font-semibold mb-0">Why This Guide Matters</h3>
        </div>
        <p className="mb-4">Tanavi Properties is not just a listing platform.</p>
        <p className="mb-3">It acts as a:</p>
        <div className="grid md:grid-cols-2 gap-2">
          <div className="flex items-center gap-2"><FaCheckCircle /> Property educator</div>
          <div className="flex items-center gap-2"><FaCheckCircle /> Decision advisor</div>
          <div className="flex items-center gap-2"><FaCheckCircle /> Risk-aware marketplace</div>
          <div className="flex items-center gap-2"><FaCheckCircle /> Trusted real estate ecosystem</div>
        </div>
        <p className="mt-4 text-lg italic">"Tanavi helps me choose the right property — not just buy one."</p>
      </div>
    </section>

    <section className="bg-blue-100 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaCheckCircle className="text-2xl text-blue-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Conclusion</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Independent Houses and Villas provide strong ownership security, lifestyle freedom, and long-term investment growth 
        when purchased with proper verification and planning. Through structured guidance, verified processes, and transparent 
        insights, Tanavi Properties enables safe and confident real estate decisions for every user.
      </p>
    </section>
  </div>
);

// Open Plot Guide Component
const OpenPlotGuide = () => (
  <div className="prose max-w-none">
    <div className="flex items-center gap-3 mb-6">
      <FaMapMarkedAlt className="text-3xl text-primary" />
      <h2 className="text-3xl font-bold text-primary mb-0">COMPLETE USER GUIDE — OPEN PLOT (LAND INVESTMENT)</h2>
    </div>
    
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaBook className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Introduction</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        An Open Plot represents pure land ownership without construction and is one of the most flexible real estate investments. 
        Since land is a limited resource, its value increases primarily through urban expansion, infrastructure development, and location growth.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        This Tanavi Guide educates buyers and sellers with complete clarity — from land understanding and approvals to investment 
        strategy and ownership transfer.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4 font-semibold">
        Tanavi Properties focuses on guiding decisions, not just listing properties.
      </p>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">What is an Open Plot?</h3>
      </div>
      <p className="text-gray-700 mb-4">
        An Open Plot is a legally defined parcel of land designated for residential, commercial, or mixed-use development without existing construction.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">Ownership Includes</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Legal land title ownership</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Construction rights (as per zoning laws)</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Future development flexibility</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Resale and redevelopment freedom</li>
          </ul>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">Why Open Plots Are Popular</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Low maintenance</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Strong long-term appreciation</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Flexible usage options</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Lower entry investment (area dependent)</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Ideal for land banking</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Types of Open Plots</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-blue-500" />
            <h4 className="font-semibold text-lg mb-0">Residential Plot</h4>
          </div>
          <p className="text-gray-700 mb-1">Approved layouts intended for house construction.</p>
          <p className="text-gray-600 italic text-sm">Best for: Future home buyers.</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-purple-500" />
            <h4 className="font-semibold text-lg mb-0">Villa Plot</h4>
          </div>
          <p className="text-gray-700 mb-1">Located inside gated communities for villa development.</p>
          <p className="text-gray-600 italic text-sm">Best for: Lifestyle investors.</p>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-green-500" />
            <h4 className="font-semibold text-lg mb-0">Farm / Lifestyle Plot</h4>
          </div>
          <p className="text-gray-700">Large plots near city outskirts (subject to local permissions).</p>
        </div>
        <div className="border-l-4 border-orange-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-orange-500" />
            <h4 className="font-semibold text-lg mb-0">Commercial Plot</h4>
          </div>
          <p className="text-gray-700">Located in business zones for commercial activity.</p>
        </div>
        <div className="border-l-4 border-yellow-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-yellow-500" />
            <h4 className="font-semibold text-lg mb-0">Corner Plot</h4>
          </div>
          <p className="text-gray-700">Two road access; higher visibility and resale demand.</p>
        </div>
        <div className="border-l-4 border-indigo-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-indigo-500" />
            <h4 className="font-semibold text-lg mb-0">Investment / Land Banking Plot</h4>
          </div>
          <p className="text-gray-700">Purchased mainly for appreciation over time.</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaMapMarkedAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Land Zoning & Classification (Very Important)</h3>
      </div>
      <p className="text-gray-700 mb-4">Zoning determines what can legally be built.</p>
      
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Zone</th>
              <th className="px-4 py-2 border text-left">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-green-50"><td className="px-4 py-2 border font-semibold">R1 Zone</td><td className="px-4 py-2 border">Low-density residential (independent houses)</td></tr>
            <tr className="bg-yellow-50"><td className="px-4 py-2 border font-semibold">R2 Zone</td><td className="px-4 py-2 border">Medium density residential (houses + apartments)</td></tr>
            <tr className="bg-orange-50"><td className="px-4 py-2 border font-semibold">Mixed Use</td><td className="px-4 py-2 border">Residential + limited commercial</td></tr>
            <tr className="bg-blue-50"><td className="px-4 py-2 border font-semibold">Commercial Zone</td><td className="px-4 py-2 border">Business activities allowed</td></tr>
            <tr className="bg-green-100"><td className="px-4 py-2 border font-semibold">Agricultural Zone</td><td className="px-4 py-2 border">Construction restricted</td></tr>
            <tr className="bg-teal-50"><td className="px-4 py-2 border font-semibold">Green Belt</td><td className="px-4 py-2 border">Development highly restricted</td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
        <div className="flex items-start gap-2">
          <FaExclamationTriangle className="text-red-600 mt-1" />
          <p className="text-gray-700 font-semibold">Always verify zoning before purchase.</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaFileAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Layout Approvals — Legal Foundation of Open Plots</h3>
      </div>
      <p className="text-gray-700 mb-4">A layout approval confirms land is legally planned and permitted for development.</p>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">Approved Layout Means</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Land-use legality confirmed</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Roads and infrastructure planned</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Utility spaces reserved</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Compliance with master plan</li>
        </ul>
        <p className="text-gray-700 mt-4 font-semibold">Approved layouts provide legal safety + investment confidence.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">DTCP Layout Approval</h4>
          <p className="text-gray-700 mb-3">DTCP (Directorate of Town & Country Planning) regulates development in non-metro and developing regions.</p>
          
          <div className="mb-3">
            <h5 className="font-semibold mb-2">Applies To</h5>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Towns</li>
              <li>Semi-urban areas</li>
              <li>Growing outskirts</li>
            </ul>
          </div>

          <div className="mb-3">
            <h5 className="font-semibold mb-2">Features</h5>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Approved road network</div>
              <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Plot demarcation</div>
              <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Drainage planning</div>
              <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Master plan compliance</div>
            </div>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Benefits</h5>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Lower legal risk</li>
              <li>Building permission eligibility</li>
              <li>Early-stage investment opportunity</li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">HMDA Layout Approval</h4>
          <p className="text-gray-700 mb-3">HMDA (Hyderabad Metropolitan Development Authority) governs metropolitan development zones.</p>
          
          <div className="mb-3">
            <h5 className="font-semibold mb-2">HMDA Standards</h5>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Wide roads</div>
              <div className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Parks & open spaces</div>
              <div className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Infrastructure planning</div>
              <div className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Environmental compliance</div>
            </div>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Benefits</h5>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>High legal credibility</li>
              <li>Strong loan eligibility</li>
              <li>Faster appreciation potential</li>
              <li>High resale demand</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">DTCP vs HMDA (Simple Understanding)</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border text-left">Factor</th>
                  <th className="px-4 py-2 border text-left">DTCP</th>
                  <th className="px-4 py-2 border text-left">HMDA</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="px-4 py-2 border font-semibold">Area Type</td><td className="px-4 py-2 border">Semi-urban</td><td className="px-4 py-2 border">Metropolitan</td></tr>
                <tr><td className="px-4 py-2 border font-semibold">Investment Stage</td><td className="px-4 py-2 border">Early growth</td><td className="px-4 py-2 border">Developed growth</td></tr>
                <tr><td className="px-4 py-2 border font-semibold">Appreciation</td><td className="px-4 py-2 border">Gradual</td><td className="px-4 py-2 border text-green-600 font-semibold">Faster</td></tr>
                <tr><td className="px-4 py-2 border font-semibold">Buyer Demand</td><td className="px-4 py-2 border">Medium-High</td><td className="px-4 py-2 border text-green-600 font-semibold">Very High</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">RERA — Buyer Protection System</h3>
      </div>
      <p className="text-gray-700 mb-4">
        RERA (Real Estate Regulatory Authority) ensures transparency and accountability in real estate projects.
      </p>
      
      <div className="bg-yellow-50 p-6 rounded-lg mb-4">
        <h4 className="font-semibold text-lg mb-3">Why RERA Exists</h4>
        <p className="text-gray-700 mb-2">Before regulation:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Project delays</li>
          <li>False commitments</li>
          <li>Lack of transparency</li>
        </ul>
      </div>

      <div className="bg-green-50 p-6 rounded-lg mb-4">
        <h4 className="font-semibold text-lg mb-3">RERA Ensures</h4>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Transparency</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Legal accountability</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Buyer protection</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Standard practices</div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-4">
        <h4 className="font-semibold text-lg mb-3">When RERA Applies to Plots</h4>
        <p className="text-gray-700 mb-2">RERA registration is required when:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Large plotting projects are developed</li>
          <li>Developers sell plots commercially as projects</li>
        </ul>
        <p className="text-gray-600 mt-3 italic">Individual resale plots usually do not require project-level RERA.</p>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Buyer Protection Under RERA</h4>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Verified project details</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> No false advertising</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Legal complaint mechanism</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Financial discipline by developers</div>
        </div>
        <p className="text-gray-700 mt-4">Tanavi encourages displaying: Approval Type, RERA Status, Legal indicators, Risk rating score</p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaExclamationTriangle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Approved vs Unapproved Layouts</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
          <div className="flex items-center gap-2 mb-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Approved Layout</h4>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li>• Government approved</li>
            <li>• Bank loan eligible</li>
            <li>• Higher resale value</li>
            <li>• Legal clarity</li>
          </ul>
        </div>
        <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
          <div className="flex items-center gap-2 mb-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Unapproved Layout</h4>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li>• Higher verification risk</li>
            <li>• Limited financing</li>
            <li>• Possible legal complications</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaUsers className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Who Should Buy Open Plots?</h3>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Ideal for:</h4>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Long-term investors</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> First-time buyers</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Future home builders</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Wealth preservation investors</div>
          <div className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Portfolio diversification</div>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Factors Affecting Plot Value</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          'Location growth direction',
          'Road width',
          'Approval status',
          'Corner positioning',
          'Infrastructure availability',
          'Demand trends'
        ].map((factor, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-gray-50 p-3 rounded">
            <span className="text-primary font-bold">✓</span>
            <span className="text-gray-700">{factor}</span>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-green-100 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaCheckCircle className="text-2xl text-green-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Conclusion</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Open plots provide flexible land ownership and strong long-term appreciation potential when purchased with proper 
        verification and planning. Through structured guidance, verified listings, regulatory awareness, and transparent 
        processes, Tanavi Properties enables safe and confident plot investments for every buyer and seller.
      </p>
    </section>
  </div>
);



// Farmhouse Guide Component
const FarmhouseGuide = () => (
  <div className="prose max-w-none">
    <div className="flex items-center gap-3 mb-6">
      <FaTree className="text-3xl text-primary" />
      <h2 className="text-3xl font-bold text-primary mb-0">COMPLETE USER GUIDE — FARMHOUSE PROPERTY</h2>
    </div>
    
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaBook className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Introduction</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        A Farmhouse is a unique real estate asset that combines land ownership with residential usage in natural or semi-rural 
        environments. It is commonly used for weekend living, lifestyle investment, agriculture-based living, or long-term land appreciation.
      </p>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">What is a Farmhouse?</h3>
      </div>
      <p className="text-gray-700 mb-4">
        A Farmhouse is a residential structure built on agricultural or converted land, usually located outside dense urban areas.
      </p>
      <div className="bg-green-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Why Farmhouses Are Popular</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Nature-oriented lifestyle</li>
          <li>Weekend retreat option</li>
          <li>Privacy & space</li>
          <li>Long-term land appreciation</li>
          <li>Alternative investment asset</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Types of Farmhouse Properties</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border-l-4 border-green-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-green-500" />
            <h4 className="font-semibold text-lg mb-0">Agricultural Farmhouse</h4>
          </div>
          <p className="text-gray-700">Built within agricultural land primarily used for farming. Best for agriculture investors and nature living buyers.</p>
        </div>
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-blue-500" />
            <h4 className="font-semibold text-lg mb-0">Lifestyle Farmhouse</h4>
          </div>
          <p className="text-gray-700">Designed mainly for leisure and weekend stays. Best for urban professionals and second-home buyers.</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-purple-500" />
            <h4 className="font-semibold text-lg mb-0">Gated Farmhouse Community</h4>
          </div>
          <p className="text-gray-700">Planned farmhouse layouts with internal infrastructure. Best for secure lifestyle investment.</p>
        </div>
        <div className="border-l-4 border-orange-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-orange-500" />
            <h4 className="font-semibold text-lg mb-0">Luxury Farmhouse Estate</h4>
          </div>
          <p className="text-gray-700">Large land parcels with premium construction. Best for high-net-worth investors.</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaMapMarkedAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Land Classification & Zoning</h3>
      </div>
      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaLeaf className="text-green-600" />
            <h4 className="font-semibold text-lg mb-0">Agricultural Zone</h4>
          </div>
          <p className="text-gray-700">Farming permitted, residential construction restricted or limited, requires permissions.</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaHome className="text-blue-600" />
            <h4 className="font-semibold text-lg mb-0">Converted Residential Zone (NA Conversion)</h4>
          </div>
          <p className="text-gray-700">Agricultural land legally converted to residential use. Allows house construction, easier financing, higher resale value.</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaTree className="text-green-700" />
            <h4 className="font-semibold text-lg mb-0">Green Belt / Conservation Zone</h4>
          </div>
          <p className="text-gray-700">Strict development controls. Construction often limited or prohibited.</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaFileAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Approvals & Permissions Required</h3>
      </div>
      <div className="bg-red-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Farmhouse buyers must verify:</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Land title ownership</li>
          <li>Land conversion status (if residential usage)</li>
          <li>Building permission approval</li>
          <li>Local panchayat/municipal permissions</li>
          <li>Access road legality</li>
          <li>Electricity & water permissions</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">RERA Applicability</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">When RERA Applies</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Farmhouse plots sold as commercial project</li>
            <li>Developer markets multiple units together</li>
            <li>Project exceeds defined land area limits</li>
          </ul>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">When RERA May NOT Apply</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Individual farmhouse resale</li>
            <li>Independent agricultural land sale</li>
            <li>Private owner-to-owner transactions</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="bg-green-100 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaCheckCircle className="text-2xl text-green-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Conclusion</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Farmhouses offer a unique combination of lifestyle enjoyment and long-term land appreciation when selected with proper 
        legal understanding and planning. Through structured guidance, regulatory awareness, verified listings, and transparent 
        processes, Tanavi Properties enables safe and informed farmhouse investments for every buyer and seller.
      </p>
    </section>
  </div>
);

// Commercial Guide Component
const CommercialGuide = () => (
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
        Commercial real estate refers to properties used for business, trade, professional services, or income-generating activities. 
        Unlike residential property, commercial assets are primarily evaluated based on business usability, rental income potential, 
        location economics, legal compliance, and long-term return on investment.
      </p>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">What is Commercial Property?</h3>
      </div>
      <p className="text-gray-700 mb-4">
        Commercial property is real estate legally approved for business or income-generating activities.
      </p>
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">It includes:</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {['Office spaces', 'Retail shops', 'Showrooms', 'Commercial buildings', 'Co-working spaces', 'Warehouses', 'Commercial open land'].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <FaCheckCircle className="text-primary" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Types of Commercial Properties</h3>
      </div>
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-blue-500" />
            <h4 className="font-semibold text-lg mb-0">Office Space</h4>
          </div>
          <p className="text-gray-700">Used for professional and corporate activities. Examples: IT offices, consulting firms, corporate headquarters, startup offices.</p>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaStore className="text-green-500" />
            <h4 className="font-semibold text-lg mb-0">Retail / Shop Space</h4>
          </div>
          <p className="text-gray-700">Business-facing locations. Examples: Shops, boutiques, restaurants, clinics.</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-purple-500" />
            <h4 className="font-semibold text-lg mb-0">Commercial Building Floors</h4>
          </div>
          <p className="text-gray-700">Entire floors or buildings used commercially. Ideal for enterprises, institutions, co-working operators.</p>
        </div>
        <div className="border-l-4 border-orange-500 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <FaMapMarkedAlt className="text-orange-500" />
            <h4 className="font-semibold text-lg mb-0">Commercial Open Land</h4>
          </div>
          <p className="text-gray-700">Vacant land approved for commercial activity. Used for showrooms, fuel stations, storage yards, event spaces.</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaMapMarkedAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Commercial Zoning & Land Use</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaStore className="text-blue-600" />
            <h4 className="font-semibold mb-0">Commercial Zone</h4>
          </div>
          <p className="text-gray-700">Shops & offices allowed, business construction permitted</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-orange-600" />
            <h4 className="font-semibold mb-0">Mixed-Use Zone</h4>
          </div>
          <p className="text-gray-700">Residential + commercial allowed</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-gray-600" />
            <h4 className="font-semibold mb-0">Industrial Zone</h4>
          </div>
          <p className="text-gray-700">Manufacturing & warehouses permitted</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaLeaf className="text-red-600" />
            <h4 className="font-semibold mb-0">Agricultural Zone</h4>
          </div>
          <p className="text-gray-700">Commercial use NOT allowed without conversion</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaFileAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Sale vs Lease vs Rent</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Type</th>
              <th className="px-4 py-2 border text-left">Meaning</th>
              <th className="px-4 py-2 border text-left">Suitable For</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-4 py-2 border">Sale</td><td className="px-4 py-2 border">Full ownership transfer</td><td className="px-4 py-2 border">Investors</td></tr>
            <tr><td className="px-4 py-2 border">Lease</td><td className="px-4 py-2 border">Long-term contractual usage (3-15 years)</td><td className="px-4 py-2 border">Businesses</td></tr>
            <tr><td className="px-4 py-2 border">Rent</td><td className="px-4 py-2 border">Short-term occupancy</td><td className="px-4 py-2 border">Startups & SMEs</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">RERA Applicability</h3>
      </div>
      <div className="bg-yellow-50 p-6 rounded-lg">
        <p className="text-gray-700 mb-4">
          RERA registration required when commercial project developed by builder, multiple units sold commercially, 
          or project exceeds defined size. Examples: Office towers, commercial malls, business parks.
        </p>
        <h4 className="font-semibold mb-3">RERA Benefits for Commercial Buyers:</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Project transparency</li>
          <li>Construction timeline accountability</li>
          <li>Verified approvals</li>
          <li>Legal complaint mechanism</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Factors Affecting Commercial Property Value</h3>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          'Business district location',
          'Footfall',
          'Parking availability',
          'Brand presence nearby',
          'Road visibility',
          'Infrastructure growth',
          'Metro/highway connectivity'
        ].map((factor, idx) => (
          <div key={idx} className="bg-gray-50 p-3 rounded flex items-center gap-2">
            <FaCheckCircle className="text-primary" />
            <span className="text-gray-700">{factor}</span>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-blue-100 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaCheckCircle className="text-2xl text-blue-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">Conclusion</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Commercial properties and commercial open land offer powerful opportunities for business growth, stable income generation, 
        and long-term investment returns when selected with proper legal and market understanding. Through structured guidance, 
        verified listings, regulatory awareness, and transparent processes, Tanavi Properties enables safe and confident commercial 
        real estate transactions for buyers, sellers, landlords, and tenants.
      </p>
    </section>
  </div>
);

export default Guide;