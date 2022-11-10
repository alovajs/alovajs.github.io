import { defineUserConfig } from 'vuepress';
import theme from './theme.js';

export default defineUserConfig({
  base: '/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Alova.js',
      description: 'The official website for alova.js',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Alova.js',
      description: 'alova.js官网',
    },
  },
  theme,
  shouldPrefetch: false,
  plugins: []
});
