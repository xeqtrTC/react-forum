/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grey-some': '#2C2C2C',
        'grey-hovered': '#525252',
        'blue-tohover': '#163C5E',
        'button-color': '#064780',
        'hr-color': '#f2f2f2',
        'support-color': '#6B6B6B'
      }
    },
  },
  plugins: [],
}
