/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bghobiDesktop1: "url('/src/assets/hobis_discharge_abb_bg_desktop.webp')",
        bghobiDesktop2: "url('/src/assets/hobis_discharge_2_app_bg_desktop.webp')",
        bghobiMobile1: "url('/src/assets/hobis_discharge_app_bg_mobile.webp')",
        bghobiMobile2: "url('/src/assets/hobis_discharge_2_app_bg_mobile.webp')",
      },
      fontFamily: {
        providence: ["Fuzzy Bubbles", "sans-serif"],
      }
    },
  },
  plugins: [],
}