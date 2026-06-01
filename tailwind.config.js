/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#fdfbf7', // slightly lighter ivory
        olive: {
          500: '#556b2f',
          600: '#4a5d29',
        },
        slate: '#2d1b1b', // dark reddish slate
        gold: { // Keeping the class names 'gold' but changing hex to maroon/dark red
          light: '#c25e5e',
          DEFAULT: '#8a1c1c',
          dark: '#5c0f0f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['"Cairo"', '"Tajawal"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
