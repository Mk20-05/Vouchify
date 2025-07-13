 
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const HeroSection = () => {
    // Define the Section Background Image URL
    const sectionBackgroundImageUrl = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2FsbHBhcGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=1470&q=80'; // Consistent background

    return (
        // Section with Background and Overlay
        <section
            className="relative bg-cover bg-center bg-fixed" // Removed py-0, ensuring no extra padding
            style={{ backgroundImage: `url('${sectionBackgroundImageUrl}')` }}
        >
            {/* Section Overlay */}
            <div className="absolute inset-0 bg-slate-800/70 z-0"></div>

            {/* --- MODIFIED Hero Content Area --- */}
            {/*
               - Use min-h-screen to ensure it takes at least the full viewport height.
               - Removed negative top margins (mt-[-...]). Navbar offset should be handled globally (e.g., padding-top on <main> in App.jsx).
               - Removed explicit height calculations like md:h-[calc(...)].
            */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                {/*
                   - Added flex items-center justify-center directly here.
                   - Removed inner content div wrapper previously used for centering.
                   - Removed px-4 from inner div, applied it here.
                 */}

                 {/* Content */}
                <div className="text-center max-w-4xl"> {/* Added max-w for text container */}
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-md">
                        Smart Voucher Exchange
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto drop-shadow"> {/* Centered paragraph */}
                        Turn your unused vouchers into cash or find great deals from others. Share, save, and earn smartly!
                    </p>
                    <Link
                        to="/about"
                        className="inline-flex items-center bg-white text-indigo-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                    >
                        Explore Features
                        <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </Link>
                </div>

            </div>
             {/* --- END MODIFIED Hero Content Area --- */}
        </section>
    );
};

export default HeroSection;