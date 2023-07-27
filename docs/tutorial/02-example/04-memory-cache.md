---
title: Response Cache - Memory Mode
sidebar_position: 40
---

import MemoryCache from '@site/example-links/MemoryCache';

> The example uses vue3 as an example, but you can also use alova in react and svelte. For details, please read the [Getting Started Guide](../get-started/overview);

<MemoryCache></MemoryCache>

:::info example description

The memory cache mode stores the response data in memory, and the cache is invalid when the page is refreshed.

_Operation guide:_

1. Click on the following student list item, the requesting student details will be sent, and the modal box will display the Loading status;
2. Click the mask to close the pop-up box and reopen it. At this time, the cache will be hit and the student details will be displayed immediately, and the request record will no longer be printed in Request Records;

:::
