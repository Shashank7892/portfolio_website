/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      bodyFont: ["Poppins", "sans-serif"],
      titleFont: ["Montserrat", "sans-serif"],
    },
    colors: {
      bodyColor: "#212428",
      lightText: "#c4cfde",
      boxBg: "linear-gradient(145deg, #1e2024, #23272b)",
      designColor: "#ff014f",
    },
    boxShadow: {
      shadowOne: "10px 10px 19px #1c1e22, -10px -10px 19px #262a2e",
    },
    backgroundImage: {
      // Gradient for the "white" part (essentially solid white)
      'white-gradient-solid': 'linear-gradient(to right, #ffffff, #ffffff)',
      // Gradient for the "dark pink" part (e.g., MediumVioletRed to DeepPink)
      'dark-pink-gradient': 'linear-gradient(to right, #C71585, #FF1493)',
      // Keep the existing white to hot pink gradient for the developer text
      'white-pink-gradient': 'linear-gradient(to right, #ffffff, #ff69b4)',
    },
    keyframes: {
      blink: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0' },
      },
    },
    animation: {
      'blink-cursor': 'blink 0.7s infinite',
    },
  },
  },
  plugins: [],
}