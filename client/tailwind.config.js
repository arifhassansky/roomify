/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Jost", "sans-serif"],
        secondary: ["Marcellus", "sans-serif"],
      },
      colors: {
        primary: "#472D9C",
        secondary: "#A0DBED",
      },
    },
  },
  plugins: [daisyui],
};
