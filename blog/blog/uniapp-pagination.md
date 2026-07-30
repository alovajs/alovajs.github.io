# uni-app pagination with one hook: race conditions, duplicate requests, loading state

You've probably written pagination like this in a uni-app project — bump the page inside `onReachBottom`, fire a request, concatenate the array:

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

It runs, but it hides at least three problems you've probably hit in production:

1. **Race conditions**: a user scrolls fast and triggers `onReachBottom` twice — pages 2 and 3 are both in flight. Whichever returns first gets concatenated first; on a weak network page 3 can easily arrive first, scrambling the list order.
2. **Duplicate requests**: on some platforms `onReachBottom` fires several times in a row with no dedupe, so the same page is requested and appended twice.
3. **Missing edge cases**: there's no "is this the last page" check, so it keeps firing empty requests at the bottom; pull-to-refresh and load-more share one `loading` flag, so the list flashes empty then slowly refills on refresh.

Fixing all three means adding: a dedupe flag, dropping stale responses by page number, an `isLastPage` calculation, and two separate states for refresh vs. append... Hand-written, that's usually dozens of lines of boilerplate unrelated to your list, and you repeat it on every list page.

## What an ideal pagination solution needs

Forget any library for a moment. A "safe" pagination implementation needs at least:

- **Request-level dedupe**: don't resend an in-flight request with the same params;
- **Responses land by page**: a late response for an older page must not overwrite a newer one;
- **Append / refresh modes**: load-more appends, pull-to-refresh resets;
- **Edge state**: `isLastPage`, `total`, loading / preloading should be directly available;
- **Cross-platform**: the same code must run in mini-programs, H5, and App.

The last point is the special constraint of uni-app — React Query and SWR target the browser's `fetch` by default and have no official adapter for the mini-program environment (`uni.request`). That's also why many uni-app projects end up back at hand-written pagination.

## Using usePagination

[alova](https://alova.js.org) is a request strategy library: one set of request APIs that runs on the web, in apps (uni-app / Taro / mini-programs), and on the server (BFF). Through the `@alova/adapter-uniapp` adapter it uses `uni.request` directly, and the `usePagination` strategy hook builds in the whole checklist above.

Install (note: the uni-app adapter currently supports Vue 3 uni-app only):

```bash
npm install alova @alova/adapter-uniapp @alova/shared --save
```

Create the alova instance; the adapter provides request adapting, storage adapting, and VueHook in one call:

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

The full list page — the page management, race protection, edge checks, and dual loading you wrote by hand are now all returned by the hook:

```html
<template>
  <view v-for="item in data" :key="item.id" class="goods-item">
    {{ item.name }}
  </view>
  <view v-if="loading">Loading...</view>
  <view v-if="isLastPage">No more</view>
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
    append: true,        // append mode: next page auto-concatenated to the bottom
    initialPageSize: 10,
    data: response => response.list,
    total: response => response.total
  }
);

// load more: just bump the page; dedupe, race handling, last-page check are inside the hook
onReachBottom(() => {
  if (!isLastPage.value) {
    page.value++;
  }
});

// pull to refresh: reload resets to page one
onPullDownRefresh(async () => {
  await reload();
  uni.stopPullDownRefresh();
});
</script>
```

Compare: your business code is down to two actions — "page + 1" and "reload". The protection logic behind those three pitfalls (shared-request dedupe, response placement, `isLastPage`) needs no maintenance from you. `usePagination` also preloads the next page by default, so the next page is often already cached when you scroll.

The same code compiles and runs on WeChat mini-program, H5, and App — `uni.request` is always the one sending requests, and alova only handles the "how". If your project already uses axios (H5 side), it can keep working as alova's request adapter through `@alova/adapter-axios`; your interceptors stay untouched.

Live examples (pagination, load-more, and 24+ runnable demos): [alova.js.org/examples](https://alova.js.org/examples/)

## When you don't need it

Honestly, in these cases hand-writing is enough and adding any request library is overhead:

- **A single-page list, or fixed-size data**: one `uni.request` plus one `ref` is the optimal solution.
- **H5-only project already deep into React Query / SWR**: they're mature in pure browser environments; no reason to switch for a single-platform project.
- **uni-app Vue 2 project**: `@alova/adapter-uniapp` supports Vue 3 only; evaluate before adopting on Vue 2.
- **A stable, battle-tested pagination wrapper already in place**: working old code beats a new dependency; wait for a refactor window.

On the flip side, if your project has multiple paginated / load-more lists, has hit race-condition or duplicate-request issues in production, or maintains mini-program + H5 + App at once, `usePagination` is worth one try:

```bash
npm i alova
```
