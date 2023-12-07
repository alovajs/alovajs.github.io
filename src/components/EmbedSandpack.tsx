import alovaReact from '!!raw-loader!@site/codesandbox/00-create-alova/react';
import alovaSvelte from '!!raw-loader!@site/codesandbox/00-create-alova/svelte';
import alovaVueComposition from '!!raw-loader!@site/codesandbox/00-create-alova/vueComposition';
import alovaVueOptions from '!!raw-loader!@site/codesandbox/00-create-alova/vueOptions';
import { Sandpack } from '@codesandbox/sandpack-react';
import { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react/unstyled';
import { dracula, githubLight } from '@codesandbox/sandpack-themes';
import { useColorMode } from '@docusaurus/theme-common';

const fileEntry = {
  vue: {
    root: '/src/App.vue',
    files: {
      '/src/api.js': alovaVueComposition
    }
  },
  vueOptions: {
    root: '/src/App.vue',
    files: {
      '/src/api.js': alovaVueOptions
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
  }
};
const extraDeps = {
  'vue-options': {
    '@alova/vue-options': 'latest'
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
  editorHeight?: number;
  deps?: 'vue-options';
}
const EmbedSandpack = ({
  template,
  mainFile,
  externalFiles = {},
  containBaseURL = true,
  editorHeight,
  deps
}: Props) => {
  const themes = {
    light: githubLight,
    dark: dracula
  };
  const targetEntry = fileEntry[template];
  const files = {
    [targetEntry.root]: mainFile,
    ...(targetEntry.files ? targetEntry.files : {}),
    ...externalFiles
  };

  // if need to contain baseURL, add it to api.js with replace of string.
  if (containBaseURL) {
    const apiFileKey = Object.keys(files).find(file => /api\.js$/.test(file));
    let apiFileContent = files[apiFileKey];
    if (apiFileContent) {
      files[apiFileKey] = apiFileContent.replace(
        'statesHook',
        (match: string) => `baseURL: 'https://jsonplaceholder.typicode.com',\n  ${match}`
      );
    }
  }

  const dependencies = {
    alova: 'latest',
    ...(deps && extraDeps[deps] ? extraDeps[deps] : {})
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
