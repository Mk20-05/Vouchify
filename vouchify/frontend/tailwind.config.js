// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        // Existing marquee animation
        marquee: 'marquee 60s linear infinite',
        // --- New Gradient Animation ---
        // 'gradient-flow' is the utility name we'll use
        // 'gradient-keys' is the keyframe name
        // '15s' duration, 'ease' timing, 'infinite' loop
        'gradient-flow': 'gradient-keys 15s ease infinite',
      },
      keyframes: {
        // Existing marquee keyframes
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // --- New Gradient Keyframes ---
        'gradient-keys': {
          '0%, 100%': { // Start and end state
            'background-size': '400% 400%', // Make the gradient larger than the container
            'background-position': '0% 50%', // Start position
          },
          '50%': { // Mid-point state
            'background-size': '400% 400%', // Keep size consistent
            'background-position': '100% 50%', // End position (moves horizontally)
          },
        }
      },
      // You might have other extensions
    },
  },
  plugins: [],
}