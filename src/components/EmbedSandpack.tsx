import { Sandpack } from '@codesandbox/sandpack-react';
import { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react/unstyled';
import { dracula, githubLight } from '@codesandbox/sandpack-themes';
import { useColorMode } from '@docusaurus/theme-common';

interface ApiFnParams {
  deps: Props['deps'];
  containBaseURL: Props['containBaseURL'];
}

const genAlovaInstance = (framework: string) => {
  const fn = {
    vue: (deps: ApiFnParams['deps']) => ({
      apiFile: '/src/api.js',
      import:
        deps === 'vue-options'
          ? `import { VueOptionsHook } from '@alova/vue-options';`
          : `import VueHook from 'alova/vue';`,
      hookName: deps === 'vue-options' ? 'VueOptionsHook' : 'VueHook'
    }),
    react: () => ({
      apiFile: '/api.js',
      import: `import ReactHook from 'alova/react';`,
      hookName: 'ReactHook'
    }),
    svelte: () => ({
      apiFile: '/api.js',
      import: `import SvelteHook from 'alova/svelte';`,
      hookName: 'SvelteHook'
    })
  }[framework];
  return ({ deps, containBaseURL }: ApiFnParams) => ({
    [fn?.(deps).apiFile]: `import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
${fn?.(deps).import}
export const alovaInstance = createAlova({
  ${
    containBaseURL
      ? `baseURL: 'https://jsonplaceholder.typicode.com',
  `
      : ''
  }statesHook: ${fn?.(deps).hookName},
  requestAdapter: GlobalFetch(),
  responded: response => response.json()
});`
  });
};

const fileEntry = {
  vue: {
    root: '/src/App.vue',
    api: genAlovaInstance('vue')
  },
  react: {
    root: '/App.js',
    api: genAlovaInstance('react')
  },
  svelte: {
    root: '/App.svelte',
    api: genAlovaInstance('svelte')
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
    ...(typeof targetEntry.api === 'function' ? targetEntry.api({ deps, containBaseURL }) : {}),
    ...externalFiles
  };

  if (deps) {
    console.log(deps, files);
  }

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
