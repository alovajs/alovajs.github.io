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
          /*
           * 用 <alpha-value> 占位符支持 bg-primary-500/10 等透明度修饰符。
           * 注意：--ifm-color-primary-rgb 是逗号分隔的旧语法（10, 108, 255），
           * 必须用 rgba(...) 而不是 rgb(... / <alpha-value>)，否则「逗号 + 斜杠」是非法值，
           * 整条声明会失效（渐变、文字、边框都会掉色）。
           */
          500: 'rgba(var(--ifm-color-primary-rgb), <alpha-value>)',
          600: 'var(--ifm-color-primary-dark)',
          900: '#222E49'
        },
        font: {
          500: '#4C6172'
        },
        /* 落地页品牌色：取值全部来自 src/css/tokens.scss，页面内不再写死十六进制 */
        brand: {
          blue: 'rgba(var(--ifm-color-primary-rgb), <alpha-value>)',
          electric: 'var(--ifm-color-primary-dark)',
          cyan: 'rgba(var(--stage-execution-rgb), <alpha-value>)'
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
        'hairline-strong': 'var(--c-hairline-strong)',
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
