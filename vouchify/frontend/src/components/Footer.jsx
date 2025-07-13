import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import {
    HomeIcon,
    InformationCircleIcon,
    EnvelopeIcon,
    TicketIcon,
} from '@heroicons/react/24/outline';
// Import social media icons
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// Define Footer Navigation Links (can be extended)
const footerNavLinks = [
    { label: 'Home', to: '/', icon: HomeIcon },
    { label: 'About Us', to: '/about', icon: InformationCircleIcon },
    { label: 'Browse Vouchers', to: '/vouchers', icon: TicketIcon },
    { label: 'Contact Us', to: '/contact', icon: EnvelopeIcon },
    // Add more relevant links like FAQ, How it Works, Blog etc. if applicable
    // { label: 'FAQ', to: '/faq', icon: QuestionMarkCircleIcon },
];

// Define Social Media Links
const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, href: 'https://facebook.com/yourpage', ariaLabel: 'Visit our Facebook page' },
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com/yourprofile', ariaLabel: 'Follow us on Twitter' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/yourprofile', ariaLabel: 'Check out our Instagram' },
    { name: 'LinkedIn', icon: FaLinkedinIn, href: 'https://linkedin.com/company/yourcompany', ariaLabel: 'Connect with us on LinkedIn' },
];

const Footer = () => {
    return (
         
         // Changed border-gray-700 to border-slate-700
        <footer className="bg-slate-900 text-slate-400">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Top Section: Navigation & Social Links */}
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Optional: Logo/Brand Section */}
                    <div className="space-y-4 xl:col-span-1 mb-8 xl:mb-0">
                        {/* You could place a logo here */}
                        {/* <img className="h-10" src="/path/to/your/logo-white.svg" alt="Smart Voucher Exchange" /> */}
                         {/* Kept heading white for prominence */}
                        <h3 className="text-xl font-semibold text-white">Smart Voucher Exchange</h3>
                        <p className="text-sm">
                            Turning unused vouchers into value. Securely buy and sell digital vouchers and gift cards.
                        </p>
                    </div>

                    {/* Navigation Links Grid */}
                    <div className="grid grid-cols-2 gap-8 xl:col-span-2 md:grid-cols-3">
                        {/* Column 1 (Example: Platform) */}
                        <div className="mt-0">
                             {/* Changed text-gray-300 to text-slate-300 */}
                            <h4 className="text-sm font-semibold text-slate-300 tracking-wider uppercase mb-3">
                                Platform
                            </h4>
                            <ul role="list" className="space-y-2">
                                {footerNavLinks.slice(0, 2).map((item) => ( // Example: First 2 links
                                    <li key={item.label}>
                                        {/* Kept hover:text-white */}
                                        <Link to={item.to} className="text-base hover:text-white transition-colors duration-200 flex items-center">
                                            <item.icon className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Column 2 (Example: Company) */}
                        <div>
                            {/* Changed text-gray-300 to text-slate-300 */}
                            <h4 className="text-sm font-semibold text-slate-300 tracking-wider uppercase mb-3">
                                Company
                            </h4>
                            <ul role="list" className="space-y-2">
                                {footerNavLinks.slice(2, 4).map((item) => ( // Example: Next 2 links
                                     <li key={item.label}>
                                         {/* Kept hover:text-white */}
                                        <Link to={item.to} className="text-base hover:text-white transition-colors duration-200 flex items-center">
                                            <item.icon className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                                {/* Add links like 'Careers', 'Press' if applicable */}
                            </ul>
                        </div>
                        {/* Column 3 (Example: Legal) - Or combine with Company */}
                         <div>
                             {/* Changed text-gray-300 to text-slate-300 */}
                            <h4 className="text-sm font-semibold text-slate-300 tracking-wider uppercase mb-3">
                                Resources
                            </h4>
                            <ul role="list" className="space-y-2">
                                <li>
                                    {/* Kept hover:text-white */}
                                    <Link to="/privacy-policy" className="text-base hover:text-white transition-colors duration-200">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                     {/* Kept hover:text-white */}
                                    <Link to="/terms-of-service" className="text-base hover:text-white transition-colors duration-200">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    {/* Kept hover:text-white */}
                                    <Link to="/faq" className="text-base hover:text-white transition-colors duration-200">
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright and Social Icons */}
                 {/* Changed border-gray-700 to border-slate-700 */}
                <div className="mt-8 border-t border-slate-700 pt-8 md:flex md:items-center md:justify-between">
                    {/* Social Icons */}
                    <div className="flex space-x-6 md:order-2">
                        {socialLinks.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                // Changed text-gray-400 to text-slate-400
                                // Changed hover:text-gray-300 to hover:text-slate-300 (or keep hover:text-white)
                                className="text-slate-400 hover:text-slate-300 transition-colors duration-200"
                                aria-label={item.ariaLabel}
                            >
                                <span className="sr-only">{item.name}</span> {/* Screen reader text */}
                                <item.icon className="h-6 w-6" aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                    {/* Copyright Text */}
                     {/* Changed text-gray-400 to text-slate-400 */}
                    <p className="mt-8 text-base text-slate-400 md:mt-0 md:order-1">
                        © {new Date().getFullYear()} Smart Voucher Exchange. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;