# MOTOKNIFE 官網重建 — 開發進度
**Repo**: adamhsu1974/motoknife-nextjs
**Branch**: design-refresh
**Stack**: Next.js 16 + Payload CMS 3 + PostgreSQL + Tailwind CSS
**Last updated**: 2026-07-11 (iPhone hydration debug — 已結案)

## 現狀
- Impeccable critique: 30/40, P0=0 (code), code-fixable backlog cleared
- Phase 1-5 complete (bright mode, AEO, i18n, a11y, layout)
- Production build 120 pages, tsc clean, eslint 0 warnings

## 阻塞項（非 code）
- [ ] Hero KeyShot 白底渲染圖 (P0, gating launch)
- [ ] 四種切法渲染圖 ×4
- [ ] 20 型號產品渲染圖
- [ ] Section order（等渲染圖到位再決定）
- [ ] 產品圖片重新上傳至 Payload CMS（Impeccable 重構後連結斷了）

## 品牌決策（不可變更，除非 GM 明確指示）
- Hero copy: "Built to perform." / "Every cut, every shift, every year."
- 中文: "為表現而生。" / "每一刀、每一班、每一年。"
- Hero CTA: 雙 CTA — Explore Products（主，橘色實心膠囊）+ Contact Us（次，膠囊描邊）
  - 2026-07-10 從單一 CTA 恢復；當初單一 CTA 的理由是「詢價由導覽列常駐橙鈕承擔」，
    但 Hero 引入品牌宣示 "Built to perform." 後，需要在首屏就提供
    一個較低門檻的次要入口（Contact Us）給非採購動機的訪客（研究、媒體、代理商詢問等），
    否則他們得捲到 Section 7 才看到聯絡入口

## Hero 方案演進（2026-07）
1. **v1 白底 + 16:7 產品渲染圖位**（Bright Workshop 初版）— 素材未到位，用灰佔位
2. **v2 白底 + 波浪動畫**（HeroWaves）— 短暫過渡，覺得不夠有工廠現場感
3. **v3 深色影片背景**（現行）— 白底 Bright Workshop 定調保留在其他 section；
   Hero 單獨走深色沉浸感（video → 遮罩 → 白字）以襯托 "Built to perform." 品牌宣示
   - 影片 `public/hero-bg.mp4` + poster `public/hero-poster.jpg` 為**靜態資產，不進 CMS**
     （避免每個 render 拉 CMS，影片變更透過 git commit 上版）
   - 手機 / prefers-reduced-motion → 只顯示 poster，video 不下載（preload="none"）
   - `components/HeroWaves.tsx` **保留檔案**但已從首頁移除，可能未來 About/Applications 頁面沿用
- Trust pillars: Since 1990 / 50+ Countries / In-house Full Process / 3-Day Dispatch
- 首頁不放價格主張
- ±0.005mm 只在個別產品 Specs tab
- Mazak CNC / 機械手臂 → About 頁 Feature Highlights only
- 切法: score / shear / half / hot（四種，無 razor）
- North Star: The Bright Workshop
- 參考配方: DJI 明亮色系 + Apple 排版 + UR 應用導向 + Tesla 一屏一事

## Debug 記錄

### 2026-07-11 — iPhone 實機 hydration 失敗（✅ 已結案）
**結論**：**dev streaming × 熱點網路環境問題，程式碼無需修改。**
同一 iPhone、同一熱點網路下，改跑 **production build（`npm run build && npm start`）
一切正常**——影片自動播放、漢堡選單、所有互動皆 OK。確認問題僅存在於
「`next dev` 的 HTTP streaming + 個人熱點網路（172.20.10.x）」這個特定組合，
**正式部署（非 dev streaming）不受影響**。GERR debug code 已全數移除。

> ⚠️ **日後開發備註**：在熱點網路環境開發時，dev server 的 streaming 回應
> 可能被該網路破壞，導致 iPhone 實機 hydration 失敗（此為環境假象，非程式 bug）。
> **iPhone 實機測試請改用 production build（`npm run build && npm start`）驗證**，
> 或改用一般 Wi-Fi。

---
（以下為原始排查記錄，保留供日後參考）


**症狀**：iPhone 17 Pro Max 實機開首頁，整頁 JS 互動全失效（漢堡選單無反應、
Hero 影片不播）；SSR HTML 正常（poster/文字/按鈕外觀都在）、23 個 JS chunk
全載入、`window.__next_f` 存在，但 `HeroBackground` 的 console.log 零輸出、
`querySelector('video')` = null → React 整棵樹在 hydration 早期放棄掛載。
**同頁在 Mac Safari（含回應式手機寬度）完全正常。**

**排查歷程**：
1. HeroBackground 加 debug log（state / `play()` resolve-reject / onPlay / onError）
   → iPhone 零輸出，確認 hydration 根本沒跑到該元件
2. layout 加全域錯誤捕捉（`window.onerror` + `unhandledrejection`）
   → 只有 `[GERR] handlers installed`，無任何 error/rejection 被捕捉
   → 排除「拋出未捕捉例外」，指向被 React 吞掉的 hydration mismatch
