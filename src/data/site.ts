export const site = {
  name: '双星幻夜',
  nameEn: 'TwinStar Fantasia',
  title: '孤之界的 OC 設定 & 立繪',
  description:
    '双星幻夜（TwinStar Fantasia）：月龍守界者皎朧與夜狐巡界者夜綾的角色設定、立繪與創作規範。',
  epigraph: '「月照萬界，狐鳴夜行──這是守護與混沌永遠共舞的浮世繪卷。」',
  /** Notion 主頁：沒有放進網站的內容（例如沒有衣服的立繪）連到這裡 */
  notion: 'https://konnokai.notion.site/OC-320da7b2791c800aaf28d2e5865debe4',
  owner: {
    name: '孤之界',
    x: 'Kon_no_kai',
    discord: 'konnokai',
    email: 'contact@konnokai.me',
  },
  credits: [
    { role: '設計 & 繪製', name: '九櫻', x: '9saki_000' },
    { role: '展示卡背景', name: '四ノ宮design', x: 'Shinomiyamiya_' },
  ],
  nav: [
    { href: '/world/', label: '幻月界' },
    { href: '/koro/', label: '皎朧' },
    { href: '/yoraya/', label: '夜綾' },
    { href: '/bond/', label: '羈絆' },
    { href: '/guidelines/', label: '創作規範' },
  ],
} as const;

export const xUrl = (handle: string) => `https://x.com/${handle}`;
