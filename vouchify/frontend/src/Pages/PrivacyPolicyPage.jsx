// src/Pages/PrivacyPolicyPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const PrivacyPolicyPage = () => {
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
           <ShieldCheckIcon className="h-12 w-12 mx-auto text-indigo-600 mb-2"/>
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mt-1">Last Updated: [Insert Date of Last Update]</p>
        </div>

        {/* Disclaimer */}
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded" role="alert">
          <p className="font-bold">Legal Disclaimer:</p>
          <p>This is placeholder content. Consult with a legal professional to create a policy compliant with applicable laws and tailored to your specific practices.</p>
        </div>

        {/* Content Sections */}
        <div className="prose prose-indigo max-w-none"> {/* Using Tailwind Typography plugin for basic styling */}
          <h2>1. Introduction</h2>
          <p>Welcome to Smart Voucher Exchange ("we", "us", "our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services (collectively, the "Service"). Please read this policy carefully.</p>

          <h2>2. Information We Collect</h2>
          <p>We may collect information about you in various ways:</p>
          <ul>
            <li><strong>Personal Data:</strong> Information you provide directly, such as your name, email address, password, and profile details when you register an account.</li>
            <li><strong>Voucher Information:</strong> Details about the vouchers you list or inquire about, including brand, value, expiry date, and any descriptions or images you provide.</li>
            <li><strong>Transaction Information:</strong> Details related to your purchases or sales of vouchers through the Service (Note: Specific payment details like full credit card numbers are typically processed by our third-party payment processors, e.g., Stripe or PayPal, and are subject to their privacy policies. We may receive transaction confirmation details).</li>
            <li><strong>Usage Data:</strong> Information automatically collected when you access the Service, such as your IP address, browser type, operating system, pages viewed, and the dates/times of your visits.</li>
            <li><strong>Communications:</strong> Information you provide when you contact us for support or provide feedback.</li>
            <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, operate, and maintain our Service.</li>
            <li>Process your transactions and manage voucher listings.</li>
            <li>Create and manage your account.</li>
            <li>Improve, personalize, and expand our Service.</li>
            <li>Communicate with you, including responding to inquiries and providing customer support.</li>
            <li>Send you updates, security alerts, and administrative messages.</li>
            <li>Monitor and analyze usage and trends to improve user experience.</li>
            <li>Prevent fraudulent transactions, enforce our terms, and comply with legal obligations.</li>
            <li>[Optional: Send marketing communications if you opt-in].</li>
          </ul>

          <h2>4. How We Share Your Information</h2>
          <p>We may share your information in the following situations:</p>
          <ul>
            <li><strong>With Service Providers:</strong> With third-party vendors and service providers who perform services for us (e.g., payment processing, data analysis, email delivery, hosting services).</li>
            <li><strong>For Business Transfers:</strong> In connection with a merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
            <li><strong>With Other Users (Limited):</strong> Information necessary to facilitate a transaction between users (e.g., confirmation that a voucher code has been marked as used, potentially masked communication if implemented). Be specific about what is shared.</li>
            <li><strong>For Legal Reasons:</strong> If required by law or in response to valid requests by public authorities.</li>
            <li><strong>To Protect Rights:</strong> To protect our rights, privacy, safety, or property, and/or that of yours or others.</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>

          <h2>5. Data Security</h2>
          <p>We implement reasonable administrative, technical, and physical security measures designed to protect your information. However, no electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>

          <h2>6. Data Retention</h2>
          <p>We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>

          <h2>7. Your Data Protection Rights</h2>
          <p>Depending on your location, you may have rights regarding your personal data, such as the right to access, correct, update, or request deletion. Please contact us using the details below to exercise these rights.</p>

          <h2>8. Cookies and Tracking Technologies</h2>
          <p>We use cookies to enhance your experience. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>

          <h2>9. Children's Privacy</h2>
          <p>Our Service is not intended for individuals under the age of [Insert Age, e.g., 13 or 16]. We do not knowingly collect personal data from children. If you become aware that a child has provided us with personal data, please contact us.</p>

          <h2>10. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically.</p>

          <h2>11. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at: [Insert Your Contact Email Address]</p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;