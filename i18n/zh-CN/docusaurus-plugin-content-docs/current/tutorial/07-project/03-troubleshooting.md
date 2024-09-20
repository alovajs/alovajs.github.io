---
title: Troubleshooting
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 如何通过 cdn 使用 alova？

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

svelte 依赖于编译工具，不能通过 CDN 直接使用，详情见 [svelte.dev](https://svelte.dev/)

:::

</TabItem>
</Tabs>

## 在 React-Native 中要注意什么？

使用 alova 开发 React-Native 应用时，你也可以使用 `alova/fetch`。

但是有以下的注意事项：

**metro 版本**

在 alova 中的`package.json`中使用了`exports`来定义多个导出项，因此需要确保这两点：

1. metro 版本高于 0.76.0
2. 在`metro.config.js`中开启`resolver.unstable_enablePackageExports`。[详情点此查看](https://facebook.github.io/metro/docs/configuration/#unstable_enablepackageexports-experimental)

## 引入`alova/fetch`时报错

当在 typescript 项目中引入`alova/fetch`时报`模块"${1}/alova/typings/fetch"没有默认导出`的错误时，请检查以下两点：

1. 在`tsconfig.json`中添加如下配置：

```json
{
  "compilerOptions": {
    "esModuleInterop": true
  }
}
```

2. 降级 typescript 版本到 5.5.x 及以下。
