/** @type {import('next').NextConfig} */
const isPages = process.env.STATIC_EXPORT === "1";

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  output: isPages ? "export" : undefined,
  images: { unoptimized: true },
  basePath: isPages ? "/relink" : "",
  trailingSlash: isPages,
};

export default nextConfig;
