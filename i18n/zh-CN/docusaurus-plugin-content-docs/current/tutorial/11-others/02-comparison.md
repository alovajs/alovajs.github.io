---
title: 与其他库比较
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 与 axios 对比

axios 提供了基于 promise 的非常简单易用的 HTTP 请求功能，只需要简单的一行代码即可发送和接收请求，并且可以在浏览器和 nodejs 环境下运行，是一个非常优秀的请求 js 库。

但是 axios 聚焦于请求发送和接收响应，这意味着如果你需要自行编写更多代码来主动优化请求功能，而 alova 像是 axios 的武器装备，将 axios 与 alova 组合使用可以获得更强大的请求能力，以下是 alova 为 axios 附加的请求管理能力。

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

alova 为你提供了[多个高性能的请求策略模块](/category/strategy)，你可以根据不同请求场景使用不同的模块，这是 axios 不具备的。

### alova 为 axios 提供响应数据缓存

alova 分别提供了 3 种缓存模式来满足不同的缓存场景，分别为内存模式、缓存占位模式、恢复模式。它们是组件无关的，只要请求地址和参数相同都可以命中缓存，除非你关闭了它。响应数据缓存可以极大地提高请求流畅性，降低服务端压力。

### alova 为 axios 提供请求共享功能

请求共享在同时发送多个相同请求时，将会复用同一个请求，它也可以提升应用流畅性和降低服务端压力。

### alova 为 axios 提供数据预拉取

提前请求将要使用的数据，也可以极大提升应用流畅性。

### alova 可管理请求状态

你可以使用 alova 跨任意的组件层级来访问其他组件内的状态化数据，这可以让你减少跨组件通信的一些麻烦。

## 与 react-query、swr 对比

react-query 是一个强大的异步状态管理，swr 是一个用于数据请求的 React Hooks 库，它们的共同特性也是使用 use hook 来发送和管理请求，和数据缓存功能，对于它们，alova 有以下不同之处。

### alova 的目标不同

实际上，alova 的 use hook 也是参考了 react-query 和 swr 的设计，但是 alova 选择了请求策略库的方向，你可以在不同的请求场景下使用不同的请求策略模块，让你在编写更少量代码同时，也能实现更高效地 Client-Server 数据交互。

### Method 代理设计

react-query 和 swr 都是在 use hook 中直接使用`axios`或`fetch api`发送请求，而 alova 使用了 `Method` 代理的设计模式，这样设计具有以下 3 个好处：

1. 统一的使用体验，不会因平台或 UI 框架不同而存在不同的使用方式。
2. `axios`和`fetch api`等请求库以请求适配器的方式，与每个 api 解耦，这让 alova 提供了统一的开发体验和完美的代码迁移。
3. 每个`Method`实例都代表不同的 api，你可以将同一个 api 的请求参数与请求行为参数聚合到同一个`Method`实例中，而不会分散开，更适合管理大量的 api。
4. alova 通过对`Method`实例上的请求参数序列化，实现了自动化管理响应数据缓存，你不需要指定缓存 key，而 react-query 和 swr 都需要自定义设置`queryKey`来管理缓存。

### 高灵活性

alova 通过各种适配器、中间件实现了很高的灵活性，不仅可以运行在任何 js 环境，还可以支持用户自定义不同场景下的请求模块。

### 轻量化

alova 很轻量，体积只有 react-query 和 axios 的 30%+。与 swr 体积相似，但提供更丰富的功能。
