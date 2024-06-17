---
title: What is alova
---

import Link from '@docusaurus/Link';
import NavCard from '@site/src/components/NavCard';
import SupportList from '@site/src/components/SupportList';

Alova is an creative next-generation request tool that takes front-end and back-end collaboration and API consumption as its starting point, simplifies API consumption from 7 steps to only 1, saving you most of the work in requesting and making network requests very simple. Let's see how Alova can help you simplify your work.

![](/img/overview_flow_en.png)

It can simplify API consumption from 7 steps to 1 step. You only need to choose the API to use.

## How to do it?

### Request strategy

In actual projects, front-end requests always need to consider when to make requests, when not to make requests, how to process response data, etc. according to different scenarios to meet the performance and performance improvement of the project. This will lead to an increase in the developer's time cost and code maintenance cost. In alova, a complete set of solutions for complex request scenarios is provided, which we call **request strategy**. Only one line of code can quickly implement various complex request logics, which can not only help you improve development efficiency, but also help you improve the running efficiency of the App and reduce the pressure on the server.

For example, `useRequest` can automatically manage the request status, **`loading/error/data` is responsive data**, which can be directly bound in the view in UI frameworks such as react, vue, and svelte, and these responsive data will be automatically maintained according to the request status.

```javascript
const { loading, error, data } = useRequest(alova.Get('/api/user'));
```

Another paging request strategy, **when `page/pageSize` changes, it will automatically trigger requests with different parameters**.

```javascript
const { loading, error, data, page, pageSize, total } = usePagination((page, size) =>
  alova.Get('/api/user/list', {
    params: { page, size }
  })
);
```

alova provides 10+ request strategy modules based on the [RSM](/tutorial/others/RSM) specification, which are implemented in the form of useHook.

### Alova editor extension

Using the alova plugin in vscode can help you automatically generate request code with complete API document annotations and response types. In the past, you needed to query the API documentation first and constantly switch between the API documentation and the editor to write request code. After using the alova plugin, you no longer need to leave the editor, and you can directly use the API while checking in the editor to experience a different API usage experience.

> For a detailed introduction to the alova plugin, please refer to [Integrated IDE plugin](/tutorial/getting-started/plugin-integration).

## Is there any difference?

Unlike other request libraries, alova aims to make requests very simple and maintain more efficient data interaction.

We consider both developers and App users. For developers, alova provides them with the ultimate user experience, and for application users, they can enjoy the smooth experience brought by alova's high-performance data interaction.

In addition, let's take a look at the specific features:

- Similar API design to Axios, which makes the user's learning cost lower;
- High-performance client and server request strategies make the application smoother;
- High flexibility, Alova's adapter allows Alova to work with any UI framework in any JS environment, and provides a unified user experience and perfect code migration;
- 2 cache modes and request sharing mechanisms to improve request performance and reduce server pressure;
- High aggregation organization of API code, each API's request parameters, cache behavior, response data conversion, etc. will be gathered in the same code block, which is a great advantage for managing a large number of APIs;

:::info comparison

You can also check [Comparison with other request libraries](/tutorial/others/comparison) to learn more about the differences of Alova.

:::

## Run in any JS environment

Not only that, Alova is very flexible, you can use it with different request tools in any of the following JS environments (the gray part will be gradually supported in the future).

<SupportList showStatus></SupportList>

## Online trial

You can run the project directly in the browser via Codesandbox [online editable examples try alovajs](/category/examples), so it's almost indistinguishable from local development without having to install anything on your machine.

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
link: '/tutorial/getting-started/quick-start',
}
]}></NavCard>
