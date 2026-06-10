---
title: Suspense
---

The Suspense component displays loading states for async components. When used with hooks like `useRequest` and `useWatcher`, it can show loading states during asynchronous operations.

<Tabs items={["vue","react"]}>

<Tab value="vue">

```html title="Profile.vue"
<template>
  <div v-if="error">{{ error.message }}</div>
  <div v-else>{{ data }}</div>
</template>

<script setup>
  // `useRequest` with `await` keyword
  const { data, error } = await useRequest(alovaInstance.Get('/user/1'));
  if (error) {
    throw error; // Thrown errors can also be caught by parent components via onErrorCaptured
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

</Tab>
<Tab value="react">

Coming soon...

</Tab>
</Tabs>
