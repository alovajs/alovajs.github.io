import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,f as p}from"./app.4763b10d.js";const e={},t=p(`<h2 id="延迟数据更新" tabindex="-1"><a class="header-anchor" href="#延迟数据更新" aria-hidden="true">#</a> 延迟数据更新</h2><p>你可能会有这样的需求：创建一个todo项时设为静默提交，并立即调用<code>updateState</code>更新todo列表，这样虽然可以立即在界面上看到新增的todo项，但还没有id，因此这个todo项无法被编辑和删除，除非重新请求完整数据。</p><p>延迟数据更新就是用来解决这个问题的，它支持你用一种占位格式来标记id字段，在响应前会将占位符替换为<code>default</code>值或<code>undefined</code>，然后在响应后自动把实际数据替换占位标记。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> newTodo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;...&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">time</span><span class="token operator">:</span> <span class="token string">&#39;10:00&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> onSuccess <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useRequest</span><span class="token punctuation">(</span><span class="token comment">/*...*/</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 静默提交</span>
<span class="token function">onSuccess</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">updateState</span><span class="token punctuation">(</span><span class="token comment">/*...*/</span><span class="token punctuation">,</span> <span class="token parameter">todoList</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> newTodoWithPlaceholder <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token comment">// 占位格式完整写法</span>
      <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// action的值是固定写法</span>
        <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">&#39;responsed&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// 延迟更新的getter函数</span>
        <span class="token comment">// 它将在响应后调用并将返回值替换到id属性上，res参数是响应数据</span>
        <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span>id<span class="token punctuation">,</span>

        <span class="token comment">// 数据更新前的默认值，可选项，不设时为undefined</span>
        <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token operator">...</span>newTodo<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">[</span>
      <span class="token operator">...</span>todoList<span class="token punctuation">,</span>
      newTodoWithPlaceholder<span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上<code>newTodoWithPlaceholder</code>数据在响应前将会被编译成如下的值，此时todo列表页可以立即展示新的todo项。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token comment">// 因为设置了请求前的默认值</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;...&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">time</span><span class="token operator">:</span> <span class="token string">&#39;10:00&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>响应后id将被getter函数的返回值替换，此时新的todo项也支持编辑和删除等操作了。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 假设响应数据为  { id: 10 }</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;...&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">time</span><span class="token operator">:</span> <span class="token string">&#39;10:00&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>延迟数据占位符可以用在任意位置。</p><p>用在数组中</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>  <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">&#39;responsed&#39;</span><span class="token punctuation">,</span> <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span>id <span class="token punctuation">}</span><span class="token punctuation">]</span>

<span class="token comment">// 响应前的数据</span>
<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">]</span>

<span class="token comment">// 响应后的数据</span>
<span class="token comment">// 假设响应数据为  { id: 10 }</span>
<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用在对象上</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">&#39;responsed&#39;</span><span class="token punctuation">,</span> <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span>id <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">&#39;responsed&#39;</span><span class="token punctuation">,</span> <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token comment">// 占位符设置到对象属性上时，可如下简写</span>
<span class="token comment">// key以“+”开头</span>
<span class="token punctuation">{</span>
  <span class="token string-property property">&#39;+a&#39;</span><span class="token operator">:</span> <span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span>id<span class="token punctuation">,</span>  <span class="token comment">// 只设置了getter函数</span>
  <span class="token string-property property">&#39;+b&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>   <span class="token comment">// 设置了getter函数和默认值</span>
<span class="token punctuation">}</span>

<span class="token comment">// 响应前的数据</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 响应后的数据</span>
<span class="token comment">// 假设响应数据为  { id: 10 }</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用在非数组和对象上</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 直接以占位符表示</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">&#39;responsed&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span>data<span class="token punctuation">,</span>
  <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 响应前的数据</span>
<span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span>

<span class="token comment">// 响应后的数据</span>
<span class="token comment">// 假设响应数据为  { data: { name: &#39;Tom&#39;, age: 18 } }</span>
<span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Tom&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用在数组和对象的组合中</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">[</span>
  <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span><span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">&#39;responsed&#39;</span><span class="token punctuation">,</span> <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
  <span class="token number">4</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;+c&#39;</span><span class="token operator">:</span> <span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
    <span class="token literal-property property">d</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">&#39;responsed&#39;</span><span class="token punctuation">,</span> <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">24</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">e</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span><span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">&#39;responsed&#39;</span><span class="token punctuation">,</span> <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">36</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token number">3</span><span class="token punctuation">,</span>
      <span class="token number">6</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

<span class="token comment">// 响应前的数据</span>
<span class="token punctuation">[</span>
  <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token number">12</span><span class="token punctuation">,</span>
  <span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span>id<span class="token punctuation">,</span>  <span class="token comment">// 简写只能在+为前缀key的对象中使用，因此不编译</span>
  <span class="token number">4</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
    <span class="token literal-property property">d</span><span class="token operator">:</span> <span class="token number">24</span><span class="token punctuation">,</span>
    <span class="token literal-property property">e</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">36</span><span class="token punctuation">,</span>
      <span class="token number">3</span><span class="token punctuation">,</span>
      <span class="token number">6</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

<span class="token comment">// 响应后的数据</span>
<span class="token comment">// 假设响应数据为  { id: 10 }</span>
<span class="token punctuation">[</span>
  <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span>id<span class="token punctuation">,</span>  <span class="token comment">// 简写只能在+为前缀key的对象中使用，因此不编译</span>
  <span class="token number">4</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">10</span>
    <span class="token literal-property property">d</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token literal-property property">e</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">10</span><span class="token punctuation">,</span>
      <span class="token number">3</span><span class="token punctuation">,</span>
      <span class="token number">6</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>⚠️限制1：延迟数据更新只有在静默模式下，且在<code>onSuccess</code>回调函数中同步调用<code>updateState</code>函数有效，否则可能会造成数据错乱或报错。</p></blockquote><blockquote><p>⚠️限制2：如果<code>updateState</code>更新后的值中有循环引用的，延迟数据更新将不再生效</p></blockquote>`,19),o=[t];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","delayed-data-update.html.vue"]]);export{d as default};
