---
title: Request Scene Model (RSM)
---

## What is the request scene model

The Request Scenario Model views things from the client's perspective. It abstracts the client's journey from triggering a request to receiving the result, and consists of four stages: request timing, request behavior, request events, and response management. For example, when making a request you often need to consider questions like:

1. When the request is made;
2. Whether to display the request status;
3. Do you need to retry the request on failure;
4. How to process the response data;
5. Do you need to encrypt the request parameters;
6. Whether to cache the frequently used response data;
7. How to operate data across pages;
8. How to process requests in a weak or disconnected network environment;
9. ...

Libraries like `fetch` and `axios` focus mainly on how to talk to the server, yet we still have to handle all the above concerns ourselves. Features that improve an application's performance and stability often force developers to write hard-to-maintain code. The Request Scenario Model abstracts every step from preparing a request to processing its response, covering the entire client-server interaction lifecycle from the front end's point of view. `alova` is a library built around this model; it complements request libraries such as `axios` rather than replacing them.

> Client-Server interaction: data exchange between any type of client and the server.

## Request scene model

![RSM](/img/rsm-en.png)

## Request timing

Describes when a request should be made. Implemented with a `useHook` from `alova`.

- Initialize display data, such as when first entering a page or sub-view;
- User interaction triggers a client-server interaction that needs a new request, such as paging, filtering, sorting, or fuzzy search;
- Send requests in a debounced manner to avoid view flicker and reduce server load;
- Preload data, such as prefetching the next page's content or predicting a button click to fetch data early;
- Operate server data by sending create, read, update, or delete requests, such as submitting or deleting data;
- Sync server state, such as polling when data changes quickly, or re-fetching after modifying something;

## Request Behavior

Describes how a request is processed, implemented as a Method abstraction in `alova`.

- Placeholder requests: show a loading state, a skeleton, or the previously fetched real data while the request is in flight;
- Cache frequently used responses so repeated requests reuse fresh data;
- Run multiple requests sequentially or in parallel;
- Retry important requests to reduce failures caused by unstable networks;
- Silent submission: when you only care about sending data, respond to the success event immediately after submitting, while the request is guaranteed to succeed in the background;
- Offline submission: store submitted data locally while offline and send it once the connection is restored;

## Request event

Represents sending a request with its parameters and receiving a response. `alova` works with any request library or native solution such as `axios`, `fetch`, or `XMLHttpRequest`.

## Response management

`alova` turns response data into managed state, handling view updates and cache operations at the request level instead of the component level, which is cleaner and more consistent.

- Remove cached response data; it will be fetched from the server on the next request;
- Update cached response data from anywhere, which is especially useful for cross-page updates;
- Refresh response data from anywhere, also useful for cross-page updates;
- Customize caching: when fetching a batch, you can cache each item individually so later single-item requests hit the cache;
