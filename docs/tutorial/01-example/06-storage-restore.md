---
title: (vue)Response Caching - Restore Mode
sidebar_position: 60
---

import StorageRestore from '@site/example-links/StorageRestore';

> The example uses vue3 as an example, but you can also use alova in react and svelte. For details, please read the [Getting Started Guide](/tutorial/getting-started/overview);

<StorageRestore></StorageRestore>

:::info example description

The cache restore mode is to persist the response data. When the request hits the cache, the persistent cached data will be returned, and no more requests will be issued. It is generally used for some data that needs server management but does not change for a certain period of time. The following is an example of the restore mode of holiday information.

_Operation guide:_

1. Click `Reload page` to refresh the page, you will no longer see the Loading status, but will use the cached data and render it to the page immediately, and no longer send requests;
2. Click `Invalidate the data of placeholder` to invalidate the cached data, then you will see the Loading status again;

:::
