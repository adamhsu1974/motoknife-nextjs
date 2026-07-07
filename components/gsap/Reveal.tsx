"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** "scroll" 進入視窗時觸發（預設）；"mount" 掛載即播放（Hero 用） */
  mode?: "scroll" | "mount";
  /** true 時對直接子元素做 stagger，否則整個容器一次淡入 */
  stagger?: boolean;
  delay?: number;
  y?: number;
}

export default function Reveal({
  children,
  className,
  mode = "scroll",
  stagger = false,
  delay = 0,
  y = 32,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const targets: gsap.TweenTarget = stagger ? Array.from(el.children) : el;

      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.9,
        ease: "power3.out",
        delay,
        stagger: stagger ? 0.12 : 0,
        ...(mode === "scroll" && {
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        }),
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
