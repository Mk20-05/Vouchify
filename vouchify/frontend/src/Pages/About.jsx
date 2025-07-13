// src/Pages/About.jsx (Make sure path matches App.jsx imports)
import React from 'react';
import myPhoto from '../pics/my photo.img.jpeg';
import madhanPhoto from '../pics/madhankumar.jpg';

import {
  BuildingOffice2Icon,
  LightBulbIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  BoltIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowUpTrayIcon,       // Step 1: List
  MagnifyingGlassIcon,   // Step 2: Discover
  CreditCardIcon,        // Step 3: Purchase
  ArrowsRightLeftIcon,   // Step 4: Exchange
  CheckCircleIcon,       // Step 5: Confirmation
  SparklesIcon,          // Step 6: Enjoy
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 text-gray-900">
      {/* Hero Section */}
      <section className="relative text-center py-24 md:py-32 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="relative container mx-auto px-4 z-10">
           <BuildingOffice2Icon className="h-16 w-16 mx-auto mb-4 text-white opacity-80"/>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">About Vouchify</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Connecting savers and sellers to unlock the hidden value in every unused voucher.
          </p>
        </div>
         <div className="absolute -bottom-1 left-0 w-full h-16 bg-gradient-to-t from-blue-100 to-transparent z-0"></div>
      </section>

      {/* The Problem & Our Solution Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <LightBulbIcon className="h-12 w-12 mx-auto md:mx-0 mb-3 text-yellow-500"/>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">The Unused Voucher Dilemma</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Millions worth of gift cards and vouchers go unused every year – a loss for consumers and a missed opportunity for businesses. Finding the right time or item before expiry can be a challenge.
              </p>
            </div>
            <div className="text-center md:text-left">
               <RocketLaunchIcon className="h-12 w-12 mx-auto md:mx-0 mb-3 text-green-500"/>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Smart Solution</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Smart Voucher Exchange provides a secure, easy-to-use marketplace where individuals can sell their unwanted vouchers to savvy shoppers looking for discounts. We turn potential waste into real savings and earnings.
              </p>
            </div>
          </div>
        </div>
      </section>

       {/* Our Vision Section */}
      <section className="py-16 bg-gray-50">
         <div className="container mx-auto px-4 max-w-3xl text-center">
             <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
             <p className="text-xl text-gray-700 leading-relaxed">
                 To be the leading platform for secondary voucher exchange, fostering a sustainable ecosystem where value is maximized, savings are amplified, and every voucher finds its purpose. We envision a world with less waste and more smart shopping.
             </p>
         </div>
      </section>

      {/* Core Values / Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose Vochify ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<ShieldCheckIcon className="h-10 w-10 text-blue-600" />}
              title="Security & Trust"
              description="We prioritize secure transactions and user verification to build a trustworthy community."
            />
            <ValueCard
              icon={<BoltIcon className="h-10 w-10 text-yellow-600" />}
              title="Simplicity & Ease"
              description="Our platform is designed for effortless listing and purchasing, making the exchange process seamless."
            />
            <ValueCard
              icon={<CurrencyDollarIcon className="h-10 w-10 text-green-600" />}
              title="Real Savings & Earnings"
              description="Buyers find great deals below face value, while sellers recover value from unwanted vouchers."
            />
            <ValueCard
              icon={<UserGroupIcon className="h-10 w-10 text-purple-600" />}
              title="Community Focused"
              description="Join a growing community of smart savers and sellers helping each other maximize value."
            />
          </div>
        </div>
      </section>

      {/* --- EXPANDED How It Works Section (6 Steps) --- */}
       <section id="how-it-works-detailed" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">How It Works: Step-by-Step</h2>
          {/* Use a grid layout that wraps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <StepCard icon={<ArrowUpTrayIcon />} number={1} title="List Your Voucher" description="Sellers easily add voucher details (code, expiry, price) to our secure platform." />
            <StepCard icon={<MagnifyingGlassIcon />} number={2} title="Discover Deals" description="Buyers browse or search the marketplace for relevant vouchers offered at discounts." />
            <StepCard icon={<CreditCardIcon />} number={3} title="Secure Purchase" description="Buyer finds a deal and initiates a safe purchase via our integrated payment system." />
            <StepCard icon={<ArrowsRightLeftIcon />} number={4} title="Instant Exchange" description="Upon successful payment, the voucher details are securely revealed to the buyer." />
            <StepCard icon={<CheckCircleIcon />} number={5} title="Confirm & Pay Seller" description="Both parties receive transaction confirmation. Seller payment processed after confirmation." />
            <StepCard icon={<SparklesIcon />} number={6} title="Save & Enjoy!" description="Buyer uses the voucher for savings. Seller successfully earned from their unused voucher!" />
          </div>
        </div>
      </section>


      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 justify-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center border border-gray-100 transform hover:-translate-y-1">
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full mb-4 object-cover border-4 border-blue-100"
                    onError={(e) => { e.target.onerror = null; e.target.src="placeholder_user_icon.png" }}
                />
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

// --- Reusable Value Card Component --- (Keep as is)
const ValueCard = ({ icon, title, description }) => (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center border border-gray-200/50 flex flex-col items-center h-full">
     <div className="mb-4 p-3 rounded-full bg-blue-100 inline-block">
        {React.cloneElement(icon, { className: icon.props.className || "h-8 w-8 text-blue-700" })}
     </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm flex-grow">{description}</p>
  </div>
);

// --- Reusable Step Card Component --- (Slightly adjusted styling if needed)
const StepCard = ({ icon, number, title, description }) => (
  <div className="flex flex-col items-center text-center p-4"> {/* Added padding */}
    <div className="relative mb-4">
      {/* Icon background color can be changed per step if desired */}
      <div className="bg-green-100 rounded-full p-4 ring-4 ring-green-50">
        {React.cloneElement(icon, { className: "h-10 w-10 text-green-600" })}
      </div>
      <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow">
        {number}
      </span>
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p> {/* Added leading-relaxed */}
  </div>
);


// --- Team Members Data --- (Keep as is)
const teamMembers = [
  { name: "Chandra Teja", role: "CEO", image: myPhoto },
  { name: "MadhanKumar", role: "CTO", image: madhanPhoto },
  { name: "Harikaran", role: "Lead Designer", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Khaja Reddy", role: "Lead Developer", image: "https://randomuser.me/api/portraits/men/47.jpg" },
  { name: "Faiyaz", role: "Marketing Head", image: "https://randomuser.me/api/portraits/men/48.jpg" },
  { name: "Madhan Kumar G", role: "Operations Manager", image: "https://randomuser.me/api/portraits/men/49.jpg" },
];


export default About;  