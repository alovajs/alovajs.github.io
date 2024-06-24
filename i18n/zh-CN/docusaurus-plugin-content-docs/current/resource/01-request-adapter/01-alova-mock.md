---
title: 模拟数据
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

此 mock 插件是一个 alova 的请求适配器，与传统的 Proxy 形式不同，你可以很好地控制使用 mock 数据的使用范围，你可以控制全局范围、某一组接口范围，甚至是某一个接口的启用和禁用，这在我们实际的业务场景中是很有用的，每一次的迭代都会新增或修改一组接口，我们希望让之前的功能还是走已开发好的接口，而让新增或修改的接口走模拟数据，此时就可以将每个开发人员针对本次迭代涉及到的接口分为一组，并对它们进行开启或关闭。

## 特性

- 与 alova 无缝协作
- 模拟请求任意分组，可控制全局、组、以及单个模拟接口的启用和禁用
- 与 mockjs 配合使用
- 不污染生产环境

## 安装

<Tabs groupId="framework">
<TabItem value="1" label="npm">

```bash
npm install @alova/mock@beta --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add @alova/mock@beta
```

</TabItem>
</Tabs>

以下为使用流程。

## 使用

### 定义 mock 接口

使用`defineMock`定义一组 mock 接口，你可以在每一项模拟接口中直接指定返回响应数据，或指定为回调函数动态计算响应数据。

```javascript title=mockGrou1.js
import { defineMock } from '@alova/mock';

export default defineMock(
  {
    // 捕获get请求
    '/todo': [1, 2, 3, 4],

    // rest风格请求
    '/todo/{id}': ({ params }) => {
      const id = params.id;
      // ...
      return {
        title: '...',
        time: '10:00'
      };
    },

    // 捕获post请求
    '[POST]/todo': ({ query, data }) => {
      // ...
      return { success: true };
    },

    // 返回更详细的信息
    '[POST]/todo': ({ query, data }) => {
      // ...
      return {
        status: 403,
        statusText: 'unknown error',
        responseHeaders: {
          // ...
        },
        body: {
          success: true
        }
      };
    },

    // 模拟网络错误
    '[POST]/todo': ({ query, data }) => {
      throw new Error('network error');
    },

    // key前面添加`-`，表示禁用此mock接口
    '-[DELETE]/todo/{id}': ({ params }) => {
      // ...
      return { success: true };
    }
  },
  true
); // 第二个参数表示是否启用本组mock接口，默认为true，可以指定为false关闭
```

### 创建模拟请求适配器

在调用`createAlova`时创建一个模拟请求适配器，并将 mock 接口传入即可完成。

```javascript
import adapterFetch from 'alova/fetch';
import { createAlovaMockAdapter } from '@alova/mock';
import mockGroup1 from './mockGroup1';

// highlight-start
const mockAdapter = createAlovaMockAdapter([mockGroup1, /** ... */], {
  // 全局控制是否启用mock接口，默认为true
  enable: true,

  // 非模拟请求适配器，用于未匹配mock接口时发送请求
  httpAdapter: adapterFetch(),

  // mock接口响应延迟，单位毫秒
  delay: 1000,

  // 是否打印mock接口请求信息
  mockRequestLogger: true,

  // 模拟接口回调，data为返回的模拟数据，你可以用它构造任何你想要的对象返回给alova
  // 以下为默认的回调函数，它适用于使用 `alova/fetch` 请求适配器
  // 如果你使用的是其他请求适配器，在模拟接口回调中请自定义返回适合适配器的数据结构
  onMockResponse: data => new Response(JSON.stringify(data))
});
// highlight-end

export const alovaInst = createAlova({
  baseURL: 'http://xxx',

  // 使用mock请求适配器，如果需要切换适配器，请看下面的实践建议
  requestAdapter: mockAdapter,

  statesHook: /** ... */
});
```

### 路径匹配模式

:::info 版本要求

1.5.0+

:::

默认情况下，在`defineMock`中定义的路径是一个 url 的完整 pathname，看以下代码片段。

```javascript
const alovaInst = createAlova({
  baseURL: 'https://api.alovajs.org'
  // ...
});
alovaInst.Get('/user?id=1').send();
```

示例中的请求路径为`https://api.alovajs.org/user?id=1`时，它的完整 pathname 为`/user`，此时可以匹配到`defineMock`中的`/user`。

通常情况下这已经足够了，但是当你的 baseURL 不仅仅是一个域名时。

```javascript
const alovaInst = createAlova({
  baseURL: 'https://api.alovajs.org/v1/subname'
  // ...
});
alovaInst.Get('/user?id=1').send();
```

这个示例中的请求路径为`https://api.alovajs.org/v1/subname/user?id=1`，mock 的匹配路径为`/v1/subname/user`，需要将 baseURL 中的`/v1/subname`也一同写上，当接口数量较多时就稍显冗余。

