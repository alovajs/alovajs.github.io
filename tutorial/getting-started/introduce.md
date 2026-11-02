## What is alova?

alova (pronounced /əˈləʊva/) is a **fullstack request strategy library**. It treats a request as a scenario with a lifecycle — not a one-time instantaneous call — and organizes the request logic you've hand-written countless times, such as pagination, forms, uploads, and authentication, into a complete whole we call **request strategies**. In the AI Coding era, what sets applications apart is user experience; with **request strategies**, you get complete request functionality beyond your expectations — no need to spell it out in your prompts.

You don't have to throw away the axios or fetch you already know: alova builds right on top of your existing request library and takes over the request logic you keep rewriting. The same API set runs across React, Vue, Svelte, Solid, mini-programs and the server, so you learn it once and use it everywhere.

You can read the backstory in [Why alova was created](/about/faqs), and learn how alova differs in [Comparison with other request libraries](/about/comparison).

### Why use alova

#### 1. What you get is a complete scenario, not just a working request

In the AI Coding era, what sets applications apart is user experience — not that AI isn't capable enough, but that your prompt is unlikely to spell out the following request features, because no one has ever handed you a checklist for how to manage your requests. For example:

- **Input debounce**: without it, fast typing fires requests back to back
- **Cache hits for identical conditions**: without it, the same endpoint is called over and over
- **Discarding stale responses**: without it, an older response may overwrite a newer one
- **Automatic retry on failure**: without it, a single failed request leaves the page blank
- **Next-page preloading**: without it, users stare at the loading state on every page turn
- ...

RSM is exactly that checklist — alova maps it onto the configuration options of the scenario hooks.

#### 2. No need to review AI-written code

Request-layer code takes up a large share of your pages, and AI-written code always needs another round of review. With alova, the request layer is reduced to configuration you only need to verify — saving you time while improving stability.

## Live Demo

We've prepared a rich set of examples to help you quickly explore alova's capabilities.



## Request Strategies in Action

Here are a few of the most common request strategies so you can get a feel for the actual code — just expand any item you like.

### Client request strategy

Below are introductions and examples of some client-side request strategies. Feel free to explore the ones that catch your interest.

### Watching request strategy

Re-request as your data changes — e.g. fuzzy search or tab switching.

```javascript
const {
  // Responsive states
  loading,
  error,
  data,

  // Events
  onSuccess,
  onError,
  onComplete,

  // actions
  send,
  update

  // ...
} = useWatcher(
  () =>
    alova.Get('/api/user', {
      params: {
        type: activeTab
      }
    }),
  [activeTab]
);
```

See [Watcher Request Strategy](/tutorial/client/strategy/use-watcher) for details.

### Pagination request strategy

Full pagination coverage: page turning, conditional query, next-page pre-fetch, insert/replace/remove, refresh and reset.

```javascript
const {
  // Responsive states
  loading,
  error,
  data,
  page,
  pageSize,
  total,

  // Events
  onSuccess,
  onFetchSuccess,
  onError,
  onFetchError,

  // Actions
  refresh,
  insert,
  replace,
  remove,
  reload,
  send,
  abort,
  update

  // ...
} = usePagination(
  (page, size) =>
    alova.Get('/api/user/list', {
      params: { page, size }
    }),
  {
    preloadNextPage: true,
    watchingStates: [username, sex],
    debounce: 500
  }
);
```

See [Pagination Request Strategy](/tutorial/client/strategy/use-pagination) for details.

### Token authentication strategy

Global interceptors that centralize login, logout, token attachment and seamless token refresh.

```javascript
const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication({
  refreshTokenOnError: {
    isExpired: res => res.status === 401,
    handler: async () => {
      const { token, refresh_token } = await refreshToken();
      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refresh_token);
    }
  }
});
const alovaInstance = createAlova({
  beforeRequest: onAuthRequired(),
  responded: onResponseRefreshToken()
});
```

See [Token Authentication Interceptor](/tutorial/client/strategy/token-authentication) for details.

### Form submission strategy

Quickly build form drafts and multi-step forms, with built-in reset and other common helpers.

```javascript
const {
  // Responsive states
  loading: submiting,
  error,
  form,

  // Events
  onSuccess,
  onError,
  onComplete,

  // Actions
  send: submit,
  updateForm,
  abort

  // ...
} = useForm(formData => alova.Post('/user/profile', formData), {
  initialForm: {
    name: '',
    age: '',
    avatar: null
  },
  resetAfterSubmiting: true,
  store: true
});
```

See [Form Submission Strategy](/tutorial/client/strategy/use-form) for details.

### Data Fetching Strategy

Fetch data ahead of time so users never wait for loading — a smoother experience.

