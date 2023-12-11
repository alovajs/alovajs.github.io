---
title: React-Native app development
sidebar_position: 50
---

You can develop a React-Native app with alova, and you can also use request adapter `GlobalFetch` directly to handle request event.

But...there are some cautions:

## metro version

In the alova, `exports` is used to define multiple items in `package.json`, so it's necessary to ensure 2 points below:

1. version of metro must >= 0.76.0
2. enable `resolver.unstable_enablePackageExports` in `metro.config.js`. [Click here for detail](https://facebook.github.io/metro/docs/configuration/#unstable_enablepackageexports-experimental)
