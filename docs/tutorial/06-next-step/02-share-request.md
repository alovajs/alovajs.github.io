---
title: Share Request
sidebar_position: 20
---

We always encounter this situation. When a request is sent but has not been responded to, the same request is initiated again, resulting in waste of requests, or repeated submission of problems, such as the following three scenarios:

1. A component will obtain initialization data when it is created. When a page renders multiple components at the same time, it will send multiple identical requests at the same time;
2. The submit button is not disabled, and the user clicks the submit button multiple times;
3. When the preloading page is entered before the preloading is completed, the same request will be initiated multiple times;
4. Prevent dumplicate requesting in StrictMode of react;

**Share Requests are here to solve those problems! **It can not only improve application fluency, but also reduce server pressure.

## Globally close sharing requests

In most cases, you should need shared requests, so it is enabled by default, but if you encounter a special situation and want to disable it globally, you can do this:

```javascript
const alovaInst = createAlova({
  //...
  // highlight-start
  shareRequest: false
  // highlight-end
});
```

## Partially close the sharing request

If you wish to turn off shared requests on specific requests, you can do this:

```javascript
alovaInst.Get('/todo', {
  //...
  // highlight-start
  // Only close share requests for this request
  shareRequest: false
  // highlight-end
});
```

:::warning Notes

It should be noted again that alova is uniquely identified through the combination of the method instance’s request method, request url, request header parameters, url parameters, and request body. That is to say, it is the same request, rather than comparing the reference address of the method instance.

:::
