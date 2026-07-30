# axios 和 alova 一起用，谁管什么

**一句话：它们是分层关系，不是二选一。** axios 是 HTTP 客户端，负责把请求发出去；alova 是请求策略层，负责「怎么请求」——分页、缓存、重试、去重、token 刷新。alova 可以把 axios 用作请求适配器（`@alova/adapter-axios`），所以选 alova 从来不意味着扔掉 axios。

alova 的定位：一套请求 API，跑在 Web、App（uni-app/Taro/小程序）、服务端（BFF）。

## 分工表

| 关注点 | axios | alova |
| --- | --- | --- |
| 发送 HTTP 请求 | ✅ 本职 | 交给适配器（fetch / XHR / **axios** / uni-app / Taro） |
| 拦截器 | ✅ | ✅ `beforeRequest` / `responded`（你的 axios 拦截器继续生效） |
| loading / error / data 状态 | 手写 | ✅ `useRequest` 等自动管理 |
| 分页、表单、上传、SSE 流程 | 手写 | ✅ 20+ 现成策略 hooks |
| 响应缓存 | 手写 | ✅ 多级缓存（L1/L2）＋声明式失效 |
| 相同并发请求去重 | 手写 | ✅ 内置请求共享 |
| 跨端（uni-app / Taro / 小程序） | 社区封装 | ✅ 官方适配器，同一套 API |
| 服务端重试 / 限流 | 手写 | ✅ `alova/server` |

## axios 实打实更强的地方

诚实的对比要写两面：

- **生态与熟悉度。** axios 拥有 JavaScript 世界最大的社区之一，几乎每个边角问题都有现成答案，几乎每个开发者都用过它；alova 的社区规模远小于它。
- **团队零学习成本。** 所有人都会 `axios.get()`；alova 引入了 `Method` 抽象和策略 hooks，这是真实存在的（虽然不大的）心智负担。
- **请求本来就少的项目**，axios 单独用就够了。策略层只有在你反复手写同样的请求逻辑时才值回票价。

## 两个一起用长什么样

保留你现有的 axios 实例——包括拦截器和 `baseURL`——让 alova 来驱动它：

```javascript
import axios from 'axios';
import { createAlova } from 'alova';
import { axiosRequestAdapter } from '@alova/adapter-axios';
import VueHook from 'alova/vue';

// 你现有的 axios 实例，一行不改
const customAxios = axios.create({ baseURL: '/api', timeout: 10000 });

const alovaInst = createAlova({
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter({ axios: customAxios })
});
```

Vue 3 里一个普通请求的前后对比：

```javascript
// 只用 axios：手写三个状态
const loading = ref(false);
const data = ref({});
const error = ref(null);
const load = async () => {
  try {
    loading.value = true;
    data.value = await customAxios.get('/todos');
  } catch (e) {
    error.value = e;
  }
  loading.value = false;
};
onMounted(load);

// axios + alova：状态自动管理
const { loading, data, error } = useRequest(alovaInst.Get('/todos'));
```

你为 axios 做的配置全部继续有效：method 配置支持 axios 的全部请求选项；拦截器顺序也是确定的——alova 的 `beforeRequest` 先于 axios 请求拦截器触发，alova 的 `responded` 晚于 axios 响应拦截器触发。

## 什么情况下你不需要 alova

- 项目请求本来就少，没有反复出现的分页/缓存/重试样板——直接用 axios 就是正确选择。
- 纯 React、纯 Web、且已深度使用 React Query——除非你需要跨端或服务端策略，否则切换收益不大。
- 你想要零抽象的技术栈——alova 的 `Method` + hooks 模型是多一层概念，这个成本是真实的。

## 下一步

- [从 axios 迁移](/tutorial/project/migration/from-axios)——渐进式，一次迁一个接口；实例和拦截器原样保留。
- [axios 请求适配器](/resource/request-adapter/axios)——适配器完整选项。
- [与其他库对比](/about/comparison)——react-query / swr / alova 横向对照。
