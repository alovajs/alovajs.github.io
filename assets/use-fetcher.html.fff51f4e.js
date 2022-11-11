import{_ as r}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as k,c as d,d as c,w as a,a as n,b as s,f as u,r as p}from"./app.4763b10d.js";const m={},v=u('<p>当你有以下需求时：</p><ol><li>预加载后续流程中将会使用到的数据并存放在缓存中，让用户不再等待数据加载的过程；</li><li>便捷地实现跨页面更新数据（类似全局状态），例如修改 todo 列表的某一项后重新拉取最新数据，响应后将刷新界面。</li></ol><p><code>useFetcher</code>就是用于实现以上场景的hook，通过它获取的响应数据不能直接接收到，但通过它拉取的数据除了会更新缓存外还会更新对应的状态，从而重新渲染视图。</p><p>你可以用它预拉取数据并保存到缓存中，或优雅地跨组件更新状态，例如修改 todo 列表的某一项后重新拉取最新数据，响应后将会刷新界面</p><p>与<code>useRequest</code>和<code>useWatcher</code>相比，<code>useFetcher</code>不返回<code>data</code>字段，将<code>loading</code>改名为了<code>fetching</code>，也没有<code>send</code>函数，但多了一个<code>fetch</code>函数，可以重复利用 fetch 函数拉取不同接口的数据，此时你可以使用 <code>fetching</code> 和 <code>error</code> 状态统一渲染视图，从而达到统一处理的目的。</p><h2 id="跨模块-组件更新视图" tabindex="-1"><a class="header-anchor" href="#跨模块-组件更新视图" aria-hidden="true">#</a> 跨模块/组件更新视图</h2><p>下面我们来实现修改某个 todo 数据，并重新拉取最新的 todo 列表数据，让视图更新。</p>',7),b=n("div",{class:"language-vue line-numbers-mode","data-ext":"vue"},[n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
	`),n("span",{class:"token comment"},"<!-- 渲染统一的拉取状态。 -->"),s(`
	`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),s(),n("span",{class:"token attr-name"},"v-if"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("fetching"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s("{{ 正在后台拉取数据... }}"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),s(`

	`),n("span",{class:"token comment"},"<!-- ... -->"),s(`
	`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("button")]),s(),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("handleSubmit"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s("修改todo项"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("button")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),s(),n("span",{class:"token attr-name"},"setup"),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token function-variable function"},"getTodoList"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token parameter"},"currentPage"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"return"),s(" alovaInstance"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'/tood/list'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token comment"},"// 注意：这边设置了name属性，用于在无法直接指定Method实例时，过滤出需要的Method实例"),s(`
		`),n("span",{class:"token comment"},"// 详见后续的《Method实例匹配器》章节"),s(`
		`),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'todoList'"),n("span",{class:"token punctuation"},","),s(`
		`),n("span",{class:"token literal-property property"},"params"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
			currentPage`),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token literal-property property"},"pageSize"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"10"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token comment"},"// fetching属性与loading相同，发送拉取请求时为true，请求结束后为false"),s(`
	fetching`),n("span",{class:"token punctuation"},","),s(`
	error`),n("span",{class:"token punctuation"},","),s(`
	onSuccess`),n("span",{class:"token punctuation"},","),s(`
	onError`),n("span",{class:"token punctuation"},","),s(`
	onComplete`),n("span",{class:"token punctuation"},","),s(`

	`),n("span",{class:"token comment"},"// 调用fetch后才会发送请求拉取数据，可以重复调用fetch多次拉取不同接口的数据"),s(`
	fetch
`),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"useFetcher"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token comment"},"// 在事件中触发数据拉取"),s(`
`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token function-variable function"},"handleSubmit"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token comment"},"// todo项修改..."),s(`

	`),n("span",{class:"token comment"},"// 开始拉取更新后的数据"),s(`
	`),n("span",{class:"token comment"},"// 情况1：当你明确知道拉取todoList第一页数据时，传入一个Method实例"),s(`
	`),n("span",{class:"token function"},"fetch"),n("span",{class:"token punctuation"},"("),n("span",{class:"token function"},"getTodoList"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`

	`),n("span",{class:"token comment"},"// 情况2：当你只知道拉取todoList最后一次请求的数据时，通过Method实例匹配器来筛选"),s(`
	`),n("span",{class:"token function"},"fetch"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'todoList'"),n("span",{class:"token punctuation"},","),s(`
		`),n("span",{class:"token function-variable function"},"filter"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("method"),n("span",{class:"token punctuation"},","),s(" index"),n("span",{class:"token punctuation"},","),s(" ary")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token comment"},"// 返回true来指定需要拉取的Method实例"),s(`
			`),n("span",{class:"token keyword"},"return"),s(" index "),n("span",{class:"token operator"},"==="),s(" ary"),n("span",{class:"token punctuation"},"."),s("length "),n("span",{class:"token operator"},"-"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},";"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")]),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),g=n("div",{class:"language-jsx line-numbers-mode","data-ext":"jsx"},[n("pre",{class:"language-jsx"},[n("code",null,[n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token function-variable function"},"getTodoList"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token parameter"},"currentPage"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"return"),s(" alovaInstance"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'/tood/list'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token comment"},"// 注意：这边设置了name属性，用于在无法直接指定Method实例时，过滤出需要的Method实例"),s(`
		`),n("span",{class:"token comment"},"// 详见后续的《Method实例匹配器》章节"),s(`
		`),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'todoList'"),n("span",{class:"token punctuation"},","),s(`
		`),n("span",{class:"token literal-property property"},"params"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
			currentPage`),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token literal-property property"},"pageSize"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"10"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token function-variable function"},"App"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token comment"},"// fetching属性与loading相同，发送拉取请求时为true，请求结束后为false"),s(`
		fetching`),n("span",{class:"token punctuation"},","),s(`
		error`),n("span",{class:"token punctuation"},","),s(`
		onSuccess`),n("span",{class:"token punctuation"},","),s(`
		onError`),n("span",{class:"token punctuation"},","),s(`
		onComplete`),n("span",{class:"token punctuation"},","),s(`

		`),n("span",{class:"token comment"},"// 调用fetch后才会发送请求拉取数据，可以重复调用fetch多次拉取不同接口的数据"),s(`
		fetch
	`),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"useFetcher"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`

	`),n("span",{class:"token comment"},"// 在事件中触发数据拉取"),s(`
	`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token function-variable function"},"handleSubmit"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token comment"},"// 假设已完成todo项的修改..."),s(`

		`),n("span",{class:"token comment"},"// 开始拉取更新后的数据"),s(`
		`),n("span",{class:"token comment"},"// 情况1：当你明确知道拉取todoList第一页数据时，传入一个Method实例"),s(`
		`),n("span",{class:"token function"},"fetch"),n("span",{class:"token punctuation"},"("),n("span",{class:"token function"},"getTodoList"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`

		`),n("span",{class:"token comment"},"// 情况2：当你只知道拉取todoList最后一次请求的数据时，通过Method实例匹配器来筛选"),s(`
		`),n("span",{class:"token function"},"fetch"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'todoList'"),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token function-variable function"},"filter"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("method"),n("span",{class:"token punctuation"},","),s(" index"),n("span",{class:"token punctuation"},","),s(" ary")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
				`),n("span",{class:"token comment"},"// 返回true来指定需要拉取的Method实例"),s(`
				`),n("span",{class:"token keyword"},"return"),s(" index "),n("span",{class:"token operator"},"==="),s(" ary"),n("span",{class:"token punctuation"},"."),s("length "),n("span",{class:"token operator"},"-"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},";"),s(`
			`),n("span",{class:"token punctuation"},"}"),s(`
		`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`

	`),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"("),s(`
		`),n("span",{class:"token punctuation"},"{"),n("span",{class:"token comment"},"/* 渲染统一的拉取状态 */"),n("span",{class:"token punctuation"},"}"),s(`
		`),n("span",{class:"token punctuation"},"{"),s(" fetching "),n("span",{class:"token operator"},"?"),s(),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"{"),s(" 正在后台拉取数据"),n("span",{class:"token operator"},"..."),s(),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),s(),n("span",{class:"token operator"},":"),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token punctuation"},"}"),s(`
		`),n("span",{class:"token punctuation"},"{"),n("span",{class:"token comment"},"/* ... */"),n("span",{class:"token punctuation"},"}"),s(`
		`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("button")]),s(),n("span",{class:"token attr-name"},"onClick"),n("span",{class:"token script language-javascript"},[n("span",{class:"token script-punctuation punctuation"},"="),n("span",{class:"token punctuation"},"{"),s("handleSubmit"),n("span",{class:"token punctuation"},"}")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token plain-text"},"修改todo项"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("button")]),n("span",{class:"token punctuation"},">")]),s(`
	`),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),h=n("div",{class:"language-html line-numbers-mode","data-ext":"html"},[n("pre",{class:"language-html"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token function-variable function"},"getTodoList"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token parameter"},"currentPage"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"return"),s(" alovaInstance"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'/tood/list'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token comment"},"// 注意：这边设置了name属性，用于在无法直接指定Method实例时，过滤出需要的Method实例"),s(`
		`),n("span",{class:"token comment"},"// 详见后续的《Method实例匹配器》章节"),s(`
		`),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'todoList'"),n("span",{class:"token punctuation"},","),s(`
		`),n("span",{class:"token literal-property property"},"params"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
			currentPage`),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token literal-property property"},"pageSize"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"10"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token comment"},"// fetching属性与loading相同，发送拉取请求时为true，请求结束后为false"),s(`
	fetching`),n("span",{class:"token punctuation"},","),s(`
	error`),n("span",{class:"token punctuation"},","),s(`
	onSuccess`),n("span",{class:"token punctuation"},","),s(`
	onError`),n("span",{class:"token punctuation"},","),s(`
	onComplete`),n("span",{class:"token punctuation"},","),s(`

	`),n("span",{class:"token comment"},"// 调用fetch后才会发送请求拉取数据，可以重复调用fetch多次拉取不同接口的数据"),s(`
	fetch
`),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"useFetcher"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token comment"},"// 在事件中触发数据拉取"),s(`
`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token function-variable function"},"handleSubmit"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token comment"},"// 假设已完成todo项的修改..."),s(`

	`),n("span",{class:"token comment"},"// 开始拉取更新后的数据"),s(`
	`),n("span",{class:"token comment"},"// 情况1：当你明确知道拉取todoList第一页数据时，传入一个Method实例"),s(`
	`),n("span",{class:"token function"},"fetch"),n("span",{class:"token punctuation"},"("),n("span",{class:"token function"},"getTodoList"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`

	`),n("span",{class:"token comment"},"// 情况2：当你只知道拉取todoList最后一次请求的数据时，通过Method实例匹配器来筛选"),s(`
	`),n("span",{class:"token function"},"fetch"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'todoList'"),n("span",{class:"token punctuation"},","),s(`
		`),n("span",{class:"token function-variable function"},"filter"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("method"),n("span",{class:"token punctuation"},","),s(" index"),n("span",{class:"token punctuation"},","),s(" ary")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token comment"},"// 返回true来指定需要拉取的Method实例"),s(`
			`),n("span",{class:"token keyword"},"return"),s(" index "),n("span",{class:"token operator"},"==="),s(" ary"),n("span",{class:"token punctuation"},"."),s("length "),n("span",{class:"token operator"},"-"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},";"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token comment"},"<!-- 渲染统一的拉取状态 -->"),s(`
{#if $fetching}
	`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),n("span",{class:"token punctuation"},">")]),s("{{ 正在后台拉取数据... }}"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),s(`
{/if}
`),n("span",{class:"token comment"},"<!-- ... -->"),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("button")]),s(),n("span",{class:"token attr-name"},[n("span",{class:"token namespace"},"on:"),s("click")]),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),s("{handleSubmit}")]),n("span",{class:"token punctuation"},">")]),s("修改todo项"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("button")]),n("span",{class:"token punctuation"},">")]),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),f=n("code",null,"Method",-1),y=n("h2",{id:"预加载数据",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#预加载数据","aria-hidden":"true"},"#"),s(" 预加载数据")],-1),w=n("p",null,"以下实现 todo 列表分页场景下，下一页数据的预加载功能。",-1),_=n("div",{class:"language-vue line-numbers-mode","data-ext":"vue"},[n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
	`),n("span",{class:"token comment"},"<!-- ... -->"),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),s(),n("span",{class:"token attr-name"},"setup"),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token comment"},"// method实例创建函数"),s(`
