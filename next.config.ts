import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  serverExternalPackages: ["puppeteer", "puppeteer-core", "@sparticuz/chromium"],
};

export default nextConfig;
