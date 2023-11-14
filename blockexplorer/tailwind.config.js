/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clifford: '#da373d',
        divbg:'#22092C',
        select:'#F05941'
      },
    },
  },
  plugins: [],
}