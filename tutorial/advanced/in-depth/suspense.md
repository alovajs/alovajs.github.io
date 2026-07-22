The Suspense component displays loading states for async components. When used with hooks like `useRequest` and `useWatcher`, it can show loading states during asynchronous operations.

**vue:**

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
  <Suspense>
    <profile></profile>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```


---

**react:**

Coming soon...
