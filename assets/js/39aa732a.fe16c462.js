"use strict";(self.webpackChunkalova_website=self.webpackChunkalova_website||[]).push([[3862],{6526:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>s,contentTitle:()=>c,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var t=o(5893),r=o(1151);const a={title:"cache logger",sidebar_position:70},c=void 0,i={id:"tutorial/advanced/cache-logger",title:"cache logger",description:"v2.8.0+",source:"@site/docs/tutorial/06-advanced/07-cache-logger.md",sourceDirName:"tutorial/06-advanced",slug:"/tutorial/advanced/cache-logger",permalink:"/tutorial/advanced/cache-logger",draft:!1,unlisted:!1,editUrl:"https://github.com/alovajs/alovajs.github.io/blob/main/docs/tutorial/06-advanced/07-cache-logger.md",tags:[],version:"current",sidebarPosition:70,frontMatter:{title:"cache logger",sidebar_position:70},sidebar:"tutorialSidebar",previous:{title:"Error logger",permalink:"/tutorial/advanced/error-logger"},next:{title:"Manage extra states",permalink:"/tutorial/advanced/manage-extra-states"}},s={},l=[{value:"Close cache logger printing",id:"close-cache-logger-printing",level:2},{value:"Custom print cache logger",id:"custom-print-cache-logger",level:2}];function d(e){const n={admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.admonition,{title:"version required",type:"info",children:(0,t.jsx)(n.p,{children:"v2.8.0+"})}),"\n",(0,t.jsx)(n.p,{children:"In order to facilitate debugging when using the interface cache, when the request hits the cache without sending a network request, the hit cache information will be printed on the console by default, which can solve some confusion when using the cache."}),"\n",(0,t.jsx)(n.p,{children:"If you don't want to print cache information or custom control print cache information in some cases (such as production environment), alova also provides support for them."}),"\n",(0,t.jsx)(n.h2,{id:"close-cache-logger-printing",children:"Close cache logger printing"}),"\n",(0,t.jsxs)(n.p,{children:["Console printing can be turned off by setting ",(0,t.jsx)(n.code,{children:"cacheLogger"})," to ",(0,t.jsx)(n.code,{children:"false or null"})," when creating an alova instance."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"const alovaInstance = createAlova({\r\n  //...\r\n  cacheLogger: false\r\n});\n"})}),"\n",(0,t.jsx)(n.p,{children:"You can also dynamically turn it on and off according to different environments."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"const alovaInstance = createAlova({\r\n  //...\r\n  // Enable cache logger in the development environment\r\n  cacheLogger: process.env.NODE_ENV === 'development'\r\n});\n"})}),"\n",(0,t.jsx)(n.h2,{id:"custom-print-cache-logger",children:"Custom print cache logger"}),"\n",(0,t.jsxs)(n.p,{children:["The cache logger is printed via ",(0,t.jsx)(n.code,{children:"console.log"})," by default. If ",(0,t.jsx)(n.code,{children:"console.log"})," or other purposes are not supported in your project environment, ",(0,t.jsx)(n.code,{children:"cacheLogger"})," can be specified as a function to customize the logger for processing cache hits."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"const alovaInstance = createAlova({\r\n  //...\r\n  /**\r\n   * Custom cache logger function\r\n   * @param response hit cache data\r\n   * @param method the current method instance\r\n   * @param cacheMode cache mode memory or restore\r\n   * @param tag The tag in the restore mode has a value only when the tag is set in the corresponding cache\r\n   */\r\n  cacheLogger(response, method, cacheMode, tag) {\r\n    saveHitCache({\r\n      response,\r\n      method,\r\n      cacheMode,\r\n      tag\r\n    });\r\n  }\r\n});\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,o)=>{o.d(n,{Z:()=>i,a:()=>c});var t=o(7294);const r={},a=t.createContext(r);function c(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);