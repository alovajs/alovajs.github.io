---
slug: /compare/react-query
title: "react-query or alova: does the request leave the browser?"
authors:
  - name: Alova Team
tags: [react-query, comparison, alova]
date: 2026-08-03
description: A straight comparison of react-query and alova, including where alova is the weaker pick. react-query owns the React browser cache; alova runs the same request logic on mobile and on a Node BFF.
keywords: [react-query vs alova, alova react-query comparison, alova server side, react-query limitations]
---

# react-query or alova: does the request leave the browser?

Choosing a data-fetching library usually starts with "which cache is better". That question skips the part that actually bites later: where do your requests run?

If every call lives in the browser and you're on React, react-query is a mature, well-trodden pick. But the moment you need the same request logic on a phone that isn't React Native, or inside a BFF that calls downstream services, the map changes. alova puts those cases on the same API. This post is a straight comparison, including where alova is the weaker choice.

## Where react-query is clearly ahead

Be honest first:

- **React fit.** react-query is built around React's render model. Hooks like `useQuery` slot into components naturally, and its devtools and query window are the most polished in the space.
- **Caching maturity.** Its cache, dedup, background refetch, and stale-while-revalidate behavior are battle-tested across a huge number of production apps.
- **Community and answers.** Years of Stack Overflow threads, blog posts, and copied snippets mean most problems already have a solution online.

If your app is React, in the browser, and you're happy with that world, react-query is the safer default. Saying otherwise would be dishonest.

## Where alova goes further

alova is a request strategy layer too, but it isn't tied to one framework or one runtime:

- **One API across runtimes.** The same `useRequest` and `usePagination` calls run on the web, in mobile apps (React Native / Expo), and on the server (Node BFF). You write the request logic once.
- **Server-side hooks.** `alova/server` adds `retry` and `createRateLimiter` for your BFF's outbound calls, the layer react-query doesn't touch because it lives in the browser.
- **Framework choice.** React, Vue, Svelte, and Solid all get first-class hooks, so a mixed-stack team isn't forced into React.
- **Sits on your existing adapter.** alova doesn't send requests itself. It runs on top of a fetch or axios adapter, so axios stays in the picture if you already use it.

## Side by side

| Concern | react-query | alova |
| --- | --- | --- |
| Primary runtime | Browser (React) | Web, mobile, server (BFF) |
| Framework | React-first | React / Vue / Svelte / Solid |
| Client cache | Excellent, mature | Good, strategy hooks |
| Server-side retry / rate limit | Not its job | `alova/server` hooks |
| Cross-platform apps | React Native only | React Native, Expo, and more |
| Sends HTTP itself | No (fetch/axios under) | No (fetch/axios adapter) |
| Community size | Very large | Smaller |

On the last row: neither library replaces axios. Both sit above a request adapter, so if your team already depends on axios, it keeps doing the sending.

## When react-query is the better call

- Your frontend is React and browser-only, and you want the deepest React caching ecosystem available.
- You don't run a BFF that needs outbound retry/rate-limit logic.
- Your team already knows react-query and ships fast with it.

## When alova fits better

- You maintain the same request logic across web, a non-React-Native app, and a Node BFF.
- Your BFF needs retry with backoff and a client-side rate limit for downstream calls (see the [BFF retry post](/blog/bff-retry)).
- You're on Vue, Svelte, or Solid, or a mixed stack, and want one strategy layer.

- [alova vs other libraries](https://alova.js.org/about/comparison)
- [Server retry strategy](https://alova.js.org/tutorial/server/strategy/retry)
