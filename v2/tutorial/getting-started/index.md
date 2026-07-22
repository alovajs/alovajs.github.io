alova is a lightweight request strategy library. It provides a complete set of solutions to deal with complex request scenarios. We call it **Request Strategy**. It only takes one line of code to quickly implement various complex request logics. This can not only help you improve development efficiency, but also improve the App's runtime efficiency and reduce server pressure.

Here is the simplest request example:

```javascript
const response = await alova.Get('/api/user');
```

Ordinary? Let's look at another example of automatically managing request status. **loading, error, and data are reactive data**. In UI frameworks such as react, vue, and svelte, they can be bound directly to the view and are automatically maintained as reactive data according to the request status.

```javascript
const { loading, error, data } = useRequest(alova.Get('/api/user'));
```

The following is an example of a paging request strategy that automatically triggers requests with different parameters when page, pageSize, etc. change.

```javascript
const { loading, error, data, page, pageSize, total } = usePagination((page, size) =>
  alova.Get('/api/user/list', {
    params: { page, size }
  })
);
```

alova provides 10+ request strategy modules based on the [RSM](/v2/tutorial/others/RSM) specification, which are implemented in the form of useHook.

## Core useHook





## Scenario-based request strategy














## High flexibility

Thanks to the high flexibility of alova, you can use it with different request libraries in the following different JS environments (the gray part will be gradually supported in the future).



## Is there any difference?

Unlike other request libraries, alova's goal is to make requests simpler and maintain more efficient data interaction.

We consider both developers and App users. For developers, alova provides them with a simple request API and an out-of-the-box high-performance request strategy module. For application users, they can enjoy the smooth experience brought by alova's high-performance data interaction.

In addition, let’s take a look at the specific features:

- API design similar to axios, allowing users to learn at a lower cost;
- 10+ out-of-the-box high-performance request strategies to make applications smoother;
- alova is lightweight, only 4kb+, which is 30%+ of axios;
- High flexibility, alova's adapter allows alova to be used in any js environment and with any UI framework (the built-in supported UI framework is `vue/react/svelte`), and provides a unified experience and perfect code migration;
- 3 caching modes and request sharing mechanism to improve request performance and reduce server pressure;
- Highly aggregated organization of API code. The request parameters, cache behavior, response data conversion, etc. of each API will be gathered in the same code block, which has great advantages for managing a large number of APIs;

:::info compared to other request libraries

You can also check out [Comparison with other request libraries](/v2/tutorial/others/comparison) to learn more about how alova is different.

:::

## Online trial

You can run the project directly in the browser via Codesandbox [online editable examples try alovajs](/v2/category/examples), so it's almost indistinguishable from local development without having to install anything on your machine.

## Join alova community





,
title: 'Discord',
desc: 'The community\'s GPT robot will answer your questions',
link: 'https://discord.gg/S47QGJgkVb',
target: '__blank'
},
{
Image: ,
title: 'WeChat',
desc: 'Communicate in group chat and get responses faster',
link: wechatQrcode,
target: '__blank'
},
{
Image: ,
title: 'X',
desc: 'Follow us and continue to receive the latest news',
link: 'https://x.com/alovajs',
target: '__blank'
}
]}></NavCard>

## Welcome to contribute

Before contributing, please be sure to read the [Contribution Guide](/contributing/overview) in detail to ensure your effective contribution.

## Start

Next, we will start with the simplest request, then explain the request strategy, understand how alova simplifies your work, and then go into the advanced guide and the best practices summarized in actual projects.

Let’s start learning to send our first request!


