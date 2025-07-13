// src/sections/FeaturesSection.jsx
import React from 'react';
import FeatureCard from '../components/FeatureCard'; // Verify this path
import {
    ArrowUpTrayIcon,
    MagnifyingGlassIcon,
    GiftIcon,
} from '@heroicons/react/24/outline';

const FeaturesSection = () => {
    return (
        <section id="features" className="py-20 relative bg-gray-50">
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-16">
                    How It Works
                </h2>
                <div className="flex flex-wrap justify-center lg:justify-between gap-6 md:gap-10">

                    {/* Card 1: List Voucher */}
                    <FeatureCard
                           icon={<ArrowUpTrayIcon className="h-10 w-10 text-blue-600" />}
                           bgColor="bg-blue-50 dark:bg-blue-900/50"
                           title="List Your Voucher"
                           description="Easily list your unused vouchers with details like expiry and price. Reach buyers quickly."
                           buttonLabel="List Voucher Now"
                           buttonLink="/list-voucher" // Matches App.jsx
                           buttonIcon={<ArrowUpTrayIcon className="h-5 w-5 mr-2" />}
                       />
                       
                       <FeatureCard
                           icon={<MagnifyingGlassIcon className="h-10 w-10 text-purple-600" />}
                           bgColor="bg-purple-50 dark:bg-purple-900/50"
                           title="Find Discounts"
                           description="Browse a wide range of discounted vouchers across various categories. Grab deals instantly."
                           buttonLabel="Find Vouchers"
                           buttonLink="/vouchers" // Matches App.jsx
                           buttonIcon={<MagnifyingGlassIcon className="h-5 w-5 mr-2" />}
                       />
                       
                       <FeatureCard
                           icon={<GiftIcon className="h-10 w-10 text-yellow-500" />}
                           bgColor="bg-yellow-50 dark:bg-yellow-900/50"
                           title="Earn, Save & Get Rewarded"
                           description="Monetize assets, save big & unlock exclusive loyalty bonuses like offers and scratch cards!"
                           buttonLabel="Learn More"
                           buttonLink="/rewards-info" // Matches App.jsx
                           buttonIcon={<GiftIcon className="h-5 w-5 mr-2" />}
                       />
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;