import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Cutting Methods",
  description:
    "Understanding Score Cut, Shear Cut, Half Cut, and Hot Cut slitting methods. Choose the right technique for your material.",
};

const METHODS = [
  { name: "Score Cut", desc: "A circular blade scores the material against a hardened anvil roller, creating a clean separation." },
  { name: "Shear Cut", desc: "Two blades work like scissors, providing precise cuts for tougher materials like metallic foils." },
  { name: "Half Cut", desc: "The blade cuts through the top layer while leaving the backing material intact." },
  { name: "Hot Cut", desc: "A heated blade melts through synthetic materials, sealing edges to prevent fraying." },
] as const;

export default function CuttingMethodsPage() {
  return (
    <PageShell
      title="Cutting Methods"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cutting Methods" }]}
    >
      <p className="mb-10 max-w-2xl text-text-secondary">
        Understanding the right cutting method is essential for achieving optimal results.
        Each method is suited for different materials and applications.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {METHODS.map((m) => (
          <div
            key={m.name}
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-text-primary">{m.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{m.desc}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
