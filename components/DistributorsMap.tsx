"use client";

import { useState } from "react";
import Link from "next/link";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

import worldData from "world-atlas/countries-110m.json";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  DISTRIBUTOR_COUNTRIES,
  getDistributorCountryById,
  type DistributorCountry,
} from "@/lib/data/distributors";

const COLORS = {
  default: "#d9dee4",
  defaultHover: "#b9c2cc",
  distributor: "#E07830",
  distributorHover: "#c9631f",
  selectedStroke: "#1c2b3a",
} as const;

interface SelectedCountry {
  numericId: string;
  name: string;
}

interface DistributorsMapProps {
  lang: Locale;
  dict: Dictionary;
}

export default function DistributorsMap({ lang, dict }: DistributorsMapProps) {
  const [selected, setSelected] = useState<SelectedCountry | null>(null);

  const selectedDistributor = selected
    ? getDistributorCountryById(selected.numericId)
    : undefined;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Map */}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm lg:col-span-2">
        <ComposableMap projection="geoNaturalEarth1" aria-label="World distributor map">
          <ZoomableGroup minZoom={1} maxZoom={5}>
            <Geographies geography={worldData}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => String(geo.id) !== "010") // hide Antarctica
                  .map((geo) => {
                    const id = String(geo.id);
                    const hasDistributor = Boolean(getDistributorCountryById(id));
                    const isSelected = selected?.numericId === id;
                    const baseFill = hasDistributor ? COLORS.distributor : COLORS.default;
                    const hoverFill = hasDistributor
                      ? COLORS.distributorHover
                      : COLORS.defaultHover;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() =>
                          setSelected({
                            numericId: id,
                            name: String(geo.properties.name),
                          })
                        }
                        style={{
                          default: {
                            fill: baseFill,
                            stroke: isSelected ? COLORS.selectedStroke : "#ffffff",
                            strokeWidth: isSelected ? 1.2 : 0.4,
                            outline: "none",
                            cursor: "pointer",
                          },
                          hover: {
                            fill: hoverFill,
                            stroke: isSelected ? COLORS.selectedStroke : "#ffffff",
                            strokeWidth: isSelected ? 1.2 : 0.4,
                            outline: "none",
                            cursor: "pointer",
                          },
                          pressed: {
                            fill: hoverFill,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Quick-select chips (small countries are hard to click at world scale) */}
        <div className="border-t border-border px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            {dict.distributors.distributorCountriesLabel}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {DISTRIBUTOR_COUNTRIES.map((country) => (
              <button
                key={country.countryCode}
                type="button"
                onClick={() =>
                  setSelected({ numericId: country.numericId, name: country.countryName })
                }
                className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors ${
                  selected?.numericId === country.numericId
                    ? "bg-orange text-white"
                    : "bg-bg-card text-text-secondary hover:text-text-primary"
                }`}
              >
                {country.countryName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <div className="lg:col-span-1">
        {!selected && (
          <div className="flex h-full min-h-48 items-center justify-center rounded-lg border border-dashed border-border bg-white p-8 text-center">
            <p className="text-sm text-text-secondary">{dict.distributors.selectHint}</p>
          </div>
        )}

        {selected && selectedDistributor && (
          <DistributorPanel country={selectedDistributor} lang={lang} dict={dict} />
        )}

        {selected && !selectedDistributor && (
          <InquiryPanel countryName={selected.name} dict={dict} />
        )}
      </div>
    </div>
  );
}

/* ─── Distributor info panel ──────────────────────────────── */

function DistributorPanel({
  country,
  lang,
  dict,
}: {
  country: DistributorCountry;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-orange">
        {dict.distributors.hasDistributor}
      </p>
      <h2 className="mt-1 text-xl font-bold text-text-primary">{country.countryName}</h2>
      <p className="text-xs text-text-secondary">{country.region}</p>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {dict.distributors.authorizedDistributors}
        </p>
        <ul className="mt-2 space-y-2">
          {country.companies.map((company) => (
            <li
              key={company}
              className="rounded border border-border px-4 py-3 text-sm font-medium text-text-primary"
            >
              {company}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={`/${lang}/contact?country=${encodeURIComponent(country.countryName)}`}
        className="mt-6 block rounded bg-navy py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-navy-dark"
      >
        {dict.distributors.contactDirectly}
      </Link>
    </div>
  );
}

/* ─── Inline inquiry panel for countries without distributor ── */

type InquiryStatus = "idle" | "submitting" | "success" | "error";

function InquiryPanel({ countryName, dict }: { countryName: string; dict: Dictionary }) {
  const [status, setStatus] = useState<InquiryStatus>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const payload = {
      requestType: "quote",
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      country: countryName,
      message: formData.get("message") || undefined,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { success: boolean } = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-text-primary">{countryName}</h2>
        <p className="mt-4 rounded border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {dict.distributors.inquirySuccess}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-text-primary">{countryName}</h2>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {dict.distributors.noDistributor}
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4" key={countryName}>
        <InquiryField label="Name" name="name" required />
        <InquiryField label="Company" name="company" required />
        <InquiryField label="Email" name="email" type="email" required />
        <div>
          <label htmlFor="inquiry-message" className="mb-1 block text-sm text-text-secondary">
            Message
          </label>
          <textarea
            id="inquiry-message"
            name="message"
            rows={3}
            className="w-full rounded border border-border px-3 py-2.5 text-sm text-text-primary"
          />
        </div>

        {status === "error" && (
          <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {dict.distributors.inquiryError}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded bg-orange py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "..." : dict.distributors.sendInquiry}
        </button>
      </form>
    </div>
  );
}

function InquiryField({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `inquiry-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm text-text-secondary">
        {label}
        {required && <span className="text-orange"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full rounded border border-border px-3 py-2.5 text-sm text-text-primary"
      />
    </div>
  );
}
