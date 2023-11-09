import { Sandpack } from '@codesandbox/sandpack-react';
import { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react/unstyled';
import { dracula, githubLight } from '@codesandbox/sandpack-themes';
import { useColorMode } from '@docusaurus/theme-common';

const fileEntry = {
  vue: {
    root: '/src/App.vue',
    api: (deps: Props['deps']) => ({
      '/src/api.js': `
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
${deps === 'vue-options' ? `import { VueOptionsHook } from '@alova/vue-options';` : `import VueHook from 'alova/vue';`}
export const alovaInstance = createAlova({
  baseURL: 'https://jsonplaceholder.typicode.com',
  statesHook: ${deps === 'vue-options' ? 'VueOptionsHook' : 'VueHook'},
  requestAdapter: GlobalFetch(),
  responded: response => response.json()
});`
    })
  },
  react: {
    root: '/App.js',
    api: () => ({
      '/api.js': `import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import ReactHook from 'alova/react';
export const alovaInstance = createAlova({
  baseURL: 'https://jsonplaceholder.typicode.com',
  statesHook: ReactHook,
  requestAdapter: GlobalFetch(),
  responded: response => response.json()
});`
    })
  },
  svelte: {
    root: '/App.svelte',
    api: () => ({
      '/api.js': `import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import SvelteHook from 'alova/svelte';
export const alovaInstance = createAlova({
  baseURL: 'https://jsonplaceholder.typicode.com',
  statesHook: SvelteHook,
  requestAdapter: GlobalFetch(),
  responded: response => response.json()
});`
    })
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

interface Props {
  template: SandpackPredefinedTemplate;
  mainFile: string;
  externalFiles?: Record<string, string>;
  defaultAlova?: boolean;
  editorHeight?: number;
  deps?: 'vue-options';
}
const EmbedSandpack = ({ template, mainFile, externalFiles = {}, defaultAlova = true, editorHeight, deps }: Props) => {
  const themes = {
    light: githubLight,
    dark: dracula
  };
  const targetEntry = fileEntry[template];
  const files = {
    [targetEntry.root]: mainFile,
    ...(defaultAlova && typeof targetEntry.api === 'function' ? targetEntry.api(deps) : {}),
    ...externalFiles
  };

  const dependencies = {
    alova: 'latest',
    ...(deps && extraDeps[deps] ? extraDeps[deps] : {})
  };
  const { colorMode } = useColorMode();
  return (
    <Sandpack
      theme={themes[colorMode]}
      template={template}
      customSetup={{
        dependencies
      }}
      options={{
        editorWidthPercentage: 70,
        editorHeight
      }}
      files={files}
    />
  );
};

export default EmbedSandpack;
