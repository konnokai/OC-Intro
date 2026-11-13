# 双星幻夜 OC 介紹網站：規格

這份文件是實作的依據。內容、素材、驗收測試已經備好，實作只做「版面、元件、樣式、互動」。

## 1. 這個網站是什麼

- 主題：孤之界的兩位 OC。皎朧（月龍守界者）和夜綾（夜狐巡界者），團體名「双星幻夜 TwinStar Fantasia」。
- 讀者：想畫二創或接委託的繪師、粉絲。
- 主要用途：看角色長相、拿設定圖、讀設定、讀創作規範。
- 部署：Cloudflare Workers（靜態資產），純靜態輸出（`dist/`），GitHub push 後由 Workers Builds 自動建置。

## 2. 技術

| 項目 | 選擇 |
| --- | --- |
| 框架 | Astro `^7.4.11`，靜態輸出，不加 adapter |
| 互動 | Astro 元件裡的 `<script>`（原生 JS）。不裝 Vue、React、Tailwind |
| 圖片 | `astro:assets` 的 `<Image>` 和 `getImage()`（內建 sharp） |
| 字型 | `@fontsource-variable/noto-serif-tc` `^5.3.1`（可變字重，一組 `@font-face` 涵蓋 400、700、900，只有 woff2）、`@fontsource/lxgw-wenkai-tc` `^5.3.1`（400） |
| 測試 | `node --test tests/site.test.mjs`，檢查 `dist/` |
| Node | `>=22.23.4`（Astro 7 的要求；Workers Builds 預設 24，由 `.node-version` 指定 22.23.4） |

Astro 7 要注意的事：

- 編譯器變嚴格：每個非 void 標籤都要關，`<p>` 裡不能放 `<div>` 這類區塊元素。
- `astro.config.mjs` 設 `compressHTML: true`，避免行內元素之間的空白被吃掉。
- 不要建立 `src/fetch.ts`（保留檔名）。
- 不裝 `typescript`、`@astrojs/check`。不跑 `astro check`。

### 設定檔

`astro.config.mjs`：

```js
import { defineConfig } from 'astro/config';

/** 楷體套件的 CSS 同時列了 woff 和 woff2，但瀏覽器只會用到 woff2：不輸出 woff，CSS 裡的 url() 也拿掉 */
const dropWoff = {
  name: 'drop-woff',
  generateBundle(_options, bundle) {
    for (const [file, asset] of Object.entries(bundle)) {
      if (file.endsWith('.woff')) delete bundle[file];
      else if (file.endsWith('.css')) {
        asset.source = asset.source.replace(/,url\([^)]*\.woff\)format\(["']woff["']\)/g, '');
      }
    }
  },
};

export default defineConfig({
  site: process.env.SITE_URL || 'https://twinstar-fantasia.tw',
  trailingSlash: 'always',
  compressHTML: true,
  vite: { plugins: [dropWoff] },
});
```

`package.json` 的 scripts：

```json
{
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "test": "astro build && node --test tests/site.test.mjs"
}
```

其他要建立的檔案：

- `tsconfig.json`：`{ "extends": "astro/tsconfigs/strict", "include": [".astro/types.d.ts", "**/*"], "exclude": ["dist"] }`
- `.node-version`：`22.23.4`
- `.gitignore`：`node_modules/`、`dist/`、`.astro/`、`_raw/`、`.openchamber/`、`.wrangler`、`.dev.vars*`、`.env*`
- `public/_headers`：

  ```txt
  /*
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    Permissions-Policy: camera=(), microphone=(), geolocation=()
    X-Frame-Options: SAMEORIGIN

  /_astro/*
    Cache-Control: public, max-age=31556952, immutable
  ```

- `wrangler.jsonc`：Worker 名稱 `oc-intro`，`assets.directory` 指到 `./dist`，`html_handling` 設 `force-trailing-slash`（對齊 Astro 的 `trailingSlash: 'always'`，`/koro` 會 307 到 `/koro/`），`not_found_handling` 設 `404-page`（Astro 自己有 `dist/404.html`，不能用 SPA fallback）。
- `README.md`：怎麼跑（dev、build、test）、Workers Builds 設定（Build command `npm run build`、Deploy command `npx wrangler deploy`、環境變數 `SITE_URL` 填正式網址，沒填就用 `https://twinstar-fantasia.tw`）、內容改哪裡（`src/data/`）、素材來源看本文件第 9 節。

## 3. 已經備好、不要改的東西

| 路徑 | 內容 |
| --- | --- |
| `src/data/site.ts` | 站名、題詞、導覽、製作名單、聯絡方式 |
| `src/data/characters.ts` | 兩位角色的資料、立繪、設定圖清單、2P 圖 |
| `src/data/world.ts` | 世界觀（總覽、種族、地點、核心衝突） |
| `src/data/bond.ts` | 羈絆（定位、時間線、相處模式、名場面、結語） |
| `src/data/guidelines.ts` | 創作規範 |
| `src/data/artworks.ts` | 委託插圖的清單、`alt` 和繪師名 |
| `src/assets/**` | 所有圖片 |
| `public/og.jpg`、`public/favicon.png` | 分享預覽圖、網站圖示 |
| `tests/site.test.mjs` | 驗收測試 |
| `docs/source/**` | 內文的原始來源，測試會拿來比對 |

規則：

- 頁面上的設定文字一律從 `src/data/` 讀，不要在元件裡重打，也不要改寫、摘要、加字。
- 介面文字（按鈕、連結、標題）用本文件寫的字。本文件沒寫到的，用最短的白話中文，不要加表情符號。
- 測試不能改。測試不過就改實作。
- `src/data/world.ts` 的段落含 `<strong>`，用 `set:html` 輸出。其他資料用一般的 `{文字}`。

