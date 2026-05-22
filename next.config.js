/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Désactive l'optimisation des images pour éviter les erreurs de build
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
