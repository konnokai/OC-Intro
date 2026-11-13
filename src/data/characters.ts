import type { ImageMetadata } from 'astro';

import koroLogo from '../assets/logo/koro.png';
import koroArmed from '../assets/koro/figure-armed.png';
import koroPlain from '../assets/koro/figure.png';
import koroCard from '../assets/koro/card.png';
import koroInner from '../assets/koro/inner.png';
import koroEye from '../assets/koro/eye.png';
import koroWeapon from '../assets/koro/weapon.png';
import koroVskin from '../assets/koro/vskin.png';
import koroVskinShowcase from '../assets/koro/vskin-showcase.png';

import yorayaLogo from '../assets/logo/yoraya.png';
import yorayaArmed from '../assets/yoraya/figure-armed.png';
import yorayaPlain from '../assets/yoraya/figure.png';
import yorayaCard from '../assets/yoraya/card.png';
import yorayaEye from '../assets/yoraya/eye.png';
import yorayaWeapon from '../assets/yoraya/weapon.png';

import twoP from '../assets/shared/2p.png';

export type CharacterSlug = 'koro' | 'yoraya';

export interface GalleryItem {
  image: ImageMetadata;
  /** 圖說，顯示在縮圖下方和放大檢視裡 */
  caption: string;
  /** 補充說明，例如繪師 */
  note?: string;
  alt: string;
}

export interface Character {
  slug: CharacterSlug;
  name: string;
  romaji: string;
  kana: string;
  /** 身分，例如「月龍守界者」 */
  role: string;
  /** 一句話形容 */
  tagline: string;
  logo: ImageMetadata;
  /** 兩張畫布一樣大的立繪，切換時人物位置不會動 */
  figure: {
    armed: ImageMetadata;
    plain: ImageMetadata;
    armedLabel: string;
    plainLabel: string;
    armedAlt: string;
    plainAlt: string;
  };
  card: ImageMetadata;
  cardAlt: string;
  profile: { label: string; value: string }[];
  sections: { id: string; heading: string; paragraphs: string[] }[];
  gallery: GalleryItem[];
}

