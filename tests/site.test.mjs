// 驗收測試：檢查 build 出來的 dist/，不看原始碼怎麼寫。
// 執行前要先 build（npm test 會先跑 astro build）。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

const pages = {
  '/': 'index.html',
  '/world/': 'world/index.html',
  '/koro/': 'koro/index.html',
  '/yoraya/': 'yoraya/index.html',
  '/bond/': 'bond/index.html',
  '/guidelines/': 'guidelines/index.html',
};
const navTargets = ['/world/', '/koro/', '/yoraya/', '/bond/', '/guidelines/'];

const read = (rel) => readFileSync(path.join(dist, rel), 'utf8');
const html = Object.fromEntries(
  Object.entries(pages).map(([url, rel]) => [url, existsSync(path.join(dist, rel)) ? read(rel) : '']),
);

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');

/** 取出頁面上看得到的文字，去掉所有空白，方便比對內文 */
const visibleText = (h) =>
  decode(
    h
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ''),
  ).replace(/\s+/g, '');

const squash = (s) => s.replace(/\s+/g, '');

const tags = (h, name) => h.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];
// Astro 會把空字串的屬性輸出成沒有值的寫法（<img alt>），這種也要算「有寫」，回傳空字串
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}(?:=(?:"([^"]*)"|'([^']*)'))?(?=[\\s>/])`, 'i'));
  return m ? decode(m[1] ?? m[2] ?? '') : null;
};

test('每一頁都有產出', () => {
  for (const [url, rel] of Object.entries(pages)) {
    assert.ok(existsSync(path.join(dist, rel)), `缺少 ${url}（dist/${rel}）`);
  }
  assert.ok(existsSync(path.join(dist, '404.html')), '缺少 404.html');
  assert.ok(existsSync(path.join(dist, '_headers')), '缺少 _headers');
  assert.ok(existsSync(path.join(dist, 'og.jpg')), '缺少 og.jpg');
  assert.ok(existsSync(path.join(dist, 'favicon.png')), '缺少 favicon.png');
});