## 4. 設計方向

一句話：**夜空裡的月。** 幻月界是月與夜的世界，設定的核心是「光與影共生」。版面只有兩種面：

- **夜面**（深色）：主視覺、角色、羈絆。白色系的皎朧和淡色 Logo 要在深色上才看得清楚。
- **月面**（淺色）：長文、白底設定圖、創作規範。團體 Logo 是黑字，要放在淺色上。

唯一的造型母題是「圓月」，只用在三個地方：首頁主視覺（Logo 放在月面上）、夜綾角色頁（月在她身後，深色頭髮才有對比）、羈絆時間線（四個月相代表四個階段）。別的地方不要加圓形裝飾。

第二個固定手法是「直書標題」：桌機寬度時，段落標題直排在內文左邊，並且 `position: sticky`，讀長文時知道自己在哪一段。手機改成一般橫排。

委託插圖是內容，不算裝飾。只放在第 6 節寫到的位置，不加框、不加陰影、不加 hover 動畫。

### 4.1 色票

```css
:root {
  --night: #15172e;        /* 夜面底色 */
  --indigo: #1b2a5c;       /* 皎朧頁主視覺底色 */
  --violet: #1d1740;       /* 夜綾頁主視覺底色。再亮一點，紫色的夜綾 Logo 就看不清楚 */
  --moon: #eef1f6;         /* 月面底色、夜面上的文字 */
  --moon-shade: #d5dbe8;   /* 月面上的分隔線 */
  --ink: #15172e;          /* 月面上的文字 */
  --ink-soft: #4a5073;     /* 月面上的次要文字 */
  --mist: #aab2cf;         /* 夜面上的次要文字 */
  --shu: #b5232e;          /* 朱：鳥居和流蘇的紅，只當重點色 */
  --rule-night: rgb(238 241 246 / 0.18); /* 夜面上的分隔線 */

  --font-serif: "Noto Serif TC Variable", "Songti TC", "PMingLiU", serif;
  --font-kai: "LXGW WenKai TC", "Kaiti TC", "DFKai-SB", serif;

  --gutter: clamp(1.25rem, 5vw, 4rem);
  --page: 72rem;      /* 內容最大寬度 */
  --measure: 36em;    /* 內文每行最多約 36 個中文字 */
}
```

用法：

- 朱色只出現在：目前頁面的導覽底線、文字連結的底線、禁止清單的 ✕ 記號、首頁那一條「請先讀創作規範」色帶。其他地方不用。
- 不要漸層、不要光暈（glow）、不要 `box-shadow`、不要毛玻璃、不要背景格線或星星點點。
- 圓角只有兩種：月（`50%`）和切換鈕（`999px`）。其他都是直角。

### 4.2 字

- 內文、標題、介面：`var(--font-serif)`。字重只用 400、700、900。
- 說出口的話：題詞、`<blockquote>` 用 `var(--font-kai)`。其他地方不用楷體。
- 不用全大寫、不拉寬英文字距、不在標題上面加小標籤。
- 內文 `font-size: 1.0625rem; line-height: 1.95`，段落間距 `1.2em`，`text-wrap: pretty`，`line-break: strict`，靠左對齊（不要 justify）。
- 內文欄寬最多 `var(--measure)`。
- 大標題用 `clamp()`，例如頁面 h1：`clamp(2.25rem, 1.5rem + 4vw, 4.5rem)`，字重 900，`text-wrap: balance`。
- 字級一律用 `rem`／`em`，不用 `px`。

### 4.3 面（surface）

用 class 切換底色和文字色，裡面的元件讀變數，不要各自寫死顏色：

```css
.surface-night  { background: var(--night);  color: var(--moon); --soft: var(--mist);     --rule: var(--rule-night); }
.surface-indigo { background: var(--indigo); color: var(--moon); --soft: var(--mist);     --rule: var(--rule-night); }
.surface-violet { background: var(--violet); color: var(--moon); --soft: var(--mist);     --rule: var(--rule-night); }
.surface-moon   { background: var(--moon);   color: var(--ink);  --soft: var(--ink-soft); --rule: var(--moon-shade); }
.surface-shu    { background: var(--shu);    color: var(--moon); --soft: var(--moon);     --rule: var(--rule-night); }
```

`body` 是 `surface-night`。頁面裡每一段內容再加 `.band`，給上下留白：`padding-block: clamp(3.5rem, 8vw, 7rem)`。頁首、頁尾、首頁主視覺不加 `.band`。

### 4.4 動態

- 只有一個安排好的動態：首頁和角色頁之間換頁時，角色立繪用跨頁 view transition 接過去。做法是兩邊的立繪容器給同一個 `view-transition-name`（`figure-koro`、`figure-yoraya`），並在 `src/styles/global.css` 最上層加：

  ```css
  @media (prefers-reduced-motion: no-preference) {
    @view-transition { navigation: auto; }
  }
  ```

  不支援的瀏覽器就是一般換頁，不用補 JS。
- 不要捲動淡入、不要無限循環的動畫、不要每個元素都加 hover 動畫。
- 連結和按鈕可以有 `transition: color/background 0.15s`。

### 4.5 無障礙和基本功