export const koro: Character = {
  slug: 'koro',
  name: '皎朧',
  romaji: 'Koro',
  kana: 'こうろ',
  role: '月龍守界者',
  tagline: '冷酷的月之少女',
  logo: koroLogo,
  figure: {
    armed: koroArmed,
    plain: koroPlain,
    armedLabel: '持刀',
    plainLabel: '無刀',
    armedAlt: '皎朧全身立繪：銀白長髮、龍角與龍尾，身穿紅白和服，手持掛著提燈的長刀',
    plainAlt: '皎朧全身立繪：銀白長髮、龍角與龍尾，身穿紅白和服，沒有拿刀',
  },
  card: koroCard,
  cardAlt: '皎朧展示卡：持刀的全身立繪與半身特寫，藍色系背景',
  profile: [
    { label: '年齡', value: '外表約 16～18 歲，實際約 300 歲（月族的成長速度與凡人不同）' },
    { label: '身高', value: '160 cm' },
    { label: '生日', value: '10/12' },
    { label: '種族', value: '月族（月龍守界者）' },
    { label: '象徵意象', value: '龍、月、竹' },
    { label: '代表色', value: '月白、銀、靛青' },
  ],
  sections: [
    {
      id: 'appearance',
      heading: '外貌特徵',
      paragraphs: [
        '一頭銀白色的長髮如月光傾瀉，在滿月之夜會泛起淡淡的藍色光暈。額前有兩支晶瑩剔透的龍角，會隨心情與靈力變化微微改變色澤：平靜時呈銀白色，戰鬥時轉為深邃的月藍，憤怒或悲傷時則染上墨色。雙眸呈深藍色，彷彿能看穿一切虛妄。平時偏愛月白色與深紅色交織的和服，外罩一件帶有龍紋刺繡的輕甲羽織，腰間配戴一把名為「月影」的靈刀，刀鞘上鑲嵌著能夠儲存月之息的寶珠。',
      ],
    },
    {
      id: 'personality',
      heading: '性格刻畫',
      paragraphs: [
        '皎朧沉默寡言，話語簡潔有力，從不浪費一個字──不是因為冷漠，而是因為從小就被教導「月族的語言應當謹慎，如同月光落地的無聲」。她不太擅長社交，面對過於熱情的人時尤其不知所措，也不明白夜綾為什麼能對陌生人笑得那麼自然。',
        '她常因寡言被誤解為高傲或冷漠，其實只是不知道如何表達情感。她很想保護身邊的人，卻從不把關心說出口。夜綾打噴嚏時，她會默默泡好熱茶；對方受傷時，她會連夜尋找藥草，再假裝自己只是順手幫忙而已。',
        '皎朧始終擔心自己不夠強，總有一天會保護不了重要的人。這份恐懼讓她不斷磨練自己，偶爾也因此顯得不近人情。',
      ],
    },
    {
      id: 'combat',
      heading: '戰鬥風格',
      paragraphs: [
        '皎朧擅長以靈刀施展「月之呼吸」斬擊，也能吸收月光強化自身，滿月之夜最為強盛。她以「崩月斬」、「鏡花水月」等高階刀法見長，也能操控月之息進行遠距離斬擊，或展開結界，替自己與同伴阻隔外來攻擊。',
        '她的龍角是力量來源，角上的靈力紋路在戰鬥時會如螢光般流動。對月族而言，龍角也承載著血脈的尊嚴與傳承。',
      ],
    },
    {
      id: 'story',
      heading: '背景故事',
      paragraphs: [
        '皎朧出身月族名門，自幼便被視為天賦異稟。她的天賦讓她得到長老院的重視，也讓她很早就失去了普通族人的生活。皎朧的大半歲月都在修煉與任務中度過，幾乎沒有與同輩相處的經驗。長老院期待她成為守護月族的利刃，而她從未讓他們失望。',
        '在一次邊境鎮壓任務中，皎朧在星降之谷谷底救起了一名昏迷不醒的夜狐。直到夜綾醒來，毫不客氣地對她露出笑容，皎朧才知道自己帶回來的是個多大的麻煩。皎朧當時只想等夜綾傷勢穩定後便與她分道揚鑣，沒想到這隻麻煩的狐狸不但留了下來，還一步步成為她生命中最重要的人。',
        '裂縫持續擴大後，皎朧第一次開始質疑「所有責任都該由守界者獨自承擔」的教誨。她得學會把背後交給夜綾，而不是每次都把對方留在結界之外。',
      ],
    },
  ],
  gallery: [
    { image: koroCard, caption: '展示卡', note: '背景：四ノ宮design', alt: '皎朧展示卡：持刀的全身立繪與半身特寫，藍色系背景' },
    { image: koroArmed, caption: '立繪（持刀）', alt: '皎朧全身立繪，手持掛著提燈的長刀' },
    { image: koroPlain, caption: '立繪（無刀）', alt: '皎朧全身立繪，沒有拿刀' },
    { image: koroInner, caption: '內層服裝', alt: '皎朧脫下外層和服後的內層服裝：連身衣、短裙與長手套' },
    { image: koroEye, caption: '眼睛與瞳孔圖樣', alt: '皎朧的眼睛特寫，以及瞳孔裡的花形圖樣' },
    { image: koroWeapon, caption: '刀', alt: '皎朧的長刀：深色刀鞘，鞘尾掛著提燈與紅色流蘇' },
    { image: koroVskin, caption: 'V 皮立繪', note: '畫師：三川魅魅／模型：小稻宁宁', alt: '皎朧 V 皮全身正面立繪' },
    { image: koroVskinShowcase, caption: 'V 皮模型展示圖', note: '背景：小宇加油鸭', alt: '皎朧 V 皮模型展示圖：半身特寫與全身圖' },
  ],
};

