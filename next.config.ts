import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    // 產品圖標準三尺寸 + retina 上限
    deviceSizes: [480, 800, 1200, 1920],
    formats: ["image/avif", "image/webp"],
    // CMS 上傳圖（正式站經 Payload API 供應）
    remotePatterns: [
      { protocol: "https", hostname: "motoknife.com" },
      { protocol: "https", hostname: "www.motoknife.com" },
    ],
  },
};

export default withPayload(withBundleAnalyzer(nextConfig));
