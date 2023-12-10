// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import type { Config } from '@docusaurus/types';
import { themes } from 'prism-react-renderer';

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
const config: Config = {
  title: 'Alova.JS',
  tagline:
    'According to different request scenarios, we provide targeted request strategies to improve application fluency and availability, reduce server pressure, and enable applications to have excellent strategic thinking like a wise man',
  url: 'https://alova.js.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'alovajs', // Usually your GitHub org/user name.
  projectName: 'alova', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB'
      }
    }
  },
  scripts: ['/iconfont/iconfont.js'],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/alovajs/alovajs.github.io/blob/main/'
        },
        // disable blog
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ],

  stylesheets: [
    'https://rsms.me/inter/inter.css',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap'
  ],
  themeConfig: {
    navbar: {
      title: '',
      logo: {
        alt: 'ALOVA',
        src: 'img/logo-text.svg'
      },
      items: [
        {
          to: 'tutorial/getting-started/overview',
          position: 'left',
          label: 'Docs'
        },
        {
          to: 'tutorial/example/init-page',
          position: 'left',
          label: 'Example'
        },
        {
          type: 'dropdown',
          label: 'Contributing',
          position: 'left',
          items: [
            {
              label: 'Contributing Guidelines',
              to: 'contributing/overview'
            },
            {
              label: 'Become core member',
              to: 'contributing/become-core-member'
            },
            {
              label: 'Developing Guidelines',
              to: 'contributing/developing-guidelines'
            },
            {
              label: 'Code of conduct',
              to: 'contributing/code-of-conduct'
            }
          ]
        },
        {
          type: 'localeDropdown',
          position: 'right'
        },
        {
          to: 'https://github.com/alovajs/alova/releases',
          position: 'right',
          label: 'Releases'
        },
        {
          href: 'https://github.com/alovajs/alova',
          className: 'header-github-link',
          position: 'right'
        }
      ]
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true
    },
    announcementBar: {
      id: 'support_us',
      content: `⭐️
          If you also like alova, 
          <a
            href="https://github.com/alovajs/alova"
            target="_blank">
            star it on GitHub!
          </a>
          ⭐️`,
      backgroundColor: 'var(--ifm-color-primary-light)',
      textColor: '#fff',
      isCloseable: false
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Nav',
          items: [
            {
              label: 'Docs',
              to: 'tutorial/getting-started/overview'
            },
            {
              label: 'Example',
              to: 'tutorial/example/init-page'
            }
          ]
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       to: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       to: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'Twitter',
        //       to: 'https://twitter.com/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              to: 'https://github.com/alovajs/alova'
            },
            {
              label: 'Issues',
              to: 'https://github.com/alovajs/alova/issues'
            },
            {
              label: 'Pull request',
              to: 'https://github.com/alovajs/alova/pulls'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} alova.js Team`
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,

      // https://github.com/facebook/docusaurus/discussions/9506#discussioncomment-7506183
      additionalLanguages: ['javascript', 'bash']
    },

    algolia: {
      // The application ID provided by Algolia
      appId: 'LGEFHNJ1SI',

      // Public API key: it is safe to commit it
      apiKey: '4c4f6078174a5ae66234de817e75e0a8',

      indexName: 'alova_website',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: '/docs/', // or as RegExp: /\/docs\//
        to: '/'
      },

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search'
    }

    // algolia搜索
    // algolia: {
    //   // The application ID provided by Algolia
    //   appId: 'LGEFHNJ1SI',

    //   // Public API key: it is safe to commit it
    //   apiKey: '4c4f6078174a5ae66234de817e75e0a8',

    //   indexName: 'YOUR_INDEX_NAME',

    //   // Optional: see doc section below
    //   contextualSearch: true,

    //   // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
    //   externalUrlRegex: 'external\\.com|domain\\.com',

    //   // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
    //   replaceSearchResultPathname: {
    //     from: '/docs/', // or as RegExp: /\/docs\//
    //     to: '/'
    //   },

    //   // Optional: Algolia search parameters
    //   searchParameters: {},

    //   // Optional: path for search page that enabled by default (`false` to disable it)
    //   searchPagePath: 'search'

    //   //... other Algolia params
    // }
  },

  markdown: {
    mermaid: true
  },
  // 主题
  themes: ['@docusaurus/theme-mermaid'],

  // 插件
  plugins: [
    [
      './plugin/baiduStatistics',
      {
        id: '5afa4c96fca09cb386951b736ee31e56'
      }
    ]
  ]
};

export default config;
