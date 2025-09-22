/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Garanta que a extensão .tsx está aqui
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}