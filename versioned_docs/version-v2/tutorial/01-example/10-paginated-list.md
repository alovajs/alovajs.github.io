---
title: Paginated list
---

import Pagination from '@site/example-links/Pagination';

> The example uses vue3 as an example, but you can also use alova in react and svelte. For details, please read the [Getting Started Guide](/v2/tutorial/getting-started);

<Pagination></Pagination>

:::info example description

Using pagination strategy, achieve a more high-performance and easy-to-use pagination function, automatic management of paging-related status, preloading of previous and previous pages, and automatic maintenance of data addition/editing/replacement/ Removed, and request-level stabilization.

_Operation guide:_

1. After the initialization is completed, the next page of data will be preloaded, and there is no need to wait when turning to the next page;
2. Adding, deleting, and modifying list items does not need to reset the list, it will be automatically processed into the same effect as the re-request;

[usePagination documentation](/v2/tutorial/strategy/usePagination)

:::
