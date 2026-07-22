---
title: Agent Skills
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Write alova with an AI Agent (Agent Skills)

If you develop with an AI coding assistant (Claude Code / Cursor / CodeBuddy, etc.), you can install alova's Agent Skills. They teach your agent alova's official best practices, so it stops guessing and writes correct, idiomatic alova code for you.

alova ships three Agent Skills — install the one(s) that match what you're building:

| Skill | For | Covers |
| --- | --- | --- |
| `alova-client` | Client / frontend request logic | `usePagination`, `useForm`, `useUploader`, `useWatcher`, token auth, seamless interaction, and the rest of the client request strategies |
| `alova-server` | Server-side request governance | `alova/server` hooks: `atomize`, `retry`, `createRateLimiter`, and other server request strategies |
| `worma` | Projects with an OpenAPI spec | Lets your agent read your endpoints and generate type-safe call code directly |

### Install

Install via the skills CLI:

<Tabs groupId="skill">
<TabItem value="alova-client" label="alova-client">

```bash
npx skills add alovajs/skills --skill alova-client-usage
```

`alova-client` teaches your agent how to write client-side alova code — from a single `useRequest` to the full set of client request strategies.

</TabItem>
<TabItem value="alova-server" label="alova-server">

```bash
npx skills add alovajs/skills --skill alova-server-usage
```

`alova-server` teaches your agent the `alova/server` hooks for rate limiting, retries and distributed atomic requests.

</TabItem>
<TabItem value="worma" label="worma">

```bash
npx skills add alovajs/skills --skill worma-guidelines
```

`worma` gives your agent the API knowledge from your OpenAPI spec so it can find the right endpoint and generate call code. Visit [worma.js.org](https://worma.js.org) for details.

</TabItem>
</Tabs>

### Which should I install?

- Building a frontend / client app → `alova-client`
- Building server-side request governance → `alova-server`
- Have an OpenAPI spec and want your agent to understand your APIs → `worma`

You can install more than one. They work together — for example, `worma` supplies the API knowledge while `alova-client` tells the agent how to call those APIs with alova.

> Source and full docs: [github.com/alovajs/skills](https://github.com/alovajs/skills).
