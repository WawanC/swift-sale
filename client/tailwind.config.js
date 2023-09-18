/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cabin: ["Cabin"],
      },
      colors: {
        primary: "#fff",
        secondary: "#ccc",
        accent: "#000",
      },
    },
  },
  plugins: [],
};
