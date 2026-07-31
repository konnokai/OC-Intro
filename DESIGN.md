---
name: "双星幻夜"
description: "以月色、界線與雙星共鳴構成的日式暗黑幻想角色敘事系統"
colors:
  ink: "#101126"
  ink-deep: "#090a18"
  ink-soft: "#181a38"
  moon: "#edf3f4"
  moon-dim: "#b9c8d2"
  violet: "#7772a5"
  violet-deep: "#3c385f"
  vermilion: "#a83248"
  vermilion-bright: "#e57586"
  text-muted: "#a9afc3"
  action-text: "#fff4f5"
  line: "rgba(237, 243, 244, 0.16)"
typography:
  display:
    fontFamily: '"Noto Serif TC", "Yu Mincho", "Hiragino Mincho ProN", serif'
    fontSize: "clamp(3.7rem, 6.6vw, 7rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.06em"
  headline:
    fontFamily: '"Noto Serif TC", "Yu Mincho", "Hiragino Mincho ProN", serif'
    fontSize: "clamp(2.7rem, 5vw, 5.3rem)"
    fontWeight: 500
    lineHeight: 1.16
    letterSpacing: "-0.045em"
  title:
    fontFamily: '"Noto Serif TC", "Yu Mincho", "Hiragino Mincho ProN", serif'
    fontSize: "clamp(1.35rem, 2vw, 1.8rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.04em"
  body:
    fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 2
    letterSpacing: "normal"
  label:
    fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.18em"
rounded:
  none: "0px"
  circle: "50%"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "clamp(6rem, 10vw, 10rem)"
components:
  button-primary:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.action-text}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.9rem 1.25rem"
  button-primary-hover:
    backgroundColor: "#b93a51"
    textColor: "{colors.action-text}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.9rem 1.25rem"
  button-framed:
    backgroundColor: "rgba(10, 9, 21, 0.72)"
    textColor: "{colors.moon}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.9rem 1.05rem"
  keyword-chip:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.55rem 0.85rem"
  modal-guidelines:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.moon}"
    rounded: "{rounded.none}"
    width: "min(100%, 940px)"
---

# Design System: 双星幻夜

## Overview

**Creative North Star: "月下界域誌"**

「月下界域誌」像一冊在月色下展開的守界紀錄。它以官方角色立繪為敘事核心，透過細線框界、章節編號、直排字、印記與長頁留白，把角色設定、世界異變與創作規範編排成同一份可信的公開檔案。

整體氣質靜謐、克制、莊重。畫面可以有戲劇張力，但介面本身不喧鬧；裝飾必須對應月、夜、界線、守護或雙星共鳴。密度在大幅圖像與資訊段落之間交替，讓訪客先感受角色，再逐步讀懂設定與規則。

**Key Characteristics:**

- 深靛黑長頁承載月白文字，朱印紅只在關鍵位置出現。
- 明體負責敘事、角色與情緒，黑體負責導覽、資料與操作。
- 不對稱分欄、大片留白與跨區塊細線建立編輯節奏。
- 官方角色圖與場景圖是視覺主體，介面退到畫面邊界與資訊層。
- 圓環、方印、菱形與直排字只在具有世界觀意義時使用。

## Colors

色彩由界夜墨、月白、夜紫與朱印紅組成；背景保持低明度，資訊層靠細微亮度差區分，鮮明色不負責大面積鋪陳。

### Primary

- **朱印紅：** 用於主要行動、互動狀態、章節索引、警示與細小印記。
- **亮朱印：** 用於 hover、焦點提示與需要更高辨識度的短暫狀態。

### Secondary

- **夜紫：** 用於雙星共鳴、夜綾相關的能量層與冷色裝飾線。
- **深夜紫：** 用於接近背景的次級色面，不與朱印紅競爭。

### Neutral

- **界夜墨：** 主要內容底色，也是對話框與深色容器的基準。
- **深界夜：** 頁面最深背景、導覽底色與遮罩基底。
- **柔界夜：** 次級內容面與規範標籤區塊。
- **月白：** 標題、主要文字與高優先資訊。
- **月影銀：** 引句、敘事文字與需要柔化的主要文字。
- **霧銀：** 內文、說明、資料標籤與次要資訊。
- **界線白：** 低透明度分隔線、框線與結構邊界。

### Named Rules

**The 朱印限量 Rule.** 朱印紅只負責行動、狀態、章節索引與警示；同一視窗不讓它成為大面積底色。

