---
title: Compare with other libraries
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

## The difference between react-query / swr and alova

Before comparing, let's clarify a commonly confused point: **react-query, swr, and alova are not on the same conceptual level.** Let's start with the problems each one solves.

### What problems each one solves

react-query and swr are mature **asynchronous state management / data fetching libraries**. They focus on "how to sync server data into the client UI" — you provide a function that fetches data, and they handle caching, revalidation, and background refresh so your components always have the latest server state.

alova is a **request strategy library**. It treats a single request as a **scenario with a complete lifecycle** — the [Request Scenario Model (RSM)](/about/RSM) — rather than a one-off call. A request is broken into four stages, each answering a question:

- **Request triggering**: Under what conditions does a data interaction need arise? Initialization, state changes, debouncing, polling, failed retries...
- **Request decision-making**: Does this need actually require sending a request? Cache hits, reusing in-flight requests, suspension, discarding stale responses...
- **Request execution**: How to communicate and get a response? Hand off to axios / fetch / XHR, **usually just one line of code**.
- **Data application**: How does data enter the business, state, and view? Transformation, cross-component synchronization, cache deposition...

The request code you spend the most time writing day-to-day is often **not in "request execution"** (which is usually just one line), but in the triggering, decision-making, and application logic scattered across components. react-query / swr handle "caching + state synchronization" well, but scenario logic like pagination, forms, uploads, and authentication still has to be hand-written over and over. alova's approach is to organize these recurring patterns into reusable **request strategies**, turning them from boilerplate into a few configuration options.

### Different concepts

| Dimension                           | react-query / swr                            | alova                                              |
| ----------------------------------- | -------------------------------------------- | -------------------------------------------------- |
| Core positioning                    | Server-state management / data fetching      | Request strategy / full-lifecycle request management |
| Focus                               | Caching and synchronization of data          | The complete scenario of trigger → decision → execution → application |
| Typical usage                       | `useQuery(() => fetch(...))`                 | `usePagination(() => alova.Get(...), {...})`       |
| Pagination / forms / uploads        | Implement or combine manually                | Built in as request strategies                     |
| Authentication, retries, prefetching, silent submission | Partially require manual combination | Built in as request strategies                     |
| Which layer it sits on              | Wraps your request function                  | Built on top of axios / fetch, taking over request logic |

> **react-query / swr answer "how to cache data and keep it up to date", while alova answers "from the moment a request arises until it lands in the view, how should each step in between be handled".** The two address different problems, so "who has more features" is not a fair way to compare them.

### How to choose

- If your main need is to **cache server data and automatically keep it in sync**, react-query or swr are mature and lightweight choices, with ecosystems validated by many projects.
- If your application is full of scenarios like **pagination, forms, uploads, authentication, prefetching, and silent submission**, and you want to turn this repetitive logic from boilerplate into configuration, alova can significantly reduce the request-layer code you need to maintain.

Worth mentioning: alova does not require you to abandon your existing request approach. It runs directly on top of your existing axios / fetch, continues to hand off "request execution" to them, and only takes over the parts of request logic (triggering, decision-making, application) that react-query / swr typically don't cover. In other words, it is not a replacement for react-query / swr, but solves "how requests should be written" from a different angle.

## Compare with traditional request tools such as axios/fetch/XMLHttpRequest

Traditional request tools such as `axios`, `fetch`, and `XMLHttpRequest`, and the next-generation tool alova solve different problems. The former focus on sending requests and receiving responses, while alova improves how efficiently you consume APIs. They complement each other, and combining alova with a traditional tool gives you more powerful request capabilities. Let's use axios as an example.

### alova provides automated request status management for axios

When using axios alone, you usually maintain request-related state yourself. With alova's hooks, you get automated request state management.

<Tabs>
<TabItem value="1" label="axios only">

```javascript
// vue3 example
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
// Use axios as alova's request adapter
const { loading, data, error } = useRequest(alova.Get('/xxx'));
```

</TabItem>
</Tabs>

### alova provides high-performance request strategies out of the box

alova provides you with [multiple high-performance request strategy modules](/tutorial/client/strategy). You can use different modules according to different request scenarios, which axios does not have.

### alova provides response data cache for axios

alova provides three caching modes for different scenarios: memory mode, cache-occupying mode, and recovery mode. They are component-independent and hit the cache whenever the request URL and parameters match, unless you disable them. Response caching greatly improves responsiveness and reduces server load.

### alova provides request sharing function for axios

Request sharing reuses the same request when several identical requests are sent at once. It improves responsiveness and reduces server load.

### alova provides data pre-fetching for axios

Fetching data ahead of time also greatly improves responsiveness.

### alova can manage request states

You can use alova at any component level to access stateful data from other components, reducing some cross-component communication headaches.
