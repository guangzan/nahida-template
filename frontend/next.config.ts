import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  output: "standalone",
  turbopack: {},
  devIndicators: false,
}

export default nextConfig
