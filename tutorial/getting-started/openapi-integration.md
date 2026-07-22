alova's OpenAPI integration now lives in a standalone project — **[worma](https://worma.js.org)**.
worma grew out of `@alova/wormhole` and is its official, generalized successor: point it at a single OpenAPI spec and it generates type-safe call code, TypeScript types, in-editor API docs, and AI-friendly API knowledge — working out of the box with alova.

What it gives you:
1. Auto-generates type-safe call code and response types — even in plain JS projects.
2. Embeds API docs right in your editor, so you can read each endpoint without leaving it.
3. Periodically refreshes your APIs and proactively notifies you — no more waiting on the backend.

👉 [Read the worma docs](https://worma.js.org/docs)

Useful next steps:
- [alova template](https://worma.js.org/docs/template-system/predefined-templates) — generates alova call code for your APIs.
- [Transforming generated data](https://worma.js.org/docs/plugin-system/builtin-plugins) — built-in plugins to modify the generated output.

> Already using `@alova/wormhole`? See [Migrating from wormhole](https://worma.js.org/docs/migration/from-wormhole).
