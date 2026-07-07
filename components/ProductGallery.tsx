"use client";

import { useState } from "react";
import Image from "next/image";

export interface GalleryImage {
  url: string;
  alt: string;
}

export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];
  if (!active) return null;

  return (
    <div className="mb-6">
      {/* 主圖 */}
      <div className="relative h-56 overflow-hidden rounded bg-bg-card md:h-72">
        <Image
          key={active.url}
          src={active.url}
          alt={active.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-contain"
        />
      </div>

      {/* 縮圖列（單圖不顯示；超寬時水平滾動） */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-pressed={i === activeIndex}
              aria-label={img.alt}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded border-2 bg-bg-card transition-colors ${
                i === activeIndex
                  ? "border-orange"
                  : "border-border hover:border-text-secondary"
              }`}
            >
              <Image src={img.url} alt={img.alt} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
