import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as o,a as s,b as n,d as p,w as c,f as i,r as l}from"./app.4763b10d.js";const r={},d=i(`<p>在<code>alova</code>中，每个请求都对应一个 method 实例表示，它描述了一次请求的 url、请求头、请求参数，以及响应数据加工、缓存加工数据等请求行为参数，但它不会实际发出请求。</p><h2 id="创建实例" tabindex="-1"><a class="header-anchor" href="#创建实例" aria-hidden="true">#</a> 创建实例</h2><p><code>Method</code>实例的创建也类似<code>axios</code>的请求发送函数，我们先来创建一个获取 todo 列表的<code>Method</code>实例。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 创建一个Get实例，描述一次Get请求的信息</span>
<span class="token keyword">const</span> todoListGetter <span class="token operator">=</span> alovaInstance<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&#39;/todo/list&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
	<span class="token comment">// 请求头</span>
	<span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token string-property property">&#39;Content-Type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;application/json;charset=UTF-8&#39;</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token comment">// params参数将会以?的形式拼接在url后面</span>
	<span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">userId</span><span class="token operator">:</span> <span class="token number">1</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着再创建一个提交 todo 的，POST请求的<code>Method</code>实例。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 创建Post实例</span>
<span class="token keyword">const</span> createTodoPoster <span class="token operator">=</span> alovaInstance<span class="token punctuation">.</span><span class="token function">Post</span><span class="token punctuation">(</span>
	<span class="token string">&#39;/todo/create&#39;</span><span class="token punctuation">,</span>
	<span class="token comment">// 第二个参数是http body数据</span>
	<span class="token punctuation">{</span>
		<span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;test todo&#39;</span><span class="token punctuation">,</span>
		<span class="token literal-property property">time</span><span class="token operator">:</span> <span class="token string">&#39;12:00&#39;</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token comment">// 第三个参数是请求配置相关信息</span>
	<span class="token punctuation">{</span>
		<span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token string-property property">&#39;Content-Type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;application/json;charset=UTF-8&#39;</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token comment">// ...</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>⚠️ 注意：<code>Method</code>实例里只是保存了请求所需要的信息，它不会发出请求，而是需要通过<code>use hook</code>发送请求（后续详情），这点与<code>axios</code>不同。</p></blockquote><h2 id="设置更细粒度的超时时间" tabindex="-1"><a class="header-anchor" href="#设置更细粒度的超时时间" aria-hidden="true">#</a> 设置更细粒度的超时时间</h2><p>全局的请求超时时间作用于所有的<code>Method</code>实例，但很多时候我们需要根据特殊请求设置不同的超时时间，此时我们可以设置请求级的超时时间，它将覆盖全局的<code>timeout</code>参数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 请求级别的请求超时时间</span>
<span class="token keyword">const</span> todoListGetter <span class="token operator">=</span> alovaInstance<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&#39;/todo/list&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
	<span class="token comment">// 省略其他参数...</span>
	<span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token number">10000</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line"> </div><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="请求方法类型" tabindex="-1"><a class="header-anchor" href="#请求方法类型" aria-hidden="true">#</a> 请求方法类型</h2>`,11),u=s("code",null,"Alova",-1);function v(k,m){const a=l("RouterLink");return t(),o("div",null,[d,s("p",null,[u,n("提供了包括 GET、POST、PUT、DELETE、HEAD、OPTIONS、PATCH 七种请求方法的抽象实例，具体的使用方式可以阅读 "),p(a,{to:"/zh/next-step/request-method-details.html"},{default:c(()=>[n("请求方法详解")]),_:1}),n("。")])])}const y=e(r,[["render",v],["__file","request-method-instance.html.vue"]]);export{y as default};
