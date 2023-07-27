---
title: Manage Cache with IndexedDB
sidebar_position: 110
---

import ControlledCacheByIndexedDB from '@site/example-links/ControlledCacheByIndexedDB';

> The example uses vue3 as an example, but you can also use alova in react and svelte, please read the [Getting Started Guide](../get-started/overview) for details;

<ControlledCacheByIndexedDB></ControlledCacheByIndexedDB>

:::info example description

Using controlled cache allows developers to customize and manage the cache. Under the large file cache, it can cooperate with IndexedDB to manage the local cache.

_Operation guidance:_

1. Select one of the pictures, the picture will request the network to load first, and the picture data will be saved in the local IndexedDB;
2. Refresh the page and select the same picture again, the picture will get data from IndexedDB instead of initiating a network request;

[Controlled cache document](../next-step/controlled-cache)

:::
