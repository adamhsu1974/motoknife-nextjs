"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SECTION_IDS = ["overview", "specs", "3d", "drawings"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

interface ProductSubnavProps {
  model: string;
  labels: Record<SectionId, string>;
  quoteHref: string;
  quoteLabel: string;
}

/**
 * Apple 式 sticky 產品子導覽 — 捲過開場區後固定於 Navbar 之下。
 * 錨點捲動模式：#overview/#specs/#3d/#drawings 對應頁內區塊
 * （原 ProductTabs 的 URL hash 直達連結向下相容）。
 * 手機版連結列水平滾動 + snap。
 */
export default function ProductSubnav({
  model,
  labels,
  quoteHref,
  quoteLabel,
}: ProductSubnavProps) {
  const [active, setActive] = useState<SectionId>("overview");

  // Scroll spy：最後一個頂端越過門檻的區塊為 active
  useEffect(() => {
    let ticking = false;
    function update() {
      ticking = false;
      const threshold = 160;
      let current: SectionId = "overview";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) current = id;
      }
      setActive(current);
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-[56px] z-30 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
        <span className="hidden shrink-0 text-sm font-medium text-text-primary md:block">
          {model}
        </span>

        <nav
          aria-label={model}
          className="flex snap-x snap-mandatory gap-1 overflow-x-auto [scrollbar-width:none]"
        >
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`relative shrink-0 snap-start whitespace-nowrap px-4 py-3.5 text-sm transition-colors ${
                active === id
                  ? "font-medium text-text-primary after:absolute after:bottom-[-1px] after:left-4 after:right-4 after:h-0.5 after:bg-orange"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {labels[id]}
            </a>
          ))}
        </nav>

        <Link
          href={quoteHref}
          className="shrink-0 rounded bg-orange px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-orange-hover md:text-sm"
        >
          {quoteLabel}
        </Link>
      </div>
    </div>
  );
}
