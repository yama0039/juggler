/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        juggler: {
          black: '#0a0a0a',
          neonPink: '#ff00ff',
          neonYellow: '#ffff00',
        }
      }
    },
  },
  plugins: [],
}
