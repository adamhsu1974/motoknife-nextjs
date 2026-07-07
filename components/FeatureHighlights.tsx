import Image from "next/image";

import Reveal from "@/components/gsap/Reveal";

export interface FeatureHighlightItem {
  id: string;
  heading: string;
  body?: string | null;
  image?: { url: string; alt: string } | null;
}

/**
 * 產品頁 Overview 圖文敘事：lg 以上奇數項圖左文右、偶數項圖右文左，
 * 手機一律圖上文下堆疊。無資料時整區不渲染。
 */
export default function FeatureHighlights({ items }: { items: FeatureHighlightItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-12">
      {items.map((item, index) => {
        const imageRight = index % 2 === 1;
        return (
          <Reveal key={item.id} className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
            {/* 圖（手機永遠在上；lg 依奇偶決定左右） */}
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-bg-card ${
                imageRight ? "lg:order-2" : ""
              }`}
            >
              {item.image?.url ? (
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-sm text-text-secondary/40">{item.heading}</span>
                </div>
              )}
            </div>

            {/* 文 */}
            <div className={imageRight ? "lg:order-1" : ""}>
              <h3 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
                {item.heading}
              </h3>
              <div className="mt-3 h-1 w-12 bg-orange" />
              {item.body && (
                <p className="mt-4 leading-relaxed text-text-secondary">{item.body}</p>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
