import alovaReact from '!!raw-loader!@site/codesandbox/00-create-alova/react';
import alovaSvelte from '!!raw-loader!@site/codesandbox/00-create-alova/svelte';
import alovaVueComposition from '!!raw-loader!@site/codesandbox/00-create-alova/vueComposition';
import alovaVueOptions from '!!raw-loader!@site/codesandbox/00-create-alova/vueOptions';
import { Sandpack } from '@codesandbox/sandpack-react';
import { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react/unstyled';
import { amethyst, monokaiPro } from '@codesandbox/sandpack-themes';
import { useColorMode } from '@docusaurus/theme-common';

const fileEntry = {
  vue: {
    root: '/src/App.vue',
    files: {
      '/src/api.js': alovaVueComposition
    }
  },
  'vue-options': {
    root: '/src/App.vue',
    files: {
      '/src/api.js': alovaVueOptions
    },
    deps: {
      '@alova/vue-options': 'latest'
    }
  },
  react: {
    root: '/App.js',
    files: {
      '/api.js': alovaReact
    }
  },
  svelte: {
    root: '/App.svelte',
    files: {
      '/api.js': alovaSvelte
    }
  },
  static: {
    root: '/index.html'
  },
  vanilla: {
    root: '/index.js'
  }
};
const customSetup = {
  svelte: (commonConfig: Record<string, any>) => ({
    files: {
      '/index.js': {
        code: `import App from "./App.svelte";    
  const app = new App({
    target: document.body
  });
  export default app;
        `,
        hidden: true
      },
      '/public/index.html': {
        code: `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf8" />
      <meta name="viewport" content="width=device-width" />
      <title>Svelte app</title>
      <link rel="stylesheet" href="public/bundle.css" />
    </head>
    <body>
      <script src="bundle.js"></script>
    </body>
  </html>`,
        hidden: true
      },
      ...commonConfig.files
    },
    customSetup: {
      entry: '/index.js',
      dependencies: {
        svelte: '^3.59.2',
        ...commonConfig.customSetup.dependencies
      }
    },
    main: '/App.svelte',
    environment: 'svelte'
  })
};

interface Props {
  template: SandpackPredefinedTemplate;
  mainFile: string;
  externalFiles?: Record<string, string>;
  containBaseURL?: boolean;
  containResponded?: boolean;
  editorHeight?: number;
  style?: 'options';
}
const EmbedSandpack = ({
  template,
  mainFile,
  externalFiles = {},
  containBaseURL = true,
  containResponded = true,
  editorHeight,
  style
}: Props) => {
  const themes = {
    light: amethyst,
    dark: monokaiPro
  };
  const targetEntry = fileEntry[template + (style ? `-${style}` : '')];
  const files = {
    [targetEntry.root]: mainFile,
    ...(targetEntry.files ? targetEntry.files : {}),
    ...externalFiles
  };

  const apiFileKey = Object.keys(files).find(file => /api\.js$/.test(file));
  if (files[apiFileKey]) {
    // if don't need to contain baseURL, remove it.
    if (!containBaseURL) {
      files[apiFileKey] = files[apiFileKey].replace(/baseURL.+?\s{4}/, '');
    }
    // if don't need to contain responded, remove it.
    if (!containResponded) {
      files[apiFileKey] = files[apiFileKey].replace(/,\s+responded.+json\(\)/, '');
    }
  }

  const dependencies = {
    alova: 'latest',
    ...(targetEntry.deps || {})
  };
  const { colorMode } = useColorMode();
  let config = {
    files,
    template,
    customSetup: {
      dependencies
    }
  };
  config = customSetup[template] ? customSetup[template](config) : config;
  return (
    <Sandpack
      {...config}
      theme={themes[colorMode]}
      options={{
        editorWidthPercentage: 70,
        editorHeight
      }}
    />
  );
};

export default EmbedSandpack;
