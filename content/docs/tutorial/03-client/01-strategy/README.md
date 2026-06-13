---
title: Client Strategy
---

Like using a component library, just learn it when you need a request strategy!

All client use hooks have the following in common:

1. They all rely on statesHook, please [set statesHook](/tutorial/getting-started/basic/combine-framework) before using.

2. Their return values ​​all contain the `update` function, which is used to actively update the exported state value.

3. For performance under react, all operation functions such as `send`, `update`, `abort`, etc. are wrapped with `useCallback`.

4. All binding functions starting with `on` can be chained.

## Table of contents

<Cards>
  <Card title="Auto Manage States" description="Send requests with automatic state management" href="/docs/tutorial/client/strategy/use-request" />
  <Card title="Watching Request" description="Re-request as data changes with debounce support" href="/docs/tutorial/client/strategy/use-watcher" />
  <Card title="Fetch Data" description="Preload data and update states across modules" href="/docs/tutorial/client/strategy/use-fetcher" />
  <Card title="Pagination Request Strategy" description="Comprehensive pagination with pre-fetching and CRUD operations" href="/docs/tutorial/client/strategy/use-pagination" />
  <Card title="Form Submitting Strategy" description="Form drafts, multi-step forms, and form reset" href="/docs/tutorial/client/strategy/use-form" />
  <Card title="Token Authentication Interceptor" description="Global token auth with seamless refresh" href="/docs/tutorial/client/strategy/token-authentication" />
  <Card title="Automatically Refetch Data" description="Auto-refetch data based on timing or focus events" href="/docs/tutorial/client/strategy/use-auto-request" />
  <Card title="Cross Components Request Trigger" description="Trigger requests across component hierarchies" href="/docs/tutorial/client/strategy/action-delegation-middleware" />
  <Card title="Seamless Data Interaction" description="Optimistic UI updates with silent submission" href="/docs/tutorial/client/strategy/seamless-data-interaction" />
  <Card title="Send Captcha" description="Captcha sending with countdown management" href="/docs/tutorial/client/strategy/use-captcha" />
  <Card title="useRequest with Serial" description="Send requests serially in a specific order" href="/docs/tutorial/client/strategy/use-serial-request" />
  <Card title="useWatcher with Serial" description="Watch and send serial requests" href="/docs/tutorial/client/strategy/use-serial-watcher" />
  <Card title="Retriable Request" description="Automatic retry on request failure" href="/docs/tutorial/client/strategy/use-retriable-request" />
  <Card title="Server-Sent Events Request" description="Handle SSE streams with alova" href="/docs/tutorial/client/strategy/use-sse" />
  <Card title="Unified Upload Strategy" description="Unified file upload with progress tracking" href="/docs/tutorial/client/strategy/use-uploader" />
</Cards>
