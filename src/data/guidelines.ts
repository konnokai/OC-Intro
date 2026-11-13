/** 文字照 Notion 主頁的「創作規範」，用字和標點不改 */
export const guidelines = {
  title: '創作規範',
  /** 放在禁止清單前面，Notion 也是這個順序 */
  r18: 'R18 創作大歡迎，但禁止 R18-G',
  prohibited: {
    heading: '以下內容禁止',
    items: [
      '「皎朧」龍角損毀相關創作 (包括但不限於折角、磨角、拆角等)',
      '懷孕相關創作',
      '禿頭相關創作',
      '使用 AI 進行任何創作或模型訓練 (包括但不限於圖片、聲音等，可以使用 Adobe Illustrator)',
      '將我方作品用於 AI 應用',
      '聲稱為官方作品或將創作誤導為我方立場',
      '仇恨言論 / 歧視',
      '極端政治、宗教宣傳',
      '違反法律內容',
      '破壞角色形象之內容',
    ],
    note: '尚未提及之處以我方認定為準',
  },
  usage: {
    heading: '二創作品的使用',
    text: '二創作品可能基於推廣用途使用於直播或社群平台上 (會標註作者)，若有製作周邊的需求則會與作者聯繫',
  },
  commercial: {
    heading: '商用或周邊販售',
    items: [
      '需跟孤之界 (以下簡稱本人) 告知確認',
      '若有實體周邊產出需與廠商簽約',
      '手工製作收藏不需告知',
      '有任何疑慮請向本人詢問',
    ],
  },
  tags: {
    heading: '創作相關標籤',
    items: [
      { label: '召喚 / Live Tag', tag: '綾朧來跨麥' },
      { label: '二創 Tag', tag: '綾朧有致' },
      { label: 'R18 Tag', tag: '舔濕慾綾朧' },
    ],
    note: '直接於 X 標記本人帳號 (@Kon_no_kai) 也可以，或是丟在 Discord 群內',
  },
  rights: {
    heading: '規範修改',
    text: '本人保留隨時修改本規範之權利，若有未盡事宜則以本人解釋為準',
  },
  /** 依推薦程度由上到下排序，所以用有序清單 */
  contact: {
    heading: '本人聯絡方式',
    note: '推薦聯絡方式由上到下排序',
    items: [
      { label: 'Discord', value: 'konnokai' },
      { label: 'Email', value: 'contact@konnokai.me', href: 'mailto:contact@konnokai.me' },
      { label: 'X', value: 'Kon_no_kai', href: 'https://x.com/Kon_no_kai' },
    ],
  },
} as const;

export const hashtagUrl = (tag: string) => `https://x.com/hashtag/${encodeURIComponent(tag)}`;
