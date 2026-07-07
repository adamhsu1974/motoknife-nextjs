/**
 * PDF 文件定義 — 僅由 PdfDownloadButton 動態 import（client 端生成，不進主 bundle）。
 * 內建字型不支援 CJK，因此 PDF 內容維持英文。
 */
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import {
  PRODUCTS,
  PRODUCT_SERIES,
  getProductsBySeries,
  type Product,
} from "@/lib/data/products";

const COLORS = {
  orange: "#F47920",
  navy: "#1A1A2E",
  text: "#1a1a1a",
  secondary: "#64748b",
  border: "#e5e7eb",
  cardBg: "#f5f5f2",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: COLORS.text,
    paddingBottom: 90,
  },
  header: {
    backgroundColor: COLORS.navy,
    paddingVertical: 16,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerBrand: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2,
  },
  headerTagline: { color: "#9ca3af", fontSize: 8 },
  headerAccent: { height: 4, backgroundColor: COLORS.orange },
  body: { paddingHorizontal: 40, paddingTop: 24 },
  tierBadge: {
    color: COLORS.orange,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  model: { fontSize: 24, fontFamily: "Helvetica-Bold", color: COLORS.navy },
  name: { fontSize: 12, color: COLORS.secondary, marginTop: 4 },
  summary: { fontSize: 10, lineHeight: 1.5, color: COLORS.secondary, marginTop: 10 },
  imageBox: {
    marginTop: 16,
    height: 140,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  imageText: { color: "#9ca3af", fontSize: 9 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: COLORS.navy,
    marginTop: 20,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  specRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 6,
  },
  specRowAlt: { backgroundColor: COLORS.cardBg },
  specLabel: { width: "38%", paddingHorizontal: 8, color: COLORS.secondary },
  specValue: { width: "62%", paddingHorizontal: 8, fontFamily: "Helvetica-Bold" },
  specNote: { fontFamily: "Helvetica", color: COLORS.orange, fontSize: 8 },
  materialsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  materialChip: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 3,
    paddingHorizontal: 8,
    fontSize: 8,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: COLORS.orange,
    paddingVertical: 12,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerCol: { fontSize: 7, color: COLORS.secondary, lineHeight: 1.5 },
  footerBrand: { fontSize: 8, fontFamily: "Helvetica-Bold", color: COLORS.navy },
  coverPage: {
    backgroundColor: "#0d0d14",
    alignItems: "center",
    justifyContent: "center",
  },
  coverBrand: {
    color: "#ffffff",
    fontSize: 40,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 6,
  },
  coverTagline: { color: COLORS.orange, fontSize: 14, marginTop: 12 },
  coverSub: { color: "#9ca3af", fontSize: 10, marginTop: 8 },
  coverRule: { width: 80, height: 4, backgroundColor: COLORS.orange, marginTop: 28 },
});

function PdfHeader() {
  return (
    <View fixed>
      <View style={styles.header}>
        <Text style={styles.headerBrand}>MOTOKNIFE</Text>
        <Text style={styles.headerTagline}>
          Precision Slitting Solutions — Made in Taiwan Since 1990
        </Text>
      </View>
      <View style={styles.headerAccent} />
    </View>
  );
}

function PdfFooter() {
  return (
    <View style={styles.footer} fixed>
      <View>
        <Text style={styles.footerBrand}>Taiwan Headquarters</Text>
        <Text style={styles.footerCol}>
          No. 155, Ln. 65, Xinjiang Rd., Yangmei Dist., Taoyuan City 32652, Taiwan
        </Text>
        <Text style={styles.footerCol}>
          TEL +886-3-4753005 · FAX +886-3-4754797 · service@motoknife.com
        </Text>
      </View>
      <View>
        <Text style={styles.footerBrand}>Shanghai Branch</Text>
        <Text style={styles.footerCol}>
          No. 2999, Ln. 240, Baoqian Rd., Jiading Dist., Shanghai, China
        </Text>
        <Text style={styles.footerCol}>
          TEL +86-21-69596169 · motokevin@126.com · motoknife.com
        </Text>
      </View>
    </View>
  );
}

