"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import type { ContactFormData } from "@/lib/schemas/contact";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { DistributorCountryGroup } from "@/lib/cms-types";
import { whatsappHref } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const PRODUCT_TYPE_LABELS = [
  "Score Cut Knife Holder",
  "Shear Cut Knife Holder",
  "Half Cut Knife Holder",
  "Hot Cut Knife Holder",
  "Slitting Knives & Blades",
  "Guide Bars",
] as const;

const COUNTRY_ALIASES: Record<string, string> = {
  korea: "KR",
  "south korea": "KR",
  "republic of korea": "KR",
  netherlands: "NL",
  holland: "NL",
  "the netherlands": "NL",
  germany: "DE",
  deutschland: "DE",
  india: "IN",
  chile: "CL",
  russia: "RU",
  "russian federation": "RU",
};

function detectDistributor(
  input: string,
  countries: DistributorCountryGroup[],
): DistributorCountryGroup | undefined {
  const value = input.trim().toLowerCase();
  if (value.length < 3) return undefined;
  const aliasCode = COUNTRY_ALIASES[value];
  return countries.find((c) => {
    if (aliasCode) return c.countryCode === aliasCode;
    const name = c.countryName.toLowerCase();
    return name === value || (value.length >= 4 && name.startsWith(value));
  });
}

type RequestType = ContactFormData["requestType"];
type FormStatus = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
  lang: Locale;
  dict: Dictionary;
  /** CMS 材料選項（Applications titles） */
  materialOptions: string[];
  /** CMS 代理商國家（詢價通路判斷用） */
  distributorCountries: DistributorCountryGroup[];
  /** 型號 → 產品類型標籤（?product= 反推下拉用） */
  productTypeByModel: Record<string, string>;
}

