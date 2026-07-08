# Product

## Register

brand

## Users

國際 B2B 買家，五種輪廓（docs/PLANNING.md 第三章）：

1. **歐洲採購工程師**（德國/荷蘭造紙薄膜廠）— 重視認證、交期、技術支援；決策 3–6 個月
2. **印度中小型轉換機廠**（包裝/標籤）— 重視 CP 值、備品供應；決策 1–3 個月
3. **東南亞代理商**（越南/泰國/印尼）— 重視代理利潤、技術文件
4. **北美設備整合商**（OEM）— 重視規格一致性、長期供應；決策 6–12 個月
5. **全球小型工廠主**（五大洲長尾）— Google 搜尋進站，重視 CP 值與快速下單

共同情境：採購工程師在辦公室比對多家供應商網站，帶著具體的材料/厚度/切法需求，要在短時間內判斷「這家廠商可不可信、能不能解決我的問題」。

## Product Purpose

MOTOKNIFE（友聚工業）官方網站——台灣精密分條刀具製造商（score/shear/half/hot cut 刀座 + 刀片），取代 2018 年建置的舊靜態站。

- **核心主張**：Made in Taiwan — Precision you can trust
- **北極星**：讓第一次來訪的海外採購工程師，在 3 分鐘內建立信任感並發出詢價
- **成功定義**：詢價轉換（有代理商地區導向代理商、無代理商地區直接承接詢價）
- **競爭定位**：對歐美龍頭（DIENES/slittec/Maxcess）= 同等工程水準、更合理價格；對中國仿冒廠 = 36 年正廠、多國專利、品質穩定

## Brand Personality

**三詞人格：精準（precise）、可信（credible）、工程感（engineered）。**

「The Bright Workshop」——明亮、精密、值得信賴的現代工廠。像 DJI 展示無人機那樣展示刀組：白色舞台、產品即主角、頁面本體幾乎無色，色彩讓給產品照片與唯一的動作色（Calibration Orange）。情緒目標不變：「信心」與「專業敬意」——買家看完應該覺得「這是一家和 DIENES 同級的工程公司」，而不是「這是一家便宜的亞洲供應商」。

視覺參考（v2，2026-07-08 起取代 Devialet 深色方向）：

- **DJI**（色彩系統 + 規格前置）：白底 + 淺灰分節、hero 疊關鍵數字、產品頁 FAQ
- **Apple**（排版紀律）：大標題中等字重、極短文案、sticky 產品子導覽
- **Universal Robots**（導覽與內容）：應用導向導覽、規格快覽條、真實場景照片
- **Tesla**（節奏）：一屏一事
- 內容架構參考不變：**Mario Cotta**（應用分類 + 產品 Tab）、**DIENES**（切法說明 + 服務體系）

## Anti-references

明確不要長成的樣子（原文保留）：

- **Generic AI SaaS look**: Inter font, purple-blue gradients, glassmorphism, three-column feature cards with icon tiles, big-number-small-label stat blocks
- **Cheap industrial-supplier template look**: red/blue primary colors, cluttered product grids, badge walls (ISO logos we don't have), stock photos of handshakes and globes
- **Over-animated portfolio look**: parallax everywhere, scroll-jacking, decorative motion that delays reading specs
- **Dark-mode-with-neon-accent tech startup look** — we are a precision manufacturer, not a crypto dashboard

## Design Principles

1. **三分鐘信任**：每一頁都要推進「第一次來訪的買家建立信任」——事實密度（年資、專利、製程、規格）優先於行銷形容詞
2. **規格即說服**：技術事實本身就是文案。雙值規格標示（保守值 + 極限值附條件）、實測報告、工程圖——展示證據，不喊口號
3. **每頁通向詢價**：所有頁面至少一個詢價 CTA（導覽列橙色按鈕 + 浮動按鈕 + 側欄詢價卡），並依地區導流（代理商 vs 直接詢價）
4. **動效服務閱讀**：動效只用來建立品質感與引導視線，永遠不能延遲買家取得規格資訊
5. **國際級外觀、台灣式坦率**：視覺品質對標 DJI/Apple 級消費品牌的展示水準，論述誠實直接（歐洲品質的 70% 價格），不裝腔也不廉價
6. **產品即主角**：圖片佔比 ≥60%、一屏一事；素材未到位時用中性留白圖位維持結構，絕不讓開發註記或假素材上線

## Accessibility & Inclusion

- **WCAG 2.1 AA**（對應 Lighthouse A11y > 90 目標）
- 文字對比 ≥ 4.5:1（大字 ≥ 3:1）
- 所有動效尊重 `prefers-reduced-motion`（GSAP 已有防護，新增動效必須跟進）
- 鍵盤可完整操作（下拉選單、Tab 切換、比較功能、地圖替代路徑）
- 雙語系（en / zh-tw）：介面字串經 i18n，不 hardcode；CJK 字體 fallback 已配置
