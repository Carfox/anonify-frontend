/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {

      colors: {
        primary: "#ffffff",
        secondary: "#3BBFA1",
        // secondary: "#027E6F",
        // third: "#3BBFA1",
        third: "#027E6F",
        accent: "#F472B6",
        neutral: "#374151",
        "base-100": "#FFFFFF",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
      },
    },
  },
  plugins: [],
};
