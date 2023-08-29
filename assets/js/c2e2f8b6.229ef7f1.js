"use strict";(self.webpackChunkalova_website=self.webpackChunkalova_website||[]).push([[5663],{3905:(e,a,t)=>{t.d(a,{Zo:()=>d,kt:()=>m});var n=t(7294);function o(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function r(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?r(Object(t),!0).forEach((function(a){o(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function i(e,a){if(null==e)return{};var t,n,o=function(e,a){if(null==e)return{};var t,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||(o[t]=e[t]);return o}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=n.createContext({}),p=function(e){var a=n.useContext(s),t=a;return e&&(t="function"==typeof e?e(a):l(l({},a),e)),t},d=function(e){var a=p(e.components);return n.createElement(s.Provider,{value:a},e.children)},u={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},c=n.forwardRef((function(e,a){var t=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),c=p(t),m=o,h=c["".concat(s,".").concat(m)]||c[m]||u[m]||r;return t?n.createElement(h,l(l({ref:a},d),{},{components:t})):n.createElement(h,l({ref:a},d))}));function m(e,a){var t=arguments,o=a&&a.mdxType;if("string"==typeof e||o){var r=t.length,l=new Array(r);l[0]=c;var i={};for(var s in a)hasOwnProperty.call(a,s)&&(i[s]=a[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var p=2;p<r;p++)l[p]=t[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}c.displayName="MDXCreateElement"},5162:(e,a,t)=>{t.d(a,{Z:()=>l});var n=t(7294),o=t(6010);const r="tabItem_Ymn6";function l(e){let{children:a,hidden:t,className:l}=e;return n.createElement("div",{role:"tabpanel",className:(0,o.Z)(r,l),hidden:t},a)}},4866:(e,a,t)=>{t.d(a,{Z:()=>T});var n=t(7462),o=t(7294),r=t(6010),l=t(2466),i=t(6550),s=t(1980),p=t(7392),d=t(12);function u(e){return function(e){var a;return(null==(a=o.Children.map(e,(e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:a}=e;return!!a&&"object"==typeof a&&"value"in a}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:a.filter(Boolean))??[]}(e).map((e=>{let{props:{value:a,label:t,attributes:n,default:o}}=e;return{value:a,label:t,attributes:n,default:o}}))}function c(e){const{values:a,children:t}=e;return(0,o.useMemo)((()=>{const e=a??u(t);return function(e){const a=(0,p.l)(e,((e,a)=>e.value===a.value));if(a.length>0)throw new Error(`Docusaurus error: Duplicate values "${a.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[a,t])}function m(e){let{value:a,tabValues:t}=e;return t.some((e=>e.value===a))}function h(e){let{queryString:a=!1,groupId:t}=e;const n=(0,i.k6)(),r=function(e){let{queryString:a=!1,groupId:t}=e;if("string"==typeof a)return a;if(!1===a)return null;if(!0===a&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:a,groupId:t});return[(0,s._X)(r),(0,o.useCallback)((e=>{if(!r)return;const a=new URLSearchParams(n.location.search);a.set(r,e),n.replace({...n.location,search:a.toString()})}),[r,n])]}function f(e){const{defaultValue:a,queryString:t=!1,groupId:n}=e,r=c(e),[l,i]=(0,o.useState)((()=>function(e){let{defaultValue:a,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(a){if(!m({value:a,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${a}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return a}const n=t.find((e=>e.default))??t[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:a,tabValues:r}))),[s,p]=h({queryString:t,groupId:n}),[u,f]=function(e){let{groupId:a}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(a),[n,r]=(0,d.Nk)(t);return[n,(0,o.useCallback)((e=>{t&&r.set(e)}),[t,r])]}({groupId:n}),g=(()=>{const e=s??u;return m({value:e,tabValues:r})?e:null})();(0,o.useLayoutEffect)((()=>{g&&i(g)}),[g]);return{selectedValue:l,selectValue:(0,o.useCallback)((e=>{if(!m({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);i(e),p(e),f(e)}),[p,f,r]),tabValues:r}}var g=t(2389);const v="tabList__CuJ",b="tabItem_LNqP";function k(e){let{className:a,block:t,selectedValue:i,selectValue:s,tabValues:p}=e;const d=[],{blockElementScrollPositionUntilNextRender:u}=(0,l.o5)(),c=e=>{const a=e.currentTarget,t=d.indexOf(a),n=p[t].value;n!==i&&(u(a),s(n))},m=e=>{var a;let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const a=d.indexOf(e.currentTarget)+1;t=d[a]??d[0];break}case"ArrowLeft":{const a=d.indexOf(e.currentTarget)-1;t=d[a]??d[d.length-1];break}}null==(a=t)||a.focus()};return o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":t},a)},p.map((e=>{let{value:a,label:t,attributes:l}=e;return o.createElement("li",(0,n.Z)({role:"tab",tabIndex:i===a?0:-1,"aria-selected":i===a,key:a,ref:e=>d.push(e),onKeyDown:m,onClick:c},l,{className:(0,r.Z)("tabs__item",b,null==l?void 0:l.className,{"tabs__item--active":i===a})}),t??a)})))}function w(e){let{lazy:a,children:t,selectedValue:n}=e;const r=(Array.isArray(t)?t:[t]).filter(Boolean);if(a){const e=r.find((e=>e.props.value===n));return e?(0,o.cloneElement)(e,{className:"margin-top--md"}):null}return o.createElement("div",{className:"margin-top--md"},r.map(((e,a)=>(0,o.cloneElement)(e,{key:a,hidden:e.props.value!==n}))))}function y(e){const a=f(e);return o.createElement("div",{className:(0,r.Z)("tabs-container",v)},o.createElement(k,(0,n.Z)({},e,a)),o.createElement(w,(0,n.Z)({},e,a)))}function T(e){const a=(0,g.Z)();return o.createElement(y,(0,n.Z)({key:String(a)},e))}},8137:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>d,contentTitle:()=>s,default:()=>m,frontMatter:()=>i,metadata:()=>p,toc:()=>u});var n=t(7462),o=(t(7294),t(3905)),r=t(4866),l=t(5162);const i={title:"Taro Adapter",sidebar_position:40},s=void 0,p={unversionedId:"tutorial/extension/alova-adapter-taro",id:"tutorial/extension/alova-adapter-taro",title:"Taro Adapter",description:"This plugin only supports the taro application of react 16.8+, vue3 version.",source:"@site/docs/tutorial/09-extension/04-alova-adapter-taro.md",sourceDirName:"tutorial/09-extension",slug:"/tutorial/extension/alova-adapter-taro",permalink:"/tutorial/extension/alova-adapter-taro",draft:!1,editUrl:"https://github.com/alovajs/alovajs.github.io/blob/main/docs/tutorial/09-extension/04-alova-adapter-taro.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{title:"Taro Adapter",sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"axios adapter",permalink:"/tutorial/extension/alova-adapter-axios"},next:{title:"Uniapp Adapter",permalink:"/tutorial/extension/alova-adapter-uniapp"}},d={},u=[{value:"Install",id:"install",level:2},{value:"Usage",id:"usage",level:2},{value:"create alova",id:"create-alova",level:3},{value:"Request",id:"request",level:3},{value:"Upload",id:"upload",level:3},{value:"download",id:"download",level:3},{value:"Mock request adapter compatible",id:"mock-request-adapter-compatible",level:2},{value:"Typescript",id:"typescript",level:2},{value:"method configuration",id:"method-configuration",level:3},{value:"Response data",id:"response-data",level:3}],c={toc:u};function m(e){let{components:a,...t}=e;return(0,o.kt)("wrapper",(0,n.Z)({},c,t,{components:a,mdxType:"MDXLayout"}),(0,o.kt)("admonition",{title:"Tips",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"This plugin only supports the taro application of react 16.8+, vue3 version.")),(0,o.kt)("h2",{id:"install"},"Install"),(0,o.kt)(r.Z,{mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"1",label:"npm",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @alova/adapter-taro --save\n"))),(0,o.kt)(l.Z,{value:"2",label:"yarn",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add @alova/adapter-taro\n")))),(0,o.kt)("admonition",{title:"Caution",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"If you are develop a React-Native app with Taro, please ensure ",(0,o.kt)("inlineCode",{parentName:"p"},"metro >= 0.76.0")," and enable ",(0,o.kt)("inlineCode",{parentName:"p"},"resolver.unstable_enablePackageExports")," in the ",(0,o.kt)("inlineCode",{parentName:"p"},"metro.config.js"),"."),(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("a",{parentName:"p",href:"https://facebook.github.io/metro/docs/configuration/#unstable_enablepackageexports-experimental"},"about unstable_enablePackageExports of metro"))),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("h3",{id:"create-alova"},"create alova"),(0,o.kt)("p",null,"Calling ",(0,o.kt)("strong",{parentName:"p"},"AdapterTaro")," will return ",(0,o.kt)("em",{parentName:"p"},"Request Adapter"),", ",(0,o.kt)("em",{parentName:"p"},"Storage Adapter"),", and ",(0,o.kt)("em",{parentName:"p"},"ReactHook"),", so you no longer need to set these three items, and the usage is exactly the same."),(0,o.kt)(r.Z,{groupId:"framework",mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"2",label:"react",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { createAlova } from 'alova';\nimport AdapterTaro from '@alova/adapter-taro';\n\nconst alovaInst = createAlova({\n  baseURL: 'https://api.alovajs.org',\n  ...AdapterTaro()\n});\n"))),(0,o.kt)(l.Z,{value:"1",label:"vue",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { createAlova } from 'alova';\nimport AdapterTaroVue from '@alova/adapter-taro/vue';\n\nconst alovaInst = createAlova({\n  baseURL: 'https://api.alovajs.org',\n  ...AdapterTaroVue()\n});\n")))),(0,o.kt)("h3",{id:"request"},"Request"),(0,o.kt)("p",null,"The usage method of the request is exactly the same as that used in the web environment. Already fully compatible with ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.request"),", you can specify ",(0,o.kt)("a",{parentName:"p",href:"https://taro-docs.jd.com/docs/apis/network/request/"},"all configuration items")," supported by ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.request")," in the ",(0,o.kt)("em",{parentName:"p"},"config")," of method instance creation"),(0,o.kt)(r.Z,{groupId:"framework",mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"2",label:"react",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"const list = () =>\n   alovaInst. Get('/list', {\n     // The set parameters will be passed to Taro.request\n     enableHttp2: true\n   });\n\nconst App = () => {\n   const { loading, data } = useRequest(list);\n\n   return (\n     { loading ? <View>Loading...</View> : null }\n     <View>The requested data is: { JSON.stringify(data) }</View>\n   )\n};\n"))),(0,o.kt)(l.Z,{value:"1",label:"vue",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},"<tempate>\n   <view v-if=\"loading\">Loading...</view>\n   <view>The requested data is: {{ data }}</view>\n</template>\n\n<script setup>\n   const list = () =>\n     alovaInst. Get('/list', {\n       // The set parameters will be passed to Taro.request\n       enableHttp2: true\n     });\n   const { loading, data } = useRequest(list);\n<\/script>\n")))),(0,o.kt)("h3",{id:"upload"},"Upload"),(0,o.kt)("p",null,"When ",(0,o.kt)("inlineCode",{parentName:"p"},"requestType: 'upload'")," is set in the ",(0,o.kt)("em",{parentName:"p"},"config")," of the method instance, it means to upload the file, the request adapter will call ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.uploadFile"),", and the uploaded file data is placed in the data of the method instance, you need to specify in the data ",(0,o.kt)("inlineCode",{parentName:"p"},"name")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"filePath"),", these two parameters will be passed to ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.uploadFile"),", at the same time, you can also specify other parameters in data, and the request adapter will pass them to ",(0,o.kt)("inlineCode",{parentName:"p"},"formData "),"in parameters."),(0,o.kt)("p",null,"Similarly, it is fully compatible with ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.uploadFile"),", you can specify ",(0,o.kt)("a",{parentName:"p",href:"https://taro-docs.jd.com/docs/apis/network/upload/uploadFile"},"all configuration items")," supported by ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.uploadFile"),", if there are additional parameters to be set, please specify them in ",(0,o.kt)("em",{parentName:"p"},"config")," of the method instance."),(0,o.kt)(r.Z,{groupId:"framework",mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"2",label:"react",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"const uploadFile = (name, filePath, formData) =>\n   alovaInst. Post(\n     '/uploadImg',\n     {\n       name,\n       filePath,\n\n       // Additional data will be passed into formData of uni.uploadFile\n       ...formData\n     },\n     {\n       // Set the request method to upload, and the adapter will call uni.uploadFile\n       requestType: 'upload',\n\n       // Start upload progress\n       enableUpload: true\n     }\n   );\n\nconst App = () => {\n   const { loading, data, uploading, send } = useRequest(uploadFile, {\n     immediate: false\n   });\n\n   const handleImageChoose = () => {\n     Taro. chooseImage({\n       success: chooseImageRes => {\n         const tempFilePaths = chooseImageRes.tempFilePaths;\n         send('fileName', tempFilePaths[0], {\n           extra1: 'a',\n           extra2: 'b'\n         });\n       }\n     });\n   };\n\n   return (\n     { loading ? <View>Uploading...</View> : null }\n     <View>Upload progress: { uploading.loaded }/{ uploading.total }</View>\n     <Button onClick={handleImageChoose}>Upload Image</Button>\n     {/* ... */}\n   )\n}\n"))),(0,o.kt)(l.Z,{value:"1",label:"vue",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},"<tempate>\n   <view v-if=\"loading\">Uploading...</view>\n   <view>Upload progress: {{ uploading.loaded }}/{{ uploading.total }}</view>\n   <button @click=\"handleImageChoose\">Upload image</button>\n   \x3c!-- ... --\x3e\n</template>\n\n<script setup>\n   const uploadFile = (name, filePath, formData) =>\n     alovaInst. Post(\n       '/uploadImg',\n       {\n         name,\n         filePath,\n\n         // Additional data will be passed into formData of uni.uploadFile\n         ...formData\n       },\n       {\n         // Set the request method to upload, and the adapter will call uni.uploadFile\n         requestType: 'upload',\n\n         // Start upload progress\n         enableUpload: true\n       }\n     );\n\n   const { loading, data, uploading, send } = useRequest(uploadFile, {\n     immediate: false\n   });\n\n   const handleImageChoose = () => {\n     Taro. chooseImage({\n       success: chooseImageRes => {\n         const tempFilePaths = chooseImageRes.tempFilePaths;\n         send('fileName', tempFilePaths[0], {\n           extra1: 'a',\n           extra2: 'b'\n         });\n       }\n     });\n   };\n<\/script>\n")))),(0,o.kt)("h3",{id:"download"},"download"),(0,o.kt)("p",null,"When ",(0,o.kt)("inlineCode",{parentName:"p"},"requestType: 'download'")," is set in the ",(0,o.kt)("em",{parentName:"p"},"config")," of the method instance, it means to download the file, and the request adapter will call ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.downloadFile"),"."),(0,o.kt)("p",null,"Similarly, it is fully compatible with ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.downloadFile"),", you can specify ",(0,o.kt)("a",{parentName:"p",href:"https://taro-docs.jd.com/docs/apis/network/download/downloadFile"},"all configuration items")," supported by ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.downloadFile"),", if there are additional parameters to be set, please specify them in ",(0,o.kt)("em",{parentName:"p"},"config")," of the method instance."),(0,o.kt)(r.Z,{groupId:"framework",mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"2",label:"react",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"const downloadFile = filePath =>\n   alovaInst. Get('/bigImage. jpg', {\n     // Set the request method to download, and the adapter will call uni.downloadFile\n     requestType: 'download',\n     filePath,\n\n     // Start download progress\n     enableDownload: true\n   });\n\nconst App = () => {\n   const { loading, data, downloading, send } = useRequest(downloadFile, {\n     immediate: false\n   });\n   const handleImageDownload = () => {\n     send('file_save_path');\n   };\n\n   return (\n     { loading ? <View>Downloading...</View> : null }\n     <View>Download progress: { downloading.loaded }/{ downloading.total }</View>\n     <Button onClick={handleImageDownload}>Download image</Button>\n     {/* ... */}\n   );\n}\n"))),(0,o.kt)(l.Z,{value:"1",label:"vue",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},"<tempate>\n   <view v-if=\"loading\">Downloading...</view>\n   <view>Download progress: {{ downloading.loaded }}/{{ downloading.total }}</view>\n   <button @click=\"handleImageDownload\">Download image</button>\n   \x3c!-- ... --\x3e\n</template>\n\n<script setup>\n   const downloadFile = filePath =>\n     alovaInst. Get('/bigImage. jpg', {\n       // Set the request method to download, and the adapter will call uni.downloadFile\n       requestType: 'download',\n       filePath,\n\n       // Start download progress\n       enableDownload: true\n     });\n\n   const { loading, data, downloading, send } = useRequest(downloadFile, {\n     immediate: false\n   });\n\n   const handleImageDownload = () => {\n     send('file_save_path');\n   };\n<\/script>\n")))),(0,o.kt)("h2",{id:"mock-request-adapter-compatible"},"Mock request adapter compatible"),(0,o.kt)("p",null,"When using Taro to develop applications, we may still need to use mock requests, but by default, the response data of ",(0,o.kt)("a",{parentName:"p",href:"../extension/alova-mock"},"Mock Request Adapter (@alova/mock)")," is a ",(0,o.kt)("inlineCode",{parentName:"p"},"Response")," instance, That is, it is compatible with the ",(0,o.kt)("inlineCode",{parentName:"p"},"GlobalFetch")," request adapter by default. When used in the Taro environment, we need to make the response data of the simulated request adapter compatible with the Taro adapter, so you need to use the ",(0,o.kt)("strong",{parentName:"p"},"@alova/adapter-taro")," package exported ",(0,o.kt)("inlineCode",{parentName:"p"},"taroMockResponse")," as response adapter."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { defineMock, createAlovaMockAdapter } from '@alova/mock';\nimport AdapterTaro, { taroRequestAdapter, taroMockResponse } from '@alova/adapter-taro';\n\nconst mocks = defineMock({\n  //...\n});\n\n// mock data request adapter\nexport default createAlovaMockAdapter([mocks], {\n  // After specifying the taro request adapter, requests that do not match the simulated interface will use this adapter to send requests\n  httpAdapter: taroRequestAdapter,\n\n  // Simulate the response adapter, after specifying, the response data will be converted to a taro-compatible data format\n  onMockResponse: taroMockResponse\n});\n\nexport const alovaInst = createAlova({\n  baseURL: 'https://api.alovajs.org',\n  timeout: 5000,\n  ...AdapterTaro({\n    // Control whether to use the simulated request adapter through environment variables\n    mockRequest: process.env.NODE_ENV === 'development' ? mockAdapter : undefined\n  })\n  //...\n});\n")),(0,o.kt)("h2",{id:"typescript"},"Typescript"),(0,o.kt)("p",null,"The taro request adapter provides complete type adaptation, and the type of method configuration and response data will exactly match the type of taro."),(0,o.kt)("h3",{id:"method-configuration"},"method configuration"),(0,o.kt)("p",null,"When creating a method instance, in addition to the general configuration items in the method, you can also use the configuration items in ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.request"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.uploadFile")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.downloadFile"),", we have removed the type and method Items that conflict with the common configuration of the instance."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"/**\n * Taro.request requests additional parameters\n */\nexport type TaroRequestConfig = Omit<\n  Taro.request.Option,\n  'url' | 'data' | 'header' | 'method' | 'timeout' | 'success' | 'fail' | 'complete'\n>;\n\n/**\n * Taro.uploadFile additional parameter\n */\nexport type TaroUploadConfig = Omit<\n  Taro.uploadFile.Option,\n  'url' | 'filePath' | 'name' | 'header' | 'formData' | 'timeout' | 'success' | 'fail' | 'complete'\n>;\n\n/**\n * Taro.downloadFile additional parameters\n */\nexport type TaroDownloadConfig = Omit<\n  Taro.downloadFile.Option,\n  'url' | 'header' | 'timeout' | 'success' | 'fail' | 'complete'\n>;\n\n/**\n * Merged request configuration parameters\n */\nexport type TaroConfig = {\n  /**\n   * Request type, upload means upload, download means download, not filling means normal request\n   */\n  requestType?: 'upload' | 'download';\n} & TaroRequestConfig &\n  TaroUploadConfig &\n  TaroDownloadConfig;\n")),(0,o.kt)("h3",{id:"response-data"},"Response data"),(0,o.kt)("p",null,"Because the taro request adapter is compatible with ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.request"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.uploadFile")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"Taro.downloadFile"),", but their response value types are slightly different, so the response data type is as follows:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"type TaroResponse =\n  // The response type of Taro.request\n  | Taro.request.SuccessCallbackResult<any>\n\n  // The response type of Taro.uploadFile\n  | Taro.uploadFile.SuccessCallbackResult\n\n  // The response type of Taro.downloadFile\n  | Taro.downloadFile.FileSuccessCallbackResult;\n")),(0,o.kt)("p",null,"In actual use, we usually need to process the response data globally. It is recommended to judge the returned data separately. A simple example is as follows:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const alovaInst = createAlova({\n  baseURL: 'https://api.alovajs.org',\n  ...AdapterTaro(),\n  responded(response) {\n    const { statusCode, data } = response as Taro.request.SuccessCallbackResult<any>;\n    if (statusCode >= 400) {\n      throw new Error('request error');\n    }\n    return data || null;\n  }\n});\n")))}m.isMDXComponent=!0}}]);