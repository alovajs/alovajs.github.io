---
title: Response Cache - Cache Placeholder Mode
---

import StoragePlaceholder from '@site/example-links/StoragePlaceholder';

> The example uses vue3 as an example, but you can also use alova in react and svelte. For details, please read the [Getting Started Guide](/v2/tutorial/getting-started);

<StoragePlaceholder></StoragePlaceholder>

:::info example description

The cache placeholder mode is to persist the response data. It will be updated to the data state as placeholder data immediately after refreshing the page. At the same time, a request is sent. Developers can use placeholder data to replace the Loading state before responding.

_Operation guide:_

1. Click `Reload page` to refresh the page, you no longer see the Loading status, but the old data is rendered and replaced with new data when the request is responded;
2. Click `Invalidate the data of placeholder` to invalidate the cached data, then you will see the Loading status again;

:::
