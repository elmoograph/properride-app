/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0D",
        surface: "#1A1A1A",
        border: "#2A2A2A",
        primary: "#AAFF00",
        "primary-dark": "#88CC00",
        muted: "#6B7280",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A1A1AA",
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
