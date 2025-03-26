/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- This line is critical
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
