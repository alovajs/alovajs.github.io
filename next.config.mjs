import { createMDX } from 'fumadocs-mdx/next';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack(config) {
    // Support ?raw imports for loading file contents as strings
    config.module.rules.push({
      resourceQuery: /[?&]raw(?:&|$)/,
      use: [require.resolve('raw-loader')],
    });
    // Support SVG imports as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: [require.resolve('@svgr/webpack')],
    });
    return config;
  },
  turbopack: {
    resolveAlias: {
      '@docusaurus/Link': './src/lib/aliases/link.tsx',
      '@docusaurus/Translate': './src/lib/aliases/translate.tsx',
      '@theme/Tabs': './src/lib/aliases/tabs.tsx',
      '@theme/TabItem': './src/lib/aliases/tab-item.tsx',
      '@theme/DocCardList': './src/lib/aliases/doc-card-list.tsx',
      '@theme/CodeBlock': './src/lib/aliases/code-block.tsx',
      '@docusaurus/useDocusaurusContext': './src/lib/aliases/link.tsx',
      '@docusaurus/theme-common': './src/lib/docusaurus-compat.tsx',
      '@theme/ThemedImage': './src/components/ThemeImage.tsx',
      '@site': './',
    },
    rules: {
      // Support SVG imports as React components
      '*.svg': {
        loaders: [require.resolve('@svgr/webpack')],
        as: '*.js',
      },
      // Support ?raw imports for loading file contents as strings
      '*': {
        condition: {
          // 匹配 query 中含有 raw 的导入，即 ?raw
          query: /\?raw$/,
        },
        loaders: [require.resolve('raw-loader')],
      },
    },
  },
};

export default withMDX(config);
