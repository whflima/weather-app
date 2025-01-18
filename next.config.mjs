/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
      },
    ],
  },
};
/* module.exports = nextConfig*/
export default nextConfig;