export default function ContactForm({
  lang,
  dict,
  materialOptions: cmsMaterialOptions,
  distributorCountries,
  productTypeByModel,
}: ContactFormProps) {
  const searchParams = useSearchParams();

  const prefill = useMemo(() => {
    const product = searchParams.get("product") ?? "";
    const models = searchParams.get("models") ?? "";
    const modelValue = product || models;
    const firstModel = modelValue.split(",")[0]?.trim() ?? "";
    const isPdfRequest = searchParams.get("topic") === "pdf";

    return {
      modelValue,
      productType: productTypeByModel[firstModel] ?? "",
      material: searchParams.get("material") ?? "",
      thickness: searchParams.get("thickness") ?? "",
      country: searchParams.get("country") ?? "",
      requestType: (isPdfRequest ? "info" : "quote") as RequestType,
      message: isPdfRequest && product ? `Please send the PDF catalog for ${product}.` : "",
      hasPrefill: Boolean(modelValue || searchParams.get("material")),
    };
  }, [searchParams, productTypeByModel]);

  const [requestType, setRequestType] = useState<RequestType>(prefill.requestType);
  const [country, setCountry] = useState(prefill.country);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const distributor = detectDistributor(country, distributorCountries);

  const requestTypes = [
    { value: "info" as const, label: dict.contact.requestInfo },
    { value: "quote" as const, label: dict.contact.requestQuote },
    { value: "order" as const, label: dict.contact.requestOrder },
  ];

  const materialOptions = [...cmsMaterialOptions, "Other"];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: ContactFormData = {
      requestType,
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      country: formData.get("country") as string,
      productType: (formData.get("productType") as string) || undefined,
      material: (formData.get("material") as string) || undefined,
      thickness: (formData.get("thickness") as string) || undefined,
      productModel: (formData.get("productModel") as string) || undefined,
      message: (formData.get("message") as string) || undefined,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: { success: boolean; errors?: Record<string, string[]> } =
        await res.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        const firstError = data.errors
          ? Object.values(data.errors).flat()[0]
          : "Submission failed. Please try again.";
        setErrorMessage(firstError ?? "Submission failed.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  // Success state — 24-hour response commitment
  if (status === "success") {
    return (
      <div className="bg-bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="rounded-lg bg-white p-8 shadow-sm md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckIcon />
            </div>
            <h1 className="mt-6 text-2xl font-bold text-text-primary">
              {dict.contact.successTitle}
            </h1>
            <p className="mt-3 leading-relaxed text-text-secondary">
              {dict.contact.successText}
            </p>
            <p className="mt-4 text-sm text-text-secondary">
              {dict.contact.successEmailNote}
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 rounded bg-orange px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
            >
              {dict.contact.submitAnother}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-warm py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-text-secondary">
          <Link href={`/${lang}`} className="hover:text-orange">{dict.common.home}</Link>
          <span className="mx-2">/</span>
          <span className="text-text-primary">{dict.nav.contact}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Left: Info */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
              {dict.contact.heading}
            </h1>
            <div className="mt-3 h-1 w-16 bg-orange" />
            <p className="mt-6 leading-relaxed text-text-secondary">
              {dict.contact.intro}
            </p>

            <div className="mt-10 space-y-8">
              <OfficeInfo
                title={dict.footer.taiwanHq}
                lines={[
                  dict.footer.taiwanAddress,
                  "TEL +886-3-4753005",
                  "FAX +886-3-4754797",
                  "service@motoknife.com",
                ]}
              />
              <OfficeInfo
                title={dict.footer.shanghaiOffice}
                lines={[
                  dict.footer.shanghaiAddress,
                  "TEL +86-21-69596169",
                  "FAX +86-21-69596163",
                  "motokevin@126.com",
                ]}
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-lg bg-white p-6 shadow-sm md:p-8 lg:col-span-3">
            {/* WhatsApp 快速通道 — 表單上方顯眼處 */}
            <div className="mb-8">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <WhatsAppIcon />
                {dict.contact.whatsappCta}
              </a>
              <p className="mt-2 text-center text-xs text-text-secondary">
                {dict.contact.whatsappNote}
              </p>
            </div>

            {prefill.hasPrefill && (
              <div className="mb-6 rounded border border-orange/30 bg-orange-soft px-4 py-3 text-sm text-text-primary">
                {dict.contact.prefillNotice}
              </div>
            )}

            {/* Step 1: Request Type */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold text-text-primary">
                {dict.contact.whatDoYouNeed}
              </p>
              <div className="flex flex-wrap gap-3">
                {requestTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setRequestType(type.value)}
                    aria-pressed={requestType === type.value}
                    className={`rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                      requestType === type.value
                        ? "bg-orange text-white"
                        : "bg-bg-card text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {status === "error" && errorMessage && (
              <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step 2: Contact Info */}
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label={dict.contact.labelCompany} name="company" required />
                <FormField label={dict.contact.labelName} name="name" required />
                <FormField label={dict.contact.labelEmail} name="email" type="email" required />
                <FormField label={dict.contact.labelPhone} name="phone" type="tel" />
                <div className="sm:col-span-2">
                  <label htmlFor="country" className="mb-1 block text-sm text-text-secondary">
                    {dict.contact.labelCountry}
                    <span className="text-orange"> *</span>
                  </label>
                  <input
                    id="country"
                    name="country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded border border-border px-3 py-2.5 text-sm text-text-primary"
                  />
                  {/* 通路衝突策略：有代理商的地區引導當地代理商 */}
                  {distributor && (
                    <div className="mt-3 rounded border border-orange/30 bg-orange-soft px-4 py-3 text-sm text-text-primary">
                      <p>
                        {dict.contact.distributorNotice
                          .replace("{country}", distributor.countryName)
                          .replace("{companies}", distributor.companies.join(", "))}
                      </p>
                      <Link
                        href={`/${lang}/distributors`}
                        className="mt-2 inline-block font-semibold text-orange hover:text-orange-hover"
                      >
                        {dict.contact.distributorsPageLink} →
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 3: Application Details */}
              <div className="border-t border-border pt-5">
                <p className="mb-4 text-sm font-semibold text-text-primary">
                  {dict.contact.applicationDetails}
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="productType" className="mb-1 block text-sm text-text-secondary">
                      {dict.contact.labelProductType}
                    </label>
                    <select
                      id="productType"
                      name="productType"
                      defaultValue={prefill.productType}
                      className="w-full rounded border border-border bg-white px-3 py-2.5 text-sm text-text-primary"
                    >
                      <option value="">{dict.contact.notSure}</option>
                      {PRODUCT_TYPE_LABELS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="material" className="mb-1 block text-sm text-text-secondary">
                      {dict.contact.labelMaterial}
                    </label>
                    <select
                      id="material"
                      name="material"
                      defaultValue={
                        materialOptions.includes(prefill.material) ? prefill.material : ""
                      }
                      className="w-full rounded border border-border bg-white px-3 py-2.5 text-sm text-text-primary"
                    >
                      <option value="">{dict.contact.selectPlaceholder}</option>
                      {materialOptions.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <FormField
                    label={dict.contact.labelThickness}
                    name="thickness"
                    defaultValue={prefill.thickness}
                    placeholder={dict.contact.thicknessPlaceholder}
                  />
                  <FormField
                    label={dict.contact.labelProductModel}
                    name="productModel"
                    defaultValue={prefill.modelValue}
                  />
                </div>
                <div className="mt-5">
                  <label htmlFor="message" className="mb-1 block text-sm text-text-secondary">
                    {dict.contact.labelMessage}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    defaultValue={prefill.message}
                    className="w-full rounded border border-border px-3 py-2.5 text-sm text-text-primary"
                  />
                </div>
              </div>

              {/* Step 4: Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded bg-orange py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-12"
              >
                {status === "submitting" ? dict.contact.submitting : dict.contact.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ──────────────────────────────────────── */

function FormField({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm text-text-secondary">
        {label}
        {required && <span className="text-orange"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded border border-border px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50"
      />
    </div>
  );
}

function OfficeInfo({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-orange-text">{title}</p>
      <div className="mt-2 space-y-1 text-sm text-text-secondary">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
