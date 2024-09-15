/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      desktop: "600px",
    },
    extend: {
      fontFamily: {
        FuzzyBubbles: ["Fuzzy-Bubbles"],
      },
      keyframes: {
        floatLeft: {
          "0%": { transform: "translateY(0px) rotate(-6deg)" },
          "50%": { transform: "translateY(10px) rotate(-6deg)" },
          "100%": { transform: "translateY(0px) rotate(-6deg)" },
        },
        floatRight: {
          "0%": { transform: "translateY(0px) rotate(6deg)" },
          "50%": { transform: "translateY(10px) rotate(6deg)" },
          "100%": { transform: "translateY(0px) rotate(6deg)" },
        },
        shake: {
          "0%": { "margin-left": "0rem" },
          "25%": { "margin-left": "0.2rem" },
          "50%": { "margin-left": "-0.2rem" },
          "100%": { "margin-left": "0rem" },
        },
      },
      animation: {
        "float-left": "floatLeft 3s ease-in-out infinite",
        "float-right": "floatRight 3s ease-in-out infinite",
        shake: "shake 0.2s linear 0s 2",
      },
    },
  },
  plugins: [],
};