3. patch `console.error` 撈 hydration mismatch 完整 diff（React 只用 console.error
   印、不 throw）→ **實測未見任何 mismatch**，排除 SSR vs client 內容不一致
4. GERR script 幾經修正（`<script>` in JSX → next/script beforeInteractive
   置於 `<html>` 子層違反 HTML 結構 → 最終移入 `<body>` 開頭）

**逐項排除**：
- 程式碼寬度相關問題 → 排除（Mac 手機寬度正常）
- 影片檔本身 → 排除（iPhone console 手動 `createElement('video')` 載入
  `/hero-bg-720.mp4` 自動播放成功）
- iOS 相容性嫌疑（matchMedia.addEventListener / Array.at / structuredClone /
  regex lookbehind / module-scope API）→ 全站 grep 排除，且 iPhone 17 為新機
- hydration mismatch → 排除（console.error patch 未捕捉到）
- 瀏覽器延伸功能 / VPN / iCloud Private Relay → 逐一關閉排除

**最終嫌疑（待驗證）**：iPhone 個人熱點網路（172.20.10.x 網段）破壞
dev server 的 HTTP streaming 回應，與 debug 期間持續出現的
WebSocket「無法剖析回應」為**同根源**——即 hydration 用的 streamed RSC payload
在該網路下被截斷／改寫，導致 React 無法完成 client hydration。
若成立，則**非程式碼問題**，正式站（非 dev streaming）可能不受影響。

- [x] **重測 iPhone hydration** → 同熱點網路改用 production build 一切正常，
      確認為 dev server streaming × 熱點網路交互問題（環境因素，非 code）
- [x] GERR debug 機制已全數移除（`app/[lang]/layout.tsx` + `components/HeroBackground.tsx`）

## 上線前 Checklist
- [ ] 後台密碼改強密碼（上線前必須更換，見 admin）
- [x] Payload 切換 migrations 模式（2026-07-12 完成，commit c58374a）
- [ ] 301 轉址地圖（舊站 /en-us/Products/detail/[id] → 新 slug）
- [ ] .env 正式環境版本
- [ ] zh-tw 翻譯完成
- [ ] Lighthouse >90 / SEO >95 / A11y >90
- [ ] Google Search Console 提交 sitemap
- [ ] Cloudflare SSL + 快取
- [ ] LinkedIn 公司頁面建立 → 加回 Organization JSON-LD sameAs
- [ ] npm audit 14 個 vulnerabilities

## 多機環境
- 公司桌機: C:\Users\USER\motoknife-nextjs, PostgreSQL 16, 密碼 dev123
- 家裡筆電: C:\Users\Lenovo\motoknife-nextjs, PostgreSQL 17, 密碼 dev123
- Mac Mini M4: 尚未設定，參考 Notion 多機操作手冊

---

## 2026-07-12:切換 Migrations 模式 + NAS 資料庫基準化

**動機**:三機共用 NAS PostgreSQL 後,dev-push 模式自動同步 schema 的行為
(尤其 drop table 提示)對共用真實資料構成重大風險。在開始輸入 20 個產品
資料之前完成切換,確保後續內容建置安全。

**變更內容**:
- `payload.config.ts`:`postgresAdapter` 加入 `push: false`,永久關閉 dev-push
- 建立初始基準 migration:`migrations/20260712_085505_initial.ts`
  (含 `.json` snapshot 與 `index.ts`)
- NAS 資料庫(192.168.0.106:5433)以 `migrate:fresh` 清空重建,
  狀態 100% 由 migration 檔定義;admin 帳號已重建(三機共用,存 NAS)
- Commit:`c58374a` — "chore: switch to migrations mode, add initial baseline migration"

**新工作流程(schema 變更)**:
1. 修改 collection 定義
2. `npx payload migrate:create <描述性名稱>`
3. `npx payload migrate`(全部機器中只需執行一次,狀態記在共用 DB)
4. migration 檔 commit + push
5. 同步更新 `CMS-GUIDE.md`

**防呆機制**:
- `CLAUDE.md` 已加入 schema 變更規則與 migrate:fresh / seed 禁令
- `scripts/pre-commit` hook:改了 collections/ 卻沒帶 migration 檔的
  commit 會被擋下(各機需手動安裝到 .git/hooks/,見 Notion 手冊)

**禁忌事項(三機共用資料庫)**:
- ⚠️ `npx payload migrate:fresh`:會 drop 整個共用資料庫,嚴禁隨手執行
- ⚠️ `npm run seed`:會覆寫共用資料,已從各機日常開工流程移除
  (Notion 多機操作手冊已同步更新)

**決策記錄**:
- 桌機本機資料庫不做 pg_dump 搬移——內容僅數張 MT-A110 圖片,
  直接在共用後台重傳(約數分鐘),桌機本機 PostgreSQL 之後可停用
- 週一桌機接入 NAS 因此簡化為:掛 M:\ → 改 .env → git pull →
  migrate:status 確認 → dev 驗證 → 重傳產品圖 → 安裝 pre-commit hook

**Pre-launch checklist 更新**:
- [x] 切換 Payload migrations 模式(2026-07-12 完成,commit c58374a)
