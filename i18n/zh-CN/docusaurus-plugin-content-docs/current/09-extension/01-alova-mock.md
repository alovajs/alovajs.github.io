---
title: 模拟数据
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


此mock插件是一个alova的请求适配器，与传统的Proxy形式不同，你可以很好地控制使用mock数据的使用范围，你可以控制全局范围、某一组接口范围，甚至是某一个接口的启用和禁用，这在我们实际的业务场景中是很有用的，每一次的迭代都会新增或修改一组接口，我们希望让之前的功能还是走已开发好的接口，而让新增或修改的接口走模拟数据，此时就可以将每个开发人员针对本次迭代涉及到的接口分为一组，并对它们进行开启或关闭。

## 特性
- ✨与alova无缝协作
- ✨模拟请求任意分组，可控制全局、组、以及单个模拟接口的启用和禁用
- ✨不污染生产环境

## 安装

<Tabs>
<TabItem value="1" label="npm">

```bash
npm install @alova/mock --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add @alova/mock
```

</TabItem>
</Tabs>

以下为使用流程。

## 定义mock接口
使用`defineMock`定义一组mock接口，你可以在每一项模拟接口中直接指定返回响应数据，或指定为回调函数动态计算响应数据。
```javascript title=mockGrou1.js
import { defineMock } from '@alova/mock';

export default defineMock({
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

  // key前面添加`-`，表示禁用此mock接口
  '-[DELETE]/todo/{id}': ({ params }) => {
    // ...
    return { success: true };
  }
}, true);  // 第二个参数表示是否启用本组mock接口，默认为true，可以指定为false关闭
```


## 创建模拟请求适配器
在调用`createAlova`时创建一个模拟请求适配器，并将mock接口传入即可完成。
```javascript
import GlobalFetch from 'alova/GlobalFetch';
import { createAlovaMockAdapter } from '@alova/mock';
import mockGroup1 from './mockGroup1';

// highlight-start
const mockAdapter = createAlovaMockAdapter([mockGroup1, /** ... */], {
  // 全局控制是否启用mock接口，默认为true
  enable: true,

  // 非模拟请求适配器，用于未匹配mock接口时发送请求
  httpAdapter: GlobalFetch(),

  // mock接口响应延迟，单位毫秒
  delay: 1000,

  // 是否打印mock接口请求信息
  mockRequestLogger: true,

  // 模拟接口回调，data为返回的模拟数据，你可以用它构造任何你想要的对象返回给alova
  // 以下为默认的回调函数，它适用于使用GlobalFetch请求适配器
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

## 实践建议

### 按每个开发者每次版本分组接口

在团队开发场景下，每次版本开发时我们经常只需要对部分未开发好的接口进行模拟请求，并且对之前版本的接口使用测试环境接口，此时为了达到更好的模拟接口管理，可以以开发版本和开发者两个维度将接口分组。

例如有两个开发者名为 *August*、*Keven*，他们正在开发v1.1产品功能，他们可以这样管理模拟接口。

```javascript title=August-v1.1.js
import { defineMock } from '@alova/mock';

export default defineMock({
  '/todo': [/** */],
  '[POST]/todo': ({ data }) => {
    // ...
    // return ...
  },
  // ...
});
```

```javascript title=Keven-v1.1.js
import { defineMock } from '@alova/mock';

export default defineMock({
  '[PUT]/todo/add': ({ data }) => {
    // ...
    // return ...
  },
  '[DELETE]/todo/remove': ({ data }) => {
    // ...
    // return ...
  },
  // ...
});
```

```javascript title=request.js
import Augustv1_1 from './August-v1.1';
import Kevenv1_1 from './Keven-v1.1';

const mockAdapter = createAlovaMockAdapter([Augustv1_1, Kevenv1_1], {
  httpAdapter: GlobalFetch(),
  delay: 1000,
});
export const alovaInst = createAlova({
  baseURL: 'http://xxx',
  requestAdapter: mockAdapter,
  // ...
});
```

### 在生产环境中排除mock代码

mock数据一般只作用于开发环境，在生产环境下将会切换到实际的接口中，因此这段mock代码在生产环境就变得没有作用，此时我们可以通过环境变量的判断来排除这块代码，你只需要这样做：

```javascript
const globalFetch = GlobalFetch();
const mockAdapter = createAlovaMockAdapter([mockGroup1, /** ... */], {
  httpAdapter: globalFetch,
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