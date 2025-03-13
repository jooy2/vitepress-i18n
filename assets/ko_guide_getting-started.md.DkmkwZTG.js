import{_ as i,c as a,o as n,ag as e}from"./chunks/framework.BZemHgQ6.js";const o=JSON.parse('{"title":"시작하기","description":"","frontmatter":{"order":1},"headers":[],"relativePath":"ko/guide/getting-started.md","filePath":"ko/guide/getting-started.md","lastUpdated":1729749440000}'),t={name:"ko/guide/getting-started.md"};function p(l,s,h,k,r,d){return n(),a("div",null,s[0]||(s[0]=[e(`<h1 id="시작하기" tabindex="-1">시작하기 <a class="header-anchor" href="#시작하기" aria-label="Permalink to &quot;시작하기&quot;">​</a></h1><p>이 페이지에서는 VitePress I18n 모듈의 설치 및 사용 방법을 안내합니다.</p><h2 id="설치" tabindex="-1">설치 <a class="header-anchor" href="#설치" aria-label="Permalink to &quot;설치&quot;">​</a></h2><p>먼저 이 모듈을 사용하기 전에 <strong><a href="https://vitepress.dev" target="_blank" rel="noreferrer">VitePress</a></strong> 모듈을 사전 구성해야 할 수 있습니다.</p><p>Node.js 버전은 18.x 이상을 사용하는 것이 좋습니다. <strong>VitePress I18n</strong>은 <code>ESM</code>으로 작성되었습니다.</p><p><a href="https://www.npmjs.com/package/vitepress-i18n" target="_blank" rel="noreferrer">NPM</a> 또는 다른 노드 모듈 패키지 관리자를 사용하여 모듈을 설치할 수 있습니다. 이 패키지는 개발자 환경에서만 사용되므로 <code>devDependencies</code>에 설치해야 합니다. 아래 명령어로 설치하세요:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># via npm</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vitepress-i18n</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># via yarn</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vitepress-i18n</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># via pnpm</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vitepress-i18n</span></span></code></pre></div><h2 id="사용-방법" tabindex="-1">사용 방법 <a class="header-anchor" href="#사용-방법" aria-label="Permalink to &quot;사용 방법&quot;">​</a></h2><p>이 문서에서 <strong>VitePress</strong>에 대한 기본 지식에 대해서는 설명하지 않습니다. <strong>VitePress</strong>에 대해 자세히 알아보시려면 다음 사이트를 방문하세요: <a href="https://vitepress.dev" target="_blank" rel="noreferrer">https://vitepress.dev</a></p><p>먼저 아래 두 가지 방법 중 하나로 <code>vitepress-i18n</code>을 import합니다.</p><h3 id="_1-named-import-사용-권장" tabindex="-1">1. named-import 사용 (권장) <a class="header-anchor" href="#_1-named-import-사용-권장" aria-label="Permalink to &quot;1. named-import 사용 (권장)&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// \`.vitepress/config.js\`</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { generateI18n } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vitepress-i18n&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vitePressOptions</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;VitePress&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  themeConfig: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vitePressI18nOptions</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  /* Options... */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">withI18n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(vitePressOptions, vitePressI18nOptions));</span></span></code></pre></div><h3 id="_2-default-import-사용" tabindex="-1">2. default-import 사용 <a class="header-anchor" href="#_2-default-import-사용" aria-label="Permalink to &quot;2. default-import 사용&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// \`.vitepress/config.js\`</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> VitePressI18n </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vitepress-i18n&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vitePressOptions</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;VitePress&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  themeConfig: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vitePressI18nOptions</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  /* Options... */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(VitePressI18n.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">withI18n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(vitePressOptions, vitePressI18nOptions));</span></span></code></pre></div><p>VitePress의 구성 파일인 <code>.vitepress/config.js</code> 파일(설정 파일 이름은 프로젝트 환경에 따라 다를 수 있음)의 <code>defineConfig</code> 옵션값에 <code>withI18n</code>을 호출합니다.</p><p><code>withI18n</code>에는 두가지 인자값을 포함해야 합니다. 첫번째 인자는 VitePress의 옵션 값을, 두번째 인자는 오버라이딩 할 VitePress I18n의 옵션 값을 포함합니다.</p><p>VitePress I18n의 출력 결과에는 자동 번역이 된 텍스트가 포함되어 있습니다. 이 옵션 데이터는 기존의 VitePress의 옵션과 병합 될 것입니다.</p><p>여러가지 옵션이 제공되고 있지만 상황에 따라 선택적으로 사용할 수 있습니다. 하지만 <code>locales</code> 옵션은 반드시 필수로 제공되어야 합니다. 이 옵션은 VitePress I18n이 번역해야 하는 언어를 제공합니다.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">withI18n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(vitePressOptions, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  locales: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;en&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ko&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &quot;Required&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p><code>locales</code> 옵션의 값에는 지원되는 언어 코드들을 포함해야 합니다. 지원 언어 코드 목록은 <a href="/ko/guide/supported-languages">이 문서</a>를 참고해주세요.</p><p>VitePress에는 주 언어를 지정해야 할 필요가 있습니다. 이를 root 로캐일이라고 하는데, VitePress I18n에서는 다음과 같이 root 로캐일을 지정할 수 있습니다:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">withI18n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(vitePressOptions, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  locales: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { path: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;eng&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, locale: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;en&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { path: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;kor&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, locale: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ko&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  rootLocale: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;en&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p><code>rootLocale</code>의 값은 디렉토리 경로가 아닌 지원되는 언어 코드를 사용합니다. 이 옵션을 지정하지 않을 경우 <code>locales</code> 배열의 첫번째 값이 root 로캐일이 됩니다.</p><p>전체적인 결과가 어떻게 출력되는지 테스트하려면 VitePress I18에서 제공하는 <code>debugPrint</code> 옵션을 <code>true</code>로 설정하여 VitePress를 빌드해 보세요. 콘솔에 출력이 표시될 것입니다.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">withI18n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(vitePressOptions, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  locales: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;en&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ko&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  debugPrint: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>VitePress I18n의 옵션에 대해 자세히 알아보시려면 <a href="/ko/guide/options">VitePress I18n 옵션 페이지</a>를 참고하세요.</p>`,26)]))}const g=i(t,[["render",p]]);export{o as __pageData,g as default};
