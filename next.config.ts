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
  },
};

export default withPayload(withBundleAnalyzer(nextConfig));
