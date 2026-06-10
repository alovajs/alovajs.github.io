---
title: Troubleshooting
---

## How to use alova via cdn?

<Tabs items={["vue","react","svelte"]}>

<Tab value="vue">

```html
<!doctype html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://unpkg.com/alova/dist/alova.umd.min.js"></script>
    <script src="https://unpkg.com/alova/dist/adapter/fetch.umd.min.js"></script>
    <script src="https://unpkg.com/alova/dist/stateshook/vue.umd.min.js"></script>
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

</Tab>
<Tab value="react">

```html
<!doctype html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script src="https://unpkg.com/alova/dist/alova.umd.min.js"></script>
    <script src="https://unpkg.com/alova/dist/adapter/fetch.umd.min.js"></script>
    <script src="https://unpkg.com/alova/dist/stateshook/react.umd.min.js"></script>
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

</Tab>
<Tab value="svelte">

<Callout type="idea">

svelte depends on the compilation tool and cannot be used directly through CDN. For details, see [svelte.dev](https://svelte.dev/)

</Callout>

</Tab>
</Tabs>

## What to pay attention to in React-Native?

When using alova to develop React-Native applications, you can also use `alova/fetch`.

But there are the following precautions:

**Metro version**

In alova's `package.json`, `exports` is used to define multiple export items, so you need to ensure these two points:

1. Metro version is higher than 0.76.0

2. Enable `resolver.unstable_enablePackageExports` in `metro.config.js`. [Click here for details](https://facebook.github.io/metro/docs/configuration/#unstable_enablepackageexports-experimental)
