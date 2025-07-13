// // src/Components/Navbar.jsx (Update Applied - Adding Legal Links to Mobile Menu)

// import React, { useState, useEffect } from 'react';
// import { Link, NavLink, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext'; // Ensure this path is correct
// import {
//     HomeIcon, InformationCircleIcon, EnvelopeIcon, TicketIcon,
//     UserPlusIcon, ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon,
//     WalletIcon, ArrowUpTrayIcon,
//     Bars3Icon, // Hamburger icon
//     XMarkIcon,  // Close icon
//     // --- ADDED Icon Imports ---
//     ShieldCheckIcon,
//     DocumentTextIcon
//     // --- END ADDED Icon Imports ---
// } from '@heroicons/react/24/outline'; // Make sure imports are correct

// const Navbar = () => {
//     const { isLoggedIn, logout } = useAuth();
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const location = useLocation(); // Get location object

//     // Close mobile menu on route change
//     useEffect(() => {
//         setIsMobileMenuOpen(false);
//     }, [location.pathname]); // Dependency on pathname

//     // Base classes for NavLink
//     const baseNavLinkClasses = "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out";
//     const activeNavLinkClasses = "bg-gray-900 text-white";
//     const inactiveNavLinkClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

//     // Function to determine NavLink class
//     const getNavLinkClass = ({ isActive }) =>
//         `${baseNavLinkClasses} ${isActive ? activeNavLinkClasses : inactiveNavLinkClasses}`;

//     // Classes for mobile NavLink (slightly different styling for vertical layout)
//     const baseMobileNavLinkClasses = "block rounded-md px-3 py-2 text-base font-medium transition duration-150 ease-in-out";
//     const activeMobileNavLinkClasses = "bg-gray-900 text-white";
//     const inactiveMobileNavLinkClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

//     const getMobileNavLinkClass = ({ isActive }) =>
//         `${baseMobileNavLinkClasses} ${isActive ? activeMobileNavLinkClasses : inactiveMobileNavLinkClasses}`;

//     const handleLogout = () => {
//         logout();
//         // Closing menu explicitly might still be desired depending on logout flow
//         setIsMobileMenuOpen(false);
//     }

//     return (
//         <nav className="bg-gray-800 sticky top-0 z-50 shadow-md">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     {/* Left Side: Logo & Desktop Nav */}
//                     <div className="flex items-center">
//                         <Link to="/" className="flex-shrink-0 text-white font-bold text-xl mr-4">
//                             Vouchify {/* Or your app name */}
//                         </Link>
//                         {/* --- Desktop Menu Links --- */}
//                         <div className="hidden md:block">
//                             <div className="ml-10 flex items-baseline space-x-4">
//                                 <NavLink to="/" className={getNavLinkClass}><HomeIcon className="h-5 w-5 mr-1 hidden lg:inline-block" /> Home</NavLink>
//                                 <NavLink to="/vouchers" className={getNavLinkClass}><TicketIcon className="h-5 w-5 mr-1 hidden lg:inline-block" /> Find Vouchers</NavLink>
//                                 <NavLink to="/about" className={getNavLinkClass}><InformationCircleIcon className="h-5 w-5 mr-1 hidden lg:inline-block" /> About</NavLink>
//                                 <NavLink to="/contact" className={getNavLinkClass}><EnvelopeIcon className="h-5 w-5 mr-1 hidden lg:inline-block" /> Contact</NavLink>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Side: Desktop Actions */}
//                     <div className="hidden md:block">
//                         <div className="ml-4 flex items-center md:ml-6 space-x-4">
//                             {isLoggedIn ? (
//                                 <>
//                                     <NavLink to="/list-voucher" className={getNavLinkClass}><ArrowUpTrayIcon className="h-5 w-5 mr-1 hidden lg:inline-block" /> List Voucher</NavLink>
//                                     <NavLink to="/wallet" className={getNavLinkClass}><WalletIcon className="h-5 w-5 mr-1 hidden lg:inline-block" /> Wallet</NavLink>
//                                     <button onClick={handleLogout} className={`${baseNavLinkClasses} ${inactiveNavLinkClasses}`}>
//                                         <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1 hidden lg:inline-block" /> Logout
//                                     </button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <NavLink to="/login" className={getNavLinkClass}><ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1 hidden lg:inline-block" /> Login</NavLink>
//                                     <NavLink to="/register" className={getNavLinkClass}><UserPlusIcon className="h-5 w-5 mr-1 hidden lg:inline-block" /> Register</NavLink>
//                                 </>
//                             )}
//                         </div>
//                     </div>

