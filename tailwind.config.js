// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',  // For 27" monitors and larger
        '4xl': '2560px',  // For ultra-wide monitors
      },
      maxWidth: {
        '8xl': '1400px',
        '9xl': '1600px',
      },
    },
  },
  plugins: [],
}
