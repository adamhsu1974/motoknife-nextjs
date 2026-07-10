"use client";

import { useEffect, useRef } from "react";

/**
 * Hero 深色版影片背景：
 * - 手機 (< 768px) 或 prefers-reduced-motion → 只顯示 poster，video 不下載（preload="none"）
 * - 桌面 + 允許動效 → 掛載後才 load() + play()，避免手機浪費流量
 * - 影片為靜態資產 (public/hero-bg.mp4)，不進 CMS
 */
export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mq = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );

    const apply = () => {
      if (mq.matches) {
        video.load();
        // play() 回傳 Promise：低電量模式或使用者未互動時可能被拒，安靜吞下即可
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      poster="/hero-poster.jpg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src="/hero-bg.mp4" type="video/mp4" />
    </video>
  );
}
