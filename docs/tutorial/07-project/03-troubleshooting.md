---
title: Troubleshooting
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## How to use alova via cdn?

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://unpkg.com/alova/dist/alova.umd.min.js"></script>
    <script src="https://unpkg.com/alova/dist/adapter/fetch.umd.min.js"></script>
    <script src="https://unpkg.com/alova/dist/hooks/vuehook.umd.min.js"></script>
  </head>
  <body>
    <div id="app">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error.message }}</div>
      <span v-else>responseData: {{ data }}</span>
    </div>
  </body>
  <script>
    const alovaInstance = alova.createAlova({
      statesHook: VueHook,
      requestAdapter: alovaFetch(),
      responded: response => response.json()
    });

    Vue.createApp({
      setup() {
        return alova.useRequest(
          alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1')
        );
      }
    }).mount('#app');
  </script>
</html>
```

</TabItem>
<TabItem value="2" label="react">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script src="https://unpkg.com/alova/dist/alova.umd.min.js"></script>
    <script src="https://unpkg.com/alova/dist/adapter/fetch.umd.min.js"></script>
    <script src="https://unpkg.com/alova/dist/hooks/reacthook.umd.min.js"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
  <script type="text/babel">
    const alovaInstance = alova.createAlova({
      statesHook: ReactHook,
      requestAdapter: alovaFetch(),
      responded: response => response.json()
    });

    const App = () => {
      const { loading, data, error } = alova.useRequest(
        alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1')
      );

      if (loading) {
        return <div>Loading...</div>;
      } else if (error) {
        return <div>{error.message}</div>;
      }
      return <span>responseData: {JSON.stringify(data)}</span>;
    };
    const root = ReactDOM.createRoot(document.getElementById('app'));
    root.render(<App />);
  </script>
</html>
```

</TabItem>
<TabItem value="3" label="svelte">

:::tip

svelte depends on the compilation tool and cannot be used directly through CDN. For details, see [svelte.dev](https://svelte.dev/)

:::

</TabItem>
</Tabs>

## What to pay attention to in React-Native?

When using alova to develop React-Native applications, you can also use `alova/fetch`.

But there are the following precautions:

**Metro version**

In alova's `package.json`, `exports` is used to define multiple export items, so you need to ensure these two points:

1. Metro version is higher than 0.76.0

2. Enable `resolver.unstable_enablePackageExports` in `metro.config.js`. [Click here for details](https://facebook.github.io/metro/docs/configuration/#unstable_enablepackageexports-experimental)

## Error when importing `alova/fetch`

When you introduce `alova/fetch` in a typescript project and get the error `module "${1}/alova/typings/fetch" has no default export`, please check the following 2 points:

1. add configuration below to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "esModuleInterop": true
  }
}
```

2. downgrade typescript version to 5.5.x or below.
