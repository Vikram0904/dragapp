/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable dark mode via a class toggle
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        darkbg: "#18181b",
        darkcard: "#27272a",
      },
    },
  },
  plugins: [],
};
