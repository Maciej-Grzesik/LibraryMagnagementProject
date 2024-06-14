/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      colors: {
        blue: {
          'facebook': '#3b5998',
          'light': '#8b9dc3',
          'light-opacity-50': 'rgba(139, 157, 195, 0.3)' 
        },
        gray: {
          'light': '#dfe3ee',
          'very-light': '#f7f7f7',
        },
        white: '#ffffff',
        red: {
          'light-opacity-50': 'rgba(239, 68, 68, 0.3)'
        },
      },
    },
  },
  plugins: [],
}