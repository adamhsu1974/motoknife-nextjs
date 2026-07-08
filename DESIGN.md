---
name: MOTOKNIFE
description: 台灣精密分條刀具製造商官網 — The Bright Workshop（DJI 式白底明亮工業展示）
colors:
  bg-primary: "#FFFFFF"
  bg-secondary: "#F5F6F7"
  bg-tertiary: "#FAFAFA"
  ink: "#1A1A1A"
  text-secondary: "#666666"
  text-muted: "#999999"
  calibration-orange: "#F47920"
  calibration-orange-hover: "#D8681A"
  calibration-orange-text: "#B84D08"
  calibration-orange-tint: "#FEF1E6"
  hairline: "#ECECEC"
  border-strong: "#D5D5D5"
  chassis-navy: "#1A1A2E"
  chassis-navy-dark: "#12121F"
  instrument-black: "#0D0D14"
  whatsapp-green: "#25D366"
typography:
  display:
    fontFamily: "DM Sans, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 2rem + 1.5vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "DM Sans, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.375rem + 0.8vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.2
  title:
    fontFamily: "DM Sans, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "1rem-1.125rem"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "DM Sans, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "0.875rem-0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "0.6875rem-0.75rem"
    fontWeight: 600
    letterSpacing: "0.13em"
rounded:
  sm: "4px"
  lg: "8px"
  full: "9999px"
spacing:
  section-sm: "4rem"
  section: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.calibration-orange}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.calibration-orange-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  input:
    backgroundColor: "{colors.bg-tertiary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
---

# Design System: MOTOKNIFE

> **v2（2026-07-08）**：本版取代 v1「The Precision Instrument」深色方向。核心轉變：全站深色 → DJI 式白底明亮展示。深色僅保留 Navbar（可選）、Footer、結尾 CTA 區塊。

## 1. Overview

**Creative North Star: "The Bright Workshop"**

明亮、精密、值得信賴的現代工廠。像 DJI 展示無人機那樣展示刀組：白色舞台上產品即主角，頁面本體幾乎無色——色彩讓給產品渲染圖與唯一的動作色 Calibration Orange。區塊以 #FFFFFF ↔ #F5F6F7 交替呼吸，不用線條硬切。排版走 Apple 式紀律：中等字重、正常大小寫、極短文案；內容走 Tesla 式節奏：一屏一事，圖片佔比 ≥60%。

參考配方（五站精華）：**DJI**（明亮色彩系統、規格前置、產品頁 FAQ）＋ **Apple**（排版紀律、sticky 子導覽）＋ **Universal Robots**（應用導向導覽、規格快覽條、真實場景照）＋ **Tesla**（一屏一事）＋ 雜誌式圖文交錯敘事區塊。

這套系統明確拒絕（引自 PRODUCT.md）：generic AI SaaS look、cheap industrial-supplier template、over-animated portfolio、dark-mode-with-neon-accent。另廢除 v1 遺產：**Condensed 全大寫粗體大標題**與 700+ 字重標題一律禁止。

**Key Characteristics:**
- 白色舞台 + 淺灰分節的明暗呼吸（非深色戲劇）
- 橘色嚴格限定「動作色」：按鈕、連結、eyebrow，佔畫面 ≤5%
- 中等字重（500）正常大小寫標題——自信不喊叫
- 產品圖片是視覺主角；素材未到位用中性留白圖位維持結構
- 事實密度不變：規格、專利、年資仍是說服主力

## 2. Colors

近乎無色的白灰底盤 + 單一動作橙——比 v1 更收斂的 Restrained 策略。

