"use strict";(self.webpackChunkalova_website=self.webpackChunkalova_website||[]).push([[6836],{3586:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>l,frontMatter:()=>a,metadata:()=>o,toc:()=>h});var n=r(5893),s=r(1151);const a={title:"Force request",sidebar_position:40},i=void 0,o={id:"tutorial/cache/force-request",title:"Force request",description:"Forced request refers to a mechanism that bypasses the cache check and triggers a request. It is useful when the latest data needs to be obtained under certain conditions.",source:"@site/docs/tutorial/03-cache/04-force-request.md",sourceDirName:"tutorial/03-cache",slug:"/tutorial/cache/force-request",permalink:"/tutorial/cache/force-request",draft:!1,unlisted:!1,editUrl:"https://github.com/alovajs/alovajs.github.io/blob/main/docs/tutorial/03-cache/04-force-request.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{title:"Force request",sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"Invalidate Response Cache manually",permalink:"/tutorial/cache/manually-invalidate"},next:{title:"Cache set and query",permalink:"/tutorial/cache/set-and-query"}},c={},h=[{value:"Set mandatory request in useHook",id:"set-mandatory-request-in-usehook",level:2},{value:"Dynamically set force value",id:"dynamically-set-force-value",level:3}];function u(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"Forced request refers to a mechanism that bypasses the cache check and triggers a request. It is useful when the latest data needs to be obtained under certain conditions."}),"\n",(0,n.jsx)(t.h2,{id:"set-mandatory-request-in-usehook",children:"Set mandatory request in useHook"}),"\n",(0,n.jsxs)(t.p,{children:["Among the three core hooks of ",(0,n.jsx)(t.code,{children:"useRequest/useWatcher/useFetcher"}),", mandatory request parameters are supported."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"// useRequest\r\nuseRequest(todoListGetter, {\r\n  // highlight-start\r\n  force: true\r\n  // highlight-end\r\n});\r\n\r\n// useWatcher\r\nuseWatcher(todoListGetter, [page], {\r\n  // highlight-start\r\n  force: true\r\n  // highlight-end\r\n});\r\n\r\n// useFetcher\r\nuseFetcher({\r\n  // highlight-start\r\n  force: true\r\n  // highlight-end\r\n});\n"})}),"\n",(0,n.jsx)(t.h3,{id:"dynamically-set-force-value",children:"Dynamically set force value"}),"\n",(0,n.jsxs)(t.p,{children:["In actual situations, we often need to set whether to force the request to be sent based on different situations. In this case, force can be set to a function, which will also receive parameters passed in from the ",(0,n.jsx)(t.code,{children:"send"})," function. ",(0,n.jsx)(t.a,{href:"/tutorial/getting-started/request-manually",children:"Please read the request manually chapter for details"})]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"useRequest(todoListGetter, {\r\n  // highlight-start\r\n  force: isForce => {\r\n    return isForce;\r\n  }\r\n  // highlight-end\r\n});\r\n\r\n// useWatcher\r\nuseWatcher(todoListGetter, [page], {\r\n  // highlight-start\r\n  force: isForce => {\r\n    return isForce;\r\n  }\r\n  // highlight-end\r\n});\r\n\r\n// useFetcher\r\nuseFetcher({\r\n  // highlight-start\r\n  force: isForce => {\r\n    return isForce;\r\n  }\r\n  // highlight-end\r\n});\n"})}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"useFetcher"})," is a useHook for data fetching, which will be discussed in the ",(0,n.jsx)(t.a,{href:"/tutorial/advanced/data-fetching",children:"Data Fetching"})," chapter later."]})]})}function l(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(u,{...e})}):u(e)}},1151:(e,t,r)=>{r.d(t,{Z:()=>o,a:()=>i});var n=r(7294);const s={},a=n.createContext(s);function i(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);