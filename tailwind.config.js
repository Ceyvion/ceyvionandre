/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        text: '#000000',
        accent: '#0033FF',
        gray: {
          light: '#F8F8F8',
          medium: '#E0E0E0',
          dark: '#333333'
        }
      },
      spacing: {
        base: '8px',
        'grid-gap': '24px',
        'section-padding': '48px'
      },
      screens: {
        'desktop': '1200px',
        'tablet': '768px',
        'mobile': '320px'
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
  },
  plugins: [],
}
