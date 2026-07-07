"use client";

import { useState } from "react";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  CUTTING_METHOD_SERIES_SLUG,
  SELECTOR_MATERIALS,
  type SelectorMaterial,
  type SelectorThicknessOption,
} from "@/lib/data/selector";

interface ApplicationSelectorProps {
  lang: Locale;
  dict: Dictionary;
}

export default function ApplicationSelector({ lang, dict }: ApplicationSelectorProps) {
  const [material, setMaterial] = useState<SelectorMaterial | null>(null);
  const [thickness, setThickness] = useState<SelectorThicknessOption | null>(null);

  const step = thickness ? 3 : material ? 2 : 1;

  function reset() {
    setMaterial(null);
    setThickness(null);
  }

  return (
    <div className="rounded-lg bg-navy p-6 text-white md:p-8">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold md:text-2xl">{dict.selector.title}</h2>
          <p className="mt-1 max-w-xl text-sm text-white/60">{dict.selector.subtitle}</p>
        </div>
        {step > 1 && (
          <button
            type="button"
            onClick={reset}
            className="shrink-0 rounded border border-white/30 px-4 py-2 text-xs font-medium text-white/80 transition-colors hover:border-white/60 hover:text-white"
          >
            {dict.selector.restart}
          </button>
        )}
      </div>

      {/* Step indicator */}
      <div className="mt-6 flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${
              s <= step ? "bg-orange" : "bg-white/15"
            }`}
          />
        ))}
      </div>

      {/* Step 1: Material */}
      {step === 1 && (
        <div className="mt-6">
          <p className="text-sm font-semibold">{dict.selector.stepMaterial}</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SELECTOR_MATERIALS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMaterial(m)}
                className="rounded-lg border border-white/15 p-4 text-left transition-all hover:border-orange hover:bg-white/5"
              >
                <p className="font-semibold">{m.name}</p>
                <p className="mt-1 line-clamp-2 text-xs text-white/50">{m.examples}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Thickness */}
      {step === 2 && material && (
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMaterial(null)}
              className="rounded border border-white/30 px-3 py-1.5 text-xs text-white/70 transition-colors hover:text-white"
            >
              ← {dict.selector.back}
            </button>
            <span className="rounded-sm bg-orange/20 px-2.5 py-1 text-xs font-medium text-orange">
              {material.name}
            </span>
          </div>
          <p className="mt-5 text-sm font-semibold">{dict.selector.stepThickness}</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {material.thicknessOptions.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setThickness(t)}
                className="rounded-lg border border-white/15 p-4 text-left transition-all hover:border-orange hover:bg-white/5"
              >
                <p className="font-semibold">{t.label}</p>
                <p className="mt-1 text-xs text-white/50">{t.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && material && thickness && (
        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setThickness(null)}
              className="rounded border border-white/30 px-3 py-1.5 text-xs text-white/70 transition-colors hover:text-white"
            >
              ← {dict.selector.back}
            </button>
            <span className="rounded-sm bg-orange/20 px-2.5 py-1 text-xs font-medium text-orange">
              {material.name}
            </span>
            <span className="rounded-sm bg-white/10 px-2.5 py-1 text-xs font-medium text-white/70">
              {thickness.label}
            </span>
          </div>

          <p className="mt-5 text-sm font-semibold">{dict.selector.stepResult}</p>
          <div className="mt-4 space-y-4">
            {thickness.recommendations.map((rec) => (
              <div
                key={rec.cuttingMethod}
                className="rounded-lg bg-white p-5 text-text-primary"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className="inline-block rounded-sm bg-orange/10 px-2.5 py-1 text-xs font-semibold text-orange">
                      {rec.cuttingMethod}
                    </span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {rec.models.map((model) => (
                        <span
                          key={model}
                          className="rounded bg-bg-card px-3 py-1.5 text-sm font-bold"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {rec.note}
                    </p>
                  </div>
                  <Link
                    href={`/${lang}/products/${CUTTING_METHOD_SERIES_SLUG[rec.cuttingMethod]}`}
                    className="shrink-0 rounded border border-border px-4 py-2 text-center text-sm font-medium text-text-primary transition-colors hover:border-orange hover:text-orange"
                  >
                    {dict.selector.viewSeries}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-white/50">
            {dict.selector.disclaimer}
          </p>

          <Link
            href={`/${lang}/contact?material=${encodeURIComponent(material.name)}&thickness=${encodeURIComponent(thickness.label)}&models=${encodeURIComponent(
              thickness.recommendations.flatMap((r) => r.models).join(", "),
            )}`}
            className="mt-5 inline-block rounded bg-orange px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
          >
            {dict.selector.quoteCta}
          </Link>
        </div>
      )}
    </div>
  );
}
