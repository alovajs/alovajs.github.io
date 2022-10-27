import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      text: "介绍",
      prefix: "introduction/",
      // link: "/docs/zh/introduction/",
      children: "structure",
    },
    {
      text: "Docs",
      icon: "note",
      prefix: "guide/",
      children: "structure",
    },
    "slides",
  ],
});
