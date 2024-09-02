---
title: Introduce
---

import Link from '@docusaurus/Link';
import Examples from '@site/src/components/Examples';
import NavCard from '@site/src/components/NavCard';
import SupportList from '@site/src/components/SupportList';
import tts from '@site/static/audio/tts.mp3';
import AudioPlayer from '@site/src/components/AudioPlayer';
import IconFont from '@site/src/components/IconFont';

## What is alova?

alova (pronounced `/əˈləʊva/` <AudioPlayer src={tts} />) is an workflow-streamlined next-generation request tool that helps you extremely streamline API integration workflow.

![](/img/overview_flow_en.png)

It can streamline API integration workflow from 7 steps to 1 step. You only need to choose the API to use.

## How to do it?

### Core functions

alova provides basic request capabilities similar to axios. You can use it with any request library such as axios and fetch to get out-of-the-box features such as response caching and request sharing.

```js
const response = await alova.Get('/api/user');
```

### Request strategy

Based on the core functions of alova, it also provides a complete solution for complex request scenarios, which we call **request strategy**. With only one line of code, you can quickly implement various complex request logics, which can not only help you improve development efficiency, but also help you improve the running efficiency of the App and reduce the pressure on the server.

For example, `useRequest` can automatically manage the request states, **`loading/error/data` is responsive data**, which can be directly bound in the view in UI frameworks such as react, vue, and svelte, and these responsive data will be automatically maintained according to the request states.

```javascript
const { loading, error, data } = useRequest(alova.Get('/api/user'));
```

Here is another pagination request strategy, which includes responsive states, actions, events, and **when `page/pageSize` changes, it will automatically trigger a request with different parameters**.

```javascript
const {
  // states
  loading,
  error,
  data,
  page,
  pageSize,
  total,

  // actions
  refresh,
  insert,
  replace,
  remove,
  reload

  // events
  onSuccess,
  onFetchSuccess,
  onError,
  onFetchError
} = usePagination((page, size) =>
  alova.Get('/api/user/list', {
    params: { page, size }
  })
);
```

alova provides 15+ request strategy modules based on the [RSM](/about/RSM) specification, which are implemented in the form of useHook.

### Alova editor extension

Using the alova extension in vscode can help you automatically generate request codes with complete API document annotations and response types. Whether it is a ts project or a js project, you can get complete interface queries, interface details, and smart prompts for response data types.

This extension also optimizes the API usage process, allowing you to experience a different API integration experience. In the past, you needed to query the API documentation first, and constantly switch between the API documentation and the editor to write request code. After using the alova plug-in, you no longer need to leave the editor and can directly use the API in the editor while checking.

import vscodeDemoVideo from '@site/static/video/vscode-demo-video-en.mp4';

<video width="100%" controls controlsList="nodownload" src={vscodeDemoVideo} />

> For a detailed introduction to the alova plug-in, please refer to [Integrated Editor Extension](/tutorial/getting-started/extension-integration).

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

You can also check [Comparison with other request libraries](/about/comparison) to learn more about the differences of Alova.

:::

## Run in any JS environment

Not only that, Alova is very flexible, you can use it with different request tools in any of the following JS environments (the gray part will be gradually supported in the future).

<SupportList showStatus></SupportList>

## Online trial

<Examples />

## Migration Guide

- [Migration from v2 to v3](/tutorial/project/migration/v2-to-v3)
- [Guide to low-cost migration from axios to alova](/tutorial/project/migration/from-axios)

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

## Let's start

Next, we will start with the simplest request, then explain the request strategy, understand how alova simplifies your work, and then go into the advanced guide and the best practices summarized in actual projects.

Let’s start learning alova!

<NavCard list={[
{
Image: <IconFont name="shipin" />,
title: 'tutorial in 5 minutes video',
desc: 'Learn alova in 5 minutes',
link: '/video-tutorial',
},
{
Image: <IconFont name="wenjian" />,
title: 'Quick start documentation',
desc: 'Learn alova in more detail and learn on your own time',
link: '/tutorial/getting-started/quick-start',
}
]}></NavCard>