//                     {/* --- Mobile Menu Button --- */}
//                     <div className="-mr-2 flex md:hidden">
//                         <button
//                             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                             type="button"
//                             className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
//                             aria-controls="mobile-menu"
//                             aria-expanded={isMobileMenuOpen} // Accessibility state
//                         >
//                             <span className="sr-only">Open main menu</span>
//                             {isMobileMenuOpen ? (
//                                 <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> // Close Icon
//                             ) : (
//                                 <Bars3Icon className="block h-6 w-6" aria-hidden="true" /> // Hamburger Icon
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* --- Mobile Menu Panel --- */}
//             <div
//                 className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} // Toggle visibility
//                 id="mobile-menu" // Corresponds to aria-controls
//             >
//                 {/* --- Original Mobile Navigation Links --- */}
//                 <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//                     <NavLink to="/" className={getMobileNavLinkClass}><HomeIcon className="h-5 w-5 mr-1 inline-block" /> Home</NavLink>
//                     <NavLink to="/vouchers" className={getMobileNavLinkClass}><TicketIcon className="h-5 w-5 mr-1 inline-block" /> Find Vouchers</NavLink>
//                     <NavLink to="/about" className={getMobileNavLinkClass}><InformationCircleIcon className="h-5 w-5 mr-1 inline-block" /> About</NavLink>
//                     <NavLink to="/contact" className={getMobileNavLinkClass}><EnvelopeIcon className="h-5 w-5 mr-1 inline-block" /> Contact</NavLink>
//                 </div>
//                 {/* --- Original Mobile Action Links / User Section --- */}
//                 <div className="pt-4 pb-3 border-t border-gray-700">
//                     <div className="mt-3 px-2 space-y-1"> {/* Keep existing structure */}
//                         {isLoggedIn ? (
//                             <>
//                                 <NavLink to="/list-voucher" className={getMobileNavLinkClass}><ArrowUpTrayIcon className="h-5 w-5 mr-1 inline-block" /> List Voucher</NavLink>
//                                 <NavLink to="/wallet" className={getMobileNavLinkClass}><WalletIcon className="h-5 w-5 mr-1 inline-block" /> Wallet</NavLink>
//                                 <button onClick={handleLogout} className={`w-full text-left ${baseMobileNavLinkClasses} ${inactiveMobileNavLinkClasses}`}>
//                                     <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1 inline-block" /> Logout
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 <NavLink to="/login" className={getMobileNavLinkClass}><ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1 inline-block" /> Login</NavLink>
//                                 <NavLink to="/register" className={getMobileNavLinkClass}><UserPlusIcon className="h-5 w-5 mr-1 inline-block" /> Register</NavLink>
//                             </>
//                         )}
//                     </div>
//                 </div>
//                 {/* vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv */}
//                 {/* --- ADDED: Legal Links Section --- */}
//                 <div className="pt-4 pb-3 border-t border-gray-700">
//                      <div className="px-2 space-y-1">
//                          <NavLink
//                              to="/privacy-policy"
//                              className={getMobileNavLinkClass} // Use existing mobile style function
//                          >
//                              <ShieldCheckIcon className="h-5 w-5 mr-1 inline-block" aria-hidden="true" />
//                              Privacy Policy
//                          </NavLink>
//                          <NavLink
//                              to="/terms-of-service"
//                              className={getMobileNavLinkClass} // Use existing mobile style function
//                          >
//                              <DocumentTextIcon className="h-5 w-5 mr-1 inline-block" aria-hidden="true" />
//                              Terms of Service
//                          </NavLink>
//                      </div>
//                  </div>
//                 {/* --- END ADDED Legal Links Section --- */}
//                 {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


// src/Components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