- `<html lang="zh-Hant-TW">`。日文別名（例如「月見ノ峰」）加 `lang="ja"`。
- 每頁剛好一個 `<h1>`，標題層級不跳號。
- 鍵盤可以操作所有連結和按鈕。`:focus-visible` 要看得到：`outline: 2px solid currentColor; outline-offset: 3px`。
- 所有 `<img>` 都要有 `alt`、`width`、`height`。純裝飾的圖 `alt=""`。
- 內容不能靠 JS 才出現。JS 關掉時：立繪看得到預設那張、設定圖點了會直接開大圖檔。
- 最窄到 320px 不能出現橫向捲軸。
- `[hidden] { display: none !important; }` 寫進 global.css。

## 5. 共用版型

### `src/layouts/Base.astro`

Props：`title`（頁名，首頁不傳）、`description`（預設 `site.description`）。

- 在 frontmatter import 字型和全域樣式：
  `@fontsource-variable/noto-serif-tc/index.css`、`@fontsource/lxgw-wenkai-tc/400.css`、`../styles/global.css`。
- Props 另有 `noindex`：為 true 時不輸出 canonical 和 `og:url`，改輸出 `<meta name="robots" content="noindex">`。只有 404 頁用。
- `<title>`：有 `title` 時是 `{title}｜双星幻夜`，首頁是 `双星幻夜 TwinStar Fantasia｜孤之界的 OC 設定 & 立繪`。
- `<head>` 要有：charset、viewport、description、canonical、`og:title`、`og:description`、`og:type`（website）、`og:url`、`og:image`（`new URL('/og.jpg', Astro.site)`）、`twitter:card`（`summary_large_image`）、`<link rel="icon" type="image/png" href="/favicon.png">`、`theme-color`（`#15172e`）。
- `<body class="surface-night">` 裡依序：跳到主要內容的連結、`<SiteHeader />`、`<main id="main"><slot /></main>`、`<SiteFooter />`。

### `SiteHeader.astro`

```
双星幻夜                      幻月界  皎朧  夜綾  羈絆  創作規範
```

- 左邊文字標「双星幻夜」連到 `/`，字重 900。
- 右邊 `<nav aria-label="主選單">`，項目來自 `site.nav`。目前頁面的連結加 `aria-current="page"`（用 `Astro.url.pathname` 比對）。
- 目前頁面的樣式：字重 700 加朱色底線（不能只靠顏色）。
- 不做漢堡選單。`display: flex; flex-wrap: wrap; justify-content: space-between`，窄螢幕時導覽自動掉到第二行。不要 sticky。
- 夜面。

### `SiteFooter.astro`

夜面，上緣一條 `var(--rule)` 分隔線。內容：

- `<dl>` 製作名單：「角色所有」孤之界（連到 X `@Kon_no_kai`）＋ `site.credits` 的兩筆（名字後面接 X 帳號連結）。
- 一個連結：「創作規範」→ `/guidelines/`。
- 不要加年份、版權宣告、社群圖示。

### `VSection.astro`（直書標題的段落）

Props：`heading`、`level`（預設 2）、`id`（選填）。slot 是內文。

```html
<section class="v-section" id={id}>
  <h2 class="v-section__title">{heading}</h2>
  <div class="v-section__body"><slot /></div>
</section>
```

```css
.v-section { display: grid; gap: 1.25rem; }
.v-section + .v-section { margin-block-start: clamp(3rem, 7vw, 6rem); }
.v-section__title { font-size: 1.5rem; font-weight: 900; letter-spacing: 0.12em; }
.v-section__body { max-inline-size: var(--measure); }

@media (min-width: 56rem) {
  .v-section { grid-template-columns: 4rem minmax(0, 1fr); gap: 0; }
  .v-section__title {
    writing-mode: vertical-rl;
    letter-spacing: 0.3em;
    font-size: 1.75rem;
    position: sticky;
    top: 2rem; /* 直書元素的 inset-block-start 會變成右邊，所以寫 top */
    align-self: start;
  }
  .v-section__body {
    border-inline-start: 1px solid var(--rule);
    padding-inline-start: clamp(2rem, 4vw, 3.5rem);
    max-inline-size: none;
  }
  .v-section__body > p { max-inline-size: var(--measure); }
}
```

內文裡需要比 `--measure` 寬的東西（種族的兩欄、設定圖格子）可以佔滿 `.v-section__body`。

### `Artwork.astro`（委託插圖）

Props：`item`（`src/data/artworks.ts` 的一筆）、`sizes`、`widths`（選填，預設 `[480, 800, 1200, 1600]`）、`eager`（選填，第一屏的圖才傳 true）。

```html
<figure class="artwork">
  <Image src={item.image} alt={item.alt} widths={widths} sizes={sizes} … />
  <figcaption>繪：<a class="text-link" href={item.artistUrl} target="_blank" rel="noopener">{item.artist}</a></figcaption>
</figure>
```

- 圖：`display: block; inline-size: 100%; block-size: auto`。直角，不加框。
- 圖說：`--soft` 色，`font-size: 0.875rem`，和圖之間留 0.5rem。
- `eager` 為 true 時 `loading="eager"` 加 `fetchpriority="high"`，其他 `loading="lazy"`。
- 沒有 `artistUrl` 時只顯示名字，不加連結。
- 不接 Lightbox，頁面只負責位置和寬度。

### 文字連結 `.text-link`

底線用朱色：`text-decoration: underline; text-decoration-color: var(--shu); text-decoration-thickness: 2px; text-underline-offset: 0.35em`。在 `surface-shu` 上底線改 `currentColor`。連結文字後面不要加箭頭。

## 6. 各頁

寬度容器：`.wrap { max-inline-size: var(--page); margin-inline: auto; padding-inline: var(--gutter); }`

