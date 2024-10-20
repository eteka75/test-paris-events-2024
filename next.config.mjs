/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.paris.fr",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
