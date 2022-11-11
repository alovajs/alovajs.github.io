import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,f as e}from"./app.4763b10d.js";const t={},p=e(`<p><code>alova</code>中涉及多个需要数据持久化的功能，如持久化缓存、静默提交和离线提交。在默认情况下，<code>alova</code>会使用<code>localStorage</code>来存储持久化数据，但考虑到非浏览器环境下，因此也支持了自定义。</p><p>自定义存储适配器同样非常简单，你只需要指定保存数据、获取数据，以及移除数据的函数即可，大致是这样的。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> customStorageAdapter <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">setItem</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 保存数据</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">getItem</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取数据</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 移除数据</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在创建<code>alova</code>实例时传入这个适配器即可。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> alovaInstance <span class="token operator">=</span> <span class="token function">createAlova</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">storageAdapter</span><span class="token operator">:</span> customStorageAdapter
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),c=[p];function o(l,i){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","custom-storage-adapter.html.vue"]]);export{d as default};
