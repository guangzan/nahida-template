import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: false,
  output: "standalone",
  turbopack: {},
  devIndicators: false,
}

export default nextConfig
