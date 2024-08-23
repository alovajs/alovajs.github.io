---
title: What is alova
---

import Link from '@docusaurus/Link';
import NavCard from '@site/src/components/NavCard';
import SupportList from '@site/src/components/SupportList';

alova is a lightweight request strategy library. It provides a complete set of solutions to deal with complex request scenarios. We call it **Request Strategy**. It only takes one line of code to quickly implement various complex request logics. , not only can help you improve development efficiency, but also help you improve the operating efficiency of the App and reduce the pressure on the server.

Here is the simplest request example:

```javascript
const response = await alova.Get('/api/user');
```

Ordinary? Let's look at another example of automatically managing request status. **loading, error, and data are responsive data**. In UI frameworks such as react, vue, svelte, etc., they can be bound directly in the view and will be processed according to the request. State automatically maintains this responsive data.

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

<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/combine-framework/use-request">useRequest</Link>
<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/combine-framework/use-watcher">useWatcher</Link>
<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/advanced/use-fetcher">useFetcher</Link>

## Scenario-based request strategy

<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/strategy/usePagination">usePagination</Link>
<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/strategy/sensorless-data-interaction">useSQRequest</Link>
<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/strategy/useForm">useForm</Link>
<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/strategy/tokenAuthentication">TokenAuthentication</Link>
<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/strategy/useAutoRequest">useAutoRequest</Link>
<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/strategy/useCaptcha">useCaptcha</Link>
<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/strategy/actionDelegationMiddleware">actionDelegationMiddleware</Link>
<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/strategy/useSerialRequest">useSerialRequest</Link>
<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/strategy/useSerialWatcher">useSerialWatcher</Link>
<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/strategy/useRetriableRequest">useRetriableRequest</Link>
<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/strategy/useUploader">useUploader</Link>
<Link className="button button--secondary margin-bottom--xs" to="/v2/tutorial/strategy/useSSE">useSSE</Link>

## High flexibility

Thanks to the high flexibility of alova, you can use it with different request libraries in the following different JS environments (the gray part will be gradually supported in the future).

<SupportList showStatus></SupportList>

## Is there any difference?

Unlike other request libraries, alova's goal is to make requests simpler and maintain more efficient data interaction.

We consider both developers and App users. For developers, alova provides them with a simple request API and an out-of-the-box high-performance request strategy module. For application users, they can enjoy Alova's high-performance data interaction brings a smooth experience.

In addition, let’s take a look at the specific features:

- API design similar to axios, allowing users to learn at a lower cost;
- 10+ out-of-the-box high-performance request strategies to make applications smoother;
- alova is lightweight, only 4kb+, which is 30%+ of axios;
- High flexibility, alova's adapter allows alova to be used in any js environment and with any UI framework (the built-in supported UI framework is `vue/react/svelte`), and provides a unified experience and perfect code migrate;
- 3 caching modes and request sharing mechanism to improve request performance and reduce server pressure;
- Highly aggregated organization of API code. The request parameters, cache behavior, response data conversion, etc. of each API will be gathered in the same code block, which has great advantages for managing a large number of APIs;

:::info compared to other request libraries

You can also check out [Comparison with other request libraries](/v2/tutorial/others/comparison) to learn more about how alova is different.

:::

## Online trial

You can run the project directly in the browser via Codesandbox [online editable examples try alovajs](/v2/category/examples), so it's almost indistinguishable from local development without having to install anything on your machine.

## Join alova community

import ImgDiscord from '@site/static/img/discord.svg';
import ImgX from '@site/static/img/x.svg';
import ImgWechat from '@site/static/img/wechat.svg';
import wechatQrcode from '@site/static/img/wechat_qrcode.jpg';

<NavCard list={[
{
Image: <ImgDiscord />,
title: 'Discord',
desc: 'The community\'s GPT robot will answer your questions',
link: 'https://discord.gg/S47QGJgkVb',
target: '__blank'
},
{
Image: <ImgWechat />,
title: 'WeChat',
desc: 'Communicate in group chat and get responses faster',
link: wechatQrcode,
target: '__blank'
},
{
Image: <ImgX />,
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

<NavCard list={[
{
title: 'First request',
desc: 'Try to use alova to send the first request',
link: '/v2/tutorial/getting-started/quick-start',
}
]}></NavCard>
