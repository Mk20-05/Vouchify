// src/Pages/TermsOfServicePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">

        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1.5" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
           <DocumentTextIcon className="h-12 w-12 mx-auto text-indigo-600 mb-2"/>
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-sm text-gray-500 mt-1">Last Updated: [Insert Date of Last Update]</p>
        </div>

        {/* Disclaimer */}
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded" role="alert">
          <p className="font-bold">Legal Disclaimer:</p>
          <p>This is placeholder content. Consult with a legal professional to create terms compliant with applicable laws and tailored to your specific service.</p>
        </div>

        {/* Content Sections */}
        <div className="prose prose-indigo max-w-none"> {/* Using Tailwind Typography plugin */}
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the Smart Voucher Exchange website and services (the "Service"), you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not agree to these Terms, do not use the Service.</p>

          <h2>2. Description of Service</h2>
          <p>Smart Voucher Exchange provides an online platform that allows users to list, sell, discover, and buy unused digital vouchers and gift cards ("Vouchers"). We act as a marketplace facilitator and are not a party to the direct transaction between buyers and sellers, except as explicitly stated.</p>

          <h2>3. User Accounts</h2>
          <p>You may need to register for an account to access certain features. You agree to provide accurate, current, and complete information during registration and keep it updated. You are responsible for safeguarding your password and for all activities that occur under your account. Notify us immediately of any unauthorized use.</p>

          <h2>4. User Conduct and Responsibilities</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>List or sell fraudulent, stolen, invalid, or expired Vouchers.</li>
            <li>Misrepresent the value, terms, or restrictions of any Voucher.</li>
            <li>Engage in any fraudulent activity, including creating fake accounts or manipulating listings.</li>
            <li>Violate any applicable laws or regulations.</li>
            <li>Infringe upon the intellectual property rights of others.</li>
            <li>Harass, abuse, or harm another person.</li>
            <li>Upload or transmit viruses or malicious code.</li>
          </ul>
          <p><strong>Sellers:</strong> You are responsible for the accuracy and validity of the Vouchers you list. You must ensure the Voucher code provided to the buyer is correct and unused (unless otherwise clearly stated and permitted). You agree to cooperate in resolving disputes.</p>
          <p><strong>Buyers:</strong> You are responsible for reviewing the details and restrictions of a Voucher before purchasing. Verify the Voucher code promptly upon receipt. Report any issues immediately according to our dispute process [Define Dispute Process Link/Method].</p>

          <h2>5. Voucher Transactions and Payments</h2>
          <p>All transactions are between the buyer and the seller. Smart Voucher Exchange facilitates the platform but does not guarantee the validity or usability of any listed Voucher beyond any specific buyer/seller protection programs we may offer [Mention specific programs if any].</p>
          <p>Payments are processed through third-party payment processors. You agree to their terms and conditions. [Mention any platform fees clearly, e.g., "We may charge a service fee on transactions..."]. Refund policies, if any, will be detailed separately [Link to Refund Policy if applicable].</p>

          <h2>6. Intellectual Property</h2>
          <p>The Service and its original content (excluding content provided by users), features, and functionality are owned by Smart Voucher Exchange and are protected by copyright and other intellectual property laws. Content provided by users (like voucher descriptions) remains their property, but you grant us a license to use it for operating and promoting the Service.</p>

          <h2>7. Disclaimers</h2>
          <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties regarding the reliability, accuracy, or availability of the Service or the validity of any listed Vouchers. We are not liable for disputes between users or issues arising from third-party Vouchers.</p>

          <h2>8. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, Smart Voucher Exchange shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service.</p>

          <h2>9. Termination</h2>
          <p>We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms.</p>

          <h2>10. Governing Law</h2>
          <p>These Terms shall be governed by the laws of [Your Jurisdiction, e.g., State of California, India], without regard to its conflict of law provisions.</p>

          <h2>11. Changes to Terms</h2>
          <p>We reserve the right to modify or replace these Terms at any time. We will provide notice of material changes (e.g., via email or a notice on the Service). Your continued use after changes constitutes acceptance.</p>

          <h2>12. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at: [Insert Your Contact Email Address]</p>
        </div>

      </div>
    </div>
  );
};

export default TermsOfServicePage;