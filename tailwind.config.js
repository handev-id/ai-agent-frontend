/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neutral: "#f0f0f0",
        neutralHover: "#dedede",
        neutralDark: "#1c1c1c",
        neutralHoverDark: "#2a2a2a",
        Light: "#fff",
        Dark: "#121212",
        primary: "#448aff",
        danger: "#ef4444",
        primaryTransparent: "#ecf3ff",
        primaryDark: "#ffd740",
        primaryDarkTransparent: "#1e1c14",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-in",
      },
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
    },
  },
  plugins: [],
};
