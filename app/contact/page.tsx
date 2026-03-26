"use client";

import { useState } from "react";
import type { ContactFormData } from "@/lib/schemas/contact";

const REQUEST_TYPES = [
  { value: "info", label: "More Information" },
  { value: "quote", label: "Request a Quote" },
  { value: "order", label: "Order Product" },
] as const;

const MATERIALS = [
  "Plastic Film",
  "Metallic Foil (Aluminum / Copper)",
  "Rubber",
  "Paper",
  "Nonwoven",
  "Other",
] as const;

type RequestType = ContactFormData["requestType"];
type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [requestType, setRequestType] = useState<RequestType>("quote");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
      jobTitle: (formData.get("jobTitle") as string) || undefined,
      material: (formData.get("material") as string) || undefined,
      cuttingSpeed: (formData.get("cuttingSpeed") as string) || undefined,
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

  // Success state
  if (status === "success") {
    return (
      <div className="bg-bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="rounded-lg bg-white p-12 shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckIcon />
            </div>
            <h1 className="mt-6 text-2xl font-bold text-text-primary">
              Thank You!
            </h1>
            <p className="mt-3 leading-relaxed text-text-secondary">
              Your inquiry has been submitted successfully. Our team will review
              your request and get back to you within{" "}
              <strong>24–48 hours</strong>.
            </p>
            <p className="mt-4 text-sm text-text-secondary">
              A confirmation email has been sent to your inbox.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 rounded bg-orange px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
            >
              Submit Another Inquiry
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
          <a href="/" className="hover:text-orange">Home</a>
          <span className="mx-2">/</span>
          <span className="text-text-primary">Contact</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Left: Info */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
              Get in Touch
            </h1>
            <div className="mt-3 h-1 w-16 bg-orange" />
            <p className="mt-6 leading-relaxed text-text-secondary">
              Tell us about your material and cutting requirements. Our team
              will recommend the right knife holder for your application and
              provide a quote within 24–48 hours.
            </p>

            <div className="mt-10 space-y-6">
              <ContactInfo
                icon={<EmailIcon />}
                label="Email"
                value="service@motoknife.com"
              />
              <ContactInfo
                icon={<PhoneIcon />}
                label="Phone"
                value="+886-2-2688-5677"
              />
              <ContactInfo
                icon={<LocationIcon />}
                label="Address"
                value="Taiwan"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-lg bg-white p-6 shadow-sm md:p-8 lg:col-span-3">
            {/* Step 1: Request Type */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold text-text-primary">
                What do you need?
              </p>
              <div className="flex flex-wrap gap-3">
                {REQUEST_TYPES.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setRequestType(type.value)}
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

            {/* Step 2: Contact Info */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Name" name="name" required />
                <FormField label="Company" name="company" required />
                <FormField label="Email" name="email" type="email" required />
                <FormField label="Phone" name="phone" type="tel" />
                <FormField label="Country" name="country" required />
                <FormField label="Job Title" name="jobTitle" />
              </div>

              {/* Step 3: Requirements */}
              <div className="border-t border-border pt-5">
                <p className="mb-4 text-sm font-semibold text-text-primary">
                  Application Details
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="material"
                      className="mb-1 block text-sm text-text-secondary"
                    >
                      Material Type
                    </label>
                    <select
                      id="material"
                      name="material"
                      className="w-full rounded border border-border bg-white px-3 py-2.5 text-sm text-text-primary"
                    >
                      <option value="">Select material...</option>
                      {MATERIALS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <FormField
                    label="Cutting Speed (M/min)"
                    name="cuttingSpeed"
                    type="number"
                  />
                  <FormField
                    label="Material Thickness (mm)"
                    name="thickness"
                    type="number"
                  />
                  <FormField
                    label="Product Model (optional)"
                    name="productModel"
                  />
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm text-text-secondary"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
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
                {status === "submitting" ? "Submitting..." : "Submit Request"}
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
        className="w-full rounded border border-border px-3 py-2.5 text-sm text-text-primary"
      />
    </div>
  );
}

function ContactInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-navy text-white">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-text-primary">{label}</p>
        <p className="text-sm text-text-secondary">{value}</p>
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

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
