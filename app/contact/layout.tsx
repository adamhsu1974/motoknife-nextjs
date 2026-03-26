import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Get a Quote",
  description:
    "Request a quote for MOTOKNIFE slitting knife holders and blades. Tell us your material and cutting requirements — we respond within 24–48 hours.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
