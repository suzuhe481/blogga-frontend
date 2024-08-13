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
      },
      animation: {
        "float-left": "floatLeft 3s ease-in-out infinite",
        "float-right": "floatRight 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
