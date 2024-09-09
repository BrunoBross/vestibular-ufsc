/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#EEF0F8",
        gray: {
          100: "#E4E6EF",
          200: "#B5B5C3",
        },
        blue: {
          100: "#6993FF",
          200: "#0083B1",
        },
        red: {
          100: "#FFE2E5",
          200: "#F64E60",
        },
        green: {
          100: "#28C667",
        },
      },
    },
  },
  plugins: [],
};
