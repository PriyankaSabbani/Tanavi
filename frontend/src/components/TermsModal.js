import React from 'react';
import { FaTimes } from 'react-icons/fa';

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-primary text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold"> Terms & Conditions</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-gray-700">
          <h3 className="text-xl font-bold text-center">Tanavi Properties</h3>

          <section>
            <h4 className="font-bold text-lg mb-2">1. Acceptance of Terms</h4>
            <p>By accessing, browsing, registering, or using the website, mobile application, or services of Tanavi Properties ("Platform"), the user ("User") agrees to be bound by these Terms & Conditions, the Privacy Policy, and any other policies published on the Platform from time to time.</p>
            <p className="mt-2">If the User does not agree to these Terms, the User must immediately discontinue use of the Platform.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">2. Eligibility and Permitted Users</h4>
            <p>2.1 The Platform may be used only by individuals who are legally capable of entering into binding agreements under applicable law.</p>
            <p className="mt-2">2.2 Only property owners or individuals legally authorized by the owner are permitted to list properties on Tanavi Properties.</p>
            <p className="mt-2">2.3 Real estate agents, brokers, channel partners, middlemen, or intermediaries are strictly prohibited from listing properties or participating in transactions on the Platform.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">3. Nature of Services</h4>
            <p>3.1 Tanavi Properties operates as a property verification, facilitation, and transaction coordination platform, providing a structured and managed environment for property transactions.</p>
            <p className="mt-2">3.2 Tanavi Properties provides its services in the following manner:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Property listings are submitted by sellers and published on the Platform only after verification by Tanavi Properties.</li>
              <li>Interested buyers must submit a "Schedule a Visit" request through the Platform for a specific property. All site visits shall be arranged only based on such scheduled requests and coordinated by Tanavi Properties.</li>
              <li>Property visits, whether physical or virtual, shall be arranged, approved, and managed by Tanavi Properties to ensure transparency and verification.</li>
              <li>After viewing the property, if the buyer expresses intent to proceed, Tanavi Properties shall arrange and facilitate negotiation discussions between the seller and buyer through online meetings or calls, or physical meetings, as deemed appropriate by Tanavi Properties.</li>
              <li>All negotiations, discussions, and transaction-related communications shall be coordinated and supervised by Tanavi Properties. Independent or unsupervised negotiations outside the Platform during the transaction process are not permitted.</li>
              <li>Tanavi Properties shall remain the primary and central point of contact between the seller and buyer throughout the transaction process.</li>
              <li>Any negotiation, agreement, or understanding reached outside the facilitation of Tanavi Properties shall not be recognized as part of the Platform's transaction process.</li>
              <li>Upon successful completion of a transaction, Tanavi Properties shall collect a Facilitation Fee / Professional Service Fee, determined in accordance with prevailing market practices and communicated transparently to the customer.</li>
              <li>Tanavi Properties does not own, purchase, sell, or market any property listed on the Platform.</li>
              <li>Tanavi Properties does not act as a real estate broker or agent and does not represent either party individually.</li>
              <li>Tanavi Properties does not guarantee title, ownership, or legal validity of any property beyond verification procedures conducted as part of its services.</li>
            </ul>
            <p className="mt-2">3.3 The Platform enables property transactions through a controlled, verified, and Tanavi-managed process; however, final contractual obligations, payments, registration, stamp duty, and ownership transfer remain the sole responsibility of the seller and buyer.</p>
            <p className="mt-2">3.4 Tanavi Properties does not guarantee that any listing will result in a successful transaction. Transaction completion depends on mutual agreement, legal clearance, and compliance by both parties.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">4. Property Listing and Seller Obligations</h4>
            <p>4.1 Property listing on Tanavi Properties is free of charge.</p>
            <p className="mt-2">4.2 Sellers must provide accurate, complete, and truthful information, including:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Property details and specifications</li>
              <li>Exact location information</li>
              <li>Ownership details</li>
              <li>Supporting property documents</li>
            </ul>
            <p className="mt-2">4.3 For agricultural land listings, disclosure of Protected Tenant status (Yes / No) is mandatory.</p>
            <p className="mt-2">4.4 Sellers are solely responsible for the authenticity, accuracy, and legality of all information and documents submitted.</p>
            <p className="mt-2">4.5 Sellers must promptly update the Platform if a listed property is sold, leased, under agreement, or otherwise no longer available. Failure to update the property status may result in suspension or removal of the listing or account.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">5. Document Submission and Verification</h4>
            <p>5.1 Property documents are collected strictly for verification purposes.</p>
            <p className="mt-2">5.2 Verification is conducted to confirm seller authenticity, and ensure that the seller and document holder are the same individual.</p>
            <p className="mt-2">5.3 Document verification does not constitute a legal ownership guarantee.</p>
            <p className="mt-2">5.4 All documents are handled securely and are not displayed publicly.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">6. Listing Approval, Suspension, and Removal</h4>
            <p>6.1 All property listings are subject to approval by Tanavi Properties.</p>
            <p className="mt-2">6.2 Tanavi Properties reserves the right to reject, suspend, or remove any listing or user account, without prior notice, if these Terms & Conditions are violated or if information is found to be false or misleading.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">7. Legal Opinion and Due Diligence</h4>
            <p>7.1 Tanavi Properties strongly recommends that all Users obtain an independent legal opinion from a qualified advocate before concluding any property transaction.</p>
            <p className="mt-2">7.2 Legal opinions obtained independently by Users shall be their sole responsibility, and Tanavi Properties shall not be liable for such opinions.</p>
            <p className="mt-2">7.3 Where the buyer requests legal verification through Tanavi Properties, Tanavi Properties shall facilitate due diligence through associated legal professionals, and the transaction shall proceed only after completion of such legal verification.</p>
            <p className="mt-2">7.4 Tanavi Properties reserves the right to pause or discontinue transactions if legal concerns are identified.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">8. Fees and Charges</h4>
            <p>8.1 There are no charges for posting a property on the Platform.</p>
            <p className="mt-2">8.2 A Facilitation Fee / Professional Service Fee shall be payable to Tanavi Properties only upon successful completion of a transaction.</p>
            <p className="mt-2">8.3 The applicable fee shall be communicated clearly and transparently. No advance or hidden charges apply.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">9. Prohibition of Agents or Brokers</h4>
            <p>9.1 Posting or participation by agents, brokers, or intermediaries is strictly prohibited.</p>
            <p className="mt-2">9.2 Any violation may result in immediate listing removal, account termination, and initiation of legal action as permitted under applicable law.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">10. Account Security and Unauthorized Access</h4>
            <p>10.1 Users are responsible for safeguarding their account credentials.</p>
            <p className="mt-2">10.2 Any unauthorized access or misuse must be reported immediately to Tanavi Properties.</p>
            <p className="mt-2">10.3 Tanavi Properties shall not be liable for losses arising from unauthorized access caused by User negligence or delayed reporting.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">11. European Union Data Protection Rights (EU GDPR)</h4>
            <p>11.1 Subject to applicable law, EU residents may exercise rights including access, correction, deletion, restriction, and portability of personal data.</p>
            <p className="mt-2">11.2 These rights are subject to lawful limitations and are not exhaustive.</p>
            <p className="mt-2">11.3 Requests may be submitted through the contact details provided in the Privacy Policy.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">12. Indemnity</h4>
            <p>The User agrees to indemnify and hold harmless Tanavi Properties from any losses, damages, claims, or liabilities arising from false information, document inaccuracies, violations of these Terms, or unlawful acts.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">13. Limitation of Liability</h4>
            <p>Tanavi Properties shall not be liable for legal disputes, title defects, financial losses, transaction failures, or decisions taken based on independent legal opinions.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">14. Termination of Access</h4>
            <p>Tanavi Properties may suspend or terminate access to the Platform without notice in the event of violation of these Terms & Conditions.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">15. Grievance Redressal</h4>
            <p>Users may contact the designated Grievance Officer for complaints or concerns. Grievances shall be addressed within timelines prescribed under applicable law.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">16. Governing Law and Jurisdiction</h4>
            <p>These Terms & Conditions shall be governed by the laws of India. Courts having competent jurisdiction shall have exclusive authority.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">17. Circumvention and Commission Protection</h4>
            <p>17.1 If a property listed on Tanavi Properties is sold, leased, or transferred—directly or indirectly—to a buyer who viewed the property through Tanavi Properties, or was introduced to the property or seller via the Platform, within 12 months (Sale) or 6 months (Lease) from the date of first visit or introduction, such transaction shall be deemed to have arisen through Tanavi Properties.</p>
            <p className="mt-2">17.2 In such cases, the applicable Facilitation Fee / Professional Service Fee shall remain payable to Tanavi Properties, even if the transaction is completed outside the Platform.</p>
            <p className="mt-2">17.3 Any attempt to bypass, avoid, or circumvent Tanavi Properties shall constitute a material breach of these Terms.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">18. Platform Availability</h4>
            <p>Tanavi Properties shall not be liable for temporary unavailability of the Platform due to maintenance, upgrades, technical issues, or events beyond reasonable control.</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2">19. Amendments to Terms</h4>
            <p>Tanavi Properties reserves the right to amend or update these Terms & Conditions at any time. Continued use of the Platform constitutes acceptance of the revised Terms.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
