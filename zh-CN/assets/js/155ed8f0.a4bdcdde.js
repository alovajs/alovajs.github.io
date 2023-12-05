"use strict";(self.webpackChunkalova_website=self.webpackChunkalova_website||[]).push([[3732],{2629:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>u,toc:()=>c});var r=n(5893),a=n(1151),o=n(4866),l=n(5162);const s={title:"\u7ba1\u7406\u989d\u5916\u7684\u72b6\u6001",sidebar_position:60},i=void 0,u={id:"tutorial/next-step/manage-extra-states",title:"\u7ba1\u7406\u989d\u5916\u7684\u72b6\u6001",description:"\u5728\u4e4b\u524d\u7684\u8de8\u9875\u9762/\u6a21\u5757\u66f4\u65b0\u54cd\u5e94\u72b6\u6001\u7ae0\u8282\u4e2d\uff0c\u4ecb\u7ecd\u4e86\u5982\u4f55\u8de8\u9875\u9762\u6216\u6a21\u5757\u66f4\u65b0\u54cd\u5e94\u72b6\u6001\uff0c\u4f46\u5728\u6b64\u7ae0\u8282\u4e2d\u6211\u4eec\u53ea\u4ecb\u7ecd\u4e86\u901a\u8fc7updateState\u66f4\u65b0\u5728useRequest\u548cuseWatcher\u4e2d\u8fd4\u56de\u7684data\u72b6\u6001\uff0cdata \u7684\u503c\u603b\u662f\u548c\u54cd\u5e94\u6570\u636e\u4e00\u81f4\uff0c\u4f46\u5728\u5f88\u591a\u60c5\u51b5\u4e0b\u6211\u4eec\u4f1a\u4f7f\u7528\u989d\u5916\u7684\u72b6\u6001\u6765\u5c55\u793a\uff08\u5982\u72b6\u6001 A\uff09\u6570\u636e\uff0c\u5e76\u5728\u8bf7\u6c42\u6210\u529f\u540e\u5c06 data \u6570\u636e\u9644\u52a0\u5230\u989d\u5916\u7684\u72b6\u6001 A \u4e2d\uff0c\u5982\u4e0b\u62c9\u52a0\u8f7d\u7684\u5206\u9875\u65b9\u6848\u3002\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u6211\u4eec\u5c31\u9700\u8981\u5c06\u989d\u5916\u7684\u72b6\u6001 A \u8fdb\u884c\u7ba1\u7406\uff0c\u4fbf\u4e8e\u5b9e\u73b0\u8de8\u9875\u9762/\u6a21\u5757\u66f4\u65b0\u5b83\u3002",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/tutorial/06-next-step/07-manage-extra-states.md",sourceDirName:"tutorial/06-next-step",slug:"/tutorial/next-step/manage-extra-states",permalink:"/zh-CN/tutorial/next-step/manage-extra-states",draft:!1,unlisted:!1,editUrl:"https://github.com/alovajs/alovajs.github.io/blob/main/docs/tutorial/06-next-step/07-manage-extra-states.md",tags:[],version:"current",sidebarPosition:60,frontMatter:{title:"\u7ba1\u7406\u989d\u5916\u7684\u72b6\u6001",sidebar_position:60},sidebar:"tutorialSidebar",previous:{title:"\u81ea\u52a8\u5931\u6548\u7f13\u5b58",permalink:"/zh-CN/tutorial/next-step/auto-invalidate-cache"},next:{title:"\u5e76\u884c\u8bf7\u6c42",permalink:"/zh-CN/tutorial/next-step/parallel-request"}},d={},c=[{value:"\u66f4\u65b0\u5355\u4e2a\u72b6\u6001",id:"\u66f4\u65b0\u5355\u4e2a\u72b6\u6001",level:2},{value:"\u66f4\u65b0\u591a\u4e2a\u72b6\u6001",id:"\u66f4\u65b0\u591a\u4e2a\u72b6\u6001",level:2},{value:"data \u72b6\u6001\u66f4\u65b0\u7684\u7b80\u5199",id:"data-\u72b6\u6001\u66f4\u65b0\u7684\u7b80\u5199",level:2}];function h(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["\u5728\u4e4b\u524d\u7684",(0,r.jsx)(t.a,{href:"/tutorial/learning/update-response-data-across-modules",children:"\u8de8\u9875\u9762/\u6a21\u5757\u66f4\u65b0\u54cd\u5e94\u72b6\u6001"}),"\u7ae0\u8282\u4e2d\uff0c\u4ecb\u7ecd\u4e86\u5982\u4f55\u8de8\u9875\u9762\u6216\u6a21\u5757\u66f4\u65b0\u54cd\u5e94\u72b6\u6001\uff0c\u4f46\u5728\u6b64\u7ae0\u8282\u4e2d\u6211\u4eec\u53ea\u4ecb\u7ecd\u4e86\u901a\u8fc7",(0,r.jsx)(t.code,{children:"updateState"}),"\u66f4\u65b0\u5728",(0,r.jsx)(t.code,{children:"useRequest"}),"\u548c",(0,r.jsx)(t.code,{children:"useWatcher"}),"\u4e2d\u8fd4\u56de\u7684",(0,r.jsx)(t.code,{children:"data"}),"\u72b6\u6001\uff0cdata \u7684\u503c\u603b\u662f\u548c\u54cd\u5e94\u6570\u636e\u4e00\u81f4\uff0c\u4f46\u5728\u5f88\u591a\u60c5\u51b5\u4e0b\u6211\u4eec\u4f1a\u4f7f\u7528\u989d\u5916\u7684\u72b6\u6001\u6765\u5c55\u793a\uff08\u5982\u72b6\u6001 A\uff09\u6570\u636e\uff0c\u5e76\u5728\u8bf7\u6c42\u6210\u529f\u540e\u5c06 data \u6570\u636e\u9644\u52a0\u5230\u989d\u5916\u7684\u72b6\u6001 A \u4e2d\uff0c\u5982\u4e0b\u62c9\u52a0\u8f7d\u7684\u5206\u9875\u65b9\u6848\u3002\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u6211\u4eec\u5c31\u9700\u8981\u5c06\u989d\u5916\u7684\u72b6\u6001 A \u8fdb\u884c\u7ba1\u7406\uff0c\u4fbf\u4e8e\u5b9e\u73b0\u8de8\u9875\u9762/\u6a21\u5757\u66f4\u65b0\u5b83\u3002"]}),"\n",(0,r.jsx)(t.h2,{id:"\u66f4\u65b0\u5355\u4e2a\u72b6\u6001",children:"\u66f4\u65b0\u5355\u4e2a\u72b6\u6001"}),"\n",(0,r.jsxs)(t.p,{children:["\u53ef\u4ee5\u5728 use hook \u8c03\u7528\u65f6\u901a\u8fc7",(0,r.jsx)(t.code,{children:"managedStates"}),"\u7ba1\u7406\u989d\u5916\u7684\u72b6\u6001\uff0c\u5e76\u5728\u5176\u4ed6\u6a21\u5757/\u9875\u9762\u4e2d\u8c03\u7528",(0,r.jsx)(t.code,{children:"updateState"}),"\u65f6\uff0c\u81ea\u52a8\u6307\u5b9a\u72b6\u6001\u540d\u79f0\u6765\u66f4\u65b0\u5b83\u3002"]}),"\n",(0,r.jsxs)(o.Z,{groupId:"framework",children:[(0,r.jsx)(l.Z,{value:"1",label:"vue composition",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"// a.vue\r\nconst todoList = page =>\r\n  alova.Get('/todo', {\r\n    name: 'todoList'\r\n  });\r\n\r\nconst allTodo = ref([]);\r\nuseRequest(todoList, {\r\n  // ...\r\n\r\n  // highlight-start\r\n  // \u5c06allTodo\u4f5c\u4e3a\u989d\u5916\u7684\u72b6\u6001\u8fdb\u884c\u7ba1\u7406\r\n  managedStates: {\r\n    allTodo\r\n  }\r\n  // highlight-end\r\n});\r\n\r\n// b.vue\r\n// ...\r\nconst handleSuccess = () => {\r\n  // highlight-start\r\n  // \u4f20\u5165\u4e00\u4e2a\u5bf9\u8c61\u5e76\u6307\u5b9a\u72b6\u6001\u540d\u6765\u67e5\u627e\r\n  updateState('todoList', {\r\n    allTodo: allTodoData => {\r\n      // \u65b0\u589e\u4e00\u6761todo\u9879\r\n      allTodoData.push({\r\n        title: 'new todo',\r\n        time: '10:00'\r\n      });\r\n      return allTodoData;\r\n    }\r\n  });\r\n  // highlight-end\r\n};\n"})})}),(0,r.jsx)(l.Z,{value:"2",label:"react",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"// a.jsx\r\nconst PageA = () => {\r\n  const todoList = page =>\r\n    alova.Get('/todo', {\r\n      name: 'todoList'\r\n    });\r\n\r\n  const [allTodo, setAllTodo] = allTodoState = useState([]);\r\n  useRequest(todoList, {\r\n    // ...\r\n\r\n    // highlight-start\r\n    // \u5c06allTodo\u4f5c\u4e3a\u989d\u5916\u7684\u72b6\u6001\u8fdb\u884c\u7ba1\u7406\r\n    managedStates: {\r\n      allTodo: allTodoState\r\n    }\r\n    // highlight-end\r\n  });\r\n\r\n  return (\r\n    // ...\r\n  );\r\n}\r\n\r\n// b.jsx\r\nconst PageB = () => {\r\n  // ...\r\n  const handleSuccess = () => {\r\n    // highlight-start\r\n    // \u4f20\u5165\u4e00\u4e2a\u5bf9\u8c61\u5e76\u6307\u5b9a\u72b6\u6001\u540d\u6765\u67e5\u627e\r\n    updateState('todoList', {\r\n      allTodo: allTodoData => {\r\n        // \u65b0\u589e\u4e00\u6761todo\u9879\r\n        allTodoData.push({\r\n          title: 'new todo',\r\n          time: '10:00'\r\n        });\r\n        return allTodoData;\r\n      }\r\n    });\r\n    // highlight-end\r\n  };\r\n\r\n  return (\r\n    // ...\r\n  );\r\n}\n"})})}),(0,r.jsx)(l.Z,{value:"3",label:"svelte",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"// a.svelte\r\nconst todoList = page =>\r\n  alova.Get('/todo', {\r\n    name: 'todoList'\r\n  });\r\n\r\nconst allTodo = ref([]);\r\nuseRequest(todoList, {\r\n  // ...\r\n\r\n  // highlight-start\r\n  // \u5c06allTodo\u4f5c\u4e3a\u989d\u5916\u7684\u72b6\u6001\u8fdb\u884c\u7ba1\u7406\r\n  managedStates: {\r\n    allTodo\r\n  }\r\n  // highlight-end\r\n});\r\n\r\n// b.svelte\r\n// ...\r\nconst handleSuccess = () => {\r\n  // highlight-start\r\n  // \u4f20\u5165\u4e00\u4e2a\u5bf9\u8c61\u5e76\u6307\u5b9a\u72b6\u6001\u540d\u6765\u67e5\u627e\r\n  updateState('todoList', {\r\n    allTodo: allTodoData => {\r\n      // \u65b0\u589e\u4e00\u6761todo\u9879\r\n      allTodoData.push({\r\n        title: 'new todo',\r\n        time: '10:00'\r\n      });\r\n      return allTodoData;\r\n    }\r\n  });\r\n  // highlight-end\r\n};\n"})})}),(0,r.jsx)(l.Z,{value:"4",label:"vue options",children:(0,r.jsx)(t.admonition,{title:"\u8bf4\u660e",type:"info",children:(0,r.jsx)(t.p,{children:"\u4e0d\u652f\u6301\u7ba1\u7406\u989d\u5916\u72b6\u6001\u3002"})})})]}),"\n",(0,r.jsx)(t.h2,{id:"\u66f4\u65b0\u591a\u4e2a\u72b6\u6001",children:"\u66f4\u65b0\u591a\u4e2a\u72b6\u6001"}),"\n",(0,r.jsxs)(t.p,{children:["\u5728\u4e0a\u9762\u7684\u4f8b\u5b50\u4e2d\u6211\u4eec\u5b9e\u73b0\u4e86\u8de8\u9875\u9762\u5bf9\u5355\u4e2a",(0,r.jsx)(t.code,{children:"allTodo"}),"\u72b6\u6001\u8fdb\u884c\u66f4\u65b0\uff0c\u5b9e\u9645\u4e0a\uff0c\u901a\u8fc7",(0,r.jsx)(t.code,{children:"updateState"}),"\u7684\u5bf9\u8c61\u63cf\u8ff0\u65b9\u5f0f\u53ef\u4ee5\u540c\u65f6\u66f4\u65b0\u4efb\u610f\u591a\u4e2a\u72b6\u6001\u3002"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"updateState('todoList', {\r\n  state1: state1Data => {\r\n    // ...\r\n  },\r\n  state2: state2Data => {\r\n    // ...\r\n  },\r\n  state3: state3Data => {\r\n    // ...\r\n  }\r\n  // ...\r\n});\n"})}),"\n",(0,r.jsxs)(t.p,{children:["\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0c\u4ee5\u4e0a 3 \u4e2a\u989d\u5916\u7684\u72b6\u6001\u5728\u66f4\u65b0\u524d\uff0c\u9700\u8981\u901a\u8fc7",(0,r.jsx)(t.code,{children:"managedStates"}),"\u5c5e\u6027\u6765\u7ba1\u7406\u8d77\u6765\u3002"]}),"\n",(0,r.jsx)(t.h2,{id:"data-\u72b6\u6001\u66f4\u65b0\u7684\u7b80\u5199",children:"data \u72b6\u6001\u66f4\u65b0\u7684\u7b80\u5199"}),"\n",(0,r.jsx)(t.p,{children:"\u5f53\u53ea\u66f4\u65b0 data \u72b6\u6001\u65f6\uff0c\u53ef\u4ee5\u76f4\u63a5\u4f20\u5165\u56de\u8c03\u51fd\u6570\u5373\u53ef\uff0c\u800c\u4e0d\u9700\u8981\u6307\u5b9a\u4e3a\u5bf9\u8c61\u3002"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"updateState('todoList', {\r\n  data: dataRaw => {\r\n    // ...\r\n  }\r\n});\r\n\r\n// \u4ee5\u4e0b\u4e3a\u7b80\u5199\r\nupdateState('todoList', dataRaw => {\r\n  // ...\r\n});\n"})})]})}function p(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},5162:(e,t,n)=>{n.d(t,{Z:()=>l});n(7294);var r=n(4334);const a={tabItem:"tabItem_Ymn6"};var o=n(5893);function l(e){let{children:t,hidden:n,className:l}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.Z)(a.tabItem,l),hidden:n,children:t})}},4866:(e,t,n)=>{n.d(t,{Z:()=>S});var r=n(7294),a=n(4334),o=n(2466),l=n(6550),s=n(469),i=n(1980),u=n(7392),d=n(12);function c(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return c(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}(n);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const a=(0,l.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._X)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(a.location.search);t.set(o,e),a.replace({...a.location,search:t.toString()})}),[o,a])]}function g(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,o=h(e),[l,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[u,c]=m({queryString:n,groupId:a}),[g,b]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,o]=(0,d.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:a}),v=(()=>{const e=u??g;return p({value:e,tabValues:o})?e:null})();(0,s.Z)((()=>{v&&i(v)}),[v]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);i(e),c(e),b(e)}),[c,b,o]),tabValues:o}}var b=n(2389);const v={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=n(5893);function x(e){let{className:t,block:n,selectedValue:r,selectValue:l,tabValues:s}=e;const i=[],{blockElementScrollPositionUntilNextRender:u}=(0,o.o5)(),d=e=>{const t=e.currentTarget,n=i.indexOf(t),a=s[n].value;a!==r&&(u(t),l(a))},c=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=i.indexOf(e.currentTarget)+1;t=i[n]??i[0];break}case"ArrowLeft":{const n=i.indexOf(e.currentTarget)-1;t=i[n]??i[i.length-1];break}}t?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":n},t),children:s.map((e=>{let{value:t,label:n,attributes:o}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>i.push(e),onKeyDown:c,onClick:d,...o,className:(0,a.Z)("tabs__item",v.tabItem,o?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function j(e){let{lazy:t,children:n,selectedValue:a}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function T(e){const t=g(e);return(0,f.jsxs)("div",{className:(0,a.Z)("tabs-container",v.tabList),children:[(0,f.jsx)(x,{...e,...t}),(0,f.jsx)(j,{...e,...t})]})}function S(e){const t=(0,b.Z)();return(0,f.jsx)(T,{...e,children:c(e.children)},String(t))}},1151:(e,t,n)=>{n.d(t,{Z:()=>s,a:()=>l});var r=n(7294);const a={},o=r.createContext(a);function l(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);