test('每一頁的基本結構', () => {
  for (const [url, h] of Object.entries(html)) {
    assert.match(h, /<html[^>]*\slang="zh-Hant/i, `${url} 的 <html> 要有 lang="zh-Hant-TW"`);
    assert.equal((h.match(/<h1\b/gi) ?? []).length, 1, `${url} 要剛好一個 <h1>`);
    assert.match(h, /<title>[^<]+<\/title>/i, `${url} 缺少 <title>`);
    assert.ok(
      tags(h, 'meta').some((t) => attr(t, 'name') === 'description' && attr(t, 'content')),
      `${url} 缺少 meta description`,
    );
    assert.ok(
      tags(h, 'meta').some((t) => attr(t, 'property') === 'og:image' && attr(t, 'content')),
      `${url} 缺少 og:image`,
    );
    assert.ok(
      tags(h, 'meta').some((t) => attr(t, 'name') === 'viewport'),
      `${url} 缺少 viewport`,
    );
  }
});

test('導覽列每頁都在，而且標出目前頁面', () => {
  for (const [url, h] of Object.entries(html)) {
    // 只看主選單裡面的連結，頁尾和內文的連結不算
    const nav = h.match(/<nav\b[^>]*aria-label="主選單"[^>]*>([\s\S]*?)<\/nav>/i)?.[1] ?? '';
    const links = tags(nav, 'a');
    for (const target of navTargets) {
      assert.ok(links.some((t) => attr(t, 'href') === target), `${url} 的導覽缺少 ${target}`);
    }
    const current = links.filter((t) => attr(t, 'aria-current') === 'page').map((t) => attr(t, 'href'));
    assert.deepEqual(current, url === '/' ? [] : [url], `${url} 的導覽要用 aria-current="page" 標出自己，而且只標一個`);
  }
});

test('站內連結和圖片都找得到檔案', () => {
  const missing = new Set();
  const check = (ref, from) => {
    if (!ref || !ref.startsWith('/') || ref.startsWith('//')) return;
    let p = decodeURIComponent(ref.split('#')[0].split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    if (!existsSync(path.join(dist, p))) missing.add(`${from} → ${ref}`);
  };
  for (const [url, h] of Object.entries(html)) {
    for (const t of [...tags(h, 'a'), ...tags(h, 'link')]) check(attr(t, 'href'), url);
    for (const t of [...tags(h, 'img'), ...tags(h, 'script'), ...tags(h, 'source')]) {
      check(attr(t, 'src'), url);
      const srcset = attr(t, 'srcset');
      if (srcset) for (const part of srcset.split(',')) check(part.trim().split(/\s+/)[0], url);
    }
  }
  assert.deepEqual([...missing], [], '有連結或圖片指到不存在的檔案');
});

test('圖片都有 alt 和寬高', () => {
  for (const [url, h] of Object.entries(html)) {
    for (const t of tags(h, 'img')) {
      assert.notEqual(attr(t, 'alt'), null, `${url} 有圖片沒寫 alt：${t.slice(0, 120)}`);
      assert.ok(attr(t, 'width') && attr(t, 'height'), `${url} 有圖片沒寫 width/height：${t.slice(0, 120)}`);
    }
  }
});

test('不載入外部資源', () => {
  for (const [url, h] of Object.entries(html)) {
    for (const t of tags(h, 'script')) {
      assert.ok(!/^https?:|^\/\//.test(attr(t, 'src') ?? ''), `${url} 載入了外部 script：${t}`);
    }
    for (const t of tags(h, 'link')) {
      const rel = attr(t, 'rel') ?? '';
      if (rel === 'canonical') continue;
      assert.ok(!/^https?:|^\/\//.test(attr(t, 'href') ?? ''), `${url} 載入了外部資源：${t}`);
    }
    for (const t of tags(h, 'img')) {
      assert.ok(!/^https?:|^\/\//.test(attr(t, 'src') ?? ''), `${url} 用了外部圖片：${t.slice(0, 120)}`);
    }
  }
  const astroDir = path.join(dist, '_astro');
  const css = existsSync(astroDir) ? readdirSync(astroDir).filter((f) => f.endsWith('.css')) : [];
  assert.ok(css.length > 0, '找不到輸出的 CSS');
  for (const f of css) {
    const c = readFileSync(path.join(astroDir, f), 'utf8');
    assert.ok(!/fonts\.googleapis|fonts\.gstatic/.test(c), `${f} 連到 Google Fonts，字型要自己放`);
  }
});

test('只輸出 woff2，CSS 不指到 .woff', () => {
  const astroDir = path.join(dist, '_astro');
  const files = readdirSync(astroDir);
  assert.deepEqual(files.filter((f) => f.endsWith('.woff')), [], 'dist/_astro 還有 .woff');
  for (const f of files.filter((f) => f.endsWith('.css'))) {
    assert.ok(!/\.woff\)/.test(readFileSync(path.join(astroDir, f), 'utf8')), `${f} 還指到已刪除的 .woff`);
  }
});

test('世界觀與角色內文完整（對照 docs/source/lore.md）', () => {
  const all = Object.values(html).map(visibleText).join('\n');
  const lines = readFileSync(path.join(root, 'docs', 'source', 'lore.md'), 'utf8').split(/\r?\n/);
  const missing = [];
  for (const raw of lines) {
    let line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    line = line.replace(/^>\s*/, '').replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '');
    const m = line.match(/^\*\*(.+?)\*\*：(.*)$/);
    const parts = m ? [...m[1].split(/[（）()]/), m[2]] : [line];
    for (const part of parts) {
      const want = squash(part.replace(/\*\*/g, ''));
      if (want.length < 2) continue;
      if (!all.includes(want)) missing.push(want.slice(0, 40));
    }
  }
  assert.deepEqual(missing, [], '下列內文在網站上找不到（一字不差才算）');
});

test('創作規範內文完整（對照 docs/source/notion-main.md）', () => {
  const page = visibleText(html['/guidelines/']);
  const src = readFileSync(path.join(root, 'docs', 'source', 'notion-main.md'), 'utf8');
  const section = src.split(/^## 創作規範\s*$/m)[1].split(/^## /m)[0];
  const missing = [];
  for (const raw of section.split(/\r?\n/)) {
    const line = raw.trim().replace(/^-\s+/, '');
    if (!line) continue;
    for (const part of line.split(/:\s|\s\(|\)/)) {
      const want = squash(part);
      if (want.length < 2) continue;
      if (!page.includes(want)) missing.push(want.slice(0, 40));
    }
  }
  assert.deepEqual(missing, [], '下列規範文字在 /guidelines/ 找不到');
});

test('角色頁：立繪切換、基本資訊、設定圖放大', () => {
  for (const url of ['/koro/', '/yoraya/']) {
    const h = html[url];
    const pressed = tags(h, 'button').filter((t) => attr(t, 'aria-pressed') !== null);
    assert.equal(pressed.length, 2, `${url} 要有兩顆 aria-pressed 的立繪切換鈕`);
    assert.equal(pressed.filter((t) => attr(t, 'aria-pressed') === 'true').length, 1, `${url} 預設只選一顆`);
    assert.match(h, /<dl\b/i, `${url} 的基本資訊要用 <dl>`);
    assert.match(h, /<dialog\b/i, `${url} 缺少放大檢視用的 <dialog>`);
    assert.match(h, /<details\b/i, `${url} 缺少 2P 色的摺疊區塊`);
    // 沒有 JavaScript 也要能看大圖：設定圖本身是連到大圖檔的連結
    const big = tags(h, 'a').filter((t) => attr(t, 'data-lightbox') !== null);
    assert.ok(big.length >= 5, `${url} 的設定圖連結太少（${big.length}）`);
    for (const t of big) assert.match(attr(t, 'href') ?? '', /^\/_astro\/.+\.(webp|png|jpg|avif)$/, `${url} 設定圖連結要指到圖檔`);
  }
});

test('首頁：兩位角色都能點進去', () => {
  const h = html['/'];
  const links = tags(h, 'a');
  for (const target of ['/koro/', '/yoraya/']) {
    const to = links.filter((t) => attr(t, 'href') === target);
    assert.ok(to.some((t) => (attr(t, 'class') ?? '').includes('hero__figure')), `首頁主視覺的立繪要連到 ${target}`);
    assert.ok(to.some((t) => (attr(t, 'class') ?? '').includes('text-link')), `首頁角色區要有文字連結到 ${target}`);
  }
  assert.ok(visibleText(h).includes(squash('月照萬界，狐鳴夜行')), '首頁缺少題詞');
});

test('委託插圖都有標繪師', () => {
  const counts = { '/': 1, '/bond/': 2, '/koro/': 1, '/yoraya/': 1 };
  for (const [url, count] of Object.entries(counts)) {
    const h = html[url];
    const figures = h.match(/<figure\b[^>]*class="[^"]*\bartwork\b[^"]*"[^>]*>[\s\S]*?<\/figure>/gi) ?? [];
    assert.equal(figures.length, count, `${url} 要有 ${count} 張委託插圖（目前 ${figures.length}）`);
    for (const figure of figures) {
      const imgs = tags(figure, 'img');
      assert.equal(imgs.length, 1, `${url} 的委託插圖要剛好一張 <img>`);
      assert.notEqual(attr(imgs[0], 'alt'), null, `${url} 的委託插圖要寫 alt`);
      assert.ok(visibleText(attr(imgs[0], 'alt')).length > 0, `${url} 的委託插圖 alt 不能是空的`);
      const caption = figure.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);
      assert.ok(caption, `${url} 的委託插圖要有 <figcaption>`);
      assert.match(visibleText(caption[1]), /^繪：.+/, `${url} 的圖說要以「繪：」開頭`);
    }
  }
});
