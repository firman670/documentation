/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./docs/**/*.{md,mdx}",
    "./docusaurus.config.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