`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token function-variable function"},"getTodoList"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token parameter"},"currentPage"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"return"),s(" alovaInstance"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'/tood/list'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token literal-property property"},"params"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
			currentPage`),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token literal-property property"},"pageSize"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"10"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"{"),s(" fetch "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"useFetcher"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"const"),s(" currentPage "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"ref"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"{"),s(`
	data`),n("span",{class:"token punctuation"},","),s(`
	onSuccess
`),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"useWatcher"),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token function"},"getTodoList"),n("span",{class:"token punctuation"},"("),s("currentPage"),n("span",{class:"token punctuation"},"."),s("value"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(`
	`),n("span",{class:"token punctuation"},"["),s("currentPage"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
	`),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token literal-property property"},"immediate"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"true"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token comment"},"// 当前页请求成功时预拉取下一页的数据"),s(`
`),n("span",{class:"token comment"},"// 实现当翻页到下一页时不需要等待请求"),s(`
`),n("span",{class:"token function"},"onSuccess"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token function"},"fetch"),n("span",{class:"token punctuation"},"("),n("span",{class:"token function"},"getTodoList"),n("span",{class:"token punctuation"},"("),s("currentPage"),n("span",{class:"token punctuation"},"."),s("value "),n("span",{class:"token operator"},"+"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")]),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),L=n("div",{class:"language-jsx line-numbers-mode","data-ext":"jsx"},[n("pre",{class:"language-jsx"},[n("code",null,[n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"{"),s(" useState "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'react'"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token comment"},"// method实例创建函数"),s(`
`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token function-variable function"},"getTodoList"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token parameter"},"currentPage"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"return"),s(" alovaInstance"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'/tood/list'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token literal-property property"},"params"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
			currentPage`),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token literal-property property"},"pageSize"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"10"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token function-variable function"},"App"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"{"),s(" fetch "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"useFetcher"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
	`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"["),s("currentPage"),n("span",{class:"token punctuation"},","),s(" setCurrentPage"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"useState"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
	`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"{"),s(`
		data`),n("span",{class:"token punctuation"},","),s(`
		onSuccess
	`),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"useWatcher"),n("span",{class:"token punctuation"},"("),s(`
		`),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token function"},"getTodoList"),n("span",{class:"token punctuation"},"("),s("currentPage"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(`
		`),n("span",{class:"token punctuation"},"["),s("currentPage"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
		`),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token literal-property property"},"immediate"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"true"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
	`),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`

	`),n("span",{class:"token comment"},"// 当前页请求成功时预拉取下一页的数据"),s(`
	`),n("span",{class:"token comment"},"// 实现当翻页到下一页时不需要等待请求"),s(`
	`),n("span",{class:"token function"},"onSuccess"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token function"},"fetch"),n("span",{class:"token punctuation"},"("),n("span",{class:"token function"},"getTodoList"),n("span",{class:"token punctuation"},"("),s("currentPage "),n("span",{class:"token operator"},"+"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`

	`),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"("),s(`
		`),n("span",{class:"token punctuation"},"{"),n("span",{class:"token comment"},"/* ... */"),n("span",{class:"token punctuation"},"}"),s(`
	`),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),x=n("div",{class:"language-html line-numbers-mode","data-ext":"html"},[n("pre",{class:"language-html"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"{"),s(" writable "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'svelte/store'"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token comment"},"// method实例创建函数"),s(`
`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token function-variable function"},"getTodoList"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token parameter"},"currentPage"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"return"),s(" alovaInstance"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'/tood/list'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token literal-property property"},"params"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
			currentPage`),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token literal-property property"},"pageSize"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"10"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"{"),s(" fetch "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"useFetcher"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token keyword"},"const"),s(" currentPage "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"writable"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"{"),s(`
	data`),n("span",{class:"token punctuation"},","),s(`
	onSuccess
`),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"useWatcher"),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token function"},"getTodoList"),n("span",{class:"token punctuation"},"("),s("$currentPage"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(`
	`),n("span",{class:"token punctuation"},"["),s("currentPage"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
	`),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token literal-property property"},"immediate"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"true"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token comment"},"// 当前页请求成功时预拉取下一页的数据"),s(`
`),n("span",{class:"token comment"},"// 实现当翻页到下一页时不需要等待请求"),s(`
`),n("span",{class:"token function"},"onSuccess"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token function"},"fetch"),n("span",{class:"token punctuation"},"("),n("span",{class:"token function"},"getTodoList"),n("span",{class:"token punctuation"},"("),s("$currentPage "),n("span",{class:"token operator"},"+"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token comment"},"<!-- views... -->"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),P=u(`<div class="custom-container info"><p class="custom-container-title">📢注意事项</p><ol><li><p><code>useFetcher</code> 请求完成后只更新缓存，且如果发现该<code>Method</code>实例下还有<code>data</code>状态，也会同步更新它，从而保证页面数据一致，这是<code>useFetcher</code>用于跨模块/组件更新视图的保证。</p></li><li><p>它默认忽略缓存强制发起请求，你也可以通过以下方式关闭。</p></li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">useFetcher</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">force</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>更多关于强制发送请求的内容，查看 <a href="#%E5%BC%BA%E5%88%B6%E5%8F%91%E9%80%81%E8%AF%B7%E6%B1%82">进阶-强制发送请求</a></p>`,2);function S(M,T){const l=p("Tabs"),i=p("RouterLink");return k(),d("div",null,[v,c(l,{id:"30",data:[{title:"vue"},{title:"react"},{title:"svelte"}]},{tab0:a(({title:t,value:e,isActive:o})=>[b]),tab1:a(({title:t,value:e,isActive:o})=>[g]),tab2:a(({title:t,value:e,isActive:o})=>[h]),_:1}),n("blockquote",null,[n("p",null,[s("更多"),f,s("实例匹配器的使用方法见 "),c(i,{to:"/zh/next-step/method-instance-matcher.html"},{default:a(()=>[s("Method实例匹配器")]),_:1})])]),y,w,c(l,{id:"52",data:[{title:"vue"},{title:"react"},{title:"svelte"}]},{tab0:a(({title:t,value:e,isActive:o})=>[_]),tab1:a(({title:t,value:e,isActive:o})=>[L]),tab2:a(({title:t,value:e,isActive:o})=>[x]),_:1}),P])}const A=r(m,[["render",S],["__file","use-fetcher.html.vue"]]);export{A as default};
