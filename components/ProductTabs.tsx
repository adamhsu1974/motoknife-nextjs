"use client";

import { useEffect, useRef, useState } from "react";

const TAB_IDS = ["overview", "specs", "3d", "drawings"] as const;
export type TabId = (typeof TAB_IDS)[number];

/** URL hash ↔ tab 對應（#specs / #3d / #drawings；overview 無 hash） */
function tabFromHash(hash: string): TabId {
  const value = hash.replace(/^#/, "");
  return (TAB_IDS as readonly string[]).includes(value) && value !== "overview"
    ? (value as TabId)
    : "overview";
}

interface ProductTabsProps {
  labels: Record<TabId, string>;
  panels: Record<TabId, React.ReactNode>;
}

export default function ProductTabs({ labels, panels }: ProductTabsProps) {
  const [active, setActive] = useState<TabId>("overview");
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});

  // 手機水平滾動時，active tab 自動滾進可視區
  useEffect(() => {
    tabRefs.current[active]?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [active]);

  // 初始依 URL hash 開啟對應 tab（分享連結用）。
  // hash 只存在於瀏覽器，須於 hydration 後同步一次，否則 SSR 內容不一致
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 初始 hash 同步無法在 render 期讀取
    setActive(tabFromHash(window.location.hash));
    function onHashChange() {
      setActive(tabFromHash(window.location.hash));
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function select(tab: TabId) {
    setActive(tab);
    const url =
      tab === "overview"
        ? window.location.pathname + window.location.search
        : `#${tab}`;
    history.replaceState(null, "", url);
  }

  return (
    <div>
      {/* Tab bar — 手機水平滾動 + snap，桌面正常排列 */}
      <div
        role="tablist"
        className="flex snap-x snap-mandatory gap-1 overflow-x-auto border-b border-border [scrollbar-width:none] md:flex-wrap md:overflow-visible"
      >
        {TAB_IDS.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`tab-${id}`}
            ref={(el) => {
              tabRefs.current[id] = el;
            }}
            aria-selected={active === id}
            aria-controls={`panel-${id}`}
            onClick={() => select(id)}
            className={`relative shrink-0 snap-start whitespace-nowrap px-5 py-3 text-sm font-semibold transition-colors ${
              active === id
                ? "text-orange after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-orange"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {labels[id]}
          </button>
        ))}
      </div>

      {/* Panels（全部保留於 DOM，切換不重掛載 3D 檢視器） */}
      {TAB_IDS.map((id) => (
        <div
          key={id}
          role="tabpanel"
          id={`panel-${id}`}
          aria-labelledby={`tab-${id}`}
          hidden={active !== id}
          className="pt-6"
        >
          {panels[id]}
        </div>
      ))}
    </div>
  );
}
