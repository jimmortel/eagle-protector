/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Force l'utilisation du moteur de build standard sans Turbopack pour la stabilité
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
