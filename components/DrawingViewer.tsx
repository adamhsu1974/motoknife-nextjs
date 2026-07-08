"use client";

import { useEffect, useRef, useState } from "react";

export interface DrawingImage {
  url: string;
  alt: string;
}

interface DrawingViewerProps {
  images: DrawingImage[];
  note?: string | null;
  fullscreenLabel: string;
  resetLabel: string;
}

const MIN_SCALE = 1;
const MAX_SCALE = 6;

/* 浮水印：半透明 MOTOKNIFE 斜向平鋪（SVG data URI），防止直接截圖盜用 */
const WATERMARK_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="180">` +
    `<text x="130" y="90" font-family="Arial, sans-serif" font-size="20" font-weight="bold" ` +
    `fill="rgba(26,26,46,0.10)" text-anchor="middle" transform="rotate(-24 130 90)" ` +
    `letter-spacing="3">MOTOKNIFE</text></svg>`,
);

export default function DrawingViewer({
  images,
  note,
  fullscreenLabel,
  resetLabel,
}: DrawingViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  // pinch zoom：以 PointerEvent 追蹤雙指距離
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ startDist: number; startScale: number } | null>(null);

  const active = images[activeIndex];

  function pointerDistance(): number {
    const [a, b] = [...pointers.current.values()];
    return Math.hypot(b.x - a.x, b.y - a.y);
  }

  function reset() {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }

  // 滾輪縮放（需 non-passive 才能 preventDefault）
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      setScale((prev) => {
        const next = e.deltaY < 0 ? prev * 1.15 : prev / 1.15;
        return Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
      });
    }
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      // 進入雙指縮放模式，停止單指平移
      pinch.current = { startDist: pointerDistance(), startScale: scale };
      setIsDragging(false);
    } else if (pointers.current.size === 1) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
    }
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pinch.current && pointers.current.size >= 2) {
      const ratio = pointerDistance() / pinch.current.startDist;
      setScale(Math.min(MAX_SCALE, Math.max(MIN_SCALE, pinch.current.startScale * ratio)));
      return;
    }

    if (!isDragging) return;
    setOffset({
      x: dragStart.current.ox + (e.clientX - dragStart.current.x),
      y: dragStart.current.oy + (e.clientY - dragStart.current.y),
    });
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) setIsDragging(false);
  }

  function toggleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen();
    }
  }

  function switchImage(index: number) {
    setActiveIndex(index);
    reset();
  }

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()}
      className="select-none bg-white"
    >
      {/* Main stage */}
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={reset}
        className={`relative h-96 w-full touch-none overflow-hidden rounded-lg border border-border bg-bg-tertiary md:h-[480px] ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transition: isDragging ? "none" : "transform 0.15s ease-out",
          }}
        >
          {/* 檢視器以 CSS transform 縮放/平移，next/image 最佳化在此不適用 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.url}
            alt={active.alt}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Watermark overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,${WATERMARK_SVG}")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Controls */}
        <div className="absolute right-3 top-3 z-10 flex gap-2">
          <button
            type="button"
            onClick={reset}
            aria-label={resetLabel}
            className="flex h-9 w-9 items-center justify-center rounded bg-white/90 text-text-primary shadow-sm transition-colors hover:bg-white hover:text-orange-text"
          >
            <ResetIcon />
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreenLabel}
            className="flex h-9 w-9 items-center justify-center rounded bg-white/90 text-text-primary shadow-sm transition-colors hover:bg-white hover:text-orange-text"
          >
            <FullscreenIcon />
          </button>
        </div>

        {/* Zoom indicator */}
        <span className="absolute bottom-3 left-3 rounded bg-white/90 px-2 py-1 text-xs font-medium text-text-secondary shadow-sm">
          {Math.round(scale * 100)}%
        </span>
      </div>

      {note && <p className="mt-3 text-xs text-text-secondary">{note}</p>}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => switchImage(i)}
              aria-pressed={i === activeIndex}
              className={`h-20 w-28 overflow-hidden rounded border-2 bg-bg-tertiary transition-colors ${
                i === activeIndex ? "border-orange" : "border-border hover:border-text-secondary"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt}
                draggable={false}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ResetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9" />
      <polyline points="3 4 3 9 8 9" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}
