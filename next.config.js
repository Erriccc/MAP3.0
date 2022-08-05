// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ["links.tailus.io"],
//   },
//   env: {
//     mapbox_key: "YOUR_MAPBOX_PK_GOES_HERE",
//   },
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching,
  },
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      domains: ["links.tailus.io"],
    },
    env: {
      mapbox_key: "YOUR_MAPBOX_PK_GOES_HERE",
    },
  }),
});