export const yoraya: Character = {
  slug: 'yoraya',
  name: '夜綾',
  romaji: 'Yoraya',
  kana: 'よらや',
  role: '夜狐巡界者',
  tagline: '調皮的夜之少女',
  logo: yorayaLogo,
  figure: {
    armed: yorayaArmed,
    plain: yorayaPlain,
    armedLabel: '持弓',
    plainLabel: '無弓',
    armedAlt: '夜綾全身立繪：紫黑漸層長馬尾與狐耳，白色上衣配深色振袖，背著掛有提燈的長弓',
    plainAlt: '夜綾全身立繪：紫黑漸層長馬尾與狐耳，白色上衣配深色振袖，沒有帶弓',
  },
  card: yorayaCard,
  cardAlt: '夜綾展示卡：全身立繪與半身特寫，紫色系背景',
  profile: [
    { label: '年齡', value: '外表約 15～16 歲，實際約 150 歲' },
    { label: '身高', value: '158 cm' },
    { label: '生日', value: '10/12' },
    { label: '種族', value: '夜狐族（夜狐巡界者）' },
    { label: '象徵意象', value: '狐、夜、櫻' },
    { label: '代表色', value: '夜紫、深紅、墨黑' },
  ],
  sections: [
    {
      id: 'appearance',
      heading: '外貌特徵',
      paragraphs: [
        '一頭紫黑漸層長髮，在光線下泛著低調的紫色光澤；高高紮起的馬尾會隨動作如狐尾般甩動。她的狐耳與狐尾可以在人形時自由顯現或隱藏。琥珀色的雙眸透著幾分狡黠。她偏愛夜紫色與白色的和服，搭配寬大的振袖，行動間衣擺如蝶翅翻飛。',
      ],
    },
    {
      id: 'personality',
      heading: '性格刻畫',
      paragraphs: [
        '夜綾活潑外向，總帶著惡作劇般的笑容。她喜歡捉弄皎朧，尤其愛看那個冷冰冰的月族露出困擾的表情。她聰明機靈，總是能找到意想不到的解決辦法──雖然過程往往伴隨著爆炸和混亂。她對萬事萬物都充滿好奇，會為了追一隻蝴蝶而迷路一整天，然後若無其事地出現在你面前，笑著說「我發現了一條新的小徑哦」。',
        '然而在玩世不恭的外表下，夜綾比任何人都敏銳。她看得懂皎朧沒說出口的心思，也能察覺連月族都感受不到的細微波動。她討厭沉重的氣氛，也討厭看著皎朧把所有責任扛在自己肩上──所以她總是用笑鬧打破沉默，以看似輕浮的態度化解沉重的話題。',
        '夜狐族的出身讓她飽受月族保守派的輕視，但這沒有讓她變得憤世嫉俗，反而讓她學會用笑臉面對一切。她知道皎朧願意把背後交給自己，那份信任比任何稱號都值得驕傲。真到了危急時刻，她願意拿命換皎朧平安，嘴上卻只會笑著把這件事帶過。',
      ],
    },
    {
      id: 'combat',
      heading: '戰鬥風格',
      paragraphs: [
        '夜綾擅長幻術與變化術，能操控夜之息隱匿行蹤、偵察敵情。她的戰鬥方式以「狐火」、「幻影分身」、「夜行步」等靈活多變的招式為主。作為夜狐巡界者，她在夜晚的感知能力達到頂點，能夠察覺方圓數里內的一切靈力波動。',
        '她與皎朧之間存在一種月族典籍從未記載的「靈力共鳴」。只要兩人相距不遠，月之息與夜之息便會彼此呼應，爆發出遠勝單純疊加的力量。月族長老將此現象命名為「雙星現象」，原理至今仍未釐清。',
      ],
    },
    {
      id: 'story',
      heading: '背景故事',
      paragraphs: [
        '夜綾在夜狐族世代棲居的宵闇之森長大，從小就是族裡公認的小麻煩。她生來就擁有異常敏銳的感知力，能夠聽見萬物「呼吸的聲音」：大地的低語、風的呢喃，甚至月之本源的脈動。',
        '在一次邊境巡邏中，夜綾發現世界裂縫正以驚人的速度擴大。她試圖單獨調查，卻在星降之谷遭遇高等闇獸襲擊，墜入谷底。那一瞬間，她聽見了某種古老的低語──不是闇獸的聲音，而是比闇獸更古老、更龐大的存在。那之後，她的左手出現無法解釋的「夜之烙印」，使她與夜之息產生更深層的共鳴，卻也讓她時常夢見上古夜禍的低語。',
        '皎朧在星降之谷救起了夜綾，那是她們命運的開端。傷勢痊癒後，夜綾與皎朧繼續追查裂縫，並正式成為搭檔。從那天起，她肩上也多了一份從未想過的責任：無論世界裂縫與上古夜禍的真相是什麼，她都不能讓自己珍視的人獨自面對。',
        '她不知道的是，那道「夜之烙印」造成的影響遠比她想像得深遠──它既是威脅，也可能是拯救世界的鑰匙。',
      ],
    },
  ],
  gallery: [
    { image: yorayaCard, caption: '展示卡', note: '背景：四ノ宮design', alt: '夜綾展示卡：全身立繪與半身特寫，紫色系背景' },
    { image: yorayaArmed, caption: '立繪（持弓）', note: '振袖跟衣服是合在一起的', alt: '夜綾全身立繪，背著掛有提燈的長弓' },
    { image: yorayaPlain, caption: '立繪（無弓）', note: '振袖跟衣服是合在一起的', alt: '夜綾全身立繪，沒有帶弓' },
    { image: yorayaEye, caption: '眼睛與瞳孔圖樣', alt: '夜綾的琥珀色眼睛特寫，以及瞳孔裡的漩渦圖樣' },
    { image: yorayaWeapon, caption: '弓', alt: '夜綾的長弓：深色弓身，上端掛著提燈，下端垂著紅色流蘇' },
  ],
};

export const characters: Record<CharacterSlug, Character> = { koro, yoraya };

/** 兩位角色共用的設定圖，放在摺疊區塊裡 */
export const alternateDesign: GalleryItem & { summary: string } = {
  summary: '2P 色與服設（基本不會用到）',
  image: twoP,
  caption: '2P 色與服設',
  alt: '兩位角色的 2P 配色與服裝設計草稿：左為皎朧，右為夜綾',
};
