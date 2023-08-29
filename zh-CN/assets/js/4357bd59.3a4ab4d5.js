"use strict";(self.webpackChunkalova_website=self.webpackChunkalova_website||[]).push([[3742],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),u=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(n),m=r,b=p["".concat(o,".").concat(m)]||p[m]||d[m]||l;return n?a.createElement(b,i(i({ref:t},c),{},{components:n})):a.createElement(b,i({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=p;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var u=2;u<l;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7294),r=n(6010);const l="tabItem_Ymn6";function i(e){let{children:t,hidden:n,className:i}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(l,i),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>N});var a=n(7462),r=n(7294),l=n(6010),i=n(2466),s=n(6550),o=n(1980),u=n(7392),c=n(12);function d(e){return function(e){var t;return(null==(t=r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:t.filter(Boolean))??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function p(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??d(n);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function b(e){let{queryString:t=!1,groupId:n}=e;const a=(0,s.k6)(),l=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,o._X)(l),(0,r.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(a.location.search);t.set(l,e),a.replace({...a.location,search:t.toString()})}),[l,a])]}function v(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,l=p(e),[i,s]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:l}))),[o,u]=b({queryString:n,groupId:a}),[d,v]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,l]=(0,c.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:a}),f=(()=>{const e=o??d;return m({value:e,tabValues:l})?e:null})();(0,r.useLayoutEffect)((()=>{f&&s(f)}),[f]);return{selectedValue:i,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);s(e),u(e),v(e)}),[u,v,l]),tabValues:l}}var f=n(2389);const h="tabList__CuJ",g="tabItem_LNqP";function k(e){let{className:t,block:n,selectedValue:s,selectValue:o,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:d}=(0,i.o5)(),p=e=>{const t=e.currentTarget,n=c.indexOf(t),a=u[n].value;a!==s&&(d(t),o(a))},m=e=>{var t;let n=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const t=c.indexOf(e.currentTarget)+1;n=c[t]??c[0];break}case"ArrowLeft":{const t=c.indexOf(e.currentTarget)-1;n=c[t]??c[c.length-1];break}}null==(t=n)||t.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:i}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>c.push(e),onKeyDown:m,onClick:p},i,{className:(0,l.Z)("tabs__item",g,null==i?void 0:i.className,{"tabs__item--active":s===t})}),n??t)})))}function y(e){let{lazy:t,children:n,selectedValue:a}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function D(e){const t=v(e);return r.createElement("div",{className:(0,l.Z)("tabs-container",h)},r.createElement(k,(0,a.Z)({},e,t)),r.createElement(y,(0,a.Z)({},e,t)))}function N(e){const t=(0,f.Z)();return r.createElement(D,(0,a.Z)({key:String(t)},e))}},9172:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>s,metadata:()=>u,toc:()=>d});var a=n(7462),r=(n(7294),n(3905)),l=n(4866),i=n(5162);const s={title:"\u4f7f\u7528\u6280\u5de7",sidebar_position:20},o=void 0,u={unversionedId:"tutorial/best-practice/skills",id:"tutorial/best-practice/skills",title:"\u4f7f\u7528\u6280\u5de7",description:"\u4ee5\u4e0b\u4e3a alova \u5f00\u53d1\u8005\u5728\u4f7f\u7528 alova \u65f6\uff0c\u6240\u4f7f\u7528\u7684\u8f83\u597d\u7684\u4f7f\u7528\u6280\u5de7\uff0c\u901a\u8fc7\u591a\u65b9\u6536\u96c6\uff0c\u5c06\u5b83\u4eec\u6574\u7406\u5728\u6b64\uff0c\u5e0c\u671b\u5bf9\u5927\u5bb6\u53ef\u4ee5\u66f4\u987a\u7545\u5730\u4f7f\u7528 alova\u3002",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/tutorial/10-best-practice/02-skills.md",sourceDirName:"tutorial/10-best-practice",slug:"/tutorial/best-practice/skills",permalink:"/zh-CN/tutorial/best-practice/skills",draft:!1,editUrl:"https://github.com/alovajs/alovajs.github.io/blob/main/docs/tutorial/10-best-practice/02-skills.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{title:"\u4f7f\u7528\u6280\u5de7",sidebar_position:20},sidebar:"tutorialSidebar",previous:{title:"method\u7ba1\u7406",permalink:"/zh-CN/tutorial/best-practice/method-manage"},next:{title:"\u4f7f\u7528IndexedDB\u7ba1\u7406\u7f13\u5b58",permalink:"/zh-CN/tutorial/best-practice/manage-cache-by-indexeddb"}},c={},d=[{value:"\u53d1\u9001\u8bf7\u6c42 useRequest OR method",id:"\u53d1\u9001\u8bf7\u6c42-userequest-or-method",level:2},{value:"\u540c\u65f6\u66f4\u65b0\u72b6\u6001\u548c\u7f13\u5b58",id:"\u540c\u65f6\u66f4\u65b0\u72b6\u6001\u548c\u7f13\u5b58",level:2},{value:"\u5728 onSuccess \u4e2d\u5feb\u901f\u83b7\u53d6 sendArgs",id:"\u5728-onsuccess-\u4e2d\u5feb\u901f\u83b7\u53d6-sendargs",level:2},{value:"\u4f7f\u7528\u524d\u7f00\u7ba1\u7406\u540c\u7c7b method \u5b9e\u4f8b",id:"\u4f7f\u7528\u524d\u7f00\u7ba1\u7406\u540c\u7c7b-method-\u5b9e\u4f8b",level:2},{value:"\u6a21\u62df\u6570\u636e\u5b9e\u8df5",id:"\u6a21\u62df\u6570\u636e\u5b9e\u8df5",level:2}],p={toc:d};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"\u4ee5\u4e0b\u4e3a alova \u5f00\u53d1\u8005\u5728\u4f7f\u7528 alova \u65f6\uff0c\u6240\u4f7f\u7528\u7684\u8f83\u597d\u7684\u4f7f\u7528\u6280\u5de7\uff0c\u901a\u8fc7\u591a\u65b9\u6536\u96c6\uff0c\u5c06\u5b83\u4eec\u6574\u7406\u5728\u6b64\uff0c\u5e0c\u671b\u5bf9\u5927\u5bb6\u53ef\u4ee5\u66f4\u987a\u7545\u5730\u4f7f\u7528 alova\u3002"),(0,r.kt)("h2",{id:"\u53d1\u9001\u8bf7\u6c42-userequest-or-method"},"\u53d1\u9001\u8bf7\u6c42 useRequest OR method"),(0,r.kt)("p",null,"alova \u63d0\u4f9b\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"useRequest"),"\u5728\u6b63\u5e38\u60c5\u51b5\u53ea\u4f1a\u53d1\u9001\u4e00\u6b21\u8bf7\u6c42\uff0c\u5e76\u83b7\u53d6\u54cd\u5e94\u6570\u636e\uff0c\u90a3\u4e3a\u4ec0\u4e48\u4e0d\u76f4\u63a5\u4f7f\u7528 method \u5b9e\u4f8b\u6765\u53d1\u9001\u8bf7\u6c42\u5462\uff0c\u8fd9\u662f\u56e0\u4e3a",(0,r.kt)("inlineCode",{parentName:"p"},"useRequest"),"\u53ef\u4ee5\u5e2e\u6211\u4eec\u81ea\u52a8\u7ba1\u7406",(0,r.kt)("inlineCode",{parentName:"p"},"loading"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"data"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"error"),"\u7b49\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528\u7684\u54cd\u5e94\u5f0f\u6570\u636e\uff0c\u56e0\u6b64\uff0c\u5982\u679c\u4f60\u9700\u8981\u4f7f\u7528\u8fd9\u4e9b\u72b6\u6001\u65f6\uff0c\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"useRequest"),"\u4e0d\u9700\u8981\u81ea\u884c\u7ef4\u62a4\u6570\u636e\u3002\u4f46\u76f8\u53cd\uff0c\u4f60\u5e76\u4e0d\u9700\u8981\u5728\u6574\u4e2a\u9879\u76ee\u4e2d\u53ea\u9002\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"useRequest"),"\uff0c\u4f8b\u5982\u5728\u53ea\u5173\u5fc3\u83b7\u53d6\u4fe1\u606f\uff0c\u800c\u4e0d\u9700\u8981\u4f7f\u7528\u5230",(0,r.kt)("inlineCode",{parentName:"p"},"loading"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"error"),"\u7b49\u7684\u65f6\u5019\uff0c\u5728\u7ec4\u4ef6\u5916\u83b7\u53d6\u6570\u636e\u7684\u65f6\u5019\uff0c\u53ef\u4ee5\u4f7f\u7528 method \u5b9e\u4f8b\u6765\u53d1\u9001\u8bf7\u6c42\u3002"),(0,r.kt)("h2",{id:"\u540c\u65f6\u66f4\u65b0\u72b6\u6001\u548c\u7f13\u5b58"},"\u540c\u65f6\u66f4\u65b0\u72b6\u6001\u548c\u7f13\u5b58"),(0,r.kt)("p",null,"\u5f53\u4f60\u7f16\u8f91\u5b8c\u4e00\u4e2a\u5217\u8868\u7684\u67d0\u6761\u6570\u636e\u65f6\uff0c\u4e0d\u5e0c\u671b\u518d\u6b21\u91cd\u65b0\u8bf7\u6c42\u66f4\u65b0\u5217\u8868\u6570\u636e\uff0c\u800c\u662f\u624b\u52a8\u66f4\u65b0\u5217\u8868\u6570\u636e\uff0c\u5f88\u591a\u5f00\u53d1\u8005\u53ef\u80fd\u4f1a\u76f4\u63a5\u4fee\u6539\u5217\u8868\u6570\u636e\u3002"),(0,r.kt)(l.Z,{groupId:"framework",mdxType:"Tabs"},(0,r.kt)(i.Z,{value:"1",label:"vue",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <List :data="listData"></List>\n  <Editor @submit="handleItemSubmit"></Editor>\n</template>\n<script setup>\n  // ...\n\n  const { data: listData } = useRequest(getList, {\n    initialData: []\n  });\n\n  // \u76f4\u63a5\u66f4\u65b0\u4e86listData\n  const handleItemSubmit = item => {\n    const index = listData.findIndex(({ id }) => id === item.id);\n    listData.splice(index, 1, item);\n  };\n<\/script>\n'))),(0,r.kt)(i.Z,{value:"2",label:"react",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"// ...\n\nconst App = () => {\n  const { data: listData } = useRequest(getList, {\n    initialData: []\n  });\n\n  // \u76f4\u63a5\u66f4\u65b0\u4e86listData\n  const handleItemSubmit = item => {\n    const index = listData.findIndex(({ id }) => id === item.id);\n    listData.splice(index, 1, item);\n  };\n\n  return (\n    <>\n      <List data={listData}></List>\n      <Editor onSubmit={handleItemSubmit}></Editor>\n    </>\n  );\n};\n"))),(0,r.kt)(i.Z,{value:"3",label:"svelte",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<script>\n  // ...\n\n  const { data: listData } = useRequest(getList, {\n    initialData: []\n  });\n\n  // \u76f4\u63a5\u66f4\u65b0\u4e86listData\n  const handleItemSubmit = item => {\n    const index = listData.findIndex(({ id }) => id === item.id);\n    listData.splice(index, 1, item);\n  };\n<\/script>\n<List data="{listData}"></List>\n<Editor on:submit="{handleItemSubmit}"></Editor>\n')))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u274c \u4e0d\u63a8\u8350\u8fd9\u6837\u7684\u5199\u6cd5")),(0,r.kt)("p",null,"\u8fd9\u867d\u7136\u53ef\u4ee5\u89e6\u53d1\u754c\u9762\u5237\u65b0\uff0c\u4f46\u53ef\u80fd\u4f1a\u5e26\u6765\u53e6\u4e00\u4e2a\u95ee\u9898\uff0c\u5c31\u662f\u5728\u5217\u8868\u6570\u636e\u5f00\u542f\u4e86\u7f13\u5b58\u7684\u65f6\u5019\uff0c\u7531\u4e8e\u7f13\u5b58\u6570\u636e\u672a\u88ab\u66f4\u65b0\uff0c\u800c\u5bfc\u81f4\u518d\u6b21\u8fdb\u5165\u8fd9\u4e2a\u5217\u8868\u9875\u65f6\u547d\u4e2d\u7684\u7f13\u5b58\u4f9d\u7136\u662f\u539f\u6765\u7684\u6570\u636e\u3002"),(0,r.kt)("p",null,"\u56e0\u6b64\u4f60\u53ef\u4ee5\u8c03\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"updateState")," \u6765\u66f4\u65b0\u72b6\u6001\u5316\u6570\u636e\u7684\u540c\u65f6\uff0c\u8fd8\u4f1a\u7acb\u5373\u66f4\u65b0\u7f13\u5b58\u3002"),(0,r.kt)(l.Z,{groupId:"framework",mdxType:"Tabs"},(0,r.kt)(i.Z,{value:"1",label:"vue",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <List :data="listData"></List>\n  <Editor @submit="handleItemSubmit"></Editor>\n</template>\n<script setup>\n  // ...\n\n  const { data: listData } = useRequest(getList, {\n    initialData: []\n  });\n\n  // \u901a\u8fc7updateState\u66f4\u65b0listData\uff0c\u5c06\u4f1a\u540c\u65f6\u66f4\u65b0\u7f13\u5b58\n  const handleItemSubmit = item => {\n    updateState(getList(), oldListData => {\n      const index = oldListData.findIndex(({ id }) => id === item.id);\n      oldListData.splice(index, 1, item);\n      return oldListData;\n    });\n  };\n<\/script>\n'))),(0,r.kt)(i.Z,{value:"2",label:"react",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"// ...\n\nconst App = () => {\n  const { data: listData } = useRequest(getList, {\n    initialData: []\n  });\n\n  // \u901a\u8fc7updateState\u66f4\u65b0listData\uff0c\u5c06\u4f1a\u540c\u65f6\u66f4\u65b0\u7f13\u5b58\n  const handleItemSubmit = item => {\n    updateState(getList(), oldListData => {\n      const index = oldListData.findIndex(({ id }) => id === item.id);\n      oldListData.splice(index, 1, item);\n      return oldListData;\n    });\n  };\n\n  return (\n    <>\n      <List data={listData}></List>\n      <Editor onSubmit={handleItemSubmit}></Editor>\n    </>\n  );\n};\n"))),(0,r.kt)(i.Z,{value:"3",label:"svelte",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<script>\n  // ...\n\n  const { data: listData } = useRequest(getList, {\n    initialData: []\n  });\n\n  // \u901a\u8fc7updateState\u66f4\u65b0listData\uff0c\u5c06\u4f1a\u540c\u65f6\u66f4\u65b0\u7f13\u5b58\n  const handleItemSubmit = item => {\n    updateState(getList(), oldListData => {\n      const index = oldListData.findIndex(({ id }) => id === item.id);\n      oldListData.splice(index, 1, item);\n      return oldListData;\n    });\n  };\n<\/script>\n<List data="{listData}"></List>\n<Editor on:submit="{handleItemSubmit}"></Editor>\n')))),(0,r.kt)("h2",{id:"\u5728-onsuccess-\u4e2d\u5feb\u901f\u83b7\u53d6-sendargs"},"\u5728 onSuccess \u4e2d\u5feb\u901f\u83b7\u53d6 sendArgs"),(0,r.kt)("p",null,"\u5728\u5b9e\u9645\u9879\u76ee\u4e2d\uff0c\u7ecf\u5e38\u901a\u8fc7",(0,r.kt)("inlineCode",{parentName:"p"},"send"),"\u51fd\u6570\u4f20\u9012\u6570\u636e\uff0c\u5982\u679c\u4f60\u9700\u8981\u5728 onSuccess \u7b49\u56de\u8c03\u51fd\u6570\u4e2d\u4f7f\u7528\u8fd9\u4e9b\u6570\u636e\uff0c\u7531\u4e8e\u5b83\u4eec\u5b58\u5728\u4e8e",(0,r.kt)("inlineCode",{parentName:"p"},"event.sendArgs"),"\u6570\u7ec4\u4e2d\uff0c\u6b64\u65f6\u4f60\u53ef\u4ee5\u4f7f\u7528\u53cc\u91cd\u89e3\u6784\u7684\u65b9\u5f0f\u76f4\u63a5\u83b7\u53d6\u5230\u6570\u636e\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"onSuccess(({ sendArgs: [content] }) => {\n  console.log(content);\n});\n")),(0,r.kt)("h2",{id:"\u4f7f\u7528\u524d\u7f00\u7ba1\u7406\u540c\u7c7b-method-\u5b9e\u4f8b"},"\u4f7f\u7528\u524d\u7f00\u7ba1\u7406\u540c\u7c7b method \u5b9e\u4f8b"),(0,r.kt)("p",null,"\u5728\u5f88\u591a\u573a\u666f\u4e0b\uff0c\u6211\u4eec\u9700\u8981\u540c\u65f6\u5bf9\u591a\u4e2a\u7f13\u5b58\u8fdb\u884c\u5931\u6548\u5904\u7406\uff0c\u4f8b\u5982\u4e00\u4e2a\u9875\u9762\u7684\u6570\u636e\u6765\u81ea\u591a\u4e2a\u63a5\u53e3\uff0c\u5f53\u7f16\u8f91\u8fd9\u4e2a\u9875\u9762\u7684\u6570\u636e\u65f6\u9700\u8981\u540c\u65f6\u5931\u6548\u8fd9\u51e0\u4e2a\u63a5\u53e3\u7684\u7f13\u5b58\u6570\u636e\uff0c\u4f60\u53ef\u4ee5\u5c06\u8fd9\u51e0\u4e2a method \u5b9e\u4f8b\u4f7f\u7528\u76f8\u540c\u7684\u524d\u7f00\u6765\u5206\u7c7b\u5b83\u4eec\uff0c\u5e76\u4f7f\u7528\u8fd9\u4e2a\u6b63\u5219\u8868\u8fbe\u5f0f\u5c06\u76f8\u540c\u524d\u7f00\u7684\u7f13\u5b58\u5931\u6548\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const getData1 = id => alovaInstance.Get('/data1', {\n  name: `data-${id}-1`,\n  params: {\n    id\n  }\n});\nconst getData2 = alovaInstance.Get('/data2', {\n  name: `data-${id}-2`,\n  params: {\n    id\n  }\n});\nconst getData3 = alovaInstance.Get('/data3', {\n  name: `data-${id}-3`,\n  params: {\n    id\n  }\n});\n\nconst handleInvalidateCache = id => {\n  // \u540c\u65f6\u5931\u6548\u6307\u5b9aid\u76843\u4e2a\u7f13\u5b58\u6570\u636e\n  invalidateCache(new RegExp(`^data-${id}`);\n}\n")),(0,r.kt)("h2",{id:"\u6a21\u62df\u6570\u636e\u5b9e\u8df5"},"\u6a21\u62df\u6570\u636e\u5b9e\u8df5"),(0,r.kt)("p",null,"\u5982\u679c\u4f60\u7684\u9879\u76ee\uff0c\u5728\u5f00\u53d1\u73af\u5883\u4e0b\u9700\u8981\u4f7f\u7528\u6a21\u62df\u6570\u636e\u6a21\u62df\u90e8\u5206\u6216\u5168\u90e8\u63a5\u53e3\uff0c\u5728\u751f\u4ea7\u5207\u6362\u56de\u771f\u5b9e\u7684\u7f51\u7edc\u8bf7\u6c42\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7\u73af\u5883\u53d8\u91cf\u6765\u63a7\u5236\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const globalFetch = GlobalFetch();\nconst mockAdapter = createAlovaMockAdapter([mockGroup1 /** ... */], {\n  httpAdapter: globalFetch,\n  delay: 1000\n});\n\nexport const alovaInst = createAlova({\n  baseURL: 'http://xxx',\n\n  // \u901a\u8fc7\u73af\u5883\u53d8\u91cf\u63a7\u5236\u751f\u4ea7\u73af\u5883\u4e0b\uff0c\u4e0d\u4f1a\u5c06mock\u76f8\u5173\u4ee3\u7801\u6253\u5305\u8fdb\u53bb\n  requestAdapter: process.env.NODE_ENV === 'development' ? mockAdapter : globalFetch\n  // ...\n});\n")),(0,r.kt)("p",null,"\u5e76\u4e14\u63a8\u8350\u56e2\u961f\u5185\u4e0d\u540c\u7684\u5f00\u53d1\u8005\u53ef\u4ee5\u6839\u636e\u6bcf\u6b21\u8fed\u4ee3\u7684\u7248\u672c\u53f7\u5206\u522b\u521b\u5efa\u4e0d\u540c\u7684\u6a21\u62df\u63a5\u53e3\u6570\u636e\uff0c\u4ee5\u4fbf\u4e8e\u5728\u56e2\u961f\u4e2d\u7ba1\u7406\u8fd9\u4e9b\u6a21\u62df\u6570\u636e\uff0c\u5177\u4f53\u53ef\u53c2\u7167 ",(0,r.kt)("a",{parentName:"p",href:"../extension/alova-mock"},"\u6a21\u62df\u6570\u636e")," \u7ae0\u8282\u3002"))}m.isMDXComponent=!0}}]);