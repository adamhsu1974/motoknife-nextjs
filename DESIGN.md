---
name: MOTOKNIFE
description: 台灣精密分條刀具製造商官網 — Devialet 式歐洲高端 B2B 工業美學
colors:
  calibration-orange: "#F47920"
  calibration-orange-deep: "#D9640C"
  calibration-orange-text: "#B84D08"
  calibration-orange-tint: "#FEF1E6"
  pure-white: "#FFFFFF"
  instrument-black: "#0D0D14"
  chassis-navy: "#1A1A2E"
  chassis-navy-dark: "#12121F"
  chassis-navy-light: "#24243C"
  ink: "#1A1A1A"
  slate-secondary: "#64748B"
  workshop-white-warm: "#F7F7F5"
  workshop-card: "#F1F1ED"
  hairline: "#E5E7EB"
  whatsapp-green: "#25D366"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "3rem (md: 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "1.875rem (md: 2.25rem)"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "DM Sans, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "DM Sans, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.14em"
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
    backgroundColor: "{colors.calibration-orange-deep}"
  button-outline-light:
    backgroundColor: "transparent"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-outline-dark:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  input:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
---

# Design System: MOTOKNIFE

## 1. Overview

**Creative North Star: "The Precision Instrument"**

整套系統像一件經過公差檢驗的精密儀器：每個元素都有明確功能、精確尺寸與克制的表面處理。深色舞台（instrument-black / chassis-navy）承載大面積留白，Barlow Condensed 緊湊大寫標題像機殼上的雷射刻字，唯一的飽和色——calibration-orange——如精密量具上的校準標記，只出現在需要視線落點的位置：CTA、關鍵數字、eyebrow 小標。內頁回到白底，像一本排版嚴謹的技術型錄。

這套系統明確拒絕（引自 PRODUCT.md）：generic AI SaaS look（Inter、purple-blue gradients、glassmorphism、icon-tile 三欄卡片）、cheap industrial-supplier template（red/blue 主色、雜亂產品格）、over-animated portfolio（parallax、scroll-jacking）、dark-mode-with-neon-accent tech startup look。我們是精密製造商，不是 crypto dashboard。

版面節奏：section 間距 6rem（次要 4rem），max-w-7xl 容器，Hero 全高深色 → 信任數字（navy-dark）→ 白底內容的明暗交替建立閱讀節奏。動效由 GSAP Reveal 統一管理（mount / scroll 進場、可 stagger），永遠不延遲規格資訊的取得。

**Key Characteristics:**
- 深色舞台 + 白底型錄的明暗分幕
- 單一飽和色（橙）作為全站唯一視線錨點
- 緊湊粗體 condensed 標題 vs 溫和幾何 sans 內文的強對比
- 深度靠色階與 1px 邊框；陰影只有靜態兩階（卡片 shadow-sm / 懸浮層 shadow-lg），hover 一律只換色
- 事實密度優先：數字、規格、專利是視覺主角

## 2. Colors

單一橙色錨點壓在近黑與暖白的無彩底盤上——克制到近乎嚴苛的 Committed 策略。

