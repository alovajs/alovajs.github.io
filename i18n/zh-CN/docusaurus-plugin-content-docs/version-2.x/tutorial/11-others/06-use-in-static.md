---
title: 在静态 html 中使用
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

你可以使用 cdn 的方式使用 alova。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://unpkg.com/alova/dist/alova.umd.min.js"></script>
    <script src="https://unpkg.com/alova/dist/adapter/globalfetch.umd.min.js"></script>
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
      requestAdapter: GlobalFetch(),
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
    <script src="https://unpkg.com/alova/dist/adapter/globalfetch.umd.min.js"></script>
    <script src="https://unpkg.com/alova/dist/hooks/reacthook.umd.min.js"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
  <script type="text/babel">
    const alovaInstance = alova.createAlova({
      statesHook: ReactHook,
      requestAdapter: GlobalFetch(),
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

svelte 依赖于编译工具，不能通过 CDN 直接使用，详情见 [svelte.dev](https://svelte.dev/)

:::

</TabItem>
<TabItem value="4" label="vue options">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/vue@2/dist/vue.js"></script>
    <script src="https://unpkg.com/alova/dist/alova.umd.min.js"></script>
    <script src="https://unpkg.com/alova/dist/adapter/globalfetch.umd.min.js"></script>
    <script src="https://unpkg.com/@alova/vue-options/dist/alova-vue-options.umd.min.js"></script>
  </head>
  <body>
    <div id="app">
      <div v-if="todo.loading">Loading...</div>
      <div v-else-if="todo.error">{{ todo.error.message }}</div>
      <span v-else>responseData: {{ todo.data }}</span>
    </div>
  </body>
  <script>
    const alovaInstance = alova.createAlova({
      statesHook: AlovaVueOptions.VueOptionsHook,
      requestAdapter: GlobalFetch(),
      responded: response => response.json()
    });

    new Vue({
      el: '#app',
      mixins: AlovaVueOptions.mapAlovaHook(function () {
        return {
          todo: alova.useRequest(
            alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1')
          )
        };
      }),
      data() {
        return {};
      }
    });
  </script>
</html>
```

</TabItem>
</Tabs>
