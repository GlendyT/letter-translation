/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bghobiDesktop: "url('/src/assets/hobis_discharge_2_app_bg_desktop.webp')"
      },
      fontFamily: {
        providence: ["Fuzzy Bubbles", "sans-serif"],
      }
    },
  },
  plugins: [],
}