### Primary
- **Calibration Orange** (#F47920)：全站唯一飽和色。CTA 按鈕、eyebrow 小標、關鍵數字、heading 底線、::selection。像精密量具上的校準漆點——稀有性就是它的力量。
- **Calibration Orange Deep** (#D9640C)：橙色底色元素的 hover 態，只換色不位移。
- **Calibration Orange Text** (#B84D08)：淺底小字專用深橙。#F47920 在白底僅 2.8:1，此值於 white / bg-warm / orange-soft 均 ≥4.5:1。
- **Calibration Orange Tint** (#FEF1E6)：橙色的淺底衍生，用於標籤底色與高亮區塊，白底頁上的低調呼應。

### Neutral
- **Instrument Black** (#0D0D14)：Hero 專用近黑。帶一絲藍調，配 radial 橙色微光（rgba(244,121,32,0.12)）。
- **Chassis Navy** (#1A1A2E) / **Navy Dark** (#12121F) / **Navy Light** (#24243C)：深色區塊的三階機殼色。信任數字區、Footer、深色卡片的層次由這三階承擔。
- **Ink** (#1A1A1A)：白底上的內文主色。
- **Slate Secondary** (#64748B)：次要文字。僅限大字或輔助說明；小字內文一律用 Ink。
- **Workshop White Warm** (#F7F7F5) / **Workshop Card** (#F1F1ED)：白底頁的暖灰底與卡片底。
- **Hairline** (#E5E7EB)：1px 邊框與分隔線。深色區塊上改用 white/10。
- **WhatsApp Green** (#25D366)：嚴格限定 WhatsApp 按鈕，不得挪作他用。

### Named Rules
**The One Accent Rule.** Calibration Orange 是全站唯一飽和色，任一畫面佔比 ≤10%。第二個飽和色（除 WhatsApp 綠的功能性例外）一律禁止。
**The Legible Orange Rule.** 淺底上小於 18px 的橙色文字一律用 Calibration Orange Text (#B84D08)；#F47920 於淺底僅限大字、icon 底色與非文字元素。深色底上 #F47920 直接可用（≈6:1）。
**The Tonal Stage Rule.** 深色區文字用 white / white/60 / white/55 三階透明度（white/40 對小字不足 4.5:1，禁用於內文），禁止灰色文字直接壓深色底（會顯得髒）。

## 3. Typography

**Display Font:** Barlow Condensed（fallback: Arial Narrow）
**Body Font:** DM Sans（fallback: PingFang TC, Microsoft JhengHei — zh-tw CJK 支援）

**Character:** 緊湊粗體的 condensed 標題像機械銘板刻字，幾何但溫和的 DM Sans 內文負責可讀性——工業的骨架、專業的語氣。此配對為既有品牌承諾，不因流行更換。

### Hierarchy
- **Display**（700，3rem → md 4.5rem，lh ~1.05，tracking-tight）：Hero 標題。第二行可整行套 Calibration Orange 作強調。
- **Headline**（700，1.875rem → md 2.25rem）：區塊標題，常配 heading-accent 橙色底線（4rem × 0.25rem）。
- **Title**（600–700，1.25–1.5rem）：卡片標題、子區塊。
- **Body**（400，1rem，lh 1.5；次要文字 leading-relaxed 1.625）：內文行長 ≤ 72ch。
- **Label / Eyebrow**（600，0.75rem，letter-spacing 0.14em，uppercase，Calibration Orange）：`eyebrow` utility——本站具名的品牌排版系統（Devialet 式），deliberate，非模板反射。

### Named Rules
**The Condensed-Is-For-Headings Rule.** Barlow Condensed 只用於標題與大數字；內文、表單、規格表一律 DM Sans。condensed 內文不可讀，即為禁止。

## 4. Elevation

**安靜陰影 + 色階分層。** 深度主要由背景色階（instrument-black → chassis-navy 三階 → workshop-white）與 1px 邊框承擔（白底用 Hairline #E5E7EB，深色底用 white/10）。陰影詞彙只有兩個且皆為靜態：白卡在暖灰底上的安靜浮起（`shadow-sm`），與懸浮層（sticky Navbar、下拉選單、FloatingCTA）脫離頁面的 `shadow-lg`。深色區塊一律無陰影，深色卡改用 bg-white/[0.03] 微升起底色。

### Shadow Vocabulary
- **Card resting**（`shadow-sm`）：bg-white 卡片壓在 bg-warm/bg-card 段落上時的靜態浮起。純白段落上的白卡不需要。
- **Floating chrome**（`shadow-lg`，Navbar 可加 shadow-black/20 調深色）：sticky header、下拉選單、FloatingCTA、比較浮動列——真正懸浮於內容之上的元素。

### Named Rules
**The Resting Shadow Rule.** 陰影只存在於靜止狀態。hover 不升級陰影（禁 `hover:shadow-*`）、不位移（禁 `hover:-translate-*`）、不縮放——互動回饋一律換色（文字、邊框或底色）。若元素「浮不起來」，先調背景色階或邊框對比，不是加更深的陰影。

## 5. Components

手感：**克制而確實（restrained and exact）**——平面、小圓角、細邊框；hover 只換色，不位移、不縮放、不發光。

### Buttons
- **Shape:** 小圓角（4px，`rounded`），inline-flex 置中，font-semibold
- **Primary:** Calibration Orange 底 + 白字（padding md: 24px×12px / lg: 32–40px×14px）；hover 轉 Orange Deep
- **Outline-light（深色底用）:** 透明底 + border-white/30 + 白字；hover 邊框轉 white/70
- **Outline-dark（白底用）:** 透明底 + Hairline 邊框 + Ink 字；hover 邊框與文字轉橙
- **White（橙/深色底上的反白）:** 白底 + 橙字
- **轉場:** transition-colors，僅色彩

### Cards / Containers
- **Corner Style:** 8px（`rounded-lg`）
- **白卡（暖灰底段落上）:** bg-white + `shadow-sm` 靜態浮起；hover affordance 用 `border border-transparent hover:border-orange`（換色，不位移）
- **深色卡:** bg-white/[0.03] + border-white/10，無陰影
- **Internal Padding:** 24px（p-6）
- **Border:** 一律 1px；嚴禁彩色粗左邊框（side-stripe）

### Inputs / Fields
- **Style:** 白底 + Hairline 1px 邊框 + 4px 圓角，padding 12px×10px，text-sm Ink
- **Placeholder:** slate-secondary/50 —— 已知偏淡，改動表單時應提升對比至 4.5:1

### Navigation
- Sticky header，深色；Products 桌面 hover 下拉（6 系列 + Cutting Methods）、行動版手風琴
- 固定橙色「Get a Quote」CTA 常駐右側——每頁可見，不可移除

### Signature: Eyebrow + Heading Accent
橙色大寫細字距小標（`eyebrow` utility）+ 標題下 4rem 橙色底線（`heading-accent`）。這組是本站的具名品牌排版系統，新區塊沿用而非另創。

### Signature: GSAP Reveal
`components/gsap/Reveal` 統一進場動效（mount / scroll，y 位移 + fade，可 stagger），內建 prefers-reduced-motion 防護。新動效一律經此元件或同等防護，不散落 raw GSAP。

## 6. Do's and Don'ts

### Do:
- **Do** 讓 Calibration Orange (#F47920) 保持稀有——每個畫面一個主 CTA、少量強調，佔比 ≤10%。
- **Do** 淺底小字橙一律用 Calibration Orange Text (#B84D08)；#F47920 留給大字與深色底。
- **Do** 用色階（instrument-black → navy 三階 → 白）與 1px 邊框建立深度；陰影僅限靜態 shadow-sm（白卡）與 shadow-lg（懸浮層）。
- **Do** 用可驗證事實當視覺主角：年資、專利數、規格數字（信任數字區的數字必須有據，非裝飾統計）。
- **Do** 所有進場動效走 GSAP Reveal（含 reduced-motion 防護），hover 只換色。
- **Do** 深色底文字用 white / white/60 / white/55 三階（下限 white/55）；白底小字內文用 Ink (#1A1A1A)。

### Don't:
- **Don't** generic AI SaaS look：Inter font、purple-blue gradients、glassmorphism、icon-tile 三欄 feature cards、裝飾性 big-number-small-label stat blocks（引自 PRODUCT.md，逐字）。
- **Don't** cheap industrial-supplier template：red/blue 主色、雜亂產品格、badge walls（沒有的 ISO logo 不掛）、握手/地球 stock photos。
- **Don't** over-animated portfolio：parallax、scroll-jacking、任何延遲買家讀規格的裝飾動效。
- **Don't** dark-mode-with-neon-accent：深色是舞台不是主題，霓虹色一律禁止——we are a precision manufacturer, not a crypto dashboard。
- **Don't** hover 陰影升級（hover:shadow-*）、hover 位移/縮放、gradient text（background-clip: text）、彩色粗左邊框、巢狀卡片。
- **Don't** 引入第二個飽和色或把 WhatsApp 綠用在 WhatsApp 按鈕以外。
- **Don't** 用 Barlow Condensed 排內文，或用 Slate Secondary (#64748B) 排白底小字內文（對比不足）。
