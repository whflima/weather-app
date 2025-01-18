/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // <=== enables static exports
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
      },
    ],
  },
};

module.exports = nextConfig;
