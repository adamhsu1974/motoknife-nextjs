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
 * v2：白底、圖片不加框融入背景；缺圖用中性留白圖位（無文字）。
 */
export default function FeatureHighlights({ items }: { items: FeatureHighlightItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-20 md:space-y-28">
      {items.map((item, index) => {
        const imageRight = index % 2 === 1;
        return (
          <Reveal key={item.id} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            {/* 圖（手機永遠在上；lg 依奇偶決定左右） */}
            <div
              className={`relative aspect-[4/3] overflow-hidden ${
                item.image?.url ? "" : "rounded-lg bg-bg-tertiary"
              } ${imageRight ? "lg:order-2" : ""}`}
            >
              {item.image?.url && (
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-contain"
                />
              )}
            </div>

            {/* 文 */}
            <div className={imageRight ? "lg:order-1" : ""}>
              <h3 className="text-2xl font-medium text-text-primary md:text-[1.75rem]/[1.25]">
                {item.heading}
              </h3>
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
