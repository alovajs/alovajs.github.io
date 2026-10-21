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
          // 使用 <alpha-value> 占位符以支持 bg-primary-500/10 等透明度修饰符
          500: 'rgb(var(--ifm-color-primary-rgb) / <alpha-value>)',
          600: 'var(--ifm-color-primary-dark)',
          900: '#222E49'
        },
        font: {
          500: '#4C6172'
        },
        /* Spectrum Editorial 语义色：取值源见 src/css/tokens.scss */
        canvas: 'var(--c-canvas)',
        surface: 'var(--c-surface)',
        sunken: 'var(--c-sunken)',
        lavender: 'var(--c-lavender)',
        ink: {
          1: 'var(--c-ink-1)',
          2: 'var(--c-ink-2)',
          3: 'var(--c-ink-3)',
          4: 'var(--c-ink-4)'
        },
        hairline: 'var(--c-hairline)',
        spectrum: {
          trigger: 'var(--stage-trigger)',
          decision: 'var(--stage-decision)',
          execution: 'var(--stage-execution)',
          apply: 'var(--stage-apply)'
        }
      },
      borderRadius: {
        card: 'var(--r-lg)',
        'card-lg': 'var(--r-xl)'
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        lift: 'var(--shadow-lift)'
      },
      fontFamily: {
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
};