```javascript
const {
  // Response states
  loading,
  error,

  // Events
  onSuccess,
  onError,
  onComplete,

  // actions
  fetch,
  update,
  abort

  // ...
} = useFetcher();

const handleItemClick = itemId => {
  fetch(
    alova.Get('/api/user/detail', {
      params: {
        id: itemId
      }
    })
  );
};
```

See [Data Fetching Strategy](/tutorial/client/strategy/use-fetcher) for details.

### Seamless Data interaction Strategy

Respond as instantly as local data — both content display and submission happen without waiting, eliminating perceived lag.

```javascript
const {
  // Responsive states
  data,
  loading,
  error,

  // Events
  onSuccess,
  onError,
  onComplete,
  onBeforePushQueue,
  onPushedQueue,
  onFallback,

  // Actions
  send: submit,
  abort,
  update

  // ...
} = useSQRequest(() => alova.Get('/api/todo/add'), {
  behavior: 'silent',
  queue: 'queue-demo',
  silentDefaultResponse: () => {
    return {
      id: '--'
    };
  }
});
```

See [Seamless Data Interaction](/tutorial/client/strategy/seamless-data-interaction) for details.

### Cross-component request triggering middleware

Break free from component hierarchy — trigger any request action from any component.

**ComponentA:**

```javascript
useRequest(alova.Get('/api/todo/list'), {
  // ...
  middleware: actionDelegationMiddleware('action:todoList')
});
```


---

**ComponentB:**

```javascript
accessAction('action:todoList', delegatedActions => {
  delegatedActions.send();
  delegatedActions.abort();
});
```


See [Cross-component request trigger](/tutorial/client/strategy/action-delegation-middleware) for details.

### Captcha strategy

Quickly implement captcha sending.

```javascript
const mobile = ref('');
const {
  // Responsive states
  loading: sending,
  countdown,
  error,

  // Events
  onSuccess,
  onError,
  onComplete,

  // Actions
  send,
  abort,
  update

  // ...
} = useCaptcha(
  () =>
    alova.Post('/api/captcha', {
      mobile: mobile
    }),
  {
    initialCountdown: 60
  }
);
```

See [Verification code strategy](/tutorial/client/strategy/use-captcha) for details.

See the [Request Strategy List](/tutorial/client/strategy) for all client request strategies.

### Server Request Strategy

On the server (nodejs/deno/bun), alova also provides server-side request strategies we call **server hooks**, all with cluster-mode support.

Below are introductions and examples of some server-side request strategies. Feel free to explore the ones that catch your interest.

### Multi-process Atomic Requests

In cluster mode, this ensures that only one process initiates the request at a time.

```javascript
const tokenRes = await atomize(alova.Get('/api/access_token'));
```

Go to [Atomic requests](/tutorial/server/strategy/atomize) for details.

### Request Retry strategy

Retry the request if it fails.

```javascript
const response = await retry(alova.Get('/api/user'), {
  retry: 5
});
```

See [Request retry strategy](/tutorial/server/strategy/retry) for details.

### Request Rate Limit Strategy

Limit the number of requests within a certain period of time; supports cluster mode.

```javascript
const limit = createRateLimiter({
  points: 4,
  duration: 60 * 1000
});
const orderRes = await limit(alova.Get('/api/order'));
```

See [Request Rate Limit Strategy](/tutorial/server/strategy/rate-limit) for details.

## When should you use alova?

alova is compatible with the following tech stacks; the grayed-out parts will be supported gradually in the future. If your frontend app includes authentication, pagination, forms, uploads or captcha sending, or you need to reuse one API set across Web, React Native and mini-programs, or you need request governance such as rate limiting and BFF on Node.js or Bun servers, alova handles it all perfectly.



## Write alova with an AI Agent (Agent Skills)

Developing with an AI coding assistant? Install alova's [Agent Skills](/tutorial/getting-started/agent-skills) so your agent writes code following official best practices.

## Migration Guide

- [Migration from v2 to v3](/tutorial/project/migration/v2-to-v3)
- [Guide to low-cost migration from axios to alova](/tutorial/project/migration/from-axios)

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

## Let's get started

Next, we will start with the simplest request, then explain the request strategy, understand how alova simplifies your work, and then go into the advanced guide and the best practices summarized in actual projects.

Let’s start learning alova!

,
title: 'tutorial in 5 minutes video',
desc: 'Learn alova in 5 minutes',
link: '/video-tutorial',
},
{
Image: ,
title: 'Quick start documentation',
desc: 'Learn alova in more detail and learn on your own time',
link: '/tutorial/getting-started/quick-start',
}
]}></NavCard>
