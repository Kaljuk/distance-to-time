/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        "space-purple": {
          active: "#4F3BA9",
          600: "#8b5afd"
        }
      },
      gridTemplateRows: {
        "min-auto": "min-content auto",
        "auto-min": "auto min-content",
      }
    },
  },
  plugins: [],
}

