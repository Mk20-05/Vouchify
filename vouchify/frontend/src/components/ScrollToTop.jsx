// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  // Get the current location object (pathname changes on route navigation)
  const { pathname } = useLocation();

  // useEffect hook runs after the component renders
  useEffect(() => {
    // Scroll the window to the top (0 pixels from top, 0 pixels from left)
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array: Re-run the effect ONLY when the pathname changes

  // This component doesn't render anything visible in the DOM
  return null;
}

export default ScrollToTop;