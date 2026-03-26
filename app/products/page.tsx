import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Products",
  description:
    "MOTOKNIFE slitting knife holders: Score Cut, Shear Cut, Half Cut, Hot Cut systems, precision blades, and guide bars. ±0.005mm tolerance.",
};

const SERIES = [
  { href: "/products/score-cut", name: "Score Cut", desc: "Precision score cutting knife holders" },
  { href: "/products/shear-cut", name: "Shear Cut", desc: "High-performance shear slitting systems" },
  { href: "/products/half-cut", name: "Half Cut", desc: "Controlled depth cutting solutions" },
  { href: "/products/hot-cut", name: "Hot Cut", desc: "Thermal slitting for synthetic materials" },
  { href: "/products/knives", name: "Knives", desc: "Slitting knives and score blades" },
  { href: "/products/guide-bar", name: "Guide Bar", desc: "High-rigidity guide bars" },
] as const;

export default function ProductsPage() {
  return (
    <PageShell
      title="Products"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERIES.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex h-32 items-center justify-center rounded bg-bg-card">
              <span className="text-3xl font-bold text-text-secondary/20">
                {s.name.charAt(0)}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-text-primary">{s.name}</h2>
            <p className="mt-1 text-sm text-text-secondary">{s.desc}</p>
            <span className="mt-3 inline-block text-sm font-medium text-orange">
              View Series →
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
