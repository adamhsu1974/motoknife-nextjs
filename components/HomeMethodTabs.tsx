"use client";

import { useState } from "react";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";

const METHODS = [
  {
    id: "score",
    name: "Score Cut",
    description:
      "A circular blade scores the material against a hardened anvil roller. Ideal for thin films, paper, and nonwoven fabrics where clean edges are essential.",
    materials: ["Plastic Film", "Paper", "Nonwoven", "Rubber"],
    productLink: "/products/score-cut",
  },
  {
    id: "shear",
    name: "Shear Cut",
    description:
      "Two blades work in a scissor-like action, providing precise cuts for tougher materials. Best suited for metallic foils and thicker plastic films.",
    materials: ["Metallic Foil", "Plastic Film", "Paper"],
    productLink: "/products/shear-cut",
  },
  {
    id: "half",
    name: "Half Cut",
    description:
      "The blade cuts through the top layer while leaving the backing material intact. Essential for label converting and laminate applications.",
    materials: ["Labels", "Laminates", "Adhesive Films"],
    productLink: "/products/half-cut",
  },
  {
    id: "hot",
    name: "Hot Cut",
    description:
      "A heated blade melts through synthetic materials, sealing edges to prevent fraying. Used for nonwoven fabrics and thermoplastic films.",
    materials: ["Nonwoven", "Synthetic Fabric", "Thermoplastics"],
    productLink: "/products/hot-cut",
  },
] as const;

export default function HomeMethodTabs({ lang }: { lang: Locale }) {
  const [activeTab, setActiveTab] = useState("score");
  const active = METHODS.find((m) => m.id === activeTab) ?? METHODS[0];

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2">
        {METHODS.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => setActiveTab(method.id)}
            className={`rounded-sm px-5 py-2.5 text-sm font-medium transition-colors ${
              activeTab === method.id
                ? "bg-orange text-white"
                : "bg-white text-text-secondary hover:text-text-primary"
            }`}
          >
            {method.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8 grid gap-8 rounded-lg bg-white p-6 shadow-sm md:grid-cols-2 md:p-8">
        {/* Illustration placeholder */}
        <div className="flex h-48 items-center justify-center rounded bg-bg-card md:h-64">
          <span className="text-sm text-text-secondary/40">
            {active.name} Diagram
          </span>
        </div>

        {/* Description */}
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-bold text-text-primary">
            {active.name}
          </h3>
          <p className="mt-3 leading-relaxed text-text-secondary">
            {active.description}
          </p>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Suitable Materials
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {active.materials.map((mat) => (
                <span
                  key={mat}
                  className="rounded-sm bg-bg-card px-2.5 py-1 text-xs text-text-secondary"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          <Link
            href={`/${lang}${active.productLink}`}
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-orange hover:text-orange-hover"
          >
            View {active.name} Products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
