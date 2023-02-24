---
title: RSM
sidebar_position: 30
---

## What is request scene model

We always have to think about the following questions when making a request,

1. When is the request made;
2. Whether to display the request status;
3. Whether to encapsulate it into a request function for repeated calls;
4. How to process the response data;
5. Whether to cache frequently used response data;
6. How to operate data across pages;
7. Can I still submit data when I am offline?
8. ...

`fetch` or `axios` tend to focus more on how to interact with the server, but we always need to deal with the above problems by ourselves. These functions that are beneficial to application performance and stability will always allow programmers to write low-maintenance functions. sexual code. The request scene management is to abstract all the links from the preparation of the request to the completion of the response data processing, so as to cover the model of the entire CS interaction life cycle from the perspective of the front end. `alova` is a library based on the request scene model. It is a supplement to the request library such as `axios`, not a replacement.

> CS interaction: refers to all client types and server-side data interaction

## Request scene model

![model](https://user-images.githubusercontent.com/29848971/185773573-761b6153-9e6c-42df-b0b7-beddd405833c.png)

## Request timing

Describes when a request needs to be made, implemented as `useHook` in `alova`.

- Initialize display data, such as just entering an interface or sub-interface;
- Human-computer interaction triggers CS interaction, which requires changing data to re-issue requests, such as page turning, filtering, sorting, fuzzy search, etc.;
- Pre-loading data, such as pre-loading the content of the next page in a pagination, predicting that the user clicks a button to pre-fetch data;
- To operate server-side data, it is necessary to issue a request for addition, deletion and modification, such as submitting data, deleting data, etc.;
- Synchronize the status of the server, such as polling requests in scenarios where data changes rapidly, and re-pulling data after operating a certain data;

## Request behavior

Describes how to handle the request, implemented as a method object in `alova`.

- Placeholder request, displaying loading, skeleton diagram, or the last real data used when requesting;
- Cache high-frequency responses, and execute requests multiple times will use fresh data;
- Multi-request serial and parallel;
- Anti-shake for frequent requests, avoid front-end data flashing, and reduce server pressure;
- Important interface retry mechanism to reduce the probability of request failure caused by network instability;
- Silent submission, when you only care about submitting data, directly respond to the success event after submitting the request, and the background ensures that the request is successful;
- Offline submission, temporarily store the submitted data locally when offline, and submit it after network connection;

## Request event

Indicates that the request is sent with the request parameters, and the response is obtained. `alova` can cooperate with any request library or native solution such as `axios`, `fetch`, `XMLHttpRequest`.

## Response data management

`alova` will state the response data and manage it in a unified manner. The response data can be operated anywhere, and the corresponding views can be automatically updated by using the characteristics of the MVVM library.

- Remove the cached response data and pull it from the server when the request is made again;
- Update cache response data, which can update response data at any location, which is very beneficial to update data across pages;
- Refresh the response data, which can re-refresh the response data at any location, and is also very beneficial to update data across pages;
- Custom setting cache, when requesting batch data, you can manually set the cache for batch data one by one, so as to satisfy the cache hit of subsequent single data;
