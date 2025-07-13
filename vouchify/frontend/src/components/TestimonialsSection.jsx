// src/components/TestimonialsSection.jsx (Corrected, Complete Version)
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Testimonial from './Testimonial'; // Ensure path is correct & component accepts backgroundImageUrl
import {
    PencilSquareIcon, StarIcon as StarOutline, UserIcon, ChatBubbleLeftEllipsisIcon,
    ChartBarIcon, HandThumbUpIcon, HandThumbDownIcon, EnvelopeIcon,
    TicketIcon, XMarkIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { PaperAirplaneIcon, CheckCircleIcon, ArrowsUpDownIcon } from '@heroicons/react/20/solid';

// --- Default Background Image for Cards ---
const DEFAULT_CARD_BACKGROUND_IMAGE_URL = 'https://images.unsplash.com/photo-1531297484001-80022131c5a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60';

// --- Initial Testimonials Data (Ensure this is complete and correct) ---
const initialTestimonialsData = [
    // Make sure ALL objects are here and have at least id, quote, name, rating, date
    { id: 1, quote: "Sold my unused Zomato voucher...", name: "Priya Sharma", email: "p.sharma@example.com", role: "Marketing Professional", avatarSeed: "priya", rating: 5, transactionType: 'Sold', voucherBrand: 'Zomato', date: '2024-03-15', backgroundImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 2, quote: "Found an amazing 20% discount...", name: "Amit Singh", email: "amit.s@sample.org", role: "Software Engineer", avatarSeed: "amit", rating: 5, transactionType: 'Bought', voucherBrand: 'MakeMyTrip', date: '2024-03-10' /* Missing initial BG */ },
    { id: 3, quote: "Love the concept! It's great...", name: "Deepika Rao", email: "deepika.r@mail.net", role: "Graphic Designer", avatarSeed: "deepika", rating: 4, transactionType: 'Sold', voucherBrand: 'Amazon', date: '2024-03-08', backgroundImageUrl: 'https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hvcHBpbmclMjBjYXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
    { id: 4, quote: "Needed a specific Amazon voucher...", name: "Vikram Kumar", email: "vikram.k@email.co", role: "Student", avatarSeed: "vikram", rating: 5, transactionType: 'Bought', voucherBrand: 'Amazon', date: '2024-03-20', backgroundImageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1hem9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
    { id: 5, quote: "Listed a BookMyShow voucher...", name: "Sneha Patel", email: "s.patel@domain.in", role: "Teacher", avatarSeed: "sneha", rating: 4, transactionType: 'Sold', voucherBrand: 'BookMyShow', date: '2024-03-18', backgroundImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 6, quote: "As someone who loves discounts...", name: "Rajesh Nair", email: "rajesh.n@provider.com", role: "Student", avatarSeed: "rajesh", rating: 5, transactionType: 'Bought', voucherBrand: 'Swiggy', date: '2024-03-05', backgroundImageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 7, quote: "The wallet feature is handy...", name: "Ananya Reddy", email: "a.reddy@service.io", role: "Content Writer", avatarSeed: "ananya", rating: 4, transactionType: 'Bought', voucherBrand: 'Myntra', date: '2024-03-12', backgroundImageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 8, quote: "Turned my unwanted birthday gift...", name: "Mohan Gupta", email: "mohan.g@company.biz", role: "Business Analyst", avatarSeed: "mohan", rating: 5, transactionType: 'Sold', voucherBrand: 'Flipkart', date: '2024-03-01', backgroundImageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 9, quote: "Easy platform to buy vouchers...", name: "Kavita Joshi", email: "k.joshi@email.me", role: "Accountant", avatarSeed: "kavita", rating: 4, transactionType: 'Bought', voucherBrand: 'Uber', date: '2024-02-28' /* Missing initial BG */ },
    { id: 10, quote: "Selling was quick, payment...", name: "Rohan Desai", email: "rohan.d@freelance.work", role: "Freelancer", avatarSeed: "rohan", rating: 5, transactionType: 'Sold', voucherBrand: 'BigBasket', date: '2024-02-25', backgroundImageUrl: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGdyb2Nlcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 11, quote: "Found a rare voucher I needed...", name: "Meera Iyer", email: "m.iyer@research.edu", role: "Researcher", avatarSeed: "meera", rating: 4, transactionType: 'Bought', voucherBrand: 'Lifestyle', date: '2024-02-20', backgroundImageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGlmZXN0eWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
    { id: 12, quote: "Great service overall...", name: "Arjun Mehta", email: "arjun.m@office.co", role: "Manager", avatarSeed: "arjun", rating: 3, transactionType: 'Bought', voucherBrand: 'Croma', date: '2024-03-19', backgroundImageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 13, quote: "Interface could be slightly more intuitive...", name: "Geeta Verma", email: "g.verma@mail.com", role: "Homemaker", avatarSeed: "geeta", rating: 2, transactionType: 'Sold', voucherBrand: 'Nykaa', date: '2024-03-21' /* Missing initial BG */ },
    { id: 14, quote: "Excellent platform, found exactly what I needed!", name: "Sunil Kumar", email: "sunil.k@example.net", role: "Doctor", avatarSeed: "sunil", rating: 5, transactionType: 'Bought', voucherBrand: 'Apollo Pharmacy', date: '2024-03-22', backgroundImageUrl: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 15, quote: "Needed customer support...", name: "Pooja Agarwal", email: "p.agarwal@mail.co.in", role: "HR Manager", avatarSeed: "pooja", rating: 5, transactionType: 'Sold', voucherBrand: 'Myntra', date: '2024-03-16', backgroundImageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3VzdG9tZXIlMjBzdXBwb3J0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
    { id: 16, quote: "Bought a voucher that was slightly past expiry...", name: "Sameer Khan", email: "sameer.k@email.info", role: "IT Consultant", avatarSeed: "sameer", rating: 4, transactionType: 'Bought', voucherBrand: 'PVR Cinemas', date: '2024-03-09', backgroundImageUrl: 'https://images.unsplash.com/photo-1603400501595-fd528a9c672c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJ1c3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 17, quote: "Wish there was an option for auction-style selling...", name: "Nisha Bhatt", email: "nisha.b@mymail.com", role: "Entrepreneur", avatarSeed: "nisha", rating: 3, transactionType: 'Sold', voucherBrand: 'Starbucks', date: '2024-02-29', backgroundImageUrl: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29yayUyMHNwYWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' }
];
// --- END of initialTestimonialsData ---

const ITEMS_PER_PAGE = 6;
const POSITIVE_THRESHOLD = 4;
const NEGATIVE_THRESHOLD = 2;

const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    try { const date = new Date(dateString); if (isNaN(date.getTime())) { return ''; } return date.toLocaleDateString(undefined, options); }
    catch (e) { return ''; }
};

// --- Main Component ---
const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState(() => initialTestimonialsData.map(t => ({ ...t, backgroundImageUrl: t.backgroundImageUrl || DEFAULT_CARD_BACKGROUND_IMAGE_URL })));
    const [filterRating, setFilterRating] = useState(0);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [formData, setFormData] = useState({ name: '', email: '', quote: '', rating: 0, voucherBrand: '', transactionType: '' });
    const [formRatingHover, setFormRatingHover] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const formRef = useRef(null);

    useEffect(() => { if (isFormVisible && formRef.current) { formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, [isFormVisible]);

    const handleInputChange = useCallback((e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); if (submitSuccess) setSubmitSuccess(false); }, [submitSuccess]);
    const handleRatingChange = useCallback((rate) => { setFormData(prev => ({ ...prev, rating: rate })); if (submitSuccess) setSubmitSuccess(false); }, [submitSuccess]);
    const handleHoverRating = useCallback((rate) => { setFormRatingHover(rate); }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (formData.rating === 0) { alert("Please select a star rating."); return; }
        if (formData.voucherBrand && !formData.transactionType) { alert("Please select if you Bought or Sold the voucher."); return; }
        setIsSubmitting(true); setSubmitSuccess(false);
        let searchTerm = 'abstract,pattern';
        const brandLower = formData.voucherBrand?.toLowerCase(); const type = formData.transactionType;
        if (brandLower) { if (brandLower.includes('amazon') || brandLower.includes('flipkart') || brandLower.includes('myntra') || brandLower.includes('lifestyle') || brandLower.includes('nykaa') || brandLower.includes('croma')) { searchTerm = 'shopping,product'; } else if (brandLower.includes('zomato') || brandLower.includes('swiggy') || brandLower.includes('bigbasket')) { searchTerm = 'food,delivery'; } else if (brandLower.includes('makemytrip')) { searchTerm = 'travel,destination'; } else if (brandLower.includes('bookmyshow')) { searchTerm = 'entertainment,movie'; } else if (brandLower.includes('uber')) { searchTerm = 'city,transport'; } else if (brandLower.includes('apollo')) { searchTerm = 'health,pharmacy'; } else { searchTerm = formData.voucherBrand; } } else if (type === 'Bought') { searchTerm = 'saving,discount'; } else if (type === 'Sold') { searchTerm = 'money,selling,cash'; }
        const newBackgroundImageUrl = `https://source.unsplash.com/500x500/?${encodeURIComponent(searchTerm)}&sig=${Date.now()}`;
        const newTestimonial = {
            id: Date.now(), quote: formData.quote, name: formData.name || 'Anonymous', email: formData.email || null, role: 'User Feedback',
            avatarSeed: formData.name || `anon-${Date.now()}`, rating: formData.rating, transactionType: formData.transactionType || null,
            voucherBrand: formData.voucherBrand || null, date: new Date().toISOString().split('T')[0],
            backgroundImageUrl: newBackgroundImageUrl
        };
        setTimeout(() => {
            setTestimonials(prev => [newTestimonial, ...prev]);
            setFormData({ name: '', email: '', quote: '', rating: 0, voucherBrand: '', transactionType: '' });
            setFormRatingHover(0); setIsSubmitting(false); setSubmitSuccess(true); setIsFormVisible(false);
             setTimeout(() => setSubmitSuccess(false), 4000);
        }, 1000);
    }, [formData]); // Keep formData as dependency

    const reviewSummary = useMemo(() => { if (!Array.isArray(testimonials)) return { positive: 0, negative: 0, total: 0 }; let p = 0, n = 0; const t = testimonials.length; testimonials.forEach(item => { if (typeof item.rating === 'number') { if (item.rating >= POSITIVE_THRESHOLD) p++; else if (item.rating <= NEGATIVE_THRESHOLD && item.rating > 0) n++; } }); return { positive: p, negative: n, total: t }; }, [testimonials]);
    const filteredTestimonials = useMemo(() => { if (!Array.isArray(testimonials)) return []; if (filterRating === 0) return testimonials; return testimonials.filter(t => typeof t.rating === 'number' && t.rating >= filterRating); }, [testimonials, filterRating]);
    const visibleTestimonials = useMemo(() => { if (!Array.isArray(filteredTestimonials)) return []; return filteredTestimonials .sort((a, b) => { const dA=a.date?new Date(a.date):0; const dB=b.date?new Date(b.date):0; if(isNaN(dA.getTime()) && isNaN(dB.getTime())) return 0; if(isNaN(dA.getTime())) return 1; if(isNaN(dB.getTime())) return -1; return dB - dA; }).slice(0, visibleCount); }, [filteredTestimonials, visibleCount]);
    const handleLoadMore = useCallback(() => { setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE); }, []);
    const toggleFormVisibility = useCallback(() => { setIsFormVisible(prevState => !prevState); if (submitSuccess) setSubmitSuccess(false); }, [submitSuccess]);

    const FilterButton = ({ ratingValue, label }) => ( <button onClick={() => { setFilterRating(ratingValue); setVisibleCount(ITEMS_PER_PAGE); }} type="button" aria-pressed={filterRating === ratingValue} className={`px-4 py-1.5 text-sm font-medium rounded-full border transition duration-150 ease-in-out flex items-center space-x-1 ${ filterRating === ratingValue ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}> {ratingValue > 0 && <StarSolid className={`h-4 w-4 ${filterRating === ratingValue ? 'text-yellow-300' : 'text-gray-400'}`} aria-hidden="true" />} <span>{label}</span> </button> );
    const StarRatingInput = ({ rating, hoverRating, onRate, onHover }) => ( <div className="flex space-x-1"> {[1, 2, 3, 4, 5].map((star) => ( <button key={star} type="button" onClick={() => onRate(star)} onMouseEnter={() => onHover(star)} onMouseLeave={() => onHover(0)} className="p-1 text-gray-400 hover:text-yellow-500 focus:outline-none focus:text-yellow-500 transition-colors duration-150" aria-label={`Rate ${star} out of 5 stars`}> <StarSolid className={`h-6 w-6 ${ (hoverRating >= star || rating >= star) ? 'text-yellow-400' : 'text-gray-300' }`} /> </button> ))} </div> );

    return (
        // Section with background
        <section className="relative py-16 md:py-20 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2FsbHBhcGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=1470&q=80')` }}>
            {/* Section Overlay */}
            <div className="absolute inset-0 bg-slate-800/70 z-0"></div>
            {/* Container */}
            <div className="relative z-10 container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10 md:mb-12"> <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md mb-3"> User Feedback & Reviews </h2> <p className="text-lg text-gray-100 drop-shadow max-w-3xl mx-auto"> Hear from our community and share your own experience using Smart Voucher Exchange. </p> </div>
                {/* Review Summary */}
                 <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-xl border border-gray-200/60 mb-12 md:mb-16"> <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center flex justify-center items-center gap-2"> <ChartBarIcon className="h-5 w-5 text-indigo-600"/> Review Snapshot</h3> {reviewSummary.total > 0 ? ( <div className="space-y-3"> <div className="flex items-center gap-3"> <HandThumbUpIcon className="h-5 w-5 text-green-500 shrink-0" /> <span className="text-sm font-medium text-gray-700 w-20 shrink-0">Positive</span> <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden"> <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${reviewSummary.total > 0 ? (reviewSummary.positive / reviewSummary.total) * 100 : 0}%` }}></div> </div> <span className="text-sm font-semibold text-gray-700 w-10 text-right shrink-0">{reviewSummary.positive}</span> </div> <div className="flex items-center gap-3"> <HandThumbDownIcon className="h-5 w-5 text-orange-500 shrink-0" /> <span className="text-sm font-medium text-gray-700 w-20 shrink-0">Negative</span> <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden"> <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${reviewSummary.total > 0 ? (reviewSummary.negative / reviewSummary.total) * 100 : 0}%` }}></div> </div> <span className="text-sm font-semibold text-gray-700 w-10 text-right shrink-0">{reviewSummary.negative}</span> </div> <p className="text-xs text-gray-500 text-center pt-1">Based on {reviewSummary.total} reviews (Ratings {POSITIVE_THRESHOLD}+ Positive, {NEGATIVE_THRESHOLD}- Negative).</p> </div> ) : ( <p className="text-center text-gray-500">No reviews submitted yet.</p> )} </div>
                {/* Toggle Button and Conditional Form Section */}
                <div className="max-w-2xl mx-auto mb-12 md:mb-16">
                    {!isFormVisible && ( <div className="text-center"> <button onClick={toggleFormVisibility} type="button" className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> <PencilSquareIcon className="h-5 w-5 mr-2" aria-hidden="true" /> Leave Your Feedback </button> </div> )}
                    {isFormVisible && (
                        <div ref={formRef} className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-gray-200/60 transition-all duration-300 ease-out">
                            <div className="flex justify-between items-center mb-5"> <h3 className="text-xl font-semibold text-gray-800 flex items-center"> <PencilSquareIcon className="h-6 w-6 mr-2 text-indigo-600" /> Submit Your Feedback </h3> <button onClick={toggleFormVisibility} type="button" className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Close feedback form"> <XMarkIcon className="h-6 w-6" /> </button> </div>
                             <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5"> <div className="relative"> <label htmlFor="feedback-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label> <div className="relative rounded-md shadow-sm"> <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /></div> <input type="text" name="name" id="feedback-name" value={formData.name} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Your Name" /> </div> </div> <div className="relative"> <label htmlFor="feedback-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label> <div className="relative rounded-md shadow-sm"> <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /></div> <input type="email" name="email" id="feedback-email" value={formData.email} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="you@example.com" /> </div> </div> </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5"> <div className="relative"> <label htmlFor="feedback-voucherBrand" className="block text-sm font-medium text-gray-700 mb-1">Voucher Brand </label> <div className="relative rounded-md shadow-sm"> <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><TicketIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /></div> <input type="text" name="voucherBrand" id="feedback-voucherBrand" value={formData.voucherBrand} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., Amazon, Zomato"/> </div> </div> <div className="relative"> <label htmlFor="feedback-transactionType" className="block text-sm font-medium text-gray-700 mb-1">Transaction Type (Optional)</label> <div className="relative rounded-md shadow-sm"> <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><ArrowsUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /></div> <select name="transactionType" id="feedback-transactionType" value={formData.transactionType} onChange={handleInputChange} className="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"> <option value="">-- Select --</option> <option value="Bought">Bought Voucher</option> <option value="Sold">Sold Voucher</option> </select> <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"> <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg> </div> </div> </div> </div>
                                <div className="relative"> <label htmlFor="feedback-quote" className="block text-sm font-medium text-gray-700 mb-1">Your Feedback / Message <span className="text-red-500">*</span></label> <div className="relative rounded-md shadow-sm"> <ChatBubbleLeftEllipsisIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400 z-10" aria-hidden="true" /> <textarea name="quote" id="feedback-quote" rows="4" required value={formData.quote} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Tell us about your experience..."></textarea> </div> </div>
                                <div> <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating <span className="text-red-500">*</span></label> <StarRatingInput rating={formData.rating} hoverRating={formRatingHover} onRate={handleRatingChange} onHover={handleHoverRating} /> </div>
                                {/* Submit Button & Success Message (Centered) */}
                                <div className="pt-4 space-y-3"> <div className="flex justify-center"> <button type="submit" disabled={isSubmitting} className={`inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${ isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700' }`} > {isSubmitting ? ( <>{/* SVG loading */}Submitting...</> ) : ( <><PaperAirplaneIcon className="h-5 w-5 mr-2 -rotate-45" />Submit Feedback</> )} </button> </div> {submitSuccess && ( <div className="flex justify-center items-center text-sm text-green-600"> <CheckCircleIcon className="h-5 w-5 mr-1 flex-shrink-0" /> <span>Feedback submitted successfully!</span> </div> )} </div>
                             </form>
                        </div>
                    )}
                </div>

                {/* Filter Controls & Reviews Grid */}
                <div className="flex justify-center items-center flex-wrap gap-3 mb-6 md:mb-8"> <span className="text-sm font-medium text-gray-100 mr-2 shrink-0">Filter reviews:</span> <div className="flex flex-wrap justify-center gap-2"> <FilterButton ratingValue={0} label="All" /> <FilterButton ratingValue={4} label="4+ Stars" /> <FilterButton ratingValue={5} label="5 Stars" /> </div> </div>
                <h3 className="text-2xl font-semibold text-white drop-shadow-md mb-6 md:mb-8 text-center">Recent Reviews</h3>
                {visibleTestimonials.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> {visibleTestimonials.map((testimonial) => ( <Testimonial key={testimonial.id} {...testimonial} backgroundImageUrl={testimonial.backgroundImageUrl}/> ))} </div> ) : ( <div className="text-center text-gray-300 py-10 px-4"> <p>No testimonials found...</p> {filterRating > 0 && ( <button onClick={() => setFilterRating(0)} className="mt-4 text-indigo-400 hover:text-indigo-300 hover:underline text-sm">Show all reviews</button> )} </div> )}

                {/* Load More Button */}
                <div className="mt-12 md:mt-16 text-center"> {visibleCount < filteredTestimonials.length && ( <button onClick={handleLoadMore} type="button" className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-100 transition duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> Load More Reviews ({filteredTestimonials.length - visibleCount} remaining) </button> )} </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;