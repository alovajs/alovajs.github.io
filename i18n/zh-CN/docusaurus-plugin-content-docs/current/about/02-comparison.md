---
title: 与其他库比较
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## react-query/swr/alova 对比

react-query 是一个强大的异步状态管理库，swr 是一个用于数据请求的 React Hooks 库，它们的共同特性也是使用 use hook 来发送和管理请求，和数据缓存功能，以下是三者的对比表格。

| 特性 ↓/库 →         | react-query     | swr                       | alova                   |
| ------------------- | --------------- | ------------------------- | ----------------------- |
| 定位                | 异步状态管理    | 数据请求的 React Hooks 库 | 极致简化 API 集成工作流 |
| 使用模式            | hooks           | hooks                     | 完整的请求方案          |
| 适用环境            | client          | client                    | client/server           |
| 框架支持            | 多包支持        | 仅 React                  | 适配器支持              |
| SSR                 | ✅              | ✅                        | ✅                      |
| hooks 数量          | 2-3             | 2-3                       | 15+                     |
| hooks 操作函数      | ❌              | ❌                        | ✅                      |
| 服务端              | ❌              | ❌                        | nodejs/deno/bun         |
| server hooks        | ❌              | ❌                        | ✅                      |
| 自由度              | 🟡 受限         | 🟡 受限                   | 🟢 灵活度高             |
| 请求共享            | ❌              | ❌                        | ✅                      |
| 缓存模式            | 单级缓存        | 单级缓存                  | 多级缓存                |
| axios 支持          | ✅              | ✅                        | ✅                      |
| fetch 支持          | ✅              | ✅                        | ✅                      |
| XMLHttpRequest 支持 | 🟡 受限         | 🟡 受限                   | ✅                      |
| 请求方式            | 第三方库        | 第三方库                  | 统一的 Method 代理      |
| openAPI 支持        | 🟡 受限第三方库 | 🟡 受限第三方库           | 🟢 更现代的方案         |
| 依赖收集（性能）    | ❌              | ✅                        | ✅                      |
| 数据同步            | ✅              | ✅                        | ✅                      |

## 与 axios/fetch/XMLHttpRequest 等传统请求工具对比

`axios/fetch/XMLHttpRequest` 等传统的请求工具与下一代请求工具 alova 解决的是不同的问题，前者聚焦于请求发送和接收响应，后者用于提升 API 的消费效率，它们是互相补充的关系，将 alova 与传统请求工具组合使用可以获得更强大的请求特性，我们以 axios 为例。

### alova 为 axios 提供自动化请求状态管理

仅使用 axios 时，通常需要你自行维护请求相关状态，使用 alova 的 use hook 后可以获得自动化的请求状态管理能力。

<Tabs>
<TabItem value="1" label="仅axios">

```javascript
// vue3代码示例
const loading = ref(false);
const data = ref({});
const error = ref(null);
const request = async () => {
  try {
    loading.value = true;
    data.value = await axios.get('/xxx');
  } catch (e) {
    error.value = e;
  }
  loading.value = false;
};
mounted(request);
```

</TabItem>
<TabItem value="2" label="axios+alova">

```javascript
// 将axios作为alova的请求适配器
const { loading, data, error } = useRequest(alova.Get('/xxx'));
```

</TabItem>
</Tabs>

### alova 提供开箱即用的高性能请求策略

alova 为你提供了[多个高性能的请求策略模块](/tutorial/client/strategy)，你可以根据不同请求场景使用不同的模块，这是 axios 不具备的。

### alova 为 axios 提供响应数据缓存

alova 分别提供了 3 种缓存模式来满足不同的缓存场景，分别为内存模式、缓存占位模式、恢复模式。它们是组件无关的，只要请求地址和参数相同都可以命中缓存，除非你关闭了它。响应数据缓存可以极大地提高请求流畅性，降低服务端压力。

### alova 为 axios 提供请求共享功能

请求共享在同时发送多个相同请求时，将会复用同一个请求，它也可以提升应用流畅性和降低服务端压力。

### alova 为 axios 提供数据预拉取

提前请求将要使用的数据，也可以极大提升应用流畅性。

### alova 可管理请求状态

你可以使用 alova 跨任意的组件层级来访问其他组件内的状态化数据，这可以让你减少跨组件通信的一些麻烦。
