import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "*.devtunnels.ms",       // VS Code port forwarding
        "*.github.dev",          // GitHub Codespaces
        "*.githubpreview.dev",   // GitHub Codespaces preview
      ],
    },
  },
};

export default nextConfig;
