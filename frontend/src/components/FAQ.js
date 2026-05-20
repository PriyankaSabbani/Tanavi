import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is posting a property on Tanavi Properties free?",
      answer: "Yes. Posting a property on Tanavi Properties is completely free. There are no subscription fees or listing charges for sellers."
    },
    {
      question: "Who can post a property on Tanavi Properties?",
      answer: "Only property owners or authorized sellers are allowed to post properties. Agents, brokers, or intermediaries are strictly not permitted to post listings on the platform."
    },
    {
      question: "What details must a seller provide while posting a property?",
      answer: "Sellers are required to provide complete and accurate information, including:\n• Property type, size, and specifications\n• Exact property location\n• Ownership and identity details\n• Property-related documents for verification\n• For agricultural land: Protected Tenant details (Yes / No)"
    },
    {
      question: "Why does Tanavi Properties collect property documents?",
      answer: "Property documents are collected solely for verification purposes, to:\n• Validate ownership authenticity\n• Confirm that the seller and document holder are the same person\n• Ensure that only genuine properties are listed\n\nThese documents are kept confidential and are not publicly displayed."
    },
    {
      question: "What is the property approval process?",
      answer: "The approval process includes:\n1. Seller submits property details and documents\n2. Tanavi Properties reviews and verifies the information\n3. Upon successful verification, the listing is approved\n4. The property is made live on the platform\n\nTanavi Properties reserves the right to approve, reject, or remove listings."
    },
    {
      question: "Can real estate agents or brokers participate in transactions?",
      answer: "No. Tanavi Properties does not entertain agents or brokers at any stage of listing or transaction. All transactions are handled directly between seller and buyer, facilitated by Tanavi Properties."
    },
    {
      question: "Who manages the transaction process?",
      answer: "Tanavi Properties manages the process end-to-end, including:\n• Verified property listings\n• Coordinated communication\n• Transaction facilitation between seller and buyer\n\nThis ensures a smooth and transparent experience."
    },
    {
      question: "Are there any charges for using Tanavi Properties?",
      answer: "There are no charges for posting a property. After a successful transaction, Tanavi Properties collects a Professional Service Fee from the customer."
    },
    {
      question: "When is the Professional Service Fee applicable?",
      answer: "The Professional Service Fee is applicable only after the successful completion of the transaction. There are no advance fees or hidden charges."
    },
    {
      question: "What about legal verification and legal opinion?",
      answer: "Tanavi Properties strongly recommends every customer to obtain a legal opinion from a qualified advocate before proceeding with any property transaction.\n\n• If a customer independently obtains a legal opinion, it shall be considered their personal decision and opinion, and Tanavi Properties shall not be responsible for such opinions.\n• If the buyer requests that legal verification and legal opinion be arranged through Tanavi Properties, then Tanavi Properties will facilitate and obtain the legal opinion through its associated legal professionals.\n• Only after the legal opinion is completed through Tanavi Properties, the transaction process will be initiated and moved forward.\n\nThis ensures clarity, legal diligence, and a secure transaction for all parties involved."
    },
    {
      question: "Is Tanavi Properties responsible for ownership disputes or legal claims?",
      answer: "Tanavi Properties acts as a verification and facilitation platform. While we ensure document review and process coordination, final legal responsibility rests with the seller and buyer."
    },
    {
      question: "Can a property listing be removed?",
      answer: "Yes. Tanavi Properties reserves the right to:\n• Remove listings with incorrect or misleading information\n• Suspend users violating platform policies\n• Withdraw listings without prior notice if compliance is not met"
    },
    {
      question: "How does Tanavi Properties ensure trust and transparency?",
      answer: "Through:\n• Strict seller verification\n• Document review before approval\n• No agent involvement\n• End-to-end transaction facilitation\n\nTanavi Properties is committed to a secure, transparent, and trustworthy property transaction experience."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Frequently Asked Questions</h2>
        <p className="text-center text-gray-600 mb-8">Everything you need to know about Tanavi Properties</p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-secondary/10 border-2 border-secondary rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-secondary/20 transition"
              >
                <span className="font-semibold text-textDark pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-primary flex-shrink-0" />
                ) : (
                  <FaChevronDown className="text-primary flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-textGray whitespace-pre-line">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-primary/10 rounded-lg border-l-4 border-primary">
          <p className="text-sm text-textDark">
            <strong>✅ NOTE:</strong> Tanavi Properties operates as a verified property facilitation platform, prioritizing transparency, legal diligence, and customer confidence in every transaction.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
