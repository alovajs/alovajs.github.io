---
title: 开发指南
sidebar_position: 30
---

:::info 版本要求

Node.js 16+, npm 8+

:::

## 1. fork 仓库

[打开 alova 仓库 fork 页](https://github.com/alovajs/alova/fork)，点击“Create fork”fork 仓库，并将已 fork 的仓库克隆到本地。

## 2. 克隆项目到本地

使用`git clone`命令，或`Github Desktop`应用克隆项目。

## 3. 新建 pull request

你可以先随便修改一些什么并提交，然后新建 pull request 并使用`close #xxx`来关联正在解决的 issue，这将表示你已占有该 issue，[如何通过 fork 仓库创建 pull request](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)在这里。

## 4. 在本地编码

### 安装依赖

使用`npm install`安装依赖。

### 安装推荐插件（vscode）

如果你使用 vscode，将会推荐你安装以下插件：

- eslint：检查代码质量
- prettier：格式化代码
- jest：自动执行单元测试用例，以及执行单个合集或单元测试用例
- EditorConfig：保证文件格式一致

### 项目结构

```
|-.github
| |-ISSUE_TEMPLATE -> github issues模板
| |-workflows -> github action
|-.husky -> husky配置
|-.vscode -> vscode配置
|-config -> rollup打包文件
|-src -> 源代码
|-test -> 单元测试
| |-browser -> 浏览器环境单元测试
| |-server -> SSR单元测试
| |-components -> 单元测试组件
| |-mockServer.ts -> mock接口（msw）
|-typings -> ts类型声明
|-其他配置文件

```

### 编码规范

#### 代码格式

如果你安装了`prettier`插件，在每次保存文件时会自动进行格式化代码，因此你可以不必在意格式的问题。

#### 尽量减少代码

alova 的特性之一是轻量化，因此在编码时需要尽量减少编码量，这里有几个需要遵循的编码规范：

1. 避免出现相同的代码块，这可以减少库的代码量，但两行代码可能就不值得封装；
2. 使用一个变量声明符聚合变量的声明，例如：

```javascript
// ❌
const a = 1;
const b = 2;

// ✅
const a = 1,
  b = 2;
```

3. 使用常量保存固定值、原型方法，在编译`uglify`阶段减少代码量。在`src/utils/variables.ts`中定义了常用的固定值和原型方法。

```javascript
// ❌
if (a === false) {
  // ...
}
arr.forEach(item => {
  // ...
});

// ✅
import { falseValue, forEach } from '@/utils/variables';
if (a === falseValue) {
  // ...
}
forEach(arr, item => {
  // ...
});
```

## 5. 单元测试指南

编写完代码后，添加对应的单元测试用例，尽量包含边缘情况的测试。

alova 项目使用 jest 作为单元测试框架，使用 msw 作为模拟服务器。建议使用 TDD 模式。每次修改代码后，运行对应的单元测试并通过它。

:::caution 重要

当准备提交代码时，请确保通过了全部单元测试，当您处理 pull request 时，可以有多个小提交，GitHub 可以在合并之前自动压缩它们。

:::

1. 添加浏览器相关单元测试用例，请添加到`test/browser`中对应的测试合集，如果没有合适的测试合集可自行创建；
2. 添加 SSR 相关单元测试用例，请添加到`test/server`中对应的测试合集，如果没有合适的测试合集可自行创建；

### 运行和调试单个测试用例或合集

建议使用**jest**插件（上面推荐的插件之一）对单个用例或合集进行测试，你可以在测试用例中右键点击运行指定的用例，选择`Run Test`运行此测试用例，选择`Debug Test`断点调试此测试用例，如图：

![image](https://github.com/alovajs/alova/assets/29848971/a94ba9db-c100-472f-b870-6bcecb031bea)

### 运行全部测试用例

1. 使用**jest**插件运行，如下图：

![image](https://github.com/alovajs/alova/assets/29848971/5af3ff15-16b7-4b28-9ae6-d0b5a236b181)

2. 通过命令行`npm run test:browser`运行浏览器单元测试，通过`npm run test:node`运行 SSR 单元测试，通过`npm run test`同时运行两者。

## 6. 提交代码

alova 使用了 [semantic-release](https://semantic-release.gitbook.io) 作为自动发布工具，它可以在合并代码到`main`后自动发布新版本包，以及生成`CHANGELOG`，但需要确保提交的消息格式遵循[提交信息约定](https://www.conventionalcommits.org/zh-hans/v1.0.0/)，建议你尽量使用`npm run commit`来自动生成符合规范的 git message。

## 7.编写文档

如果你正在添加新特性，可尝试添加新特性的相关文档说明，详细请阅读[更正或编写文档](/contributing/overview#更正或编写文档)，否则请在 pull request 中说明。
