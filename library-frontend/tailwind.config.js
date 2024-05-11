/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          'facebook': '#3b5998',
          'light': '#8b9dc3',
        },
        gray: {
          'light': '#dfe3ee',
          'very-light': '#f7f7f7',
        },
        white: '#ffffff',
      },
    },
  },
  plugins: [],
}