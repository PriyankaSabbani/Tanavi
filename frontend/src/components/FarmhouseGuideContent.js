import React from 'react';
import { FaCheckCircle, FaBook, FaInfoCircle, FaClipboardList, FaTree, FaHome, FaLeaf, FaMapMarkedAlt, FaShieldAlt, FaExclamationTriangle, FaFileAlt, FaUsers, FaKey, FaRoad, FaBolt, FaTint, FaBuilding, FaAward, FaChartLine, FaEye, FaCalendarCheck, FaFileContract, FaFileSignature, FaTrophy, FaDollarSign, FaUmbrellaBeach, FaChartPie, FaMountain, FaWater, FaSun, FaCamera, FaListUl, FaUserTie, FaUserCheck, FaStar, FaLightbulb, FaExchangeAlt } from 'react-icons/fa';

const FarmhouseGuideContent = () => (
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
        A Farmhouse is a unique real estate asset that combines land ownership with residential usage in natural 
        or semi-rural environments. It is commonly used for weekend living, lifestyle investment, agriculture-based 
        living, or long-term land appreciation.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        Unlike apartments or urban houses, farmhouse investments involve both land regulations and construction 
        permissions, making proper understanding essential.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        This Tanavi Guide provides a complete end-to-end understanding — from land selection and legal verification 
        to ownership, usage rules, investment strategy, and risk awareness.
      </p>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">1. What is a Farmhouse?</h3>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        A Farmhouse is a residential structure built on agricultural or converted land, usually located outside 
        dense urban areas.
      </p>
      
      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">It typically includes:</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Large land parcel</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Residential building or cottage</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Open landscape or farming area</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Recreational or agricultural usage</li>
        </ul>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">Ownership Includes</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Land ownership title</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Built structure ownership</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Usage rights (as per zoning laws)</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Access rights (road & utilities)</li>
        </ul>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Why Farmhouses Are Popular</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Nature-oriented lifestyle</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Weekend retreat option</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Privacy & space</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Long-term land appreciation</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Alternative investment asset</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">2. Types of Farmhouse Properties</h3>
      </div>
      
      <div className="space-y-4">
        <div className="border-l-4 border-green-500 bg-green-50 p-5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaLeaf className="text-green-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Agricultural Farmhouse</h4>
          </div>
          <p className="text-gray-700 mb-2">Built within agricultural land primarily used for farming.</p>
          <p className="text-gray-600 text-sm font-medium">Best for:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm ml-2">
            <li>Agriculture investors</li>
            <li>Nature living buyers</li>
          </ul>
        </div>

        <div className="border-l-4 border-blue-500 bg-blue-50 p-5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaHome className="text-blue-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Lifestyle Farmhouse</h4>
          </div>
          <p className="text-gray-700 mb-2">Designed mainly for leisure and weekend stays.</p>
          <p className="text-gray-600 text-sm font-medium">Best for:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm ml-2">
            <li>Urban professionals</li>
            <li>Second-home buyers</li>
          </ul>
        </div>

        <div className="border-l-4 border-purple-500 bg-purple-50 p-5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaShieldAlt className="text-purple-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Gated Farmhouse Community</h4>
          </div>
          <p className="text-gray-700 mb-2">Planned farmhouse layouts with internal infrastructure.</p>
          <p className="text-gray-600 text-sm font-medium">Best for:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm ml-2">
            <li>Secure lifestyle investment</li>
          </ul>
        </div>

        <div className="border-l-4 border-yellow-500 bg-yellow-50 p-5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaAward className="text-yellow-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Luxury Farmhouse Estate</h4>
          </div>
          <p className="text-gray-700 mb-2">Large land parcels with premium construction.</p>
          <p className="text-gray-600 text-sm font-medium">Best for:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm ml-2">
            <li>High-net-worth investors</li>
          </ul>
        </div>

        <div className="border-l-4 border-orange-500 bg-orange-50 p-5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaMapMarkedAlt className="text-orange-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Farm Plot + Future Construction</h4>
          </div>
          <p className="text-gray-700 mb-2">Land purchased first; farmhouse built later.</p>
          <p className="text-gray-600 text-sm font-medium">Best for:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm ml-2">
            <li>Long-term planners</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaMapMarkedAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">3. Land Classification & Zoning (Very Important)</h3>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        Farmhouses depend heavily on land zoning laws.
      </p>

      <div className="space-y-4">
        <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <FaLeaf className="text-green-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Agricultural Zone</h4>
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Farming permitted</li>
            <li>Residential construction restricted or limited</li>
            <li>Requires permissions</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <FaHome className="text-blue-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Converted Residential Zone (NA Conversion)</h4>
          </div>
          <p className="text-gray-700 mb-2">Agricultural land legally converted to residential use.</p>
          <p className="text-gray-700 font-medium mb-2">Allows:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> House construction</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Easier financing</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Higher resale value</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <FaTree className="text-yellow-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Green Belt / Conservation Zone</h4>
          </div>
          <p className="text-gray-700 mb-2">Strict development controls.</p>
          <p className="text-gray-700">Construction often limited or prohibited.</p>
        </div>
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mt-4">
        <p className="text-red-700 font-semibold flex items-center gap-2">
          <FaExclamationTriangle className="text-red-600" />
          Always verify zoning before purchase.
        </p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaBuilding className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">4. Can You Build a Farmhouse on Agricultural Land?</h3>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        Rules vary by state but generally:
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
          <h4 className="font-semibold text-lg mb-3 text-green-800">Allowed when:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Minimum land size criteria met</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Owner qualifies under local rules (if applicable)</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Local authority permissions obtained</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Construction limits followed</li>
          </ul>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200 flex items-center justify-center">
          <p className="text-gray-700 font-semibold text-center text-lg">
            Not all agricultural land permits residential construction.
          </p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaFileAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">5. Approvals & Permissions Required</h3>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        Farmhouse buyers must verify:
      </p>
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-blue-600 text-xl" />
            <span className="text-gray-700 font-medium">Land title ownership</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-blue-600 text-xl" />
            <span className="text-gray-700 font-medium">Land conversion status (if residential usage)</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-blue-600 text-xl" />
            <span className="text-gray-700 font-medium">Building permission approval</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-blue-600 text-xl" />
            <span className="text-gray-700 font-medium">Local panchayat/municipal permissions</span>
          </li>
          <li className="flex items-center gap-3">
            <FaRoad className="text-blue-600 text-xl" />
            <span className="text-gray-700 font-medium">Access road legality</span>
          </li>
          <li className="flex items-center gap-3">
            <FaBolt className="text-yellow-600 text-xl" />
            <span className="text-gray-700 font-medium">Electricity & water permissions</span>
          </li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">6. Layout Approvals (If Part of Farm Projects)</h3>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        Some farmhouse developments are sold as layouts.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4 font-medium">
        Possible approvals include:
      </p>

      <div className="space-y-4">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">DTCP Approved Farm Layout</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Structured plot planning</li>
            <li>Regional authority approval</li>
            <li>Semi-urban developments</li>
          </ul>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">Metropolitan Authority Approved Layouts</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Planned infrastructure</li>
            <li>Higher regulatory standards</li>
          </ul>
        </div>
      </div>

      <div className="bg-green-100 border-2 border-green-400 p-4 rounded-lg mt-4">
        <p className="text-green-800 font-semibold text-center">
          Approved layouts reduce risk significantly.
        </p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">7. RERA Applicability for Farmhouses (Very Important)</h3>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">When RERA Applies</h4>
        <p className="text-gray-700 mb-3">RERA applies if:</p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Farmhouse plots sold as a commercial project</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Developer markets multiple units together</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Project exceeds defined land area limits</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500" /> Development includes infrastructure promises</li>
        </ul>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">When RERA May NOT Apply</h4>
        <p className="text-gray-700 mb-3">RERA generally does not apply when:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Individual farmhouse resale</li>
          <li>Independent agricultural land sale</li>
          <li>Private owner-to-owner transactions</li>
        </ul>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">Why RERA is Important for Farmhouse Buyers</h4>
        <p className="text-gray-700 mb-3">RERA ensures:</p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Project transparency</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Verified approvals</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Delivery commitments</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Protection against false promises</li>
        </ul>
      </div>

      <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">RERA Buyer Benefits</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Access to project information</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Complaint resolution mechanism</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Timeline accountability</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Financial usage monitoring</li>
        </ul>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">How Buyers Verify RERA</h4>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Request RERA registration number.</li>
          <li>Check official RERA portal.</li>
          <li>Verify project details.</li>
        </ol>
        <p className="text-gray-700 mt-3 font-medium">Tanavi guides users through this verification.</p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaUsers className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">8. Who Should Buy a Farmhouse?</h3>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Ideal for:</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Lifestyle investors</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Weekend home buyers</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Long-term land investors</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Nature-focused families</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Diversified real estate investors</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">9. Tanavi Farmhouse Buyer Decision Flow</h3>
      </div>
      
      <div className="space-y-6">
        <div className="bg-primary text-white p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 1 — Define Purpose</h4>
          <div className="bg-white bg-opacity-20 p-4 rounded">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-2 pr-4 font-semibold">Goal</th>
                  <th className="text-left py-2 font-semibold">Suitable Farmhouse</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-1 pr-4">Weekend living</td><td className="py-1">Lifestyle farmhouse</td></tr>
                <tr><td className="py-1 pr-4">Investment</td><td className="py-1">Growth corridor land</td></tr>
                <tr><td className="py-1 pr-4">Agriculture</td><td className="py-1">Agricultural farmhouse</td></tr>
                <tr><td className="py-1 pr-4">Luxury retreat</td><td className="py-1">Premium estate</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 2 — Location Evaluation</h4>
          <p className="text-gray-700 mb-3">Check:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Distance from city</li>
            <li>Road connectivity</li>
            <li>Tourism growth</li>
            <li>Nearby developments</li>
            <li>Water availability</li>
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 3 — Legal Verification</h4>
          <p className="text-gray-700 mb-3">Verify:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Clear title</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Zoning legality</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Land conversion status</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Layout approvals (if applicable)</li>
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Encumbrance Certificate (EC)</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 4 — Physical Inspection</h4>
          <p className="text-gray-700 mb-3">Inspect:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Soil condition</li>
            <li>Water source</li>
            <li>Boundary clarity</li>
            <li>Flood risk</li>
            <li>Road access</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 5 — Development Potential Analysis</h4>
          <p className="text-gray-700 mb-3">Look for:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Highway expansion</li>
            <li>Tourism zones</li>
            <li>Urban growth direction</li>
            <li>Infrastructure projects</li>
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 6 — Tanavi Risk Rating Review</h4>
          <p className="text-gray-700">Evaluate before decision.</p>
        </div>

        <div className="bg-teal-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 7 — Site Visit via Tanavi</h4>
          <p className="text-gray-700">Ensures verified interaction.</p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">STEP 8 — Agreement & Registration</h4>
          <p className="text-gray-700 mb-3">Includes:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2"><FaFileContract className="text-blue-500" /> Sale agreement</li>
            <li className="flex items-center gap-2"><FaFileAlt className="text-green-500" /> Legal verification</li>
            <li className="flex items-center gap-2"><FaFileSignature className="text-purple-500" /> Registration</li>
            <li className="flex items-center gap-2"><FaKey className="text-yellow-600" /> Ownership transfer</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">10. Tanavi Farmhouse Risk Rating System™ (TFRS)</h3>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-4">Risk Category Evaluation</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaFileAlt className="text-blue-500" />
              <h5 className="font-semibold">Legal Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Land classification</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaMapMarkedAlt className="text-green-500" />
              <h5 className="font-semibold">Zoning Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Construction legality</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaRoad className="text-orange-500" />
              <h5 className="font-semibold">Access Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Road connectivity</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaWater className="text-blue-600" />
              <h5 className="font-semibold">Water Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Resource availability</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaChartLine className="text-purple-500" />
              <h5 className="font-semibold">Market Risk</h5>
            </div>
            <p className="text-gray-600 text-sm">Demand potential</p>
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
        <FaChartLine className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">11. Investment Scenarios</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaLeaf className="text-green-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Lifestyle holding</h4>
          </div>
          <p className="text-gray-700 text-sm">Personal enjoyment and relaxation</p>
        </div>
        <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaChartLine className="text-blue-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Long-term land appreciation</h4>
          </div>
          <p className="text-gray-700 text-sm">Value growth over time</p>
        </div>
        <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaUmbrellaBeach className="text-purple-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Retirement planning</h4>
          </div>
          <p className="text-gray-700 text-sm">Future peaceful living</p>
        </div>
        <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaDollarSign className="text-yellow-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Premium resale strategy</h4>
          </div>
          <p className="text-gray-700 text-sm">High-value exit opportunity</p>
        </div>
        <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <FaTree className="text-orange-600 text-xl" />
            <h4 className="font-semibold text-lg mb-0">Agro-tourism opportunity</h4>
          </div>
          <p className="text-gray-700 text-sm">Business and lifestyle combined</p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaAward className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">12. Factors Affecting Farmhouse Value</h3>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg">
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <FaMapMarkedAlt className="text-red-500 text-xl" />
            <span className="text-gray-700"><strong>Distance from city</strong> — Accessibility matters</span>
          </li>
          <li className="flex items-center gap-3">
            <FaRoad className="text-gray-600 text-xl" />
            <span className="text-gray-700"><strong>Road width & access</strong> — Connectivity quality</span>
          </li>
          <li className="flex items-center gap-3">
            <FaWater className="text-blue-500 text-xl" />
            <span className="text-gray-700"><strong>Water availability</strong> — Essential resource</span>
          </li>
          <li className="flex items-center gap-3">
            <FaMountain className="text-green-600 text-xl" />
            <span className="text-gray-700"><strong>Scenic environment</strong> — Natural beauty</span>
          </li>
          <li className="flex items-center gap-3">
            <FaChartLine className="text-purple-500 text-xl" />
            <span className="text-gray-700"><strong>Tourism growth</strong> — Area development</span>
          </li>
          <li className="flex items-center gap-3">
            <FaFileAlt className="text-orange-500 text-xl" />
            <span className="text-gray-700"><strong>Legal conversion status</strong> — Usage rights</span>
          </li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaExchangeAlt className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">13. Farmhouse vs Open Plot Comparison</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Factor</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Farmhouse</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Open Plot</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Lifestyle Use</td>
              <td className="border border-gray-300 px-4 py-2"><span className="text-green-600 font-semibold">Immediate</span></td>
              <td className="border border-gray-300 px-4 py-2">Future</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Maintenance</td>
              <td className="border border-gray-300 px-4 py-2">Moderate</td>
              <td className="border border-gray-300 px-4 py-2">Very Low</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Appreciation</td>
              <td className="border border-gray-300 px-4 py-2"><span className="text-green-600 font-semibold">High</span></td>
              <td className="border border-gray-300 px-4 py-2"><span className="text-green-600 font-semibold">High</span></td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Rental Potential</td>
              <td className="border border-gray-300 px-4 py-2">Seasonal</td>
              <td className="border border-gray-300 px-4 py-2"><span className="text-red-600 font-semibold">No</span></td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Investment Type</td>
              <td className="border border-gray-300 px-4 py-2">Lifestyle + Asset</td>
              <td className="border border-gray-300 px-4 py-2">Pure investment</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-2xl text-gray-700" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">14. Buyer Checklist</h3>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">Land classification verified</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">Conversion status checked</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">Building permission confirmed</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">Water availability checked</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <span className="text-gray-700 font-medium">Access road verified</span>
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
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">15. Seller Guide — Listing Farmhouse on Tanavi</h3>
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
              <span className="text-gray-700">Land extent clearly mentioned</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600" />
              <span className="text-gray-700">Building approvals shared</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600" />
              <span className="text-gray-700">Utilities details provided</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600" />
              <span className="text-gray-700">Accurate photos uploaded</span>
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
              <span className="text-gray-700">Verified buyers</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Structured visits</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Serious enquiries</span>
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
        <FaExclamationTriangle className="text-2xl text-red-600" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">16. Common Risks Buyers Must Understand</h3>
      </div>
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">Illegal farmhouse construction</span>
          </li>
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">Agricultural land misuse</span>
          </li>
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">No water source</span>
          </li>
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">Access road disputes</span>
          </li>
          <li className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">Non-approved layouts</span>
          </li>
        </ul>
        <p className="text-gray-700 font-semibold mt-4 pt-4 border-t border-red-200">
          Proper verification prevents most risks.
        </p>
      </div>
    </section>

    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaShieldAlt className="text-2xl text-primary" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">17. How Tanavi Properties Supports Users</h3>
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
              <span className="text-gray-700">Legal awareness guidance</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600 text-xl" />
              <span className="text-gray-700">Risk transparency</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600 text-xl" />
              <span className="text-gray-700">Visit scheduling system</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-blue-600 text-xl" />
              <span className="text-gray-700">Documentation assistance</span>
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
              <span className="text-gray-700">Trusted marketplace visibility</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Qualified buyer access</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Transparent listing system</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-gray-700">Structured transaction support</span>
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
          <p className="text-gray-700 font-medium mb-3">Typical platforms show:</p>
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
                <span className="text-gray-700">Legal education</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Land-use clarity</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Risk intelligence</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Investment understanding</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">End-to-end decision framework</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-gray-700 font-semibold mt-4 text-center text-lg">
          Users invest with confidence.
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
          Farmhouses offer a unique combination of lifestyle enjoyment and long-term land appreciation when 
          selected with proper legal understanding and planning.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg">
          Through structured guidance, regulatory awareness, verified listings, and transparent processes, 
          <span className="font-semibold text-primary"> Tanavi Properties enables safe and informed farmhouse investments for every buyer and seller.</span>
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

export default FarmhouseGuideContent;
