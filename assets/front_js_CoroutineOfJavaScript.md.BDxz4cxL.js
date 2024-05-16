import{_ as s,c as i,o as a,a3 as n}from"./chunks/framework.CkL4CRoQ.js";const g=JSON.parse('{"title":"JavaScript 协程的发展","description":"","frontmatter":{"title":"JavaScript 协程的发展","date":"2022-06-22T00:00:00.000Z","sidebar":"auto","tags":["JavaScript"],"categories":["前端"]},"headers":[],"relativePath":"front/js/CoroutineOfJavaScript.md","filePath":"front/js/CoroutineOfJavaScript.md","lastUpdated":1715845410000}'),l={name:"front/js/CoroutineOfJavaScript.md"},t=n(`<h2 id="javascript-协程的发展" tabindex="-1">JavaScript 协程的发展 <a class="header-anchor" href="#javascript-协程的发展" aria-label="Permalink to &quot;JavaScript 协程的发展&quot;">​</a></h2><ul><li>同步代码</li><li>异步JavaScript: callback hell（回调地狱）</li><li>ES6引入 Promise/a+, 生成器Generators(语法 <em>function foo(){}</em>* 可以赋予函数执行暂停/保存上下文/恢复执行状态的功能), 新关键词yield使生成器函数暂停.</li><li>ES7引入 async函数/await语法糖,async可以声明一个异步函数(将Generator函数和自动执行器，包装在一个函数里)，此函数需要返回一个 Promise 对象。await 可以等待一个 Promise 对象 resolve，并拿到结果,</li></ul><p>Promise中也利用了回调函数。在then和catch方法中都传入了一个回调函数，分别在Promise被满足和被拒绝时执行, 这样就就能让它能够被链接起来完成一系列任务。总之就是把层层嵌套的 callback 变成 .then().then()...，从而使代码编写和阅读更直观</p><p>生成器Generator的底层实现机制是协程Coroutine。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;foo start&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> yield</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;foo a&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, a)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    yield</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    yield</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;foo end&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> gen</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(gen.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().value); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// gen.send(&quot;a&quot;) // http://www.voidcn.com/article/p-syzbwqht-bvv.html SpiderMonkey引擎支持 send 语法</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(gen.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().value); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(gen.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().value); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().value); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().value); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">foo start</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">foo a undefined</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">2</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">foo start</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">foo start</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">*/</span></span></code></pre></div><h2 id="javascript-协程成熟体" tabindex="-1">JavaScript 协程成熟体 <a class="header-anchor" href="#javascript-协程成熟体" aria-label="Permalink to &quot;JavaScript 协程成熟体&quot;">​</a></h2><p><strong>Promise继续使用</strong></p><p>Promise 本质是一个状态机，用于表示一个异步操作的最终完成 (或失败), 及其结果值。它有三个状态：</p><ul><li>pending: 初始状态，既不是成功，也不是失败状态。</li><li>fulfilled: 意味着操作成功完成。</li><li>rejected: 意味着操作失败。</li></ul><p>最终 Promise 会有两种状态，一种成功，一种失败，当 pending 变化的时候，Promise 对象会根据最终的状态调用不同的处理函数。</p><p><strong>async、await语法糖</strong></p><p>async、await 是对 Generator 和 Promise 组合的封装, 使原先的异步代码在形式上更接近同步代码的写法,并且对错误处理/条件分支/异常堆栈/调试等操作更友好。Async、Await 实现了 Generator 的自动迭代，正因为 Async、Await 是对 Generator 和 Promise 组合的封装，<strong>所以 Async 和 Await 基本上就只能用来实现异步和并发了，而不具有协程的其他作用。</strong></p><ul><li><p>JavaScript 异步执行的运行机制</p><ol><li>所有任务都在主线程上执行，形成一个执行栈。</li><li>主线程之外，还存在一个&quot;任务队列&quot;（task queue）。只要异步任务有了运行结果，就在&quot;任务队列&quot;之中放置一个事件。</li><li>一旦&quot;执行栈&quot;中的所有同步任务执行完毕，系统就会读取&quot;任务队列&quot;。那些对应的异步任务，结束等待状态，进入执行栈并开始执行。</li></ol><p>遇到同步任务直接执行,遇到异步任务分类为宏任务(macro-task)和微任务(micro-task)。 当前执行栈执行完毕时会立刻先处理所有微任务队列中的事件，然后再去宏任务队列中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行。</p></li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>由于我们可以在用户态调度协程任务，所以，我们可以把一组互相依赖的任务设计成协程。这样，当一个协程任务完成之后，可以手动进行任务调度，把自己挂起(yield)，切换到另外一个协程执行。这样，由于我们可以控制程序主动让出资源，很多情况下将不需要对资源加锁。</p></div><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h3>`,15),p=[t];function h(k,e,r,o,E,d){return a(),i("div",null,p)}const y=s(l,[["render",h]]);export{g as __pageData,y as default};
