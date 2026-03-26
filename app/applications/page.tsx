import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "Find the right cutting solution for your material: plastic film, metallic foil, rubber, paper, and nonwoven. MOTOKNIFE application guides.",
};

const MATERIALS = [
  { href: "/applications/plastic-film", name: "Plastic Film", desc: "Score Cut and Shear Cut solutions for plastic films" },
  { href: "/applications/metallic-foil", name: "Metallic Foil", desc: "Shear Cut systems for aluminum and copper foil" },
  { href: "/applications/rubber", name: "Rubber", desc: "Score Cut solutions for rubber materials" },
  { href: "/applications/paper", name: "Paper", desc: "Score Cut and Shear Cut for paper products" },
  { href: "/applications/nonwoven", name: "Nonwoven", desc: "Score Cut solutions for nonwoven fabrics" },
] as const;

export default function ApplicationsPage() {
  return (
    <PageShell
      title="Applications"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applications" }]}
    >
      <p className="mb-8 max-w-2xl text-text-secondary">
        Find the right cutting solution for your material. Select your material type below.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MATERIALS.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-text-primary">{m.name}</h2>
            <p className="mt-1 text-sm text-text-secondary">{m.desc}</p>
            <span className="mt-3 inline-block text-sm font-medium text-orange">
              Learn More →
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
