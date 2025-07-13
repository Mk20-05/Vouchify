// src/components/FeatureCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, bgColor, title, description, buttonLabel, buttonLink, buttonIcon }) => (
    // Adjusted width classes for better responsiveness, customize as needed
    <div className="w-full sm:w-[48%] lg:w-[31%] p-2 flex">
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center flex flex-col h-full border border-gray-200/50 w-full"> {/* Ensure card takes full width of parent div */}
            <div className={`mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center ${bgColor}`}>
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
            <p className="text-gray-600 flex-grow mb-6">{description}</p> {/* flex-grow pushes button down */}
            {buttonLabel && buttonLink && (
                <div className="mt-auto"> {/* mt-auto pushes this div to the bottom */}
                    {buttonLink.startsWith('/') ? (
                        <Link
                            to={buttonLink}
                            className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-2 rounded-full text-base font-medium hover:bg-green-700 transition duration-300 transform hover:-translate-y-0.5"
                        >
                            {/* Render icon if provided */}
                            {buttonIcon && React.cloneElement(buttonIcon, { className: "h-5 w-5 mr-2" })}
                            {buttonLabel}
                        </Link>
                    ) : (
                        // Handling external links or anchors (like #hero)
                        <a
                            href={buttonLink}
                            className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-2 rounded-full text-base font-medium hover:bg-green-700 transition duration-300 transform hover:-translate-y-0.5"
                        >
                             {/* Render icon if provided */}
                             {buttonIcon && React.cloneElement(buttonIcon, { className: "h-5 w-5 mr-2" })}
                             {buttonLabel}
                        </a>
                    )}
                </div>
            )}
        </div>
    </div>
);

export default FeatureCard;