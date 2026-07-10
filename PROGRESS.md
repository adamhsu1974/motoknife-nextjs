# MOTOKNIFE 官網重建 — 開發進度
**Repo**: adamhsu1974/motoknife-nextjs
**Branch**: design-refresh
**Stack**: Next.js 16 + Payload CMS 3 + PostgreSQL + Tailwind CSS
**Last updated**: 2026-07-10

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