**The 月白分級 Rule.** 標題使用月白，長文與輔助資訊退到月影銀或霧銀；不可讓所有文字維持相同亮度。

## Typography

**Display Font:** Noto Serif TC，後接 Yu Mincho、Hiragino Mincho ProN 與 serif

**Body Font:** Noto Sans TC，後接 PingFang TC、Microsoft JhengHei 與 sans-serif

**Character:** 明體帶出古典、靜默與敘事重量；黑體維持資訊清晰，讓英文標籤、數字、按鈕和導覽保持俐落。

### Hierarchy

- **Display**（500，流體大字級，緊密行高）：只用於首頁主標與角色名，允許明顯負字距與錯位換行。
- **Headline**（500，流體標題字級，舒展行高）：用於章節標題與長頁敘事節點。
- **Title**（500，中型流體字級）：用於內容面板、規範段落與角色小標。
- **Body**（400，基準字級，寬鬆行高）：用於設定說明與長段閱讀；桌面文字寬度應受控，避免橫跨整頁。
- **Label**（400，小字級，寬字距）：用於英文 eyebrow、資料欄、導覽與按鈕；章節編號可提高至 600。

### Named Rules

**The 明體敘事 Rule.** 大標、角色名、引句與敘事標題用明體；導覽、資料欄、按鈕與英文標籤用黑體。

**The 斷行即停頓 Rule.** 標題用預先安排的換行製造停頓，不在標題尾端加標點。

**The 文案克制 Rule.** 正典設定與網站敘事文案不加可見來源標籤；差異由章節結構、語氣與內容維護流程管理。

## Layout

主要內容置於最大寬度 1320px 的流體容器，桌面左右邊界至少保留 1.5rem，窄螢幕縮為 1rem。標準章節使用大尺度垂直留白；章節之間以背景明度、細線或構圖轉向分隔，不以獨立卡片堆疊。

桌面版採不對稱雙欄與交錯圖文。世界觀區讓標題與內文保持不同垂直起點；角色區用立繪與資料欄建立穩定或動態的對比；雙星區以 1.12 / 0.88 的視覺比重切分圖像與文字。規範區以一個主要規則面板搭配較小的標籤與聯絡區，不做等寬卡片矩陣。

1100px 以下縮減角色舞台；900px 以下切換單欄、行動導覽與上下排列；640px 以下進一步縮小頁面邊界、拆開資料欄與時間軸。直式行動裝置的首頁保留滿版場景，標題置頂、說明與 CTA 置底，中段留給兩名角色，不能遮住臉、皎朧的角或夜綾的尾巴。

**The 角色留場 Rule.** 圖文重排時先保住角色辨識與官方立繪的完整性，再調整文字尺寸與位置。

**The 非對稱平衡 Rule.** 兩欄可以不等寬、內容可以錯位，但視覺重量必須透過留白、線條或圖像尺度取得平衡。

## Elevation & Depth

系統採平面分層。深度主要來自深淺色面、半透明遮罩、背景漸層、圖像疊放、細線交界與局部模糊；大多數內容在靜止狀態沒有陰影。角色立繪保留柔和投影，使透明圖與背景分離；規範對話框使用明確的大範圍陰影，標示它位於頁面之上。

### Shadow Vocabulary

- **角色落影：** 大範圍、低透明度的向下投影，只用於透明角色立繪。
- **規範浮層：** 深色、寬擴散陰影，只用於模態對話框等真正脫離頁面的介面。
- **共鳴光暈：** 低強度濾鏡光暈，只在使用者啟動雙星狀態後出現。

### Named Rules

**The 平面為常態 Rule.** 一般內容面不靠陰影抬升；只有角色立繪、狀態能量與模態介面能取得額外深度。

## Shapes

主要元件維持直角。按鈕、標籤、導覽、資料欄、內容面板與對話框都以 0px 圓角和 1px 細線建立清楚邊界。圓形只屬於月輪、能量環與軌道；旋轉方形形成印章或雙星菱形。這些幾何不是通用裝飾，而是世界觀符號。

**The 線條定界 Rule.** 需要分組時先使用留白、細線與色面，不把每段內容包進圓角容器。

**The 圓形有因 Rule.** 圓形只對應月、軌道或能量；一般按鈕、標籤與資訊面板不得任意膠囊化。

## Components

