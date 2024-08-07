// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import type { Config } from '@docusaurus/types';
import { themes } from 'prism-react-renderer';

const lightCodeTheme = themes.duotoneLight;
const darkCodeTheme = themes.oceanicNext;
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
          editUrl: 'https://github.com/alovajs/alovajs.github.io/blob/main/',
          lastVersion: 'current',
          versions: {
            current: {
              label: 'v3'
            }
          }
        },
        // disable blog
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.scss')
        }
      }
    ]
  ],

  stylesheets: [
    'https://rsms.me/inter/inter.css',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap'
  ],
  themeConfig: {
    image: '/img/card_image.jpg',
    metadata: [{ name: 'twitter:site', content: '@alovajs' }],
    navbar: {
      title: '',
      logo: {
        alt: 'ALOVA',
        src: 'img/logo-text.svg'
      },
      items: [
        {
          type: 'dropdown',
          label: 'Docs',
          position: 'left',
          items: [
            {
              label: 'Getting Started',
              to: 'tutorial/getting-started/introduce'
            },
            {
              label: 'Request Adapter',
              to: 'resource/request-adapter'
            },
            {
              label: 'Storage Adapter',
              to: 'resource/storage-adapter'
            },
            {
              label: 'UI Frameworks',
              to: 'category/framework'
            },
            {
              label: 'Error Reference',
              to: 'error'
            }
          ]
        },
        {
          to: 'examples',
          position: 'left',
          label: 'Example'
        },
        {
          to: 'api/alova',
          position: 'left',
          label: 'API'
        },
        {
          type: 'dropdown',
          label: 'About',
          position: 'left',
          items: [
            {
              label: 'Request Scene Model',
              to: 'about/RSM'
            },
            {
              label: 'Comparison',
              to: 'about/comparison'
            },
            {
              label: 'Q&A',
              to: 'about/qa'
            }
          ]
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
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true
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
          href: 'https://x.com/alovajs',
          className: 'header-x-link',
          position: 'right'
        },
        {
          href: 'https://discord.gg/S47QGJgkVb',
          className: 'header-discord-link',
          position: 'right'
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
      logo: {
        alt: 'Meta Open Source Logo',
        src: 'img/logo.svg',
        href: 'https://opensource.fb.com',
        width: 160,
        height: 51
      },

      links: [
        {
          title: 'Document',
          items: [
            {
              label: 'Docs',
              to: 'tutorial/getting-started/introduce'
            },
            {
              label: 'Example',
              to: 'examples'
            },
            {
              label: 'API',
              to: 'api/alova'
            },
            {
              label: 'Contributing',
              to: 'contributing/overview'
            }
          ]
        },
        {
          title: 'Resource',
          items: [
            {
              label: 'Request Adapter',
              to: 'resource/request-adapter'
            },
            {
              label: 'Storage Adapter',
              to: 'resource/storage-adapter'
            },
            {
              label: 'Framework Support',
              to: 'category/framework'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   to: 'https://stackoverflow.com/questions/tagged/docusaurus',
            // },
            {
              label: 'Discord',
              to: 'https://discord.gg/S47QGJgkVb'
            },
            {
              label: 'X',
              to: 'https://x.com/alovajs'
            },
            {
              html: '<a href="/img/wechat_qrcode.jpg" target="_blank" class="footer__link-item" rel="noreferrer noopener">Wechat Group</a>'
            }
          ]
        },
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
  },

  markdown: {
    mermaid: true
  },
  // 主题
  themes: ['@docusaurus/theme-mermaid'],

  // 插件
  plugins: [
    'docusaurus-plugin-sass',
    [
      './plugin/baiduStatistics',
      {
        id: '5afa4c96fca09cb386951b736ee31e56'
      }
    ]
  ]
};

export default config;
