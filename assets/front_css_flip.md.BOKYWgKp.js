import{_ as s,c as n,o as a,a3 as p}from"./chunks/framework.CkL4CRoQ.js";const E=JSON.parse('{"title":"（转）FLIP 翻转动画 让所有动画都能达到流畅的60帧","description":"","frontmatter":{"title":"（转）FLIP 翻转动画 让所有动画都能达到流畅的60帧","date":"2022-08-02T00:00:00.000Z","sidebar":"auto","tags":["CSS"],"categories":["前端"]},"headers":[],"relativePath":"front/css/flip.md","filePath":"front/css/flip.md","lastUpdated":1715845410000}'),i={name:"front/css/flip.md"},l=p(`<h2 id="前置总结" tabindex="-1"><strong>前置总结</strong> <a class="header-anchor" href="#前置总结" aria-label="Permalink to &quot;**前置总结**&quot;">​</a></h2><p>FLIP技术可以让我们的动画更加流畅，同时也能降低复杂动画的开发难度，更重要的是，当我们跟别人聊前端的时候呢，可以抛给他一个专业名词，让他瞬间感觉前端也很高大上，可以成为我们对后端同学的一项技术壁垒。</p><p>当然了，网上介绍的有很多，今天呢我在简单讲解完原理后，会和大家一起手撸一个FLIP的简单例子。</p><p><strong>名词解释，FLIP是几个英文单词的缩写，简单介绍一下：</strong></p><p><strong>F：Fist</strong>—— 一个元素的起始位置</p><p><strong>L：Last</strong> —— 另一个元素的终止位置，注意另一个这个词，后面会有具体代码的体现</p><p><strong>I：Invert</strong> —— 计算&quot;F&quot;与&quot;L&quot;的差异，包括位置，大小等，并将差异用transform属性，添加到终止元素上，让它回到起始位置，也是此项技术的核心</p><p><strong>P：Play</strong> —— 添加transtion 过渡效果，清除Invert阶段添加进来transform，播放动画</p><h2 id="实现过程及原理" tabindex="-1"><strong>实现过程及原理</strong> <a class="header-anchor" href="#实现过程及原理" aria-label="Permalink to &quot;**实现过程及原理**&quot;">​</a></h2><p>1、使用getBoundingClientRect()方法获得，元素在渲染后在浏览器中所处的位置，这个方法会返回当前元素的一个矩阵，如图2-1</p><p><img src="https://pic4.zhimg.com/80/v2-9dc6283eb45e1226ecb41563ba40d283_720w.jpg" alt="img">2-1 getBoundingClientRect的返回值</p><p>具体意思我就不解释啦，就是字面的意思，比较常用的是x,y对应的就是left和top，是以浏览器左上角为0 0 进行计算的。</p><p>2、使用cloneNode()方法，克隆要放大的dom节点，然后给这个克隆出来的dom节点添加，放大和全局居中的样式，使用getBoundingClientRect()获得节点位置信息</p><p>3、“1”中的初始节点位置信息，与“2”中的渲染结束节点的位置信息，进行计算，将计算结果用transform属性赋值给克隆节点，让克隆节点与初始节点在空间上重合。</p><p>4、添加“transtion”过度效果，删除“3”阶段赋值transform 动画就会自动执行了，这里要注意一下，需要使用setTimeout卡一个宏队列。</p><p><strong>原理看起来有点麻烦，但实际写起来还是很方便的，我们上代码</strong>。</p><h2 id="代码实现" tabindex="-1"><strong>代码实现</strong> <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;**代码实现**&quot;">​</a></h2><p>说明：全量代码在文章的最后，有兴趣的同学可以直接复制后本地执行</p><p><strong>准备工作</strong></p><p>首先呢，要构建一下页面，把基本的dom都写出来，当然了，正常情况下我们会用list遍历渲染，这里我就直接写死了，html代码 与 css代码放在文章最后。</p><p>我们着重看一下picture-zoom-in这个样式的代码，由于我们在构建页面时，dom的宽高都不一样，所以呢，用了一个不定宽高div垂直居中的技巧，其中要特别注意的是transform: translate(-50% ,-50%) scale(2) ;这一行，在后面做动画的时候会涉及到它。</p><h2 id="开始写代码" tabindex="-1"><strong>开始写代码</strong> <a class="header-anchor" href="#开始写代码" aria-label="Permalink to &quot;**开始写代码**&quot;">​</a></h2><p><strong>1、处理一下蒙层的逻辑</strong></p><p>我们先把外部简单逻辑处理一下，根据效果，有一个点击蒙层关闭的操作，代码如下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mask_dom </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getElementsByClassName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;mask&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pic_dom </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getElementById</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;pic&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mask_dom.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;click&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  mask_dom.style.display </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;none&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  pic_dom.innerHTML </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p>需要注意的是，关闭的同时我们还要清理承载放大图的div</p><p><strong>2、dom比较多使用事件代理</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> container_dom </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getElementsByClassName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;container&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">container_dom.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;click&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //获得点击位置的dom节点</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> boxDom </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> e.target</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//判断点击的是不是模拟图片的dom</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(boxDom.className.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">indexOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;box&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 打开蒙层</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  mask_dom.style.display </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;block&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//克隆被点击的节点</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cloneDom </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> boxDom.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cloneNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p><strong>3、Fist获得起始位置dom的位置信息</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //第一步、获得初始位置信息</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> firstInfo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  boxDom.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getBoundingClientRect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div><p><strong>4、Last获取结束时的位置信息</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> //第二步、获取结束时的位置信息——添加全局居中样式</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  cloneDom.className </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cloneDom.className </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot; picture-zoom-in&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//第二步、获取结束时的位置信息——放到容器中</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  pic_dom.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">appendChild</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(cloneDom)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//第二步、获取结束时的位置信息</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lastInfo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cloneDom.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getBoundingClientRect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div><p><strong>5、Invert计算差异</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//第三步、计算变化的数据数据 </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> invertInfo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  x: firstInfo.x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lastInfo.x,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  y: firstInfo.y </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lastInfo.y,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 第三步、计算变化的数据数据 - 将克隆节点赋值变化的数据 回到初始位置 </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//特别说明 由于有scale，会导致transformOrigin发生变化，在修改scale时需要将transformOrigin归零</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cloneDom.style.transformOrigin </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;0 0&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cloneDom.style.transform </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`scale(1) translate(calc(-100% + \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">invertInfo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}px),calc(-100% +  \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">invertInfo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}px))\`</span></span></code></pre></div><p><strong>6、play播放动画</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//第四步、设定过度动画，删除第三步的transform</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  cloneDom.style.transition </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;all .5s&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  cloneDom.style.transformOrigin </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  cloneDom.style.transform </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h2 id="最后" tabindex="-1">最后 <a class="header-anchor" href="#最后" aria-label="Permalink to &quot;最后&quot;">​</a></h2><p>总结一下，这个代码量算上注释和空行也就50来行代码，但整个FLIP的技术细节都实现了，除了前置总结提到的一些优点，这里我引用一位专业的软件设计师“Nick Babich”的一句话：<strong>动画将用户界面带入生活。</strong></p><p>以前我们在做页面的时候，总觉得动画很难搞，于是就会传递出这样的信息，<strong>动画是锦上添花，没有必要，复杂，难以实现</strong>。</p><p>这样的借口，影响着我们前端程序员的发展，作为一个前端，动画开发，可以成为我们对后端程序员的一项技术壁垒，抓紧时间学起来把。</p><h2 id="附-全部代码" tabindex="-1"><strong>附：全部代码</strong> <a class="header-anchor" href="#附-全部代码" aria-label="Permalink to &quot;**附：全部代码**&quot;">​</a></h2><p>可以直接复制到html文件中执行，看效果哦~</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span> &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span> &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;</span></span>
<span class="line"><span> &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span></span>
<span class="line"><span> &lt;title&gt;FLIP-demo&lt;/title&gt;</span></span>
<span class="line"><span> &lt;style&gt;</span></span>
<span class="line"><span> .container {</span></span>
<span class="line"><span> display: flex;</span></span>
<span class="line"><span> flex-wrap: wrap;</span></span>
<span class="line"><span> text-align: center;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> .box {</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> border:1px solid #ccc;</span></span>
<span class="line"><span> margin-left: 10px;</span></span>
<span class="line"><span> margin-top: 10px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> .box_0{</span></span>
<span class="line"><span> width: 200px;</span></span>
<span class="line"><span> height: 250px;</span></span>
<span class="line"><span> background-color: #ffa39e;</span></span>
<span class="line"><span> color: #000000;</span></span>
<span class="line"><span> line-height:250px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> .box_1 {</span></span>
<span class="line"><span> width: 160px;</span></span>
<span class="line"><span> height: 210px;</span></span>
<span class="line"><span> background-color:#ffd8bf;</span></span>
<span class="line"><span> line-height: 210px;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> .box_2 {</span></span>
<span class="line"><span> width: 190px;</span></span>
<span class="line"><span> height: 270px;</span></span>
<span class="line"><span> background-color:#ffd591;</span></span>
<span class="line"><span> line-height:270px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> .box_3 {</span></span>
<span class="line"><span> width: 210px;</span></span>
<span class="line"><span> height: 300px;</span></span>
<span class="line"><span> background-color:#ffe58f;</span></span>
<span class="line"><span> line-height:300px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> .box_4 {</span></span>
<span class="line"><span> height: 160px;</span></span>
<span class="line"><span> width: 210px;</span></span>
<span class="line"><span> background-color:#780650;</span></span>
<span class="line"><span> color:#ffffff;</span></span>
<span class="line"><span> line-height:160px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> .box_5 {</span></span>
<span class="line"><span> height: 190px;</span></span>
<span class="line"><span> width: 270px;</span></span>
<span class="line"><span> background-color:#22075e;</span></span>
<span class="line"><span> color:#ffffff;</span></span>
<span class="line"><span> line-height:190px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> .box_6 {</span></span>
<span class="line"><span> height: 210px;</span></span>
<span class="line"><span> width: 300px;</span></span>
<span class="line"><span> background-color:#061178;</span></span>
<span class="line"><span> color:#ffffff;</span></span>
<span class="line"><span> line-height:210px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> .mask{</span></span>
<span class="line"><span> position: fixed;</span></span>
<span class="line"><span> width: 100%;</span></span>
<span class="line"><span> height: 100%;</span></span>
<span class="line"><span> background: #000000;</span></span>
<span class="line"><span> opacity: 0.7;</span></span>
<span class="line"><span> z-index: 1;</span></span>
<span class="line"><span> display: none;</span></span>
<span class="line"><span> text-align: center;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> .picture-zoom-in{</span></span>
<span class="line"><span> position: fixed;</span></span>
<span class="line"><span> z-index: 2;</span></span>
<span class="line"><span> left: 50%;</span></span>
<span class="line"><span> top: 50%;</span></span>
<span class="line"><span> transform: translate(-50% ,-50%) scale(2) ;</span></span>
<span class="line"><span> text-align: center;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> &lt;/style&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span> &lt;!-- 蒙层 --&gt;</span></span>
<span class="line"><span> &lt;div class=&quot;mask&quot;&gt;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> &lt;/div&gt;</span></span>
<span class="line"><span> &lt;!-- 放大图片的容器 --&gt;</span></span>
<span class="line"><span> &lt;div id=&quot;pic&quot;&gt;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> &lt;/div&gt;</span></span>
<span class="line"><span> &lt;!-- 图片容器及列表 --&gt;</span></span>
<span class="line"><span> &lt;div class=&quot;container&quot;&gt;</span></span>
<span class="line"><span> &lt;div class=&quot;box box_0&quot;&gt;200px*250px&lt;/div&gt;</span></span>
<span class="line"><span> &lt;div class=&quot;box box_0&quot;&gt;200px*250px&lt;/div&gt;</span></span>
<span class="line"><span> &lt;div class=&quot;box box_0&quot;&gt;200px*250px&lt;/div&gt;</span></span>
<span class="line"><span> &lt;div class=&quot;box box_0&quot;&gt;200px*250px&lt;/div&gt;</span></span>
<span class="line"><span> &lt;div class=&quot;box box_1&quot;&gt;160px*210px&lt;/div&gt;</span></span>
<span class="line"><span> &lt;div class=&quot;box box_2&quot;&gt;190px*270px&lt;/div&gt;</span></span>
<span class="line"><span> &lt;div class=&quot;box box_3&quot;&gt;210px*300px&lt;/div&gt;</span></span>
<span class="line"><span> &lt;div class=&quot;box box_4&quot;&gt;210px*160px&lt;/div&gt;</span></span>
<span class="line"><span> &lt;div class=&quot;box box_5&quot;&gt;270px*190px&lt;/div&gt;</span></span>
<span class="line"><span> &lt;div class=&quot;box box_6&quot;&gt;300px*210px&lt;/div&gt;</span></span>
<span class="line"><span> &lt;/div&gt;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> &lt;script&gt;</span></span>
<span class="line"><span> let container_dom = document.getElementsByClassName(&quot;container&quot;)[0]</span></span>
<span class="line"><span> let mask_dom = document.getElementsByClassName(&quot;mask&quot;)[0]</span></span>
<span class="line"><span> let pic_dom = document.getElementById(&#39;pic&#39;)</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> mask_dom.addEventListener(&quot;click&quot;, (e) =&gt; {</span></span>
<span class="line"><span> mask_dom.style.display = &#39;none&#39;</span></span>
<span class="line"><span> pic_dom.innerHTML = &#39;&#39;</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> //dom 比较多采用事件代理</span></span>
<span class="line"><span> container_dom.addEventListener(&quot;click&quot;, (e) =&gt; {</span></span>
<span class="line"><span> //获得点击位置的dom节点</span></span>
<span class="line"><span> let boxDom = e.target</span></span>
<span class="line"><span> //判断点击的是不是模拟图片的dom</span></span>
<span class="line"><span> if(boxDom.className.indexOf(&#39;box&#39;) === -1){</span></span>
<span class="line"><span> return</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span> // 打开蒙层</span></span>
<span class="line"><span> mask_dom.style.display = &#39;block&#39;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> //克隆被点击的节点</span></span>
<span class="line"><span> let cloneDom = boxDom.cloneNode(true)</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> //第一步、获得初始位置信息</span></span>
<span class="line"><span> let firstInfo =  boxDom.getBoundingClientRect()</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> //第二步、获取结束时的位置信息——添加全局居中样式</span></span>
<span class="line"><span> cloneDom.className = cloneDom.className + &quot; picture-zoom-in&quot;</span></span>
<span class="line"><span> //第二步、获取结束时的位置信息——放到容器中</span></span>
<span class="line"><span> pic_dom.appendChild(cloneDom)</span></span>
<span class="line"><span> //第二步、获取结束时的位置信息</span></span>
<span class="line"><span> let lastInfo = cloneDom.getBoundingClientRect()</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> //第三步、计算变化的数据数据 </span></span>
<span class="line"><span> let invertInfo = {</span></span>
<span class="line"><span> x: firstInfo.x - lastInfo.x,</span></span>
<span class="line"><span> y: firstInfo.y - lastInfo.y,</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span> // 第三步、计算变化的数据数据 - 将克隆节点赋值变化的数据 回到初始位置 </span></span>
<span class="line"><span> //特别说明 由于有scale，会导致transformOrigin发生变化，在修改scale时需要将transformOrigin归零</span></span>
<span class="line"><span> cloneDom.style.transformOrigin = &quot;0 0&quot;</span></span>
<span class="line"><span> cloneDom.style.transform = \`scale(1) translate(calc(-100% + \${invertInfo.x}px),calc(-100% + \${invertInfo.y}px))\`</span></span>
<span class="line"><span> //第四步、设定过度动画，删除第三步的transform</span></span>
<span class="line"><span> setTimeout(() =&gt; {</span></span>
<span class="line"><span> cloneDom.style.transition = &quot;all .5s&quot;</span></span>
<span class="line"><span> cloneDom.style.transformOrigin = &#39;&#39;</span></span>
<span class="line"><span> cloneDom.style.transform = \`\`</span></span>
<span class="line"><span>            })</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> &lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>文章来源：<a href="https://zhuanlan.zhihu.com/p/525671258" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/525671258</a></p></div>`,44),t=[l];function e(h,k,o,c,r,d){return a(),n("div",null,t)}const y=s(i,[["render",e]]);export{E as __pageData,y as default};
