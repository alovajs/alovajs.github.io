---
title: Suspense
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Suspense组件可以展示异步组件的加载状态，它和`useRequest`、`useWatcher`等hooks配合使用，可以展示异步组件的加载状态。

<Tabs>
<TabItem value="1" label="vue">

```html title="Profile.vue"
<template>
  <div v-if="error">{{ error.message }}</div>
  <div v-else>{{ data }}</div>
</template>

<script setup>
  // `useRequest`使用`await`关键词
  const { data, error } = await useRequest(alovaInstance.Get('/user/1'));
  if (error) {
    throw error; // 抛出错误也可以在上层组件通过onErrorCaptured捕获
  }
</script>
```

```html title="App.vue"
<template>
  <suspense>
    <profile></profile>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
</template>
```

</TabItem>
<TabItem value="2" label="react">

敬请期待...

</TabItem>
</Tabs>
