/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
  },
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