### 6.1 首頁 `src/pages/index.astro`

由上到下五段。

**(1) 主視覺 `.hero`（夜面）**

```
桌機
┌────────────────────────────────────────────────────┐
│ 皎                                               夜 │
│ 朧        ▟█▙         ╭───────╮        ▟██▙      綾 │
│ Koro     皎朧立繪     │ 団体Logo │      夜綾立繪  Yoraya│
│           ▐█▌         │ （月面） │       ▐██▌         │
│           ▐█▌         ╰───────╯       ▐██▌         │
│           ▟ ▙      孤之界的 OC 設定 & 立繪  ▟  ▙        │
│                      「題詞」                       │
└────────────────────────────────────────────────────┘

手機
┌──────────────┐
│   ╭──────╮   │
│   │ Logo │   │
│   ╰──────╯   │
│  副標、題詞    │
│ 皎朧    夜綾  │
│ 立繪    立繪  │
│ 皎朧 Koro  夜綾 Yoraya │
└──────────────┘
```

標記：

```html
<section class="hero">
  <div class="hero__center">
    <h1 class="hero__moon"><Image src={twinstarLogo} alt="双星幻夜 TwinStar Fantasia" … /></h1>
    <p class="hero__sub">{site.title}</p>
    <p class="hero__epigraph">{site.epigraph}</p>
  </div>
  <a class="hero__figure hero__figure--koro" href="/koro/">
    <span class="hero__figure-img" style="view-transition-name: figure-koro">
      <Image src={koro.figure.armed} alt="" loading="eager" fetchpriority="high" … />
    </span>
    <span class="hero__label">皎朧 <span>Koro</span></span>
  </a>
  <a class="hero__figure hero__figure--yoraya" href="/yoraya/">…同上，夜綾…</a>
</section>
```

樣式重點（手機優先）：

```css
.hero { position: relative; overflow: clip; padding-inline: var(--gutter); padding-block-start: 2rem;
        display: grid; grid-template-columns: 0.85fr 1.15fr; column-gap: 0.75rem; align-items: end;
        grid-template-areas: "center center" "koro yoraya"; }
.hero__center { grid-area: center; display: grid; justify-items: center; gap: 1rem; text-align: center; padding-block-end: 1.5rem; }
.hero__moon { inline-size: min(70vw, 20rem); aspect-ratio: 1; border-radius: 50%; background: var(--moon);
              display: grid; place-items: center; margin: 0; }
.hero__moon img { inline-size: 68%; block-size: auto; }
.hero__epigraph { font-family: var(--font-kai); color: var(--mist); max-inline-size: 22em; }
.hero__figure--koro { grid-area: koro; }
.hero__figure--yoraya { grid-area: yoraya; }
.hero__figure { display: grid; justify-items: center; gap: 0.5rem; text-decoration: none; color: inherit; padding-block-end: 1.5rem; }
.hero__figure-img, .hero__figure-img img { display: block; inline-size: 100%; block-size: auto; }

@media (min-width: 48rem) {
  .hero { display: grid; grid-template-columns: 1fr; grid-template-areas: "center"; place-items: center;
          min-block-size: clamp(30rem, 52vw, 52rem); padding-block: 3rem; }
  .hero__moon { inline-size: clamp(16rem, 34vw, 30rem); }
  .hero__figure { display: block; grid-area: auto; position: absolute; inset-block-end: 0; z-index: 2; padding: 0; }
  /* 立繪貼著月的兩側，稍微疊進月面一點 */
  /* 兩人設定身高只差 2 cm，立繪又都頂滿畫布，所以高度寫一樣 */
  .hero__figure--koro   { inset-inline-end:   calc(50% + clamp(7rem, 15vw, 14rem)); block-size: min(92%, 41vw); }
  /* 夜綾的畫布比較寬，要往中間靠才不會超出右邊。弓會蓋到月的邊緣，這是可以的 */
  .hero__figure--yoraya { inset-inline-start: calc(50% + clamp(6rem, 13vw, 14rem)); block-size: min(92%, 41vw); }
  .hero__figure:focus-visible { outline-offset: -4px; } /* 往外推會被 overflow 切掉 */
  .hero__epigraph { max-inline-size: min(22em, 25vw); } /* 不要被兩側立繪蓋住 */
  .hero__figure-img { block-size: 100%; inline-size: auto; }
  .hero__figure-img img { block-size: 100%; inline-size: auto; max-inline-size: none; }
  .hero__center { z-index: 1; }
  /* 名字直排在畫面最外側 */
  /* 直書元素的邏輯方向會轉 90 度，這裡用 top／left／right 才會落在外側 */
  .hero__label { position: absolute; top: 8%; writing-mode: vertical-rl; letter-spacing: 0.3em; font-weight: 900; font-size: 1.25rem; }
  .hero__figure--koro .hero__label   { left: 0; }
  .hero__figure--yoraya .hero__label { right: 0; }
}
```

`.hero__label` 裡的羅馬字用 `--soft` 色、字重 400。寬度 48rem 到 64rem 之間立繪比較小，羅馬字隱藏，只留中文名。滑鼠移到立繪連結上時，只有 `.hero__label` 加朱色底線，立繪不要放大或位移。

圖片：立繪 `widths={[320, 480, 640, 960, 1280]}`，`sizes` 皎朧 `"(min-width: 48rem) 30vw, 42vw"`、夜綾 `"(min-width: 48rem) 36vw, 56vw"`。Logo `widths={[240, 480, 720]}`、`sizes="(min-width: 48rem) 23vw, 48vw"`、`loading="eager"`。