/* Icons */
import {
  HomeIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  TicketIcon,
  UserPlusIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  WalletIcon,
  ArrowUpTrayIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

/* ——————————————————————————————————————————— */
/* Re‑usable class helpers                                                     */
/* ——————————————————————————————————————————— */
const baseDesktop =
  "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition";
const activeDesktop = "bg-gray-900 text-white";
const inactiveDesktop = "text-gray-300 hover:bg-gray-700 hover:text-white";

const baseMobile =
  "block rounded-md px-3 py-2 text-base font-medium transition";
const activeMobile = "bg-gray-900 text-white";
const inactiveMobile = "text-gray-300 hover:bg-gray-700 hover:text-white";

const cls = (isActive, base, on, off) => `${base} ${isActive ? on : off}`;

/* ——————————————————————————————————————————— */
/* Component                                                                    */
/* ——————————————————————————————————————————— */
export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  /* close mobile drawer on route change */
  useEffect(() => setOpen(false), [pathname]);

  /* helpers */
  const desktopLink = (to, icon, label) => (
    <NavLink to={to} className={({ isActive }) =>
      cls(isActive, baseDesktop, activeDesktop, inactiveDesktop)
    }>
      {icon} {label}
    </NavLink>
  );

  const mobileLink = (to, icon, label) => (
    <NavLink to={to} className={({ isActive }) =>
      cls(isActive, baseMobile, activeMobile, inactiveMobile)
    }>
      {icon} {label}
    </NavLink>
  );

  return (
    <nav className="bg-gray-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & desktop main nav */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 text-white font-bold text-xl mr-4"
            >
              Vouchify
            </Link>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {desktopLink("/", <HomeIcon className="h-5 w-5 mr-1" />, "Home")}
                {desktopLink(
                  "/vouchers",
                  <TicketIcon className="h-5 w-5 mr-1" />,
                  "Find Vouchers"
                )}
                {desktopLink(
                  "/about",
                  <InformationCircleIcon className="h-5 w-5 mr-1" />,
                  "About"
                )}
                {desktopLink(
                  "/contact",
                  <EnvelopeIcon className="h-5 w-5 mr-1" />,
                  "Contact"
                )}
              </div>
            </div>
          </div>

          {/* Desktop right‑side actions */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  {desktopLink(
                    "/profile",
                    <UserCircleIcon className="h-5 w-5 mr-1" />,
                    "Profile"
                  )}
                  {desktopLink(
                    "/list-voucher",
                    <ArrowUpTrayIcon className="h-5 w-5 mr-1" />,
                    "List Voucher"
                  )}
                  {desktopLink(
                    "/wallet",
                    <WalletIcon className="h-5 w-5 mr-1" />,
                    "Wallet"
                  )}
                  <button
                    onClick={logout}
                    className={`${baseDesktop} ${inactiveDesktop}`}
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {desktopLink(
                    "/login",
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" />,
                    "Login"
                  )}
                  {desktopLink(
                    "/register",
                    <UserPlusIcon className="h-5 w-5 mr-1" />,
                    "Register"
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:ring-2 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {open ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden space-y-1 px-2 pt-2 pb-3">
          {mobileLink("/", <HomeIcon className="h-5 w-5 mr-2 inline" />, "Home")}
          {mobileLink(
            "/vouchers",
            <TicketIcon className="h-5 w-5 mr-2 inline" />,
            "Find Vouchers"
          )}
          {mobileLink(
            "/about",
            <InformationCircleIcon className="h-5 w-5 mr-2 inline" />,
            "About"
          )}
          {mobileLink(
            "/contact",
            <EnvelopeIcon className="h-5 w-5 mr-2 inline" />,
            "Contact"
          )}

          {/* User section */}
          <div className="border-t border-gray-700 pt-3 space-y-1">
            {isLoggedIn ? (
              <>
                {mobileLink(
                  "/profile",
                  <UserCircleIcon className="h-5 w-5 mr-2 inline" />,
                  "Profile"
                )}
                {mobileLink(
                  "/list-voucher",
                  <ArrowUpTrayIcon className="h-5 w-5 mr-2 inline" />,
                  "List Voucher"
                )}
                {mobileLink(
                  "/wallet",
                  <WalletIcon className="h-5 w-5 mr-2 inline" />,
                  "Wallet"
                )}
                <button
                  onClick={logout}
                  className={`${baseMobile} ${inactiveMobile} w-full text-left`}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 inline" />
                  Logout
                </button>
              </>
            ) : (
              <>
                {mobileLink(
                  "/login",
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2 inline" />,
                  "Login"
                )}
                {mobileLink(
                  "/register",
                  <UserPlusIcon className="h-5 w-5 mr-2 inline" />,
                  "Register"
                )}
              </>
            )}
          </div>

          {/* Legal links */}
          <div className="border-t border-gray-700 pt-3 space-y-1">
            {mobileLink(
              "/privacy-policy",
              <ShieldCheckIcon className="h-5 w-5 mr-2 inline" />,
              "Privacy Policy"
            )}
            {mobileLink(
              "/terms-of-service",
              <DocumentTextIcon className="h-5 w-5 mr-2 inline" />,
              "Terms of Service"
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
