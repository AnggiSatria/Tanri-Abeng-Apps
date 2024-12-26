/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}", 
    "./App.{js,jsx,ts,tsx}", // Pastikan mencakup semua file
  ],
  presets: [require("nativewind/preset")], 
  theme: {
    extend: {},
  },
  plugins: [],
};
