---
slug: /blog/uniapp-pagination
title: uni-app 分页列表：用一个 hook 解决竞态、重复请求和加载状态
authors:
  - name: Alova Team
tags: [uniapp, 分页, usePagination]
date: 2026-07-30
description: 手写 uni-app 分页加载常见的竞态、重复请求、边界判断问题，以及如何用 alova 的 usePagination 一次解决。含完整可运行代码与在线示例。
keywords: [uniapp request pagination, uniapp 分页加载, uni-app 下拉加载, uni-app 上拉加载更多, 小程序分页请求, usePagination]
---

# uni-app 分页列表：用一个 hook 解决竞态、重复请求和加载状态

你大概也在 uni-app 项目里写过这样的分页加载——`onReachBottom` 里加一页、发请求、拼数组：

```html
<script setup>
import { ref } from 'vue';
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app';

const list = ref([]);
const page = ref(1);
const loading = ref(false);

const loadList = async () => {
  loading.value = true;
  const res = await new Promise(resolve => {
    uni.request({
      url: `https://api.example.com/goods?page=${page.value}&pageSize=10`,
      success: resolve
    });
  });
  list.value = [...list.value, ...res.data.list];
  loading.value = false;
};

onReachBottom(() => {
  page.value++;
  loadList();
});

onPullDownRefresh(async () => {
  page.value = 1;
  list.value = [];
  await loadList();
  uni.stopPullDownRefresh();
});

loadList();
</script>
```

这段代码能跑，但里面至少埋了 3 个问题，你可能已经在线上遇到过其中一两个：

1. **竞态**：用户快速滚动触发两次 `onReachBottom`，第 2 页和第 3 页的请求同时在飞。谁先回来谁先拼进数组——弱网下第 3 页完全可能先到，列表顺序就乱了。
2. **重复请求**：`onReachBottom` 在部分平台会连续触发多次，没有防重，同一页数据会被请求并拼接两遍。
3. **边界缺失**：没有"是不是最后一页"的判断，滚到底还在发空请求；下拉刷新和加载更多共用一个 `loading`，刷新时列表先被清空再慢慢回填，页面会闪。

要把这三个坑都补上，还得加：请求去重的标记位、按页码丢弃过期响应、`isLastPage` 计算、刷新与追加两套状态……手写下来通常是几十行和列表业务无关的样板代码，而且每个列表页都要再来一遍。

## 理想的分页方案需要什么

先不谈任何库，一个"不出事"的分页实现至少要内建这些能力：

- **请求级去重**：同参数请求在飞时不重发；
- **响应按页归位**：晚到的旧页响应不能覆盖新页；
- **追加/刷新两种模式**：加载更多是追加，下拉刷新是重置；
- **边界状态**：`isLastPage`、`total`、加载中/预加载中要能直接拿到；
- **跨端可用**：同一套代码要能跑在小程序、H5、App。

最后一点是 uni-app 场景的特殊约束——React Query、SWR 这类方案默认面向浏览器 `fetch`，在小程序环境（`uni.request`）里没有官方适配。这也是很多 uni-app 项目最终还是回到手写的原因。

## 用 usePagination 实现

[alova](https://alova.js.org) 是一个请求策略库：一套请求 API，跑在 Web、App（uni-app/Taro）、服务端（BFF）。它通过 `@alova/adapter-uniapp` 适配器直接使用 `uni.request` 发请求，上层的 `usePagination` 策略 hook 把上面那份需求清单全部内建了。

安装（注意：uni-app 适配器目前仅支持 Vue 3 版本的 uni-app）：

```bash
npm install alova @alova/adapter-uniapp @alova/shared --save
```

创建 alova 实例，适配器一次性提供请求适配、存储适配和 VueHook：

```js
// api/index.js
import { createAlova } from 'alova';
import AdapterUniapp from '@alova/adapter-uniapp';

export const alovaInst = createAlova({
  baseURL: 'https://api.example.com',
  ...AdapterUniapp(),
  responded(response) {
    const { statusCode, data } = response;
    if (statusCode >= 400) {
      throw new Error('request error');
    }
    return data || null;
  }
});
```

列表页完整实现——之前手写的页码管理、竞态防护、边界判断、双 loading，现在都由 hook 返回：

```html
<template>
  <view v-for="item in data" :key="item.id" class="goods-item">
    {{ item.name }}
  </view>
  <view v-if="loading">加载中...</view>
  <view v-if="isLastPage">没有更多了</view>
</template>

<script setup>
import { usePagination } from 'alova/client';
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app';
import { alovaInst } from '@/api';

const queryGoods = (page, pageSize) =>
  alovaInst.Get('/goods', {
    params: { page, pageSize }
  });

const { loading, data, page, isLastPage, total, reload } = usePagination(
  (page, pageSize) => queryGoods(page, pageSize),
  {
    append: true,        // 追加模式：下一页数据自动拼到列表底部
    initialPageSize: 10,
    data: response => response.list,
    total: response => response.total
  }
);

// 加载更多：只改页码，去重、竞态、末页判断都在 hook 内部处理
onReachBottom(() => {
  if (!isLastPage.value) {
    page.value++;
  }
});

// 下拉刷新：reload 重置到第一页
onPullDownRefresh(async () => {
  await reload();
  uni.stopPullDownRefresh();
});
</script>
```

对比一下：业务代码只剩"页码 +1"和"reload"两个动作，之前那 3 个坑对应的防护逻辑（请求共享去重、响应归位、`isLastPage`）都不需要你自己维护。`usePagination` 还默认开启相邻页预加载，翻页时下一页往往已经在缓存里。

同一份代码编译到微信小程序、H5、App 均可运行——发请求的始终是 `uni.request`，alova 只负责"怎么请求"这一层。如果你的项目已经在用 axios（H5 端），它同样可以通过 `@alova/adapter-axios` 作为 alova 的请求适配器继续工作，拦截器逻辑不用动。

在线示例（含分页、下拉加载等 24+ 个可运行例子）：[alova.js.org/examples](https://alova.js.org/examples/)

## 什么情况下你不需要它

诚实地说，以下场景手写就够了，引入任何请求库都是多余：

- **列表只有一页、或数据量固定**：一个 `uni.request` 加一个 `ref` 就是最优解。
- **项目只跑 H5 且已深度使用 React Query/SWR**：它们在纯浏览器环境很成熟，没必要为单端项目换方案。
- **uni-app Vue 2 项目**：`@alova/adapter-uniapp` 仅支持 Vue 3，Vue 2 项目请评估后再引入。
- **团队已有稳定的分页封装且经过线上验证**：能跑的老代码比新依赖更可靠，等重构窗口再说。

反过来，如果你的项目里有多个分页/下拉加载列表、踩过竞态或重复请求的线上问题、或者要同时维护小程序 + H5 + App 三端，`usePagination` 值得试一次：

```bash
npm i alova
```