**(2) 角色 `.cast`（夜面）**

`<h2>` 是「角色」（一般橫排大標，不用 VSection）。兩位角色各一個 `<article>`，上下排列，左右交錯：

```
桌機
┌──────────┐  皎朧  Koro / こうろ
│ 展示卡圖  │  月龍守界者，冷酷的月之少女
│ (連結)   │  種族 … ／ 象徵意象 … ／ 代表色 …
└──────────┘  （性格刻畫第一段）
              看皎朧的設定與立繪

夜綾  Yoraya / よらや              ┌──────────┐
夜狐巡界者，調皮的夜之少女           │ 展示卡圖  │
…                                 └──────────┘
```

- 圖：`character.card`，包在連到角色頁的 `<a>` 裡。寬度上限 24rem。
- `<h3>`：名字（字重 900、大字）＋ `Koro / こうろ`（`--soft` 色）。
- 一行：`{role}，{tagline}`。
- `<dl>`：從 `profile` 取 `種族`、`象徵意象`、`代表色` 三筆。
- 一段：`sections` 裡 `id === 'personality'` 的第一段。
- 連結：`看{name}的設定與立繪`（`.text-link`）。
- 桌機用兩欄格線，第二位把圖放右邊。手機是圖在上、文字在下。

**(3) 幻月界（月面）**

`<VSection heading="幻月界">`：`world.overview.paragraphs[0]`（`set:html`）＋ 連結「讀幻月界的世界觀」→ `/world/`。

**(4) 羈絆（夜面）**

`adou6Embrace` 放在 `<blockquote>` 上面，置中，最寬 40rem，和引文之間留 2rem。`sizes` 是 `(min-width: 40rem) 40rem, 92vw`。

`<blockquote>` 放 `bond.closing`，楷體，字級 `clamp(1.25rem, 1rem + 1.2vw, 1.75rem)`，欄寬最多 28em，置中區塊、文字靠左。下面連結「讀兩人的羈絆」→ `/bond/`。

**(5) 創作規範提醒（`surface-shu`）**

一行字：「二創、委託、商用之前，請先讀<a>創作規範</a>。」留白比別的面小（`padding-block: 2rem`）。

### 6.2 角色頁 `src/pages/[character].astro`

`getStaticPaths()` 回傳 `koro`、`yoraya`。`<Base title={character.name}>`。

**(1) 主視覺 `.stage`**：皎朧用 `surface-indigo`，夜綾用 `surface-violet`。

```
皎朧（桌機）                              夜綾（桌機，左右相反）
┌───────────────────────────────┐    ┌───────────────────────────────┐
│ [皎朧 Logo 圖 = h1]     ▟█▙    │    │   ╭──╮▟██▙    [夜綾 Logo 圖 = h1]│
│ Koro / こうろ          ▐█▌    │    │   │月 ▐██▌    Yoraya / よらや    │
│ 月龍守界者，冷酷的…     ▐█▌    │    │   ╰──╯▐██▌    夜狐巡界者，調皮的… │
│ 年齡  …               ▟ ▙    │    │      ▟  ▙    年齡 …             │
│ 身高  …           (持刀)(無刀) │    │  (持弓)(無弓)  身高 …             │
└───────────────────────────────┘    └───────────────────────────────┘
手機：Logo、讀音、一句話 → 立繪和切換鈕 → 基本資訊
```

標記：

```html
<section class={`stage surface-${slug === 'koro' ? 'indigo' : 'violet'}`} data-character={slug}>
  <div class="wrap stage__grid">
    <header class="stage__head">
      <h1 class="stage__logo"><Image src={c.logo} alt={c.name} … /></h1>
      <p class="stage__reading">{c.romaji} / <span lang="ja">{c.kana}</span></p>
      <p class="stage__tagline">{c.role}，{c.tagline}</p>
    </header>
    <FigureStage character={c} />
    <dl class="profile">…每筆一個 <div><dt>…</dt><dd>…</dd></div>…</dl>
  </div>
</section>
```

- 桌機格線：`grid-template-areas: "head figure" "profile figure"`，欄 `minmax(0, 5fr) minmax(0, 6fr)`，列 `auto 1fr`。夜綾把欄位左右對調（`"figure head" "figure profile"`，欄 `6fr 5fr`）。
- `.stage__logo img`：寬 `min(100%, 22rem)`，高自動。
- `.profile`：每筆 `display: grid; grid-template-columns: 5.5em 1fr`，`<dt>` 用 `--soft` 色，筆與筆之間一條 `var(--rule)`。

**`FigureStage.astro`**（立繪切換）

```html
<div class="figure-stage" data-figure-stage>
  {slug === 'yoraya' && <div class="figure-stage__moon" aria-hidden="true"></div>}
  <div class="figure-stack" style={`view-transition-name: figure-${slug}`}>
    <Image src={figure.armed} alt={figure.armedAlt} data-figure="armed" loading="eager" fetchpriority="high" … />
    <Image src={figure.plain} alt={figure.plainAlt} data-figure="plain" hidden loading="lazy" … />
  </div>
  <div class="figure-toggle" role="group" aria-label="立繪版本" data-figure-toggle>
    <button type="button" aria-pressed="true"  data-show="armed">{figure.armedLabel}</button>
    <button type="button" aria-pressed="false" data-show="plain">{figure.plainLabel}</button>
  </div>
</div>
```

