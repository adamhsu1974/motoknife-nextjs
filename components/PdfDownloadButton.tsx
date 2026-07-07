"use client";

import { createElement, useState, type ReactElement } from "react";
import type { DocumentProps } from "@react-pdf/renderer";

import type { Product } from "@/lib/data/products";

type DownloadState = "idle" | "generating" | "error";

interface PdfDownloadButtonProps {
  /** 給定 product 時生成單品規格 PDF；未給定時生成全產品目錄 */
  product?: Product;
  label: string;
  generatingLabel: string;
  errorLabel: string;
  className?: string;
}

export default function PdfDownloadButton({
  product,
  label,
  generatingLabel,
  errorLabel,
  className = "",
}: PdfDownloadButtonProps) {
  const [state, setState] = useState<DownloadState>("idle");

  async function handleDownload() {
    if (state === "generating") return;
    setState("generating");
    try {
      // 動態 import：@react-pdf/renderer（~400KB）只在點擊時載入
      const [{ pdf }, docs] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/pdf/ProductPdfDocument"),
      ]);

      const doc = (
        product
          ? createElement(docs.ProductSpecDocument, { product })
          : createElement(docs.FullCatalogDocument)
      ) as ReactElement<DocumentProps>;

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = product
        ? `MOTOKNIFE-${product.model}.pdf`
        : "MOTOKNIFE-Product-Catalog.pdf";
      anchor.click();
      URL.revokeObjectURL(url);
      setState("idle");
    } catch {
      setState("error");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={state === "generating"}
      className={`inline-flex items-center justify-center gap-2 rounded font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 ${className}`}
    >
      <PdfIcon />
      {state === "generating" ? generatingLabel : state === "error" ? errorLabel : label}
    </button>
  );
}

function PdfIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
