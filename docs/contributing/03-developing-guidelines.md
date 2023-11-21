---
title: Developing Guidelines
sidebar_position: 30
---

:::info version required

Node.js 16+, npm 8+

:::

## 1. Fork repository

[Open alova fork page](https://github.com/alovajs/alova/fork), click "Create fork" and clone the forked repository to local.

## 2. Clone to local

Use the `git clone` command line, or the `Github Desktop` application to clone forked project.

## 3. New pull request

You can [create pull request through a forked repo](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) after writing code. You can also commit code in arbitrary batches, without commiting a complete code.

## 4. Code something in your computer

### Install dependencies

Install dependencies using `npm install`.

### Install the recommended plugin(vscode)

If you are using vscode, it is recommended that you install the following plugins:

- eslint: check code quality.
- prettier: formatting code.
- jest: Automatically execute unit test cases, and execute individual collection or unit test cases.
- EditorConfig: Make sure the file format is consistent.

### Project Structure

```
|-.github
| |-ISSUE_TEMPLATE -> github issues template
| |-workflows -> github action
|-.husky -> husky configuration
|-.vscode -> vscode configuration
|-config -> rollup package files
|-src -> source code
|-test -> unit test suits
| |-browser -> browser environment unit test suits
| |-server -> SSR unit test suits
| |-components -> Unit test components
| |-mockServer.ts -> mock apis (msw)
|-typings -> ts declaration
|- Other configuration files

```

### Coding specifications

#### Code format

If you install the `prettier` plugin, it will automatically format codes every time you save files, so you don't have to worry about the format.

#### Minimize code

Lightweight is one of the alova's features, so it is necessary to minimize the amount of coding when coding. Here are a few coding specifications that need to be followed:

1. Avoid the same code block, which can reduce the amount of code in the library, but two lines of code may not be worth encapsulating;
2. Use a variable declarator to aggregate variable declarations, for example:

```javascript
// ❌
const a = 1;
const b = 2;

// ✅
const a = 1,
  b = 2;
```

3. Use constants to save js built-in values and prototype methods to reduce the amount of code in the compilation phase of `uglify`. built-in values and prototype methods that often used are defined in `src/utils/variables.ts`.

```javascript
// ❌
if (a === false) {
  //...
}
arr.forEach(item => {
  //...
});

// ✅
import { falseValue, forEach } from '@/utils/variables';
if (a === falseValue) {
  //...
}
forEach(arr, item => {
  //...
});
```

## 5. Unit Testing Guidelines

After finish code, it is necessary to add corresponding unit tests.

The alova project uses **jest** as the unit test framework, and msw as the mock server. It is recommended to use the TDD mode. After modifying code every time, please pass the corresponding unit test.

:::warning IMPORTANT

When you're ready to commit your code, make sure all your unit tests are passed. When you're working on a pull request, you can have multiple small commits, and GitHub can automatically squash them before merging them.

:::

1. To add browser-related unit test cases, please add them to the corresponding test collection in `test/browser`, if there is no suitable test suits, you can create one by yourself;
2. Add SSR-related unit test cases, please add them to the corresponding test collection in `test/server`, if there is no suitable test suits, you can create one by yourself;

### Run and debug a single unit test or suits

It is recommended to use the **jest** plugin (one of the plugins recommended above) to test a single use case or a suit. You can right-click the specified unit test, select `Run Test` to run it, and select `Debug Test` to debug it with breakpoint.

![image](https://github.com/alovajs/alova/assets/29848971/a94ba9db-c100-472f-b870-6bcecb031bea)

### Run all unit tests

1. Use the **jest** plugin to run:

![image](https://github.com/alovajs/alova/assets/29848971/5af3ff15-16b7-4b28-9ae6-d0b5a236b181)

2. Run the browser unit tests with command line `npm run test:browser`, run the SSR unit tests with `npm run test:node`, and run both at the same time with `npm run test`.

## 6. Commit codes

alova uses [semantic-release](https://semantic-release.gitbook.io) as an automatic release tool, which can automatically release new version packages after merging code into `main` , and generate `CHANGELOG`, but you need to ensure that the committed message format follows [commit information convention](https://www.conventionalcommits.org/en/v1.0.0/), it is recommended that use `npm run commit` to automatically generate a git message that conforms to the specification.

## 7. Writing docs

If you are adding a new feature, you can try to add the relevant documentation of the new feature. For details, please read [Correcting or add docs](/contributing/overview#correct-or-add-docs), otherwise please explain it in the pull request.
