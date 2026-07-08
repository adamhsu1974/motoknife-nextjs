---
target: the homepage
total_score: 25
p0_count: 1
p1_count: 2
timestamp: 2026-07-08T06-14-57Z
slug: app-lang-page-tsx
---
**Method: dual-agent (A: ab3d86a0eecb5ba08 · B: a82eafcbbf678f56e)**

# 首頁 Critique — `/en`（`app/[lang]/page.tsx`）

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Navbar 無當前頁指示（無 aria-current / active 樣式） |
| 2 | Match System / Real World | 3 | 「What Are You Cutting?」極佳；但 Hero 橙色強調落在最空洞的字「SOLUTIONS」 |
| 3 | User Control and Freedom | 3 | reduced-motion 有防護、無 scroll-jacking；Products 下拉 hover-only，鍵盤/觸控無獨立展開路徑 |
| 4 | Consistency and Standards | 2 | 同一動作三種標籤；eyebrow 與 heading-accent 混用；違反自家 No-Shadow Rule |
| 5 | Error Prevention | 2 | 應用磁磚整塊看似可點，實際只有內部兩個小連結可點 |
| 6 | Recognition Rather Than Recall | 3 | 代理商國家直接列名、材料作為入口 |
| 7 | Flexibility and Efficiency | 3 | 四條詢價路徑；語言切換保留路徑 |
| 8 | Aesthetic and Minimalist Design | 2 | 開發註記「Higgsfield, Phase 3」直接上線 |
| 9 | Error Recovery | 3 | 無死路 |
| 10 | Help and Documentation | 2 | 首頁無目錄 PDF、無 FAQ；24–48h 承諾埋在地圖段落 |
| **Total** | | **25/40** | **Acceptable** |

## Anti-Patterns Verdict

不會被立刻認成 AI 做的，但 30 秒內看得出模板 DNA，且首頁五處違反 DESIGN.md：

- Icon-tile 卡片格：切法區 4 張同構卡（icon tile + 標題 + 文字），page.tsx:156–175（PRODUCT.md 反面參考）
- 側條邊框（絕對禁令）：hover 橙色左側條，page.tsx:163
- Shadow 違規：`shadow-sm hover:shadow-lg` + `hover:-translate-y-1`（page.tsx:161）、Navbar/FloatingCTA `shadow-lg`——違反 No-Shadow Rule 與「hover 只換色」
- Stat-block 模板：WhyMotoknife big-number-small-label + 裝飾漸層條（WhyMotoknife.tsx:20），四個數字兩個不是數字
- 01/02/03 編號鷹架：advantages 區（page.tsx:127–129），非序列內容
- Eyebrow 用得克制（Hero/Why/Map），是 voice；但與 heading-accent 混用是不一致

**Deterministic scan**：detect.mjs 掃 8 檔 0 findings（引擎 sanity-test 正常、無 ignore 抑制）——token 紀律好，問題全在組合層不在 token 層。

**Visual overlays**：未執行（本 session 不使用瀏覽器自動化）。

## Overall Impression

骨架和內容策略對：深色舞台、事實密度、代理商誠實論述。但「The Precision Instrument」裡沒有儀器——整頁無產品照，Hero 正中央是帶開發註記的空框。最大機會：Hero 展示真東西 + 把自家設計規則執行到位。

## What's Working

1. 事實密度文案（MAZAK、四國專利、3-Day Dispatch、600°C）——「規格即說服」的落實
2. 內容不被動效綁架：Reveal 用 gsap.from，SSR HTML 完整可見
3. 代理商誠實論述：「No distributor in your region? Our Taiwan headquarters serves you directly」

## Priority Issues

- **[P0] Hero 佔位框上線**（page.tsx:107–111）：「Product Hero Image — 3D Render (Higgsfield, Phase 3)」是首屏最大元素。Fix：素材到位前拿掉，或先放真實工廠/產品照。→ /impeccable polish
- **[P1] 橙色小字對比不足**：#F47920 on 白 ≈ 2.8:1——page.tsx:150 text-sm 連結、:171 text-xs 規格行不及 AA；深色底 white/40 text-xs ≈ 4.3:1 邊界。Fix：淺底連結橙加深至 ~#C2530A、white/40→white/55。→ /impeccable audit
- **[P1] 設計系統違規群**：shadow×3、側條、漸層條、stat-block、01/02/03。Fix：shadow 改邊框/色階；WhyMotoknife 改細線分隔事實條。→ /impeccable polish
- **[P2] CTA 標籤碎裂**：Get a Quote / Request a Quote / Find the Right Solution 三名一地。Fix：統一 Get a Quote；Find the Right Solution 改指選型器。→ /impeccable clarify
- **[P2] Hero 主按鈕錯位**：實心橙給 Explore Products，詢價是 ghost（:98–103）。Fix：對調層級 + 按鈕下加保證行。→ /impeccable layout

## Persona Red Flags

- **Jordan**：無人解釋/展示 knife holder；converters/burr-free/anvil roller 術語牆無圖像
- **Casey**：滑兩屏才見第一個事實；一屏三顆詢價鈕；9 磁磚長捲動 + text-xs 誤觸
- **Stefan**：加分 3 天出貨/四國專利/德國代理；扣分無認證區、首頁無目錄 PDF 入口、代理商無公司名、佔位框輸掉並排比較

## Minor Observations

News 不在主導覽；footer 語言切換不保留路徑（與 Navbar 不一致）；「50+ countries」背靠背重複；WhyMotoknife key={item.value} 同值撞 key；Hero radial 橙光屬舞台照明非違規。

## Questions to Consider

1. Hero 放帶尺寸標註的刀座微距照，讓「規格即說服」第 1 秒成立？
2. 首頁該賣 Free Material Test 而非 Request a Quote？（3–6 個月決策週期的零風險第一步）
3. 「SOLUTIONS」值得 4.5rem 橙色嗎？換成採購工程師會截圖的兩個事實？
