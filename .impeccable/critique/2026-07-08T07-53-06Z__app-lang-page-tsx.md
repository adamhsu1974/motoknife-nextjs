---
target: the homepage
total_score: 26
p0_count: 1
p1_count: 3
timestamp: 2026-07-08T07-53-06Z
slug: app-lang-page-tsx
---
**Method: dual-agent (A: a82c00442c5c01c8d · B: a9b3901360804b78e)**

# 首頁 Critique（第 2 輪）— `/en`（`app/[lang]/page.tsx`）

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Navbar 無當前頁指示（無 aria-current） |
| 2 | Match System / Real World | 3 | 「What Are You Cutting?」極佳；slitting/converting 術語無錨定 |
| 3 | User Control and Freedom | 2 | Products 下拉只有 onMouseEnter——鍵盤使用者到不了系列連結（Navbar.tsx:96） |
| 4 | Consistency and Standards | 2 | CTA 三標籤仍在；深色區誤用 orange-text token |
| 5 | Error Prevention | 3 | 應用卡死擊區 |
| 6 | Recognition Rather Than Recall | 3 | 切法卡規格線保留語境 |
| 7 | Flexibility and Efficiency | 3 | 四條入口；首頁無目錄 PDF 捷徑 |
| 8 | Aesthetic and Minimalist Design | 3 | token 紀律改善；applications 18 連結擁擠 |
| 9 | Error Recovery | 3 | 「無代理商？總部直接服務」教科書級 |
| 10 | Help and Documentation | 2 | 切法說明埋在下拉/footer |
| **Total** | | **26/40** | **Acceptable（↑ 自 25）** |

## Anti-Patterns Verdict

上輪五處 DESIGN.md 違規（shadow/側條/漸層條/stat 卡框/01-02-03）已清零；偵測器 0 findings。存活 tells：
1. 切法區 icon-tile 卡片格（page.tsx:146–165）
2. WhyMotoknife 大數字條的「In-house Full Process」非數字、讀起來像湊數
3. 全頁零圖像——線框 icon 代替真產品，最強 AI 佔位訊號
4. 橙色強調在「SOLUTIONS」（H1 最空的字）

Visual overlays 未執行（不使用瀏覽器自動化）。

## Priority Issues

- **[P0] text-orange-text 用在 navy 深色區**（page.tsx:181）：#B84D08 on #1A1A2E ≈ 3.3:1，上輪 replace_all 引入的迴歸。Fix：改回 text-orange。
- **[P1] 結尾 CTA 橙底段對比**（page.tsx:263–272）：white/80 on #F47920 ≈ 2.2:1、白標題 2.76:1。Fix：深色底 + 橙按鈕或加深底色，補 24–48h 保證行。
- **[P1] Hero 不展示/說明產品**：橙色強調移到 SLITTING、H1 寫 Knife Holders & Slitting Knives；圖像等 Phase 3。
- **[P1] CTA 標籤碎裂**（升級自 P2：手機同屏兩個 Get a Quote）→ clarify。
- **[P2] Applications 18 連結 + 死擊區卡片** → layout。
- （H3）鍵盤死角下拉 Navbar.tsx:96 實質 P1 級 a11y。

## Persona Red Flags

- Jordan：首屏三術語未解釋 + 零圖像
- Casey：mount 動畫延遲 Hero ~0.9s；FloatingCTA 常駐遮擋
- Stefan：整體 OK；破口＝專利無號碼、無認證聲明、無目錄 PDF、鍵盤進不了下拉、P0 隱形連結

## Minor Observations

CUTTING_METHODS 與 Navbar productItems 文案 hardcode（違反 i18n，zh-tw 會出現英文）；min-h calc 對 navbar 高度脆弱；JSON-LD numberOfEmployees: 50 待 GM 校正；全橙 Section 6 壓迫 One Accent ≤10% 預算。

## Questions to Consider

1. 等不到 3D 渲染，一張工程圖是否比空舞台誠實？
2. Free Material Test 為何不在首頁 3 分鐘窗口內？
3. Why 條用可驗證證據（專利號/公差）換掉一個 vanity stat？