此时，你可以在`createAlovaMockAdapter`中设置`matchMode`为`methodurl`，它将只匹配 method 实例中定义的 url，例如上面的实例将会匹配到`/user?id=1`，而不再需要写 baseURL 中的部分，相对的，如果 method 实例中的 url 中带了 get 参数时，也需要将它一同写到`defineMock`的匹配路径中，就像这边的`?id=1`。

```javascript
createAlovaMockAdapter([mockGroup1 /** ... */], {
  // ...
  // highlight-start
  matchMode: 'methodurl'
  // highlight-end
});
```

## 实践建议

### 按每个开发者每次版本分组接口

在团队开发场景下，每次版本开发时我们经常只需要对部分未开发好的接口进行模拟请求，并且对之前版本的接口使用测试环境接口，此时为了达到更好的模拟接口管理，可以以开发版本和开发者两个维度将接口分组。

例如有两个开发者名为 _August_、_kevin_，他们正在开发 v1.1 产品功能，他们可以这样管理模拟接口。

```javascript title=August-v1.1.js
import { defineMock } from '@alova/mock';

export default defineMock({
  '/todo': [
    /** */
  ],
  '[POST]/todo': ({ data }) => {
    // ...
    // return ...
  }
  // ...
});
```

```javascript title=kevin-v1.1.js
import { defineMock } from '@alova/mock';

export default defineMock({
  '[PUT]/todo/add': ({ data }) => {
    // ...
    // return ...
  },
  '[DELETE]/todo/remove': ({ data }) => {
    // ...
    // return ...
  }
  // ...
});
```

```javascript title=request.js
import Augustv1_1 from './August-v1.1';
import kevinv1_1 from './kevin-v1.1';

const mockAdapter = createAlovaMockAdapter([Augustv1_1, kevinv1_1], {
  httpAdapter: adapterFetch(),
  delay: 1000
});
export const alovaInst = createAlova({
  baseURL: 'http://xxx',
  requestAdapter: mockAdapter
  // ...
});
```

### 在生产环境中排除 mock 代码

mock 数据一般只作用于开发环境，在生产环境下将会切换到实际的接口中，因此这段 mock 代码在生产环境就变得没有作用，此时我们可以通过环境变量的判断来排除这块代码，你只需要这样做：

```javascript
const fetchAdapter = adapterFetch();
const mockAdapter = createAlovaMockAdapter([mockGroup1, /** ... */], {
  httpAdapter: fetchAdapter,
  delay: 1000,
});

export const alovaInst = createAlova({
  baseURL: 'http://xxx',

  // highlight-start
  // 通过环境变量控制生产环境下，不会将mock相关代码打包进去
  requestAdapter: process.env.NODE_ENV === 'development' ? mockAdapter : globalFetch,
  // highlight-end

  statesHook: /** ... */
});
```

### 与 mockjs 一同使用

如果你不希望自己编写模拟数据，而是使用模拟数据库（例如 mockjs）一同使用，你可以这样做。

```javascript
import { defineMock } from '@alova/mock';
import Mock from 'mockjs';

export default defineMock({
  '/api1': Mock.mock({
    'id|1-10000': 100
  })
});
```

## 转换模拟数据

**@alova/mock** 默认将响应数据包装为 Response 实例，将响应头默认包装为 Headers 实例，这是针对`alova/fetch`进行适配的，但如果使用其他的请求适配器，就需要将模拟数据转换为相应的格式。

### 转换响应数据

你可以在`onMockResponse`字段中拦截模拟响应数据并返回转换后的响应数据以及响应头。

> 你也可以在 onMockResponse 中抛出一个错误，表示请求失败。

```javascript
const mockAdapter = createAlovaMockAdapter(
  [
    /* 模拟数据 */
  ],
  {
    // ...
    // highlight-start
    onMockResponse(response, request, currentMethod) {
      // response为相应数据集合，其中包含status、statusText、responseHeaders、body
      // request为请求数据，其中包含query、params、headers、data
      // currentMethod为当前请求的method实例
      // ...
      // 返回转换后的响应数据和响应头
      return {
        response: /** 响应数据 */,
        headers: /** 响应头 */
      };
    }
    // highlight-end
  }
);
```

### 转换错误对象

你可以在`onMockError`字段中拦截错误实例并返回转换后的错误信息。

```javascript
const mockAdapter = createAlovaMockAdapter(
  [
    /* 模拟数据 */
  ],
  {
    // ...
    // highlight-start
    onMockError(error, currentMethod) {
      // error为错误实例
      // currentMethod为当前请求的method实例
      // ...
      // 返回转换后的错误信息集合
    }
    // highlight-end
  }
);
```
