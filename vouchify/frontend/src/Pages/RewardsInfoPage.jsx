// src/pages/RewardsInfoPage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // For linking back or to other sections
import { StarIcon, GiftIcon, TicketIcon } from '@heroicons/react/24/solid'; // Using solid icons for emphasis

const RewardsInfoPage = () => {
    return (
        <div className="bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-slate-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 md:p-12">
                <div className="text-center mb-10">
                    <GiftIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Earn, Save & Get Rewarded!
                    </h1>
                    <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
                        At Smart Voucher Exchange, loyalty pays off. See how you benefit!
                    </p>
                </div>

                <div className="space-y-8 text-gray-700 dark:text-gray-200">
                    {/* Section: How it Works */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                            <StarIcon className="h-6 w-6 text-blue-500 mr-2" />
                            Simple Ways to Benefit
                        </h2>
                        <p className="mb-2">
                            <strong className="font-semibold">Sellers:</strong> Turn your unused vouchers into cash quickly and easily. Listing is simple, and you reach a wide audience of interested buyers.
                        </p>
                        <p className="mb-4">
                            <strong className="font-semibold">Buyers:</strong> Discover amazing deals on vouchers for your favorite brands and services. Save significantly on everyday purchases and special treats.
                        </p>
                         <p className="italic">It's a win-win for everyone involved!</p>
                    </section>

                    {/* Section: Loyalty Program */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                            <TicketIcon className="h-6 w-6 text-purple-500 mr-2" />
                            Unlock Exclusive Rewards
                        </h2>
                        <p className="mb-4">
                            We value our community! The more you use Smart Voucher Exchange – whether buying or selling – the more rewards you unlock. We're building a program featuring:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li><strong className="font-semibold">Bonus Points:</strong> Earn points for activities like listing, purchasing, logging in, or referring friends.</li>
                            <li><strong className="font-semibold">Loyalty Tiers:</strong> Climb the ranks (e.g., Bronze, Silver, Gold) for better perks.</li>
                            <li><strong className="font-semibold">Exclusive Offers:</strong> Get access to special discounts available only to loyal members.</li>
                            <li><strong className="font-semibold">Scratch Cards:</strong> Receive fun scratch cards periodically for a chance to win instant prizes or discounts!</li>
                            <li><strong className="font-semibold">Early Access:</strong> Be the first to know about new features or special voucher drops.</li>
                        </ul>
                        <p className="mt-4 italic">
                            Keep an eye out for more details as we roll out these exciting features soon!
                        </p>
                    </section>

                    {/* Call to Action */}
                    <div className="text-center mt-12 border-t dark:border-gray-700 pt-8">
                         <p className="text-gray-600 dark:text-gray-300 mb-4">Ready to start?</p>
                        <Link
                            to="/vouchers" // Link to browse vouchers
                            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-lg font-medium shadow-md transition duration-200 mr-4"
                        >
                            Find Vouchers Now
                        </Link>
                        <Link
                            to="/list-voucher" // Link to list a voucher
                            className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md text-lg font-medium shadow-md transition duration-200"
                        >
                            List a Voucher
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardsInfoPage;