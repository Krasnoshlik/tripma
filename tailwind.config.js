/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'mainC': '#605DEC',
        'light-grey': '#7C8DB0'
      }
    },
    screens: {
      'clas': '900px',
      'small': '600px',
      }
  },
  plugins: [],
};