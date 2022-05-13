/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["links.tailus.io"],
  },
  env: {
    mapbox_key: "YOUR_MAPBOX_PK_GOES_HERE",
  },
}

module.exports = nextConfig