- 兩張圖畫布一樣大。`.figure-stack { display: grid; }`，兩張都放 `grid-area: 1 / 1`，切換時人物不會跳。
- 圖：`inline-size: auto; max-inline-size: 100%; block-size: auto; max-block-size: min(84svh, 48rem); object-fit: contain`，容器置中。`widths={[480, 720, 960, 1280, 1600]}`、`sizes="(min-width: 56rem) 50vw, 92vw"`。
- 月（只有夜綾）：`position: absolute`，圓形 `var(--moon)`，直徑 `min(88%, 30rem)`，水平置中、靠上 4%，在立繪後面（`z-index` 比立繪小）。`.figure-stage` 要 `position: relative`。
- 切換鈕：兩顆並排的圓角鈕。`aria-pressed="true"` 是月色底、`--ink` 字；`false` 是透明底、1px `currentColor` 邊。最小高度 2.75rem。
- 腳本（放在元件的 `<script>`）：

  ```js
  for (const group of document.querySelectorAll('[data-figure-toggle]')) {
    const stage = group.closest('[data-figure-stage]');
    group.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-show]');
      if (!button) return;
      for (const b of group.querySelectorAll('button[data-show]')) {
        b.setAttribute('aria-pressed', String(b === button));
      }
      for (const img of stage.querySelectorAll('[data-figure]')) {
        img.hidden = img.dataset.figure !== button.dataset.show;
      }
    });
  }
  ```

**(2) 設定文字（夜面）**：`character.sections` 每一筆一個 `<VSection heading={heading} id={id}>`，段落逐段 `<p>`。

插圖放在這個段落裡，和 VSection 們分兩欄：

- 寬度 64rem 以上：左邊是 VSection 們（包在一個 div 裡），右邊是插圖，`position: sticky; top: 2rem; align-self: start`，欄寬 `clamp(16rem, 26vw, 22rem)`，欄距 `clamp(2rem, 4vw, 3.5rem)`。
- 64rem 以下：單欄，插圖排在 VSection 們後面，置中，`inline-size: min(100%, 24rem)`（要寫寬度，不然會縮到只剩圖說那麼寬），上邊距 3rem。
- DOM 順序是文字在前、插圖在後。皎朧用 `heimaoKoro`，夜綾用 `heimaoYoraya`，`sizes` 是 `(min-width: 85rem) 22rem, (min-width: 64rem) 26vw, (min-width: 26rem) 24rem, 92vw`。

**(3) 設定資料（月面）**：`<VSection heading="設定資料" id="sheets">` 裡放 `<SheetGallery items={character.gallery} />`，下面接摺疊區塊：

```html
<details class="alt-design">
  <summary>{alternateDesign.summary}</summary>
  <SheetGallery items={[alternateDesign]} />
</details>
<p class="notion-note">
  沒有衣服的立繪：<a class="text-link" href={site.notion} target="_blank" rel="noopener">在 Notion 觀看</a>
</p>
```

`site.notion` 是 Notion 主頁網址。沒有衣服的立繪不放在網站上，只給連結。

**`SheetGallery.astro`**（設定圖格子＋放大檢視）

每張圖：

```html
<figure class="sheet">
  <a href={full.src} data-lightbox="true" data-caption={item.caption} data-alt={item.alt}>
    <Image src={item.image} alt={item.alt} widths={[240, 360, 480, 720]} sizes="(min-width: 56rem) 16rem, (min-width: 30rem) 30vw, 84vw" … />
  </a>
  <figcaption>
    <span class="sheet__caption">{item.caption}</span>
    {item.note && <span class="sheet__note">{item.note}</span>}
  </figcaption>
</figure>
```

- `full` 用 `await getImage({ src: item.image, format: 'webp', quality: 90 })`（原始尺寸）。繪師需要看細節，不要縮小。
- 格子：`display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 13rem), 1fr)); gap: 1.5rem 1.25rem`。
- 每格的圖框：白底 `#fff`、1px `var(--rule)` 邊、`aspect-ratio: 4 / 5`、內距 0.75rem，圖 `object-fit: contain` 填滿圖框。圖說在下方，`note` 用 `--soft` 色、小一級，各自一行。
- 放大檢視：整頁只要一個 `<dialog>`。SheetGallery 可能在同一頁出現兩次，所以 `<dialog>` 和它的腳本放在 `Lightbox.astro`，由角色頁引入一次。

**`Lightbox.astro`**

```html
<dialog class="lightbox" closedby="any" aria-labelledby="lightbox-caption">
  <form method="dialog" class="lightbox__bar">
    <p id="lightbox-caption"></p>
    <a class="lightbox__open text-link" target="_blank" rel="noopener">在新分頁開啟</a>
    <button autofocus>關閉</button>
  </form>
  <div class="lightbox__stage"></div>
</dialog>
```

- 不要加 `role="dialog"`、`aria-modal`、自己寫的 focus trap 或 Esc 處理，原生 modal 已經有。
- `<dialog>` 裡不要預先放 `<img>`，由腳本在開啟時建立（`alt` 用 `data-alt`），關閉時移除。
- 設定圖連結另外帶 `data-width`、`data-height`（原圖尺寸）。腳本把它們寫成圖片的 `--natural`、`--ratio`，CSS 用這兩個值算大小，圖還沒載完時對話框就是最後的大小。
- 腳本：
  - 監聽 `document` 的 click。點到 `a[data-lightbox]` 而且是一般左鍵（沒有按 Ctrl／Meta／Shift／Alt）才 `preventDefault()`，填入圖說、圖片、「在新分頁開啟」的 `href`，再 `dialog.showModal()`。
  - `dialog` 的 `close` 事件：清空 `.lightbox__stage`。
  - `closedby` 不支援時的替代（Safari）：

    ```js
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const outside = (e) => {
        const r = dialog.getBoundingClientRect();
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      };
      let pressedOutside = false;
      dialog.addEventListener('pointerdown', (e) => { pressedOutside = outside(e); });
      dialog.addEventListener('pointerup', (e) => { if (pressedOutside && outside(e)) dialog.close(); });
    }
    ```
