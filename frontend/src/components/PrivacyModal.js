import React from 'react';
import { FaTimes } from 'react-icons/fa';

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-primary text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold"> Privacy Policy</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-gray-700">
          <h3 className="text-xl font-bold text-center">Tanavi Properties</h3>
          <p>Tanavi Properties ("Tanavi", "we", "our", or "us") is committed to protecting the privacy and personal information of its users ("User", "you"). This Privacy Policy explains how we collect, use, store, disclose, and protect information when you access or use our website, mobile application, or services (collectively, the "Platform").</p>
          <p>By accessing or using the Platform, you agree to the collection and use of information in accordance with this Privacy Policy.</p>

          <section>
            <h4 className="font-bold text-lg mb-2">1. Information We Collect</h4>
            <p>We may collect the following categories of information:</p>
            
            <div className="mt-3">
              <p className="font-semibold">1.1 Personal Information</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Full name</li>
                <li>Mobile number</li>
                <li>Email address</li>
                <li>Address and identity details (where required for verification)</li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="font-semibold">1.2 Property Information</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Property type, size, and specifications</li>
                <li>Exact property location details</li>
                <li>Ownership information</li>
                <li>Property documents submitted for verification</li>
                <li>For agricultural land: Protected Tenant status (Yes / No)</li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="font-semibold">1.3 Transaction & Interaction Information</p>
              <ul className="list-disc ml-6 mt-2">
                <li>"Schedule a Visit" requests</li>
                <li>Property visit details (date, time, mode)</li>
                <li>Negotiation facilitation records</li>
                <li>Legal verification requests</li>
                <li>Communication records facilitated through the Platform</li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="font-semibold">1.4 Technical Information</p>
              <ul className="list-disc ml-6 mt-2">
                <li>IP address</li>
                <li>Browser, device, and operating system details</li>
                <li>Log data, cookies, and usage analytics</li>
              </ul>
            </div>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">2. Purpose of Information Collection</h4>
            <p>Tanavi Properties collects and processes information strictly for legitimate business purposes, including:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Verifying seller identity and property authenticity</li>
              <li>Managing property listings and approvals</li>
              <li>Scheduling and coordinating property visits</li>
              <li>Facilitating negotiations between sellers and buyers</li>
              <li>Arranging legal verification upon request</li>
              <li>Completing transactions and service fulfillment</li>
              <li>Preventing fraud, misuse, or unauthorized activity</li>
              <li>Improving Platform functionality and user experience</li>
              <li>Complying with applicable legal and regulatory obligations</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">3. Property Documents & Data Security</h4>
            <p>3.1 Property documents are collected solely for verification and facilitation purposes.</p>
            <p className="mt-2">3.2 Such documents:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Are not publicly displayed</li>
              <li>Are accessed only by authorized personnel</li>
              <li>Are stored using reasonable technical and organizational security measures</li>
            </ul>
            <p className="mt-2">3.3 Submission of documents does not constitute a guarantee of title, ownership, or legal validity by Tanavi Properties.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">4. Disclosure and Sharing of Information</h4>
            <p>Tanavi Properties does not sell, rent, or trade personal information.</p>
            <p className="mt-2">Information may be shared only under the following circumstances:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>With sellers or buyers, strictly as required to facilitate a transaction</li>
              <li>With legal professionals, when legal verification is requested through Tanavi Properties</li>
              <li>With service providers assisting in Platform operations, under confidentiality obligations</li>
              <li>When required by law, court order, or government authority</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">5. No Direct Contact Policy</h4>
            <p>To ensure transparency and controlled transactions:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Communication between buyers and sellers is facilitated through Tanavi Properties</li>
              <li>Direct exchange of personal contact details may be restricted during the transaction process</li>
              <li>Transactions conducted outside the Platform may not be recognized for service or fee purposes</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">6. Cookies and Tracking Technologies</h4>
            <p>6.1 Tanavi Properties may use cookies and similar technologies to:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Enhance user experience</li>
              <li>Analyze Platform usage</li>
              <li>Improve services and performance</li>
            </ul>
            <p className="mt-2">6.2 Cookies do not collect sensitive personal information. Users may manage cookie preferences through their browser settings.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">7. Data Retention</h4>
            <p>7.1 Personal and property-related information is retained only for as long as necessary to:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Fulfill the purposes outlined in this Privacy Policy</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
            <p className="mt-2">7.2 Information may be retained even after account closure if required under applicable law.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">8. European Union Data Protection Rights (EU GDPR)</h4>
            <p>8.1 Subject to applicable law, users who are residents or nationals of the European Union may have the following rights:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Right to access personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to deletion or erasure (subject to legal obligations)</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to data portability</li>
            </ul>
            <p className="mt-2">8.2 These rights are not absolute and are subject to lawful limitations.</p>
            <p className="mt-2">8.3 Requests may be submitted through the contact details provided on the Platform.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">9. User Responsibilities</h4>
            <p>Users are responsible for:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Providing accurate, lawful, and up-to-date information</li>
              <li>Maintaining confidentiality of login credentials</li>
              <li>Not uploading forged, misleading, or unauthorized documents</li>
            </ul>
            <p className="mt-2">Tanavi Properties shall not be responsible for issues arising from incorrect or false information provided by Users.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">10. Children's Privacy</h4>
            <p>The Platform is not intended for individuals below 18 years of age. Tanavi Properties does not knowingly collect personal information from minors.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">11. Third-Party Links</h4>
            <p>The Platform may contain links to third-party websites. Tanavi Properties is not responsible for the privacy practices or content of such external sites.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">12. Changes to This Privacy Policy</h4>
            <p>Tanavi Properties reserves the right to update this Privacy Policy from time to time. Any changes will be posted on the Platform. Continued use of the Platform constitutes acceptance of the updated Policy.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">13. Grievance Redressal & Contact</h4>
            <p>Users may contact the designated Grievance Officer for:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Privacy-related concerns</li>
              <li>Data access, correction, or deletion requests</li>
              <li>Complaints or clarifications</li>
            </ul>
            <p className="mt-2">Grievance Officer details shall be published on the Platform in accordance with applicable law.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
