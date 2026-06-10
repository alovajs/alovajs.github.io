export const siteConfig = {
  title: 'Alova.JS',
  tagline:
    'alova is perfectly compatible with your favorite HTTP clients and UI frameworks, accelerates business logic for both client and server apps, while making API documentation and and code interactive with each other. delivering ultimate efficiency in APIs integration.',
  url: 'https://alova.js.org',
  organizationName: 'alovajs',
  projectName: 'alova',
  githubUrl: 'https://github.com/alovajs/alova',
  footer: {
    copyright: `Copyright © ${new Date().getFullYear()} alova.js Team and contributors`
  }
} as const;

export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'zh-CN'] as const
} as const;
