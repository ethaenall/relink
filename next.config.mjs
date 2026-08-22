/** @type {import('next').NextConfig} */
const isPages = process.env.STATIC_EXPORT === "1";

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  output: isPages ? "export" : undefined,
  images: { unoptimized: true },
  basePath: isPages ? "/relink" : "",
  trailingSlash: isPages,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

export default nextConfig;