### Primary
- **Calibration Orange** (#F47920)：唯一動作色——實心按鈕底色、eyebrow（深色底）、hover 邊框。佔畫面 ≤5%。
- **Calibration Orange Hover** (#D8681A)：橙底元素 hover 態，只換色不位移。
- **Calibration Orange Text** (#B84D08)：**白/淺灰底上所有小字橙**（連結、eyebrow、規格註記）。#F47920 於白底僅 2.8:1，此值 ≥4.5:1。
- **Calibration Orange Tint** (#FEF1E6)：標籤/chip 淺底。

### Neutral
- **BG Primary** (#FFFFFF)：主背景——hero、敘事區。
- **BG Secondary** (#F5F6F7)：分節背景，與白交替形成區塊節奏。
- **BG Tertiary** (#FAFAFA)：卡片內圖片底、輸入框底、留白圖位。
- **Ink** (#1A1A1A)：主文字與標題（近黑，不用純黑）。
- **Text Secondary** (#666666)：內文副文字（白底 5.7:1 ✓）。
- **Text Muted** (#999999)：**僅限裝飾性標籤與非必要資訊**（白底 2.85:1，不得用於須閱讀的小字——該用 Text Secondary）。
- **Hairline** (#ECECEC)：細分隔線。**Border Strong** (#D5D5D5)：輸入框、ghost 按鈕邊框。
- **深色保留區**：Chassis Navy (#1A1A2E) / Navy Dark (#12121F) / Instrument Black (#0D0D14)——僅限 Navbar（可選）、Footer、結尾 CTA。深色底上文字 white / white/60 / white/55 三階，橙用 #F47920（≈6:1）。
- **WhatsApp Green** (#25D366)：僅 WhatsApp 按鈕。

### Named Rules
**The Action Color Rule.** 橘色只做動作色：按鈕、連結、eyebrow。頁面本體幾乎無色，色彩讓給產品照片。任一畫面橙佔比 ≤5%，第二飽和色禁止（WhatsApp 綠例外）。
**The Legible Orange Rule.** 白/淺灰是全站預設場地：小於 18px 的橙色文字（含 eyebrow、連結）一律 #B84D08；#F47920 僅限按鈕底色、大字與深色底。
**The White Stage Rule.** 區塊切換用 #FFFFFF ↔ #F5F6F7 背景交替，不用線條硬切。深色區塊全站僅三處：Navbar（可選）、Footer、結尾 CTA（收尾重心）。

> **已知 AA 例外（2026-07-08 業主核可）**：橙底（#F47920）白字按鈕 2.76:1，低於 AA 4.5:1。屬品牌級刻意取捨（DJI/Apple 同款作法），audit 時視為 documented exception，不再重報。其餘文字一律嚴格 AA。

## 3. Typography

**單一家族：DM Sans**（fallback: PingFang TC / Microsoft JhengHei——zh-tw CJK）。Barlow Condensed 降級：**僅可用於 eyebrow 小型標籤**，不可用於 H1/H2/H3。

**Character:** Apple 式排版紀律——大標題中等字重、正常大小寫、極短文案。自信由留白與精準措辭傳達，不由粗體與大寫喊叫。

### Hierarchy
- **Display / H1**（500，clamp 2.5rem → 3rem ≈ 40–48px，lh 1.15，Ink）：正常大小寫。禁止全大寫、禁止 700+。
- **Headline / H2**（500，1.625–2rem ≈ 26–32px，lh 1.2）：區塊標題。
- **Title / H3**（500，1–1.125rem ≈ 16–18px）：產品名、卡片標題。
- **Body**（400，0.875–0.9375rem ≈ 14–15px，lh 1.6–1.7，Text Secondary #666）：行長 ≤72ch。
- **Eyebrow / Label**（Barlow Condensed 600，11–12px，letter-spacing 0.13em ≈ 1.5px，大寫）：淺底用 Orange Text (#B84D08)、深色底用 Orange (#F47920)。

### Named Rules
**The Medium-Weight Rule.** 標題一律 font-weight 500；700+ 字重與 Condensed 全大寫大標題（v1 遺產）全站禁止。
**The Condensed-Is-For-Labels Rule.** Barlow Condensed 只准出現在 eyebrow 小型標籤；其餘一律 DM Sans。

## 4. Elevation

**白色舞台上的安靜陰影。** 深度由背景交替（white ↔ #F5F6F7）與 1px 邊框承擔。陰影詞彙兩階、皆為靜態：白底卡片允許極輕 `shadow-sm`；懸浮元件（Navbar、下拉、FloatingCTA）允許 `shadow-md`。深色保留區（Footer/結尾 CTA）無陰影。

### Shadow Vocabulary
- **Card resting**（`shadow-sm`）：白卡壓在 #F5F6F7 分節上的極輕浮起。白底上的白卡改用 1px Hairline 邊框。
- **Floating chrome**（`shadow-md`）：sticky Navbar、下拉選單、FloatingCTA——真正懸浮於內容之上的元素。

### Named Rules
**The Resting Shadow Rule.** 陰影只存在於靜止狀態。hover 不升級陰影、不位移、不縮放——互動回饋一律換色（文字、邊框或底色）。

## 5. Components

手感維持既定：**克制而確實**——平面、小圓角（4–8px）、細邊框；hover 只換色不位移。

### Buttons
- **Shape:** 4px 圓角，inline-flex 置中，font-medium
- **Primary:** Calibration Orange 底 + 白字；hover 轉 #D8681A
- **Ghost:** 透明底 + Border Strong (#D5D5D5) 1px 邊框 + Ink 字；hover 邊框與文字轉橙（淺底用 Orange Text）
- **轉場:** transition-colors，僅色彩

### Cards / Containers
- **產品卡:** 白底 + 4–8px 圓角；圖片區用 BG Tertiary (#FAFAFA) 底；hover 加 0.5–1px 橙色邊框（`border border-transparent hover:border-orange`），不位移
- **分節上的白卡:** `shadow-sm`；白底上的卡用 Hairline 邊框替代陰影
- **Internal Padding:** 24px（p-6）
- **Border:** 一律 1px；嚴禁彩色粗左邊框（side-stripe）、巢狀卡片

### Inputs / Fields
- **Style:** BG Tertiary (#FAFAFA) 或白底 + Border Strong (#D5D5D5) 1px + 4px 圓角
- **Focus:** 2px 橙色 outline
- **Placeholder:** ≥4.5:1（用 Text Secondary，不用 Muted）

### Navigation
- 深色 Navbar 可選保留（navy）或轉白底——part 2 決定；sticky + `shadow-md`
- 固定橙色「Get a Quote」CTA 常駐——每頁可見，不可移除
- Apple 式 sticky 產品子導覽：產品頁內錨點導覽列

### Signature: Neutral Image Slot（中性留白圖位）
素材未到位時的標準佔位：BG Tertiary (#FAFAFA) 色塊 + 固定 aspect-ratio + 無任何文字/註記。**開發註記、假素材、灰字說明一律禁止上線**（v1 P0 教訓）。素材到位後原位替換，版面零位移。

### Signature: Eyebrow
橙色大寫細字距小標保留為具名品牌系統（淺底 #B84D08 / 深底 #F47920，Barlow Condensed）。v1 的 heading-accent 橙色底線廢除——白底版面的層級由字重與留白承擔。

### Signature: GSAP Reveal
`components/gsap/Reveal` 統一進場動效，保留（mount / scroll、stagger、prefers-reduced-motion 防護）。明亮版面動效更節制：位移幅度縮小、一屏一事各自進場。

## 6. Do's and Don'ts

### Do:
- **Do** 讓產品圖片當主角：每個敘事區塊圖片佔比 ≥60%，一屏只講一個主張。
- **Do** 區塊節奏用 #FFFFFF ↔ #F5F6F7 背景交替，深色只留 Navbar（可選）/Footer/結尾 CTA。
- **Do** 標題 DM Sans 500 正常大小寫；eyebrow 是唯一的 Barlow Condensed 與唯一的大寫。
- **Do** 淺底小字橙一律 #B84D08；#F47920 留給按鈕底色與深色底。
- **Do** 素材缺位用中性留白圖位（#FAFAFA 色塊 + aspect-ratio），保持結構就緒。
- **Do** 用可驗證事實當說服主力：規格前置（DJI 式 hero 疊關鍵數字）。

### Don't:
- **Don't** Condensed 全大寫粗體大標題、700+ 字重標題（v1 遺產，全站廢除）。
- **Don't** generic AI SaaS look：Inter font、purple-blue gradients、glassmorphism、icon-tile 三欄 feature cards、裝飾性 stat blocks（引自 PRODUCT.md，逐字）。
- **Don't** cheap industrial-supplier template：red/blue 主色、雜亂產品格、badge walls、握手/地球 stock photos。
- **Don't** over-animated portfolio：parallax、scroll-jacking、延遲讀規格的裝飾動效。
- **Don't** dark-mode-with-neon-accent——深色只是收尾重心，不是主題。
- **Don't** hover 陰影升級、hover 位移/縮放、gradient text、彩色粗左邊框、巢狀卡片。
- **Don't** 用 Text Muted (#999) 排須閱讀的小字（2.85:1 不及格）；說明文字用 Text Secondary (#666)。
- **Don't** 讓開發註記或假素材上線——留白圖位裡不放任何文字。
