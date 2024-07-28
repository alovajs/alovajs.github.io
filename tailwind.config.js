/** @type {import('tailwindcss').Config} */
export default {
  important: '.use-tailwind',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#1A98FF',
          600: '#1AA8FF'
        }
      },
      backgroundColor: {
        primary: {
          500: '#1A98FF',
          600: '#1AA8FF'
        }
      }
    }
  },
  plugins: []
};
// background: linear-gradient(180deg, #FF72B6 0%, #C685FF 55%, #6CAEFF 100%);