元件哲學是「線條定界，朱印下令」。結構以月白細線安靜存在，只有可操作、正在變化或需要警示的地方使用朱印紅。

### Buttons

- **Shape:** 直角矩形，以 1px 邊線或實色底區分層級。
- **Primary:** 朱印紅底、暖白文字、中等水平內距；用於啟動共鳴等明確行動。
- **Framed:** 深色半透明底、月白細框；用於首頁 CTA，必須在複雜場景圖上保持可讀。
- **Text / Underline:** 透明底與朱印紅底線；用於開啟完整規範等次要行動。
- **Hover / Focus:** hover 可提高朱紅亮度、拉開圖示間距或產生極小位移；focus-visible 一律顯示清楚的亮朱印外框。

### Chips

- **Style:** 透明底、界線白細框、霧銀文字、直角；字級小且字距寬。
- **State:** 目前只作角色關鍵字，不表現可點擊或篩選狀態。

### Content Copy

- 不在介面加入「公開設定摘要」、「敘事導語」或其他可見來源標籤。
- 正典設定與網站敘事文案透過章節位置、語氣及資料來源維持區別。
- 網站敘事不得改寫或冒充正式設定，正典異動須同步更新內容資料與專案文件。

### Cards / Containers

- **Corner Style:** 全部直角。
- **Background:** 使用界夜墨、柔界夜或透明背景；大型內容可加低對比漸層，但不套用通用卡片模板。
- **Shadow Strategy:** 靜止內容不使用陰影。
- **Border:** 以單邊或跨欄 1px 細線建立結構，不要求四邊完整包框。
- **Internal Padding:** 依內容重要性在 1rem 到 3.5rem 間調整，大型章節保留更寬鬆空間。

### Navigation

- 固定於頂部，桌面高度 72px，行動版 64px；深界夜半透明底搭配模糊和底部細線。
- 品牌印記使用透明背景的官方 Logo，並以極輕外緣陰影維持深色導覽上的辨識度；名稱以明體呈現，導覽連結使用小型黑體與寬字距。
- 桌面 hover 由朱印紅細線自右向左展開；900px 以下改為方形選單按鈕與全寬下拉導覽。

### Creation Guidelines Dialog

- 寬度上限 940px，直角、界線白細框、界夜墨底與低對比夜紫漸層。
- 桌面置中並保留四周空間；640px 以下貼齊畫面底部，移除左右與底部框線。
- 標頭固定在內容上方，內文獨立捲動；首屏先以「可直接創作／需先詢問／禁止內容」提供用途判斷，再保留完整條款。
- 快速判斷區顯示規範版本與聯絡捷徑；完整禁止內容依角色與成人內容、AI 與官方身分、危害與其他情況分組。
- 警示段落以朱印紅線與小方點標記。
- 開啟時鎖定背景捲動、移除背景可互動性，並把焦點送到關閉按鈕。

### Character Stage

- 官方透明立繪是視覺主體，搭配月輪、竹影或夜色弧線等低對比敘事元素。
- 皎朧以穩定、偏垂直的構圖呈現；夜綾以更具動勢的方向與曲線呈現。
- 立繪周圍可使用直排稱號，但不可遮住臉、皎朧的角、夜綾的尾巴或左手夜之烙印。

## Do's and Don'ts

### Do:

- **Do** 讓官方角色圖或場景圖在每個主要角色段落取得明確主導權。
- **Do** 用不對稱分欄、受控留白與 1px 細線組織資訊。
- **Do** 讓朱印紅維持稀少，集中在行動、索引、警示和互動狀態。
- **Do** 使用明體斷行建立節奏，並以黑體維持資料與操作清晰。
- **Do** 在所有新動態中保留 `prefers-reduced-motion` 的完整替代行為。

### Don't:

- **Don't** 使用大量圓角卡片、膠囊標籤或等寬功能卡矩陣。
- **Don't** 把玻璃擬態、模糊、漸層、光暈或陰影當成預設裝飾。
- **Don't** 加入沒有月、夜、界線、守護或雙星敘事目的的幾何物件。
- **Don't** 用介面文字、遮罩或裁切遮住角色臉部、皎朧的角、夜綾的尾巴或左手烙印。
- **Don't** 為皎朧加入雪景、雪花或其他已移除的雪意象。
- **Don't** 重新生成、重繪、修補或以生成式 AI 取代官方角色與場景素材。
