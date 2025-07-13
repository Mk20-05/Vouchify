// src/Pages/Contact.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EnvelopeIcon, UserIcon, AtSymbolIcon, TagIcon, ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon, QuestionMarkCircleIcon, CheckCircleIcon, ExclamationCircleIcon,
  ArrowLeftIcon, LifebuoyIcon, ClockIcon,
} from '@heroicons/react/24/outline';

const Contact = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission (placeholder)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    console.log("Contact Form Data:", formData);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    const success = Math.random() > 0.2; // Simulate success/failure

    if (success) {
        setSubmitStatus({ type: 'success', message: 'Your message has been sent successfully! We typically respond within 24-48 hours.' });
        // Clear form only on success
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } else {
        setSubmitStatus({ type: 'error', message: 'Something went wrong sending your message. Please try again, or reach out to our support email directly.' });
    }
    setIsSubmitting(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      {/* --- Increased max-width for better spacing in two-column layout --- */}
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
           <EnvelopeIcon className="h-12 w-12 mx-auto text-indigo-600 mb-3"/>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Get In Touch</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? Use the form below or check our support channels. We're happy to help!
          </p>
        </div>

        {/* --- Adjusted Grid Layout: 1 column default, 2 columns on large screens --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-12">

            {/* --- Contact Form (Takes 1 column on large screens) --- */}
            {/* Removed md:col-span-2 */}
            <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 order-last lg:order-first"> {/* Order changes for mobile */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="John Doe" />
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AtSymbolIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="you@example.com" />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject / Inquiry Type</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <TagIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none">
                      <option>General Inquiry</option>
                      <option>Listing Issue / Support</option>
                      <option>Buying Issue / Support</option>
                      <option>Payment Problem</option>
                      <option>Account Help</option>
                      <option>Feedback & Suggestions</option>
                      <option>Partnership Inquiry</option>
                      <option>Report a Problem</option>
                    </select>
                    {/* Select Arrow */}
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <div className="relative rounded-md shadow-sm">
                    {/* Position icon slightly better for textarea */}
                    <ChatBubbleLeftEllipsisIcon className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <textarea name="message" id="message" required rows="5" value={formData.message} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Please provide details about your inquiry..."></textarea>
                  </div>
                </div>

                {/* Submission Feedback */}
                {submitStatus.type && (
                  <div className={`flex items-center p-3 rounded-md border text-sm ${
                      submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                      {submitStatus.type === 'success' ?
                        <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" /> :
                        <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                      }
                      <p>{submitStatus.message}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div>
                  <button type="submit" disabled={isSubmitting} className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                    {isSubmitting ? (
                       <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          <span>Sending...</span>
                       </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* --- Customer Support Info (Takes 1 column on large screens) --- */}
            {/* Removed md:col-span-1 */}
            {/* Added slightly more padding and potentially more vertical spacing */}
            <div className="bg-white shadow-xl rounded-lg h-1/2 p-6 sm:p-8 space-y-8"> {/* Increased spacing between blocks */}
                {/* Block 1: Support Channels */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <LifebuoyIcon className="h-6 w-6 mr-2 text-indigo-600"/>
                        Support Channels
                    </h3>
                    <div className="space-y-4 text-sm text-gray-600"> {/* Increased spacing between items */}
                        <div className="flex items-start">
                            <EnvelopeIcon className="h-5 w-5 mr-3 mt-0.5 text-gray-400 flex-shrink-0"/>
                            <div>
                                <span className="font-medium text-gray-700 block">Support Email:</span>
                                <a href="mailto:support@smartvoucherexchange.com" className="text-indigo-600 hover:text-indigo-800 hover:underline break-all">
                                    support@smartvoucherexchange.com
                                </a>
                            </div>
                        </div>
                         <div className="flex items-start">
                            <QuestionMarkCircleIcon className="h-5 w-5 mr-3 mt-0.5 text-gray-400 flex-shrink-0"/>
                             <div>
                                <span className="font-medium text-gray-700 block">Knowledge Base:</span>
                                <Link to="/faq" className="text-indigo-600 hover:text-indigo-800 hover:underline">
                                    Visit our FAQs for quick answers
                                </Link>
                             </div>
                        </div>
                         <div className="flex items-start">
                            <ClockIcon className="h-5 w-5 mr-3 mt-0.5 text-gray-400 flex-shrink-0"/>
                             <div>
                                <span className="font-medium text-gray-700 block">Expected Response Time:</span>
                                We typically respond to inquiries within 24-48 business hours.
                             </div>
                        </div>
                    </div>
                </div>

                 {/* Optional Block 2: Direct Contact Info (Example) */}
                 {/* You could add office address, phone (if applicable), etc. */}
                {/* <div className="border-t border-gray-200 pt-6">
                     <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <MapPinIcon className="h-6 w-6 mr-2 text-indigo-600"/>
                        Our Office
                    </h3>
                    <address className="text-sm text-gray-600 not-italic">
                        123 Exchange Street<br />
                        Suite 450<br />
                        Metropolis, NY 10001<br />
                        United States
                    </address>
                </div> */}

            </div>

        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-12 md:mt-16">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition duration-300"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1.5" />
              Back to Home
            </Link>
        </div>

      </div>
    </div>
  );
};

export default Contact;