function ProductBlock({ product }: { product: Product }) {
  const series = PRODUCT_SERIES.find((s) => s.slug === product.series);

  return (
    <View style={styles.body}>
      <Text style={styles.tierBadge}>
        {series ? `${series.cuttingMethod} · ` : ""}
        {product.tier}
      </Text>
      <Text style={styles.model}>{product.model}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.summary}>{product.summary}</Text>

      <View style={styles.imageBox}>
        <Text style={styles.imageText}>{product.model} Product Image</Text>
      </View>

      <Text style={styles.sectionTitle}>Specifications</Text>
      <View>
        {product.specs.map((spec, i) => (
          <View
            key={spec.label}
            style={i % 2 === 0 ? [styles.specRow, styles.specRowAlt] : styles.specRow}
          >
            <Text style={styles.specLabel}>{spec.label}</Text>
            <Text style={styles.specValue}>
              {spec.value}
              {spec.note ? <Text style={styles.specNote}>  ({spec.note})</Text> : null}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Suitable Materials</Text>
      <View style={styles.materialsRow}>
        {product.materials.map((mat) => (
          <Text key={mat} style={styles.materialChip}>
            {mat}
          </Text>
        ))}
      </View>
    </View>
  );
}

/* ─── Documents ───────────────────────────────────────────── */

export function ProductSpecDocument({ product }: { product: Product }) {
  return (
    <Document
      title={`MOTOKNIFE ${product.model} — ${product.name}`}
      author="MOTOKNIFE (友聚工業股份有限公司)"
    >
      <Page size="A4" style={styles.page}>
        <PdfHeader />
        <ProductBlock product={product} />
        <PdfFooter />
      </Page>
    </Document>
  );
}

export function FullCatalogDocument() {
  const holderSeries = PRODUCT_SERIES.filter((s) =>
    ["score-cut", "shear-cut", "half-cut", "hot-cut"].includes(s.slug),
  );

  return (
    <Document
      title="MOTOKNIFE Product Catalog"
      author="MOTOKNIFE (友聚工業股份有限公司)"
    >
      {/* Cover */}
      <Page size="A4" style={[styles.page, styles.coverPage]}>
        <Text style={styles.coverBrand}>MOTOKNIFE</Text>
        <Text style={styles.coverTagline}>Product Catalog</Text>
        <Text style={styles.coverSub}>
          Precision Slitting Knife Holders — Made in Taiwan Since 1990
        </Text>
        <View style={styles.coverRule} />
        <Text style={[styles.coverSub, { marginTop: 28 }]}>
          motoknife.com · service@motoknife.com · +886-3-4753005
        </Text>
      </Page>

      {/* One page per knife holder model, grouped by series */}
      {holderSeries.flatMap((series) =>
        getProductsBySeries(series.slug).map((product) => (
          <Page key={product.slug} size="A4" style={styles.page}>
            <PdfHeader />
            <ProductBlock product={product} />
            <PdfFooter />
          </Page>
        )),
      )}

      {/* Accessories summary page */}
      <Page size="A4" style={styles.page}>
        <PdfHeader />
        <View style={styles.body}>
          <Text style={styles.model}>Blades & Guide Bars</Text>
          <Text style={styles.summary}>
            Precision slitting knives, score blades, and guide bars matched to
            every MOTOKNIFE holder. Contact us for the full accessory range and
            custom sizes.
          </Text>
          {PRODUCTS.filter((p) => p.series === "knives" || p.series === "guide-bar").map(
            (product) => (
              <View key={product.slug} style={{ marginTop: 14 }}>
                <Text style={{ fontSize: 12, fontFamily: "Helvetica-Bold", color: COLORS.navy }}>
                  {product.model} — {product.name}
                </Text>
                <Text style={[styles.summary, { marginTop: 2 }]}>{product.summary}</Text>
              </View>
            ),
          )}
        </View>
        <PdfFooter />
      </Page>
    </Document>
  );
}
