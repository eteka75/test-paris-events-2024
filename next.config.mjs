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
  webpack: (config, { isServer }) => {
    if (process.env.NODE_ENV === "production" && !isServer) {
      // Désactiver tous les logs côté client en production
      config.plugins.push(
        new webpack.DefinePlugin({
          "console.log": "() => {}",
          "console.debug": "() => {}",
        })
      );
    }
    return config;
  },
};

export default nextConfig;
