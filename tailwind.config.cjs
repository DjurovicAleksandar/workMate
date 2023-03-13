/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pinkCol: "#f87171",
        blueCol: "#D3F5F5",
      },
    },
  },
  plugins: [],
};
