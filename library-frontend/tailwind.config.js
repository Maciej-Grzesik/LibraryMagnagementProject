/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          facebook: '#3b5998',
          light: '#8b9dc3',
          'light-opacity-50': 'rgba(139, 157, 195, 0.3)',
        },
        gray: {
          light: '#dfe3ee',
          'very-light': '#f7f7f7',
        },
        white: '#ffffff',
        red: {
          'light-opacity-50': 'rgba(239, 68, 68, 0.3)',
        },
        'st-tropaz': {
        '50': '#f4f6fb',
        '100': '#e8ebf6',
        '200': '#ccd6eb',
        '300': '#a0b4d9',
        '400': '#6d8cc3',
        '500': '#4a6dad',
        '600': '#3b5998',
        '700': '#2e4476',
        '800': '#2a3c62',
        '900': '#273453',
        '950': '#1a2137',
        },
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-5%)', opacity: '0', width: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1', width: '100%' },
        },
        
        wiggle: {
          "0% 100%": {
            transform: "rotate(-6deg)",
          },
          "50%": { 
            transform: "rotate(6deg)"
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        slideDown: 'slideDown 0.2s ease-in-out forwards',
      }
    },
  },
  plugins: [],
};
