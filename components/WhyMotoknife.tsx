import Reveal from "@/components/gsap/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** Why MOTOKNIFE 信任數字區塊 — 首頁（Hero 後）與 About 頁共用 */
export default function WhyMotoknife({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-navy-dark py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="eyebrow">{dict.why.heading}</p>
        <Reveal
          stagger
          className="mt-8 grid grid-cols-2 gap-y-10 border-t border-white/10 pt-10 lg:grid-cols-4"
        >
          {dict.why.items.map((item) => (
            <div
              key={item.label}
              className="pr-6 lg:border-l lg:border-white/10 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <p className="font-heading text-3xl font-bold text-orange md:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{item.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
