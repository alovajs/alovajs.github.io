---
title: 模拟数据
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


通过alova的mock插件，与传统的Proxy形式不同，你可以很好地控制使用mock数据的使用范围，你可以控制全局范围、某一组接口范围，甚至是某一个接口的启用和禁用，这在我们实际的业务场景中是很有用的，每一次的迭代都会新增或修改一组接口，我们希望让之前的功能还是走已开发好的接口，而让新增或修改的接口走模拟数据，此时就可以将每个开发人员针对本次迭代涉及到的接口分为一组，并对它们进行开启或关闭。

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
const globalFetch = GlobalFetch();
const mockAdapter = createAlovaMockAdapter([mockGroup1, /** ... */], {
  // 全局控制是否启用mock接口，默认为true
  enable: true,

  // 非模拟请求适配器，用于未匹配mock接口时发送请求
	httpAdapter: globalFetch,

  // mock接口响应延迟，单位毫秒
	delay: 1000,

  // 是否打印mock接口请求信息
	mockRequestLogger: process.env.NODE_ENV === 'development'
});
// highlight-end

export const alovaInst = createAlova({
	baseURL: 'http://xxx',

  // 通过环境变量控制部署环境下，不会将mock相关代码打包进去
	requestAdapter: process.env.NODE_ENV === 'development' ? mockAdapter : globalFetch,
	statesHook: /** ... */
});
```

此时，就可以在实际使用中和平时一样使用alova了。