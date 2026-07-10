# MOTOKNIFE 官網重建 — 開發進度
**Repo**: adamhsu1974/motoknife-nextjs
**Branch**: design-refresh
**Stack**: Next.js 16 + Payload CMS 3 + PostgreSQL + Tailwind CSS
**Last updated**: 2026-07-10 (Hero 深色影片背景版)

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

## 上線前 Checklist
- [ ] 後台密碼改強密碼（上線前必須更換，見 admin）
- [ ] Payload 切換 migrations 模式
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