- 樣式：

  ```css
  .lightbox { border: 0; padding: 0; background: var(--moon); color: var(--ink); max-inline-size: 96vw; max-block-size: 96dvh; }
  .lightbox[open] { display: grid; grid-template-rows: auto minmax(0, 1fr); }
  .lightbox:modal { overscroll-behavior: contain; }
  .lightbox::backdrop { background: rgb(21 23 46 / 0.88); overflow: hidden; overscroll-behavior: contain; }
  .lightbox__stage { background: #fff; overflow: auto; }
  .lightbox__stage img { display: block; aspect-ratio: var(--ratio); block-size: auto;
                         inline-size: min(var(--natural), 96vw, calc((96dvh - 4rem) * var(--ratio))); }
  ```

  `display` 只能寫在 `.lightbox[open]`，不要寫在 `.lightbox`（會讓關閉狀態也顯示）。不要對 `html`／`body` 加 `overflow: hidden`。

**(4) 頁尾導引（夜面）**：兩個連結並排。另一位角色（顯示她的 Logo 圖，連結文字 `看{另一位的 name}`）和「讀兩人的羈絆」→ `/bond/`。

### 6.3 世界觀 `src/pages/world.astro`

`<Base title="幻月界">`。

1. 頁首（夜面）：`<h1>幻月界</h1>`、`Tsukuyomi-no-Kai`（`--soft` 色）、`world.subtitle`、`world.epigraph`（楷體）。
2. 月面，三個 VSection：
   - `world.overview`：段落 `set:html`。
   - `world.races`：`.races` 兩欄格線（`min-width: 56rem` 時），每個種族一個 `<section>`：`<h3>{name}<span class="alias">{alias}</span></h3>` ＋ `<p>`。不要框、不要卡片、不要編號。
   - `world.places`：`<dl class="places">`，每筆一個 `<div>`，桌機是 `grid-template-columns: 11rem 1fr`。`<dt>` 放地名（字重 700）和日文別名（`lang="ja"`、`--soft` 色、小一級、換行）。筆與筆之間一條 `var(--rule)`。
3. 夜面：VSection `world.conflict`。
4. 夜面結尾：連結「接著讀：兩人的羈絆」→ `/bond/`。

### 6.4 羈絆 `src/pages/bond.astro`

`<Base title="羈絆">`。整頁夜面。

1. 頁首：`<h1>{bond.title}</h1>`。下面接插圖 `fanhuaMoon`，寬度佔滿 `.wrap`，`eager`，`widths={[800, 1200, 1600, 2400]}`，`sizes="(min-width: 72rem) 64rem, 90vw"`。`h1` 的下邊距收窄，圖和第一段之間留 `clamp(3rem, 7vw, 6rem)`。
2. VSection `bond.positioning`。
3. VSection `bond.timeline`，內文是：

   ```html
   <ol class="phases">
     <li>
       <MoonPhase phase="crescent" />
       <h3>初識</h3>
       <p>…</p>
     </li>
     …
   </ol>
   ```

   - 這是真的有先後順序的四個階段，所以用 `<ol>`。不要顯示數字（`list-style: none`），順序靠月相表示。
   - 桌機四欄並排，月相在上，四個月相的中心用一條 `var(--rule)` 橫線串起來。手機單欄，月相在左、文字在右。
   - `MoonPhase.astro`：48×48 的行內 SVG，`aria-hidden="true"`。

     ```html
     <svg viewBox="0 0 24 24" width="48" height="48" aria-hidden="true">
       <circle cx="12" cy="12" r="11" fill="var(--night)" stroke="currentColor" stroke-width="1" />
       <path d={paths[phase]} fill="currentColor" />
     </svg>
     ```

     ```js
     const paths = {
       crescent: 'M12 1A11 11 0 0 1 12 23A6.5 11 0 0 0 12 1Z',
       half: 'M12 1A11 11 0 0 1 12 23Z',
       gibbous: 'M12 1A11 11 0 0 1 12 23A6.5 11 0 0 1 12 1Z',
       full: 'M12 1A11 11 0 0 1 12 23A11 11 0 0 1 12 1Z',
     };
     ```
4. VSection `bond.dynamic`。
   - 這段和下一段之間插一張 `adou6Together`，置中，最寬 44rem，`sizes="(min-width: 44rem) 44rem, 92vw"`。
   - 中間多一張圖，`.v-section + .v-section` 的間距會失效，圖的上下都要補回 `clamp(3rem, 7vw, 6rem)`。
5. VSection `bond.scenes`：三個 `<section>`，`<h3>{place}</h3>` ＋ `<p>`。桌機三欄，欄與欄之間一條 `var(--rule)` 直線。
6. 結語：`<blockquote>` 放 `bond.closing`（楷體，和首頁同樣的樣式）。
7. 兩個連結：「看皎朧」→ `/koro/`、「看夜綾」→ `/yoraya/`。

### 6.5 創作規範 `src/pages/guidelines.astro`

`<Base title="創作規範">`。`<main>` 裡整段月面，像一張告示。

