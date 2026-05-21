/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'be-vietnam': ['"Be Vietnam Pro"', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        brand: {
          purple: '#3d1eed',
          teal: '#06adbf',
          acai: '#5938B7',
          latte: '#FEF0D8',
        },
      },
    },
  },
  plugins: [],
}

