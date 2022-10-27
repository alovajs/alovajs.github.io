import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    {
      text: "开始",
      prefix: "overview/",
      children: "structure",
    },
    {
      text: "入门",
      prefix: "getting-started/",
      children: "structure",
    },
    {
      text: "在正确的时机请求",
      prefix: "request-timing/",
      children: "structure",
    },
    {
      text: "响应数据管理",
      prefix: "response-data-management/",
      children: "structure",
    },
    {
      text: "下一步",
      prefix: "next-step/",
      children: "structure",
    },
    {
      text: "高级",
      prefix: "advanced/",
      children: "structure",
    },
    {
      text: "最佳实践(敬请期待)",
      prefix: "best-practices/",
      children: "structure",
    },
    {
      text: "扩展",
      prefix: "extensions/",
      children: "structure",
    },
  ],
});
