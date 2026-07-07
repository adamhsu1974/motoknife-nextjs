import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema, getRequestTypeLabel } from "@/lib/schemas/contact";
import type { ContactFormData } from "@/lib/schemas/contact";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const data = result.data;

    // If Resend API key is configured, send emails
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail =
      process.env.CONTACT_EMAIL ?? "service@motoknife.com";

    if (apiKey) {
      const resend = new Resend(apiKey);

      // Email to sales team
      await resend.emails.send({
        from: "MOTOKNIFE Website <noreply@motoknife.com>",
        to: [contactEmail],
        subject: `[${getRequestTypeLabel(data.requestType)}] New inquiry from ${data.name} — ${data.company}`,
        html: buildSalesEmail(data),
      });

      // Confirmation email to customer
      await resend.emails.send({
        from: "MOTOKNIFE <noreply@motoknife.com>",
        to: [data.email],
        subject: "Thank you for your inquiry — MOTOKNIFE",
        html: buildConfirmationEmail(data),
      });
    } else {
      // Log to console in development when no API key
      console.log("[Contact Form] No RESEND_API_KEY set. Submission:", data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact Form] Error:", error);
    return NextResponse.json(
      { success: false, errors: { _form: ["An unexpected error occurred. Please try again."] } },
      { status: 500 }
    );
  }
}

/* ─── Email Templates ─────────────────────────────────────── */

function buildSalesEmail(data: ContactFormData): string {
  const rows = [
    ["Request Type", getRequestTypeLabel(data.requestType)],
    ["Name", data.name],
    ["Company", data.company],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Country", data.country],
    ["Product Type", data.productType],
    ["Material", data.material],
    ["Thickness", data.thickness],
    ["Product Model", data.productModel],
    ["Message", data.message],
  ]
    .filter(([, val]) => val)
    .map(
      ([label, val]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#1a1a2e;border-bottom:1px solid #e5e7eb;white-space:nowrap">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${val}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1a1a2e;padding:20px 24px">
        <h1 style="color:#ffffff;font-size:18px;margin:0">New Inquiry — MOTOKNIFE</h1>
      </div>
      <div style="padding:24px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${rows}
        </table>
        <p style="margin-top:24px;font-size:13px;color:#6b7280">
          This inquiry was submitted via motoknife.com contact form.
        </p>
      </div>
    </div>
  `;
}

function buildConfirmationEmail(data: ContactFormData): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1a1a2e;padding:20px 24px">
        <h1 style="color:#ffffff;font-size:18px;margin:0">MOTOKNIFE</h1>
      </div>
      <div style="padding:24px">
        <p style="font-size:15px;color:#1a1a1a">Dear ${data.name},</p>
        <p style="font-size:14px;color:#4b5563;line-height:1.6">
          Thank you for contacting MOTOKNIFE. We have received your inquiry
          and our team will get back to you within <strong>24 hours</strong>.
        </p>
        <p style="font-size:14px;color:#4b5563;line-height:1.6">
          If you need immediate assistance, please contact us at:
          <br />
          <a href="mailto:service@motoknife.com" style="color:#F47920">service@motoknife.com</a>
          <br />
          +886-3-4753005
        </p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0" />
        <p style="font-size:12px;color:#9ca3af">
          友聚工業股份有限公司 (MOTOKNIFE) — Precision Slitting Solutions
        </p>
      </div>
    </div>
  `;
}
