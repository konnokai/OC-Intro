# 双星幻夜 TwinStar Fantasia

孤之界兩位 OC（皎朧、夜綾）的介紹網站。Astro 靜態輸出，部署在 Cloudflare Workers。

## 開發

```bash
npm install
npm run dev
```

## 建置與測試

```bash
npm run build   # 輸出到 dist/
npm test        # 先 build 再跑 tests/ 的驗收測試
npm run preview # 預覽 dist/
```

需要 Node `>=22.23.4`（`.node-version` 寫的就是 Workers Builds 用的版本）。

## Cloudflare Workers

Workers Builds 設定：

- Build command：`npm run build`
- Deploy command：`npx wrangler deploy`（讀 `wrangler.jsonc`，把 `dist/` 當靜態資產上傳）
- Node.js 版本：讀 `.node-version`，沒有另外設環境變數
- 環境變數 `SITE_URL`：正式網址，用來產生 canonical 和 og:url。沒設時用 `https://twinstar-fantasia.tw`（`astro.config.mjs` 的預設值），本機開發不用設。

要在本機自己部署就用 `npm run deploy`，第一次要先 `npx wrangler login`。

## 內容維護

所有設定文字放在 `src/data/`：

- `site.ts`：站名、題詞、導覽、製作名單、聯絡方式
- `characters.ts`：角色資料、立繪、設定圖清單
- `world.ts`：世界觀
- `bond.ts`：羈絆
- `guidelines.ts`：創作規範

改資料就好，版面不用動。素材來源與處理方式見 `docs/SPEC.md` 第 9 節。

測試會拿 `docs/source/lore.md`（世界觀與角色）和 `docs/source/notion-main.md`（創作規範）逐字比對網站內文。改了 `src/data/` 的設定文字，這兩份也要一起改，不然 `npm test` 會失敗。
