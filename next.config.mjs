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
  // async headers() {
  //   return [
  //     {
  //       // Appliquer les en-têtes à toutes les routes
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=3600, must-revalidate",
  //         },
  //       ],
  //     },
  //   ];
  // },
  // Optionnel : Configuration des polices si nécessaire
  // experimental: {
  //   optimizeCss: true, // Pour optimiser le CSS
  // },
};

export default nextConfig;
