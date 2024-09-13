---
title: Silent submit - Simple List
---

import SimpleListSilentVue from '@site/example-links/SimpleListSilentVue';

> The example uses vue3 as an example, but you can also use alova in react and svelte, please read the [Getting Started Guide](/v2/tutorial/getting-started) for details;

<SimpleListSilentVue></SimpleListSilentVue>

:::info example description

A simple list implemented using the silent submission strategy, which responds immediately after submission, greatly reduces the impact of network fluctuations, allowing your application to remain very smooth even when the network is unstable or even disconnected.

_Operation guidance:_

1. Add, edit, and delete list items, it will generate feedback immediately without waiting for the server to respond;
2. Switch the request mode and network status to experience the difference between them;

[Silent submit strategy document](/v2/tutorial/strategy/seamless-data-interaction)

:::
