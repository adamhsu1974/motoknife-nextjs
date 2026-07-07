"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { MILESTONES } from "@/lib/data/about";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function BrandTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = MILESTONES[activeIndex];
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = rootRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // 里程碑點位進場 stagger
      gsap.from("[data-milestone]", {
        opacity: 0,
        y: 16,
        stagger: 0.07,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });

      // 軌道進度線：滾動驅動（scrub）
      gsap.fromTo(
        "[data-progress]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            end: "bottom 35%",
            scrub: 0.5,
          },
        },
      );

      // 詳情卡進場
      gsap.from("[data-detail]", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef}>
      {/* Year rail */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 overflow-hidden bg-white/15 md:block">
          <div data-progress className="h-full w-full bg-orange/60" />
        </div>
        <div
          className="flex gap-2 overflow-x-auto pb-2 md:justify-between md:gap-0 md:overflow-visible"
          role="tablist"
          aria-label="Company timeline"
        >
          {MILESTONES.map((milestone, i) => (
            <button
              key={milestone.title}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => setActiveIndex(i)}
              data-milestone
              className="group relative flex shrink-0 flex-col items-center gap-2 px-3 py-2"
            >
              <span
                className={`text-sm font-semibold transition-colors ${
                  i === activeIndex ? "text-orange" : "text-white/50 group-hover:text-white/80"
                }`}
              >
                {milestone.year}
              </span>
              <span
                className={`h-3 w-3 rounded-full border-2 transition-all ${
                  i === activeIndex
                    ? "scale-125 border-orange bg-orange"
                    : "border-white/30 bg-navy group-hover:border-white/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Active milestone detail */}
      <div data-detail className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-heading text-4xl font-bold text-orange">{active.year}</span>
          {active.yearTbc && (
            <span className="rounded-sm bg-white/10 px-2 py-0.5 text-xs text-white/50">
              year to be confirmed
            </span>
          )}
        </div>
        <h3 className="mt-2 text-xl font-bold text-white">{active.title}</h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-white/60">{active.description}</p>

        {/* Prev / Next */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            aria-label="Previous milestone"
            className="rounded border border-white/20 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex(Math.min(MILESTONES.length - 1, activeIndex + 1))}
            disabled={activeIndex === MILESTONES.length - 1}
            aria-label="Next milestone"
            className="rounded border border-white/20 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
