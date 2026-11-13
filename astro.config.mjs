import { defineConfig } from 'astro/config';

/** 楷體套件的 CSS 同時列了 woff 和 woff2，但瀏覽器只會用到 woff2：不輸出 woff，CSS 裡的 url() 也拿掉 */
const dropWoff = {
  name: 'drop-woff',
  generateBundle(_options, bundle) {
    for (const [file, asset] of Object.entries(bundle)) {
      if (file.endsWith('.woff')) delete bundle[file];
      else if (file.endsWith('.css') && typeof asset.source === 'string') {
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