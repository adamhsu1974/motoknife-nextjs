"use client";

import { useEffect, useRef, useState } from "react";

/* <model-viewer> web component 的 JSX 型別宣告（React 19 module augmentation） */
type ModelViewerAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  src?: string;
  alt?: string;
  "camera-controls"?: boolean;
  "auto-rotate"?: boolean;
  "auto-rotate-delay"?: number;
  "rotation-per-second"?: string;
  "interaction-prompt"?: string;
  "disable-tap"?: boolean;
  loading?: string;
  reveal?: string;
};

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- JSX module augmentation 僅能以 namespace 撰寫
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}

interface ModelViewerProps {
  /** GLB 代理 URL（/api/model/{id}），不暴露檔案直接路徑 */
  src: string;
  alt: string;
  fullscreenLabel: string;
}

export default function ModelViewer({ src, alt, fullscreenLabel }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLElement>(null);
  const [libraryReady, setLibraryReady] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  // web component 不支援 SSR — 僅在瀏覽器動態載入註冊
  useEffect(() => {
    let mounted = true;
    import("@google/model-viewer").then(() => {
      if (mounted) setLibraryReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!libraryReady) return;
    const el = viewerRef.current;
    if (!el) return;
    const onLoad = () => setModelLoaded(true);
    el.addEventListener("load", onLoad);
    return () => el.removeEventListener("load", onLoad);
  }, [libraryReady]);

  function toggleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen();
    }
  }

  return (
    <div
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()}
      className="relative h-96 w-full overflow-hidden rounded-lg bg-bg-card md:h-[480px]"
    >
      {/* Loading spinner */}
      {!modelLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <span
            aria-label="Loading 3D model"
            className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-orange"
          />
        </div>
      )}

      {libraryReady && (
        <model-viewer
          ref={viewerRef}
          src={src}
          alt={alt}
          camera-controls
          auto-rotate
          auto-rotate-delay={1500}
          rotation-per-second="12deg"
          interaction-prompt="none"
          style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
        />
      )}

      {/* Fullscreen toggle */}
      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label={fullscreenLabel}
        className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded bg-white/90 text-text-primary shadow-sm transition-colors hover:bg-white hover:text-orange"
      >
        <FullscreenIcon />
      </button>
    </div>
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