```
桌機
┌──────────────────────────────────────────┐
│ 以下內容禁止                           創 │
│ ✕ …        ✕ …                        作 │
│ ✕ …        ✕ …                        規 │
│ 尚未提及之處以我方認定為準               範 │
│                                          │
│ 二創作品的使用                            │
│ …                                        │
└──────────────────────────────────────────┘
```

- `<h1>創作規範</h1>`：桌機直排在內容**右邊**（`writing-mode: vertical-rl`、sticky 用 `top: 2rem`、字級 `clamp(3rem, 6vw, 5rem)`、字重 900）。手機橫排在最上面。DOM 順序 h1 在前。
- 內容欄寬最多 `var(--measure)`，各段用橫排 `<h2>`（這頁不用 VSection）。最上面先放一行 `guidelines.r18`（「R18 創作大歡迎，但禁止 R18-G」），字重 700、字級 `1.125rem`，其餘依資料順序：
  1. `prohibited`：`<ul>`，`::marker { content: "✕  "; color: var(--shu); }`。桌機 `columns: 2`，項目 `break-inside: avoid`。清單後面一行 `note`（`--soft` 色）。
  2. `usage`：一段。
  3. `commercial`：`<ul>`（一般圓點）。
  4. `tags`：每個標籤一個連結，文字是 `#{tag}`，連到 `hashtagUrl(tag)`（`target="_blank" rel="noopener"`），字級大（`clamp(1.5rem, 1rem + 2vw, 2.25rem)`、字重 900、`.text-link`），標籤下面一行是 `label`（`--soft` 色）。最後一行 `note`。
  5. `rights`：一段。
  6. `contact`：`<h2>` 後面一行 `note`，再用 `<ol>`（推薦順序有意義，顯示數字）。有 `href` 的項目做成連結。每筆格式 `{label}：{value}`。

### 6.6 `src/pages/404.astro`

`<Base title="找不到這一頁">`：`<h1>找不到這一頁</h1>` ＋ 連結「回首頁」。夜面，置中。

## 7. 驗收

1. `npm install` 沒有錯誤。
2. `npm test`：build 成功，`tests/site.test.mjs` 全過。把完整輸出貼在回報裡。
3. `npm run preview` 後每一頁用 360px 和 1280px 寬各看一次，沒有橫向捲軸、沒有文字疊在一起、沒有圖片破掉。
4. 第 4 節的禁止項目一個都沒出現（漸層、光暈、陰影、卡片框、表情符號、箭頭、全大寫標籤）。

## 8. 不在這次範圍

- 多語系、深淺色切換、搜尋、留言、分析追蹤。
- 從 Notion 自動同步內容。
- sitemap、RSS。
- 委託圖庫頁。

## 9. 素材來源對照

| 專案檔案 | 來源 | 處理 |
| --- | --- | --- |
| `src/assets/logo/twinstar.png` | `Z:\VT\_女兒\Logo\双星幻夜.png` | 裁掉透明留白 |
| `src/assets/logo/koro.png` | `Z:\VT\_女兒\Logo\皎朧.png` | 裁掉透明留白 |
| `src/assets/logo/yoraya.png` | `Z:\VT\_女兒\Logo\夜綾.png` | 裁掉透明留白 |
| `src/assets/koro/figure-armed.png` | `Z:\VT\_女兒\立繪相關\koro.png` | 原檔 |
| `src/assets/koro/figure.png` | `Z:\VT\_女兒\立繪相關\koro2.png` | 補透明邊到和持刀版同尺寸（位移 0, 0） |
| `src/assets/yoraya/figure-armed.png` | `Z:\VT\_女兒\立繪相關\yoraya.png` | 原檔 |
| `src/assets/yoraya/figure.png` | `Z:\VT\_女兒\立繪相關\yoraya2.png` | 補透明邊到和持弓版同尺寸（位移 110, 0） |
| `src/assets/koro/card.png` | `Z:\VT\_女兒\立繪相關\display-design_皎朧.png` | 原檔 |
| `src/assets/yoraya/card.png` | `Z:\VT\_女兒\立繪相關\display-design_夜綾.png` | 原檔 |
| `src/assets/koro/inner.png` | Notion `DRANGON1.png` | 裁掉四周白邊 |
| `src/assets/koro/weapon.png` | Notion `DRANGON.png` | 裁掉四周白邊 |
| `src/assets/yoraya/weapon.png` | Notion `FOX.png`（弓） | 裁掉四周白邊 |
| `src/assets/koro/eye.png` | Notion `image.png` | 原檔 |
| `src/assets/yoraya/eye.png` | Notion `image (1).png` | 原檔 |
| `src/assets/koro/vskin.png` | Notion `IMG_8855.png` | 原檔 |
| `src/assets/koro/vskin-showcase.png` | `Z:\VT\_女兒\模型展示相關\皎朧展示圖.png` | 原檔 |
| `src/assets/shared/2p.png` | Notion `image.png`（2P 色） | 原檔 |
| `src/assets/artworks/fanhua-moon.webp` | 原檔已刪除 | 縮成寬 2400，轉 webp |
| `src/assets/artworks/adou6-together.webp` | 原檔已刪除 | 原檔改名 |
| `src/assets/artworks/adou6-embrace.webp` | 原檔已刪除 | 原檔改名 |
| `src/assets/artworks/heimao-koro.webp` | 原檔已刪除 | 原檔改名 |
| `src/assets/artworks/heimao-yoraya.webp` | 原檔已刪除 | 原檔改名 |
| `public/og.jpg`、`public/favicon.png` | 上面的 Logo 和立繪 | 合成 |

沒有放進網站的 Notion 內容列在 `docs/source/notion-main.md` 最後一節。
