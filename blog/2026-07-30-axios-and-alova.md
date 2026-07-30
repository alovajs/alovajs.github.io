---
slug: /compare/axios
title: axios and alova, who handles what
authors:
  - name: Alova Team
tags: [axios, comparison]
date: 2026-07-30
description: axios and alova are not competitors. axios sends requests; alova decides how requests run — pagination, caching, retry — and can use axios as its adapter.
---

# axios and alova: who handles what

**Short answer: they are layers, not rivals.** axios is an HTTP client — it sends requests. alova is a request strategy layer — it decides *how* requests run: pagination, caching, retry, deduplication, token refresh. alova can use axios as its request adapter (`@alova/adapter-axios`), so choosing alova never means throwing axios away.

alova in one line: one set of request APIs that runs on the web, in apps (uni-app / Taro / mini-programs), and on the server (BFF).

## Division of work

| Concern | axios | alova |
| --- | --- | --- |
| Sending HTTP requests | ✅ its job | Delegates to an adapter (fetch / XHR / **axios** / uni-app / Taro) |
| Interceptors | ✅ | ✅ `beforeRequest` / `responded` (your axios interceptors keep working) |
| Loading / error / data states | Hand-written | ✅ auto-managed by `useRequest` and friends |
| Pagination, form, upload, SSE flows | Hand-written | ✅ 20+ ready-made strategy hooks |
| Response caching | Hand-written | ✅ multi-level cache (L1/L2) with declarative invalidation |
| Deduplicating identical concurrent requests | Hand-written | ✅ built-in request sharing |
| Cross-platform (uni-app / Taro / mini-programs) | Community wrappers | ✅ official adapters, same API everywhere |
| Server-side retry / rate limiting | Hand-written | ✅ `alova/server` hooks |

## Where axios is genuinely stronger

An honest comparison cuts both ways:

- **Ecosystem and familiarity.** axios has one of the largest communities in the JavaScript world. Nearly every edge case has a Stack Overflow answer; nearly every developer has used it. alova's community is far smaller.
- **Zero learning curve for your team.** Everyone already knows `axios.get()`. alova introduces a `Method` abstraction and strategy hooks — a real (if small) mental shift.
- **If you only send a handful of requests**, axios alone is simply enough. A strategy layer earns its keep only when you keep rewriting the same request logic.

## What using both looks like

Keep your axios instance — including its interceptors and `baseURL` — and let alova drive it:

```javascript
import axios from 'axios';
import { createAlova } from 'alova';
import { axiosRequestAdapter } from '@alova/adapter-axios';
import VueHook from 'alova/vue';

// your existing axios instance, untouched
const customAxios = axios.create({ baseURL: '/api', timeout: 10000 });

const alovaInst = createAlova({
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter({ axios: customAxios })
});
```

Before / after for a plain request in Vue 3:

```javascript
// axios only: hand-written states
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

// axios + alova: states managed for you
const { loading, data, error } = useRequest(alovaInst.Get('/todos'));
```

Everything you configured for axios still applies: method config accepts all axios request options, and interceptor order is predictable — alova's `beforeRequest` fires before axios request interceptors, and alova's `responded` fires after axios response interceptors.

## When you don't need alova

- Your project fires only a few requests with no repeated pagination/caching/retry patterns — plain axios is the right call.
- You are React-only, web-only, and already invested in React Query — switching buys you little unless you need cross-platform or server-side strategies.
- You want a zero-abstraction stack — alova's `Method` + hooks model is one more concept, and that cost is real.

## Next steps

- [Migrate from axios](/tutorial/project/migration/from-axios) — gradual, one endpoint at a time; your instance and interceptors stay.
- [axios request adapter](/resource/request-adapter/axios) — full adapter options.
- [Compare with other libraries](/about/comparison) — react-query / swr / alova side by side.
