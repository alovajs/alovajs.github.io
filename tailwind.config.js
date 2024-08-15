/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  corePlugins: {
    preflight: false
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E2EEF7',
          500: 'var(--ifm-color-primary)',
          600: 'var(--ifm-color-primary-dark)',
          900: '#222E49'
        },
        font: {
          500: '#4C6172'
        }
      }
    }
  },
  plugins: []
};
