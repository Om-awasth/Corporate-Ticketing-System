/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 20px 60px -20px rgba(15, 23, 42, 0.45)',
      },
      colors: {
        primary: '#2563eb',
        secondary: '#0f766e',
        accent: '#f59e0b',
        danger: '#ef4444'
      }
    },
  },
  plugins: [],
}
