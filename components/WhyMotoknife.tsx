import Reveal from "@/components/gsap/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** Why MOTOKNIFE 信任條 — 白底一行四點、細分隔線（首頁 Hero 後與 About 頁共用） */
export default function WhyMotoknife({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-border bg-white">
      <h2 className="sr-only">{dict.why.heading}</h2>
      <Reveal
        stagger
        className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-10 lg:grid-cols-4 lg:px-8"
      >
        {dict.why.items.map((item) => (
          <div
            key={item.label}
            className="border-border pr-4 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
          >
            <p className="text-base font-medium text-text-primary">{item.value}</p>
            <p className="mt-1 text-xs leading-relaxed text-text-secondary">
              {item.label}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
