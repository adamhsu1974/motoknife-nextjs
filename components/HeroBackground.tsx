"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero 深色版影片背景（iOS Safari 自動播放需 muted + autoplay + loop + playsinline 四者齊備）：
 * - prefers-reduced-motion → 只掛 poster 圖片元素，不掛 video
 * - 桌面 (>= 768px) + 允許動效 → hero-bg.mp4（原檔）
 * - 手機 (<  768px) + 允許動效 → hero-bg-720.mp4（省流量小檔）
 * - videoSrc 變動時用 key 強制 React 重掛，避免 <source> src 換了但沒 load 的 iOS 陷阱
 * - 影片為靜態資產 (public/hero-bg*.mp4)，不進 CMS
 */
const DESKTOP_MQ = "(min-width: 768px)";
const MOTION_MQ = "(prefers-reduced-motion: no-preference)";

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [motionSafe, setMotionSafe] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const desktopMq = window.matchMedia(DESKTOP_MQ);
    const motionMq = window.matchMedia(MOTION_MQ);

    const syncDesktop = () => setIsDesktop(desktopMq.matches);
    const syncMotion = () => setMotionSafe(motionMq.matches);
    syncDesktop();
    syncMotion();

    desktopMq.addEventListener("change", syncDesktop);
    motionMq.addEventListener("change", syncMotion);
    return () => {
      desktopMq.removeEventListener("change", syncDesktop);
      motionMq.removeEventListener("change", syncMotion);
    };
  }, []);

  const videoSrc = isDesktop ? "/hero-bg.mp4" : "/hero-bg-720.mp4";

  // Belt-and-suspenders：HTML autoplay 為主機制，這邊補一手程式化 .play() 減少 iOS 邊緣情境
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !motionSafe) return;
    video.play().catch(() => {});
  }, [videoSrc, motionSafe]);

  // Reduced-motion 或尚未 hydrate：只顯示 poster，不掛 <video>（避免 iOS 提前 preload）
  if (!mounted || !motionSafe) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src="/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <video
      key={videoSrc}
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/hero-poster.jpg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
