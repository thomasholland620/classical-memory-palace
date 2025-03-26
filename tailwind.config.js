/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "rounded-xl",
    "border",
    "p-6",
    "bg-white",
    "shadow-lg",
    "transition",
    "hover:shadow-xl",
    "text-2xl",
    "text-lg",
    "text-sm",
    "font-semibold",
    "leading-relaxed"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}