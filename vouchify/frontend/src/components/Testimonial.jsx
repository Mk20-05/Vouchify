// src/components/Testimonial.jsx (Updated with Background Image & UI Enhancements)
import React from 'react';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import {
    ArrowUpIcon, // Sold
    ArrowDownIcon, // Bought
    EnvelopeIcon, // Email
    TicketIcon // Voucher Brand
} from '@heroicons/react/20/solid'; // Using smaller solid icons

// --- Helper Components (StarRating, formatDate, maskEmail - Keep as is) ---
const StarRating = ({ rating }) => {
    const totalStars = 5;
    const numericRating = typeof rating === 'number' ? Math.max(0, Math.min(rating, totalStars)) : 0;
    return ( <div className="flex items-center"> { [...Array(totalStars)].map((_, i) => i < numericRating ? <StarSolid key={i} className="h-5 w-5 text-yellow-400" /> : <StarOutline key={i} className="h-5 w-5 text-yellow-400" />) } </div> );
};
const formatDate = (dateString) => {
    if (!dateString) return ''; const options = { year: 'numeric', month: 'short', day: 'numeric' }; try { const date = new Date(dateString); if (isNaN(date.getTime())) return dateString; return date.toLocaleDateString(undefined, options); } catch (e) { return dateString; }
};
const maskEmail = (email) => {
  if (!email || typeof email !== 'string' || !email.includes('@')) { return 'Email hidden'; }
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 3) { return `${localPart.substring(0, 1)}***@${domain}`; }
  else { return `${localPart.substring(0, 3)}***@${domain}`; }
};
// --- End Helper Components ---

// Positive/Negative Threshold
const POSITIVE_THRESHOLD = 4;

// Main Testimonial Card Component
const Testimonial = ({
    quote, name, email, role, avatarSeed, rating, transactionType, voucherBrand, date,
    backgroundImageUrl // <<<--- ADD this prop to accept the image URL
}) => {
    // Note: 'role' prop is still received but NOT used for display as per previous request

    const isPositive = typeof rating === 'number' && rating >= POSITIVE_THRESHOLD;
    const isNegativeOrNeutral = typeof rating === 'number' && rating < POSITIVE_THRESHOLD;

    // --- Updated colors for better contrast on dark overlay ---
    const getTransactionColor = (type) => {
        if (type === 'Sold') {
            // Brighter Yellow for Sold
            return 'bg-yellow-400/20 text-yellow-200 ring-yellow-400/30';
        } else {
            // Brighter Green for Bought
            return 'bg-green-400/20 text-green-200 ring-green-400/30';
        }
    };
    const getTransactionIcon = (type) => {
        return type === 'Sold' ? <ArrowUpIcon className="h-3.5 w-3.5 mr-1" aria-hidden="true"/> : <ArrowDownIcon className="h-3.5 w-3.5 mr-1" aria-hidden="true"/>;
    }
    // --- Remove borderClass, styling is now handled by overlay and background ---
    // const borderClass = isPositive ? 'border-t-4 border-green-600' : isNegativeOrNeutral ? 'border-t-4 border-orange-500' : 'border-t border-gray-200/60';

    return (
        // --- Updated Main Card Div ---
        <div
            className="relative flex flex-col bg-gray-700 rounded-xl shadow-lg overflow-hidden h-full min-h-[300px] transform transition duration-300 hover:shadow-xl hover:-translate-y-1 bg-cover bg-center group" // Added group for potential hover effects
            style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none' }} // Apply background image
        >
            {/* --- Dark Overlay --- */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-black/40 group-hover:from-black/90 group-hover:via-black/75 transition-colors duration-300 z-0"></div>

            {/* --- Content Wrapper --- */}
            <div className="relative z-10 flex flex-col flex-grow p-5 text-white"> {/* Using p-5 for padding */}

                {/* Card Header: Rating and Date */}
                <div className="flex justify-between items-center mb-4">
                    {(typeof rating === 'number' && rating > 0) ? <StarRating rating={rating} /> : <div className="h-5"></div>}
                    {date && <span className="text-xs text-gray-300 font-medium">{formatDate(date)}</span>}
                </div>

                {/* Card Body: Quote */}
                <div className="flex-grow mb-4"> {/* Ensure quote section takes available space */}
                    <p className="text-gray-100 italic text-base sm:text-lg leading-relaxed">"{quote || 'No quote provided.'}"</p>
                </div>

                 {/* Card Tags/Info Section */}
                 <div className="space-y-3 text-xs text-gray-200 mb-4"> {/* Slightly lighter text color */}
                    {/* Transaction Type and Voucher Brand */}
                    <div className="flex flex-wrap gap-2 items-center">
                         {transactionType && ( <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium ring-1 ring-inset ${getTransactionColor(transactionType)}`}> {getTransactionIcon(transactionType)} {transactionType} Voucher </span> )}
                         {/* Adjusted voucher brand color for contrast */}
                         {voucherBrand && ( <span className="inline-flex items-center px-2 py-0.5 rounded-full font-medium bg-indigo-400/20 text-indigo-200 ring-1 ring-inset ring-indigo-400/30"> <TicketIcon className="h-3.5 w-3.5 mr-1" aria-hidden="true"/> {voucherBrand} </span> )}
                    </div>
                    {/* Masked Email */}
                    {email && ( <div className="flex items-center"> <EnvelopeIcon className="h-4 w-4 mr-1.5 text-gray-400" aria-hidden="true"/> <span>{maskEmail(email)}</span> </div> )}
                </div>

                {/* Card Footer: User Avatar & Name */}
                <div className="mt-auto pt-4 border-t border-white/20 flex items-center">
                    <img src={`https://i.pravatar.cc/100?u=${avatarSeed || name || 'default'}`} alt={name || 'User'} className="h-10 w-10 rounded-full mr-3 object-cover flex-shrink-0 border-2 border-white/60 shadow-md" onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'S V')}&background=4f46e5&color=fff`; e.target.alt = `${name || 'User'} initials avatar`;}} />
                    <div>
                        <h3 className="text-sm font-semibold text-white">{name || 'Anonymous User'}</h3>
                        {/* Role display previously removed